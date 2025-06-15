
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { discoverProvidersAndModels, EnhancedDiscoveryResult } from "@/services/enhancedModelDiscovery";
import { ProviderStatus } from "@/services/providerDiscovery";
import { DiscoveredModel } from "@/services/modelDiscovery";

export type EnhancedLLMModel = {
  value: string;
  label: string;
  provider: string;
  free?: boolean;
  available?: boolean;
  note?: string;
  contextLength?: number;
  capabilities?: string[];
};

export interface UseEnhancedModelsResult {
  loading: boolean;
  providers: Record<string, ProviderStatus>;
  models: Record<string, EnhancedLLMModel[]>;
  error: string | null;
  refreshDiscovery: () => void;
  summary: {
    totalProviders: number;
    availableProviders: number;
    totalModels: number;
    freeModels: number;
    workingProviders: string[];
  };
}

export function useEnhancedModels(
  requestedProviders: string[],
  apiKeys?: Record<string, string>
): UseEnhancedModelsResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discoveryResult, setDiscoveryResult] = useState<EnhancedDiscoveryResult | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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

  // Convert discovered models to EnhancedLLMModel format
  const convertDiscoveredModels = useCallback((discoveredModels: Record<string, DiscoveredModel[]>): Record<string, EnhancedLLMModel[]> => {
    const result: Record<string, EnhancedLLMModel[]> = {};
    
    Object.entries(discoveredModels).forEach(([provider, models]) => {
      result[provider] = models.map(model => ({
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
  }, []);

  // Enhanced discovery function
  const runDiscovery = useCallback(async () => {
    console.log('🔍 Starting enhanced provider and model discovery...');
    
    setLoading(true);
    setError(null);

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();

    try {
      const result = await discoverProvidersAndModels(stableApiKeys);
      
      // Check if request was cancelled
      if (abortControllerRef.current?.signal.aborted) {
        console.log('🛑 Discovery cancelled');
        return;
      }

      setDiscoveryResult(result);
      setError(null);
      
      console.log('✅ Enhanced discovery completed successfully');
      
    } catch (err) {
      if (abortControllerRef.current?.signal.aborted) {
        console.log('🛑 Discovery cancelled');
        return;
      }
      
      console.error('❌ Enhanced discovery failed:', err);
      setError(err instanceof Error ? err.message : 'Discovery failed');
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [stableApiKeys]);

  // Effect to trigger discovery when API keys change
  useEffect(() => {
    runDiscovery();
  }, [runDiscovery]);

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

  // Process results
  const processedResult = useMemo(() => {
    if (!discoveryResult) {
      return {
        providers: {},
        models: {},
        summary: {
          totalProviders: 0,
          availableProviders: 0,
          totalModels: 0,
          freeModels: 0,
          workingProviders: []
        }
      };
    }

    const models = convertDiscoveredModels(discoveryResult.models);
    const workingProviders = Object.entries(discoveryResult.providers)
      .filter(([_, status]) => status.available)
      .map(([name, _]) => name);

    return {
      providers: discoveryResult.providers,
      models,
      summary: {
        ...discoveryResult.summary,
        workingProviders
      }
    };
  }, [discoveryResult, convertDiscoveredModels]);

  return {
    loading,
    error,
    refreshDiscovery: runDiscovery,
    ...processedResult
  };
}
