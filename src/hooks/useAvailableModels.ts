
import { useEffect, useState } from "react";

// Structure for a model option
export type LLMModel = {
  value: string;
  label: string;
  provider: string;
  free?: boolean;
  available?: boolean;
  note?: string;
};

// Simulate simple dynamic APIs for demo (extend with real endpoints if you have keys)
async function fetchOpenAIModels(apiKey?: string): Promise<LLMModel[]> {
  // OpenAI public models (hardcode for demo, can fetch live if apiKey is set).
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

// Demo: can call HuggingFace hub API; for prod, enhance with actual user API key discovery
async function fetchHuggingFaceModels(apiKey?: string): Promise<LLMModel[]> {
  // Example: Call the HuggingFace API to list models with 'chat' tag, etc.
  // For now, hardcoded commonly available public/free ones:
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

// Add more fetchXYZModels functions as needed...

const fetchers: Record<string, (apiKey?: string) => Promise<LLMModel[]>> = {
  "OpenAI": fetchOpenAIModels,
  "Anthropic": fetchAnthropicModels,
  "Groq": fetchGroqModels,
  "HuggingFace": fetchHuggingFaceModels,
  // Add Cohere, Gemini, etc.
};

// Hook for available models
export function useAvailableModels(providers: string[], apiKeys?: Record<string, string>) {
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState<Record<string, LLMModel[]>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      const results: Record<string, LLMModel[]> = {};
      for (const provider of providers) {
        try {
          const modelsList = await fetchers[provider]?.(apiKeys?.[provider]);
          results[provider] = modelsList || [];
        } catch (e) {
          setError(`Failed to fetch models for ${provider}`);
          results[provider] = [];
        }
      }
      if (!cancelled) setModels(results);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [providers, JSON.stringify(apiKeys || {})]);

  return { loading, models, error };
}
