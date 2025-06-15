
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { discoverAllModelsWithCache, DiscoveredModel } from "@/services/modelDiscovery";

export type LLMModel = {
  value: string;
  label: string;
  provider: string;
  free?: boolean;
  available?: boolean;
  note?: string;
  contextLength?: number;
  capabilities?: string[];
};

/**
 * Enhanced hook for dynamic model discovery with real-time API queries
 */
export function useAvailableModels(
  providers: string[],
  apiKeys?: Record<string, string>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [models, setModels] = useState<Record<string, LLMModel[]>>({});
  const abortControllerRef = useRef<AbortController | null>(null);

  // Memoize providers array to prevent unnecessary re-renders
  const stableProviders = useMemo(() => {
    if (!Array.isArray(providers)) return [];
    return [...providers].sort(); // Sort for stable comparison
  }, [providers]);

  // Memoize API keys to prevent unnecessary re-renders
  const stableApiKeys = useMemo(() => {
    if (!apiKeys) return {};
    const sorted = Object.keys(apiKeys).sort().reduce((acc, key) => {
      if (apiKeys[key] && apiKeys[key].trim() !== '') {
        acc[key] = apiKeys[key];
      }
      return acc;
    }, {} as Record<string, string>);
    return sorted;
  }, [apiKeys]);

  // Convert discovered models to LLMModel format
  const convertDiscoveredModels = useCallback((discoveredModels: Record<string, DiscoveredModel[]>): Record<string, LLMModel[]> => {
    const result: Record<string, LLMModel[]> = {};
    
    stableProviders.forEach(provider => {
      const providerModels = discoveredModels[provider] || [];
      result[provider] = providerModels.map(model => ({
        value: model.id,
        label: model.name,
        provider: model.provider,
        free: model.free,
        available: model.available,
        note: model.note,
        contextLength: model.contextLength,
        capabilities: model.capabilities
      }));
    });
    
    return result;
  }, [stableProviders]);

  // Discover models function
  const discoverModels = useCallback(async () => {
    if (stableProviders.length === 0) {
      setModels({});
      return;
    }

    console.log('🔍 Starting model discovery for providers:', stableProviders);
    console.log('🔑 API keys available for:', Object.keys(stableApiKeys));
    
    setLoading(true);
    setError(null);

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();

    try {
      const discoveredModels = await discoverAllModelsWithCache(stableApiKeys);
      
      // Check if request was cancelled
      if (abortControllerRef.current?.signal.aborted) {
        console.log('🛑 Model discovery cancelled');
        return;
      }

      const convertedModels = convertDiscoveredModels(discoveredModels);
      
      console.log('✅ Model discovery completed:', {
        providers: Object.keys(convertedModels),
        totalModels: Object.values(convertedModels).flat().length,
        freeModels: Object.values(convertedModels).flat().filter(m => m.free).length
      });
      
      setModels(convertedModels);
      setError(null);
    } catch (err) {
      if (abortControllerRef.current?.signal.aborted) {
        console.log('🛑 Model discovery cancelled');
        return;
      }
      
      console.error('❌ Model discovery failed:', err);
      setError(err instanceof Error ? err.message : 'Model discovery failed');
      
      // Fallback to empty models for providers that failed
      const fallbackModels: Record<string, LLMModel[]> = {};
      stableProviders.forEach(provider => {
        fallbackModels[provider] = [];
      });
      setModels(fallbackModels);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [stableProviders, stableApiKeys, convertDiscoveredModels]);

  // Effect to trigger discovery when providers or API keys change
  useEffect(() => {
    discoverModels();
  }, [discoverModels]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Function to refresh models manually
  const refreshModels = useCallback(() => {
    console.log('🔄 Manual model refresh requested');
    discoverModels();
  }, [discoverModels]);

  // Get summary statistics
  const summary = useMemo(() => {
    const allModels = Object.values(models).flat();
    return {
      totalModels: allModels.length,
      freeModels: allModels.filter(m => m.free).length,
      availableModels: allModels.filter(m => m.available).length,
      providersWithModels: Object.keys(models).filter(p => models[p].length > 0).length
    };
  }, [models]);

  // Return memoized result to prevent unnecessary re-renders
  return useMemo(() => ({
    loading,
    models,
    error,
    refreshModels,
    summary
  }), [loading, models, error, refreshModels, summary]);
}
