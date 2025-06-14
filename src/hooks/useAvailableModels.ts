
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

export type LLMModel = {
  value: string;
  label: string;
  provider: string;
  free?: boolean;
  available?: boolean;
  note?: string;
};

// Static model data - no need to refetch these
const STATIC_MODELS: Record<string, LLMModel[]> = {
  OpenAI: [
    { value: "gpt-4.1-2025-04-14", label: "GPT-4.1", provider: "OpenAI", free: false },
    { value: "gpt-4o", label: "GPT-4o", provider: "OpenAI", free: false },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI", free: false },
  ],
  Anthropic: [
    { value: "claude-sonnet-4-20250514", label: "Claude Sonnet 4", provider: "Anthropic", free: false },
    { value: "claude-opus-4-20250514", label: "Claude Opus 4", provider: "Anthropic", free: false },
    { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku", provider: "Anthropic", free: false },
  ],
  Groq: [
    { value: "mixtral-8x7b-32768", label: "Mixtral 8x7B", provider: "Groq", free: true },
    { value: "llama-3-70b-8192", label: "Llama 3 70B", provider: "Groq", free: true },
    { value: "gemma-7b-it", label: "Gemma 7B", provider: "Groq", free: true },
  ],
  HuggingFace: [
    { value: "HuggingFaceH4/zephyr-7b-beta", label: "Zephyr 7B (Free)", provider: "HuggingFace", free: true },
    { value: "meta-llama/Llama-2-7b-chat-hf", label: "Llama 2 7B (Free)", provider: "HuggingFace", free: true },
    { value: "microsoft/DialoGPT-large", label: "DialoGPT Large (Free)", provider: "HuggingFace", free: true },
    { value: "mistralai/Mixtral-8x7B-Instruct-v0.1", label: "Mixtral 8x7B (Free)", provider: "HuggingFace", free: true },
    { value: "meta-llama/Meta-Llama-3-8B", label: "Llama 3 8B (Free)", provider: "HuggingFace", free: true },
    { value: "openchat/openchat-7b", label: "OpenChat 7B (Free)", provider: "HuggingFace", free: true },
    { value: "Qwen/Qwen1.5-14B-Chat", label: "Qwen 14B (Free)", provider: "HuggingFace", free: true }
  ],
};

/**
 * Stable hook for available models with proper memoization and cancellation
 */
export function useAvailableModels(
  providers: string[],
  apiKeys?: Record<string, string>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Memoize providers array to prevent unnecessary re-renders
  const stableProviders = useMemo(() => {
    if (!Array.isArray(providers)) return [];
    return [...providers].sort(); // Sort for stable comparison
  }, [providers]);

  // Memoize API keys to prevent unnecessary re-renders
  const stableApiKeys = useMemo(() => {
    if (!apiKeys) return undefined;
    const sorted = Object.keys(apiKeys).sort().reduce((acc, key) => {
      acc[key] = apiKeys[key];
      return acc;
    }, {} as Record<string, string>);
    return sorted;
  }, [apiKeys]);

  // Memoize models result - always return static models for now
  const models = useMemo(() => {
    const result: Record<string, LLMModel[]> = {};
    stableProviders.forEach(provider => {
      result[provider] = STATIC_MODELS[provider] || [];
    });
    return result;
  }, [stableProviders]);

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

  // Return memoized result to prevent unnecessary re-renders
  return useMemo(() => ({
    loading,
    models,
    error
  }), [loading, models, error]);
}
