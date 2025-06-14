import { useEffect, useState, useCallback, useMemo } from "react";
import { useAsyncWithCancel } from "./useAsyncWithCancel";

export type LLMModel = {
  value: string;
  label: string;
  provider: string;
  free?: boolean;
  available?: boolean;
  note?: string;
};

async function fetchOpenAIModels(apiKey?: string): Promise<LLMModel[]> {
  return [
    { value: "gpt-4.1-2025-04-14", label: "GPT-4.1", provider: "OpenAI", free: false },
    { value: "gpt-4o", label: "GPT-4o", provider: "OpenAI", free: false },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI", free: false },
  ];
}
async function fetchAnthropicModels(apiKey?: string): Promise<LLMModel[]> {
  return [
    { value: "claude-sonnet-4-20250514", label: "Claude Sonnet 4", provider: "Anthropic", free: false },
    { value: "claude-opus-4-20250514", label: "Claude Opus 4", provider: "Anthropic", free: false },
    { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku", provider: "Anthropic", free: false },
  ];
}
async function fetchGroqModels(apiKey?: string): Promise<LLMModel[]> {
  return [
    { value: "mixtral-8x7b-32768", label: "Mixtral 8x7B", provider: "Groq", free: true },
    { value: "llama-3-70b-8192", label: "Llama 3 70B", provider: "Groq", free: true },
    { value: "gemma-7b-it", label: "Gemma 7B", provider: "Groq", free: true },
  ];
}
async function fetchHuggingFaceModels(apiKey?: string): Promise<LLMModel[]> {
  return [
    { value: "HuggingFaceH4/zephyr-7b-beta", label: "Zephyr 7B (Free)", provider: "HuggingFace", free: true },
    { value: "meta-llama/Llama-2-7b-chat-hf", label: "Llama 2 7B (Free)", provider: "HuggingFace", free: true },
    { value: "microsoft/DialoGPT-large", label: "DialoGPT Large (Free)", provider: "HuggingFace", free: true },
    { value: "mistralai/Mixtral-8x7B-Instruct-v0.1", label: "Mixtral 8x7B (Free)", provider: "HuggingFace", free: true },
    { value: "meta-llama/Meta-Llama-3-8B", label: "Llama 3 8B (Free)", provider: "HuggingFace", free: true },
    { value: "openchat/openchat-7b", label: "OpenChat 7B (Free)", provider: "HuggingFace", free: true },
    { value: "Qwen/Qwen1.5-14B-Chat", label: "Qwen 14B (Free)", provider: "HuggingFace", free: true }
  ];
}

const fetchers: Record<string, (apiKey?: string) => Promise<LLMModel[]>> = {
  "OpenAI": fetchOpenAIModels,
  "Anthropic": fetchAnthropicModels,
  "Groq": fetchGroqModels,
  "HuggingFace": fetchHuggingFaceModels,
};

/**
 * Helper to create a stable dependencies array
 */
function useStableProviders(providers: string[]) {
  const [stable, setStable] = useState<string[]>([]);
  useEffect(() => {
    // Only update if changed
    if (
      providers.length !== stable.length ||
      !providers.every((val, idx) => stable[idx] === val)
    ) {
      setStable(providers);
    }
    // eslint-disable-next-line
  }, [providers.join(',')]);
  return stable;
}

/**
 * Returns available models for providers, with strong dependency and async safety.
 */
export function useAvailableModels(
  providers: string[],
  apiKeys?: Record<string, string>
) {
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState<Record<string, LLMModel[]>>({});
  const [error, setError] = useState<string | null>(null);

  // Make dependency array stable, only trigger on providers/API keys identity change
  const stableProviders = useStableProviders(providers);

  // Memoize API Keys
  const stableApiKeys = useMemo(
    () => apiKeys && JSON.stringify(apiKeys),
    [apiKeys && Object.keys(apiKeys).sort().join(",")]
  );

  // Core async fetcher, runs when providers or their keys change in a meaningful way
  const fetchModels = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    const results: Record<string, LLMModel[]> = {};

    for (const provider of stableProviders) {
      if (signal?.aborted) return;
      try {
        const modelsList = await fetchers[provider]?.(apiKeys?.[provider]);
        results[provider] = modelsList || [];
      } catch (e) {
        setError(`Failed to fetch models for ${provider}`);
        results[provider] = [];
      }
      if (signal?.aborted) return;
    }
    setModels(results);
    setLoading(false);
  }, [stableProviders, stableApiKeys]);

  // Use cancellation-safe async invoker
  useAsyncWithCancel(fetchModels, [fetchModels]);

  useEffect(() => {
    // Reset models if no active providers
    if (!stableProviders.length) {
      setModels({});
      setLoading(false);
    }
    // ... no need to trigger fetch here, it's inside useAsyncWithCancel ...
    // eslint-disable-next-line
  }, [stableProviders.length]);

  return useMemo(
    () => ({ loading, models, error }),
    [loading, models, error]
  );
}
