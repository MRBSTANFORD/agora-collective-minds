
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { testApiConnection, ProviderApiStatus } from "@/services/apiTester";

export type ExpertConfig = {
  id: string;
  name: string;
  cognitive: {
    creativity: number;
    skepticism: number;
    optimism: number;
  };
  apiKey: string;
  provider?: string;
  model?: string;
};

type ExpertCardListProps = {
  experts: ExpertConfig[];
  onTraitChange: (id: string, trait: "creativity" | "skepticism" | "optimism", value: number) => void;
  onApiKeyChange: (id: string, value: string) => void;
  onProviderChange: (id: string, value: string) => void;
  onModelChange: (id: string, value: string) => void;
};

const PROVIDERS_WITH_MODELS: Record<string, { label: string; value: string; description: string; tier: string; models: { value: string; label: string; free?: boolean }[] }> = {
  HuggingFace: {
    label: "HuggingFace (Free/Paid)",
    value: "HuggingFace",
    description: "Free & paid LLMs via HuggingFace Inference API.",
    tier: "🆓",
    models: [
      { value: "HuggingFaceH4/zephyr-7b-beta", label: "Zephyr 7B (Free)", free: true },
      { value: "meta-llama/Llama-2-7b-chat-hf", label: "Llama 2 7B (Free)", free: true },
      { value: "microsoft/DialoGPT-large", label: "DialoGPT Large (Free)", free: true },
      { value: "mistralai/Mixtral-8x7B-Instruct-v0.1", label: "Mixtral 8x7B (Free)", free: true },
      { value: "meta-llama/Meta-Llama-3-8B", label: "Llama 3 8B (Free)", free: true },
      { value: "openchat/openchat-7b", label: "OpenChat 7B (Free)", free: true },
      { value: "Qwen/Qwen1.5-14B-Chat", label: "Qwen 14B (Free)", free: true },
    ]
  },
  OpenAI: {
    label: "OpenAI (Paid)",
    value: "OpenAI",
    description: "GPT-4o, GPT-4, GPT-3.5-turbo (Paid)",
    tier: "💎",
    models: [
      { value: "gpt-4.1-2025-04-14", label: "GPT-4.1" },
      { value: "gpt-4o", label: "GPT-4o" },
      { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    ]
  },
  Anthropic: {
    label: "Anthropic Claude (Paid)",
    value: "Anthropic",
    description: "Claude 3 & 4 (Paid)",
    tier: "💎",
    models: [
      { value: "claude-sonnet-4-20250514", label: "Claude Sonnet 4" },
      { value: "claude-opus-4-20250514", label: "Claude Opus 4" },
      { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku" },
    ]
  },
  Gemini: {
    label: "Google Gemini (Free/Paid)",
    value: "Gemini",
    description: "Gemini 1.5 Flash/Pro (Free & Paid, API key required)",
    tier: "🆓",
    models: [
      { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash (Free)", free: true },
      { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro (Paid)" },
    ]
  },
  Groq: {
    label: "Groq (Freemium)",
    value: "Groq",
    description: "Supports free API, fast inference (Premium for heavy use)",
    tier: "⚡",
    models: [
      { value: "mixtral-8x7b-32768", label: "Mixtral 8x7B" },
      { value: "llama-3-70b-8192", label: "Llama 3 70B" },
      { value: "gemma-7b-it", label: "Gemma 7B" },
    ]
  },
  Cohere: {
    label: "Cohere (Free/Paid)",
    value: "Cohere",
    description: "1000 free requests/month, then paid.",
    tier: "🆓",
    models: [
      { value: "command-r", label: "Command R (Free)", free: true },
      { value: "command-r-plus", label: "Command R Plus (Paid)" },
      { value: "command-light", label: "Command Light (Free)" },
    ]
  },
  Mistral: {
    label: "Mistral AI (Free/Paid)",
    value: "Mistral",
    description: "Free for testing, paid for expansions.",
    tier: "🆓",
    models: [
      { value: "mistral-small-latest", label: "Mistral Small (Free)", free: true },
      { value: "mistral-medium-latest", label: "Mistral Medium (Paid)" },
      { value: "mistral-large-latest", label: "Mistral Large (Paid)" }
    ]
  },
  Perplexity: {
    label: "Perplexity (Paid)",
    value: "Perplexity",
    description: "Paid SOTA web-connected LLMs.",
    tier: "💎",
    models: [
      { value: "llama-3.1-sonar-small-128k-online", label: "Llama 3.1 Small" }
    ]
  },
};

const traitDocs: Record<string, string> = {
  creativity: "How divergent and imaginative the expert is. Higher values mean bolder, more inventive ideas and unconventional approaches.",
  skepticism: "How much the expert questions assumptions and challenges points. Higher values means more critical thinking and analytical rigor.",
  optimism: "How positively the expert frames possibilities and outcomes. Higher values mean a focus on hope, opportunity, and constructive solutions.",
  provider: "Choose which AI provider and model this expert uses for responses. Each provider and model has different strengths and API free/paid status.",
  apiKey: "Your personal API key for the selected provider. HuggingFace and Cohere offer free keys. See the API Setup Guide for how to get one.",
  model: "Select the AI model to use. Free models are labeled (Free). See the API Setup Guide for details.",
};

/** Helper to identify model options for selected provider */
function getModelOptions(provider: string) {
  return PROVIDERS_WITH_MODELS[provider]?.models || [];
}

/** API connection test helper/status */
type ApiStatus = ProviderApiStatus;
type ApiStatuses = Record<string, ApiStatus>;
type ApiMessages = Record<string, string>;

const ExpertCardList: React.FC<ExpertCardListProps> = ({
  experts,
  onTraitChange,
  onApiKeyChange,
  onProviderChange,
  onModelChange,
}) => {
  const [testingStatus, setTestingStatus] = useState<ApiStatuses>({});
  const [apiMessages, setApiMessages] = useState<ApiMessages>({});

  const handleTestApi = async (expert: ExpertConfig) => {
    setTestingStatus(ts => ({ ...ts, [expert.id]: "testing" }));
    setApiMessages(msg => ({ ...msg, [expert.id]: "" }));
    const result = await testApiConnection({
      provider: expert.provider || "HuggingFace",
      model: expert.model || getModelOptions(expert.provider || "HuggingFace")[0]?.value,
      apiKey: expert.apiKey,
    });
    setTestingStatus(ts => ({ ...ts, [expert.id]: result.ok ? "success" : "error" }));
    setApiMessages(msg => ({ ...msg, [expert.id]: result.message }));
    setTimeout(() => setTestingStatus(ts => ({ ...ts, [expert.id]: "idle" })), 5000);
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pr-4">
        {experts.map((expert) => {
          const providerMeta = PROVIDERS_WITH_MODELS[expert.provider || "HuggingFace"];
          const tier = providerMeta?.tier || "🆓";

          return (
          <Card key={expert.id} className={`bg-slate-50/80 border-amber-100 hover:shadow-md transition-shadow`}>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                {expert.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cognitive Traits */}
              <div className="space-y-3">
                {["creativity", "skepticism", "optimism"].map(trait => (
                  <div key={trait}>
                    <Label className="flex items-center gap-2 text-sm">
                      {trait.charAt(0).toUpperCase() + trait.slice(1)}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-pointer">
                            <Info size={12} className={trait === "optimism" ? "text-rose-500 hover:text-amber-600" : trait === "creativity" ? "text-amber-500 hover:text-amber-600" : "text-slate-500 hover:text-amber-600"} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          {traitDocs[trait]}
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Slider
                      value={[expert.cognitive[trait as "creativity" | "skepticism" | "optimism"]]}
                      min={0}
                      max={100}
                      onValueChange={([v]) => onTraitChange(expert.id, trait as any, v)}
                      className="mt-1"
                    />
                    <span className="text-xs text-slate-500">{expert.cognitive[trait as any]}%</span>
                  </div>
                ))}
              </div>

              {/* AI Provider Selection */}
              <div>
                <Label className="flex items-center gap-2 text-sm">
                  AI Provider <span className="ml-1">{tier}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">
                        <Info size={12} className="text-blue-500 hover:text-amber-600" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      {providerMeta?.description || traitDocs.provider}
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Select
                  value={expert.provider || "HuggingFace"}
                  onValueChange={(value) => { onProviderChange(expert.id, value); onModelChange(expert.id, getModelOptions(value)[0]?.value); }}
                >
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select AI Provider" /></SelectTrigger>
                  <SelectContent>
                    {Object.values(PROVIDERS_WITH_MODELS).map((provider) => (
                      <SelectItem key={provider.value} value={provider.value}>
                        <div className="flex items-center justify-between">
                          <span>
                            <span className="font-medium">{provider.label}</span>{" "}
                            <span>{provider.tier}</span>
                          </span>
                          <span className="text-xs text-slate-500">{provider.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* AI Model Selection */}
              <div>
                <Label className="flex items-center gap-2 text-sm">
                  AI Model
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">
                        <Info size={12} className="text-purple-500 hover:text-amber-600" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      {traitDocs.model}
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Select
                  value={expert.model || getModelOptions(expert.provider || "HuggingFace")[0]?.value}
                  onValueChange={(value) => onModelChange(expert.id, value)}
                >
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select Model" /></SelectTrigger>
                  <SelectContent>
                    {getModelOptions(expert.provider || "HuggingFace").map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <span className="font-medium">{model.label}</span> {model.free && <span className="text-green-600 font-bold">🆓 Free</span>}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* API Key Input + Test */}
              <div>
                <Label className="flex items-center gap-2 text-sm">
                  API Key
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">
                        <Info size={12} className="text-slate-500 hover:text-amber-600" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      {traitDocs.apiKey}
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={
                      expert.provider === "HuggingFace"
                        ? "Optional for HuggingFace"
                        : "Enter your API key"
                    }
                    type="password"
                    value={expert.apiKey}
                    onChange={(e) => onApiKeyChange(expert.id, e.target.value)}
                    className="mt-1"
                    autoComplete="off"
                  />
                  <button
                    className="border bg-white rounded px-2 py-1 text-xs ml-1 flex items-center gap-1 shadow hover:bg-amber-50 disabled:opacity-50 disabled:cursor-default"
                    title="Test API Connection"
                    onClick={() => handleTestApi(expert)}
                    disabled={testingStatus[expert.id] === "testing"}
                    type="button"
                  >
                    {testingStatus[expert.id] === "testing" ? (
                      <>
                        <Loader2 size={12} className="animate-spin" /> Testing
                      </>
                    ) : testingStatus[expert.id] === "success" ? (
                      <>
                        <CheckCircle2 size={14} className="text-green-600" /> Success
                      </>
                    ) : testingStatus[expert.id] === "error" ? (
                      <>
                        <AlertCircle size={14} className="text-rose-500" /> Failed
                      </>
                    ) : (
                      "Test"
                    )}
                  </button>
                </div>
                {apiMessages[expert.id] && (
                  <div className={`text-xs mt-1 ${testingStatus[expert.id] === "success" ? "text-green-600" : "text-rose-500"}`}>
                    {apiMessages[expert.id]}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )})}
      </div>
    </TooltipProvider>
  );
};

export default ExpertCardList;
