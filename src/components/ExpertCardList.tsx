import React, { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { testApiConnection, ProviderApiStatus } from "@/services/apiTester";
import { useAvailableModels, LLMModel } from "@/hooks/useAvailableModels";
import { PROVIDERS_WITH_MODELS, traitDocs } from "@/config/providerConfig";

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

// Memoized static data to prevent recreating on every render
const PROVIDERS_WITH_MODELS = {
  HuggingFace: {
    label: "HuggingFace (Free/Paid)",
    value: "HuggingFace",
    description: "Free & paid LLMs via HuggingFace Inference API.",
    tier: "🆓",
  },
  OpenAI: {
    label: "OpenAI (Paid)",
    value: "OpenAI",
    description: "GPT-4o, GPT-4, GPT-3.5-turbo (Paid)",
    tier: "💎",
  },
  Anthropic: {
    label: "Anthropic Claude (Paid)",
    value: "Anthropic",
    description: "Claude 3 & 4 (Paid)",
    tier: "💎",
  },
  Groq: {
    label: "Groq (Freemium)",
    value: "Groq",
    description: "Supports free API, fast inference (Premium for heavy use)",
    tier: "⚡",
  },
};

const traitDocs = {
  creativity: "How divergent and imaginative the expert is. Higher values mean bolder, more inventive ideas and unconventional approaches.",
  skepticism: "How much the expert questions assumptions and challenges points. Higher values means more critical thinking and analytical rigor.",
  optimism: "How positively the expert frames possibilities and outcomes. Higher values mean a focus on hope, opportunity, and constructive solutions.",
  provider: "Choose which AI provider and model this expert uses for responses. Each provider and model has different strengths and API free/paid status.",
  apiKey: "Your personal API key for the selected provider. HuggingFace and Cohere offer free keys. See the API Setup Guide for how to get one.",
  model: "Select the AI model to use. Free models are labeled (Free). See the API Setup Guide for details.",
};

// Memoized individual expert card component
const ExpertCard = React.memo<{
  expert: ExpertConfig;
  onTraitChange: (trait: "creativity" | "skepticism" | "optimism", value: number) => void;
  onApiKeyChange: (value: string) => void;
  onProviderChange: (value: string) => void;
  onModelChange: (value: string) => void;
  modelOptions: LLMModel[];
  testingStatus: ProviderApiStatus;
  apiMessage: string;
  onTestApi: () => void;
}>(({ 
  expert, 
  onTraitChange, 
  onApiKeyChange, 
  onProviderChange, 
  onModelChange,
  modelOptions,
  testingStatus,
  apiMessage,
  onTestApi
}) => {
  const providerMeta = PROVIDERS_WITH_MODELS[expert.provider as keyof typeof PROVIDERS_WITH_MODELS] || PROVIDERS_WITH_MODELS.HuggingFace;

  return (
    <Card className="bg-slate-50/80 border-amber-100 hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          {expert.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cognitive Traits */}
        <div className="space-y-3">
          {(["creativity", "skepticism", "optimism"] as const).map(trait => (
            <div key={trait}>
              <Label className="flex items-center gap-2 text-sm">
                {trait.charAt(0).toUpperCase() + trait.slice(1)}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      <Info size={12} className="text-slate-500 hover:text-amber-600" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    {traitDocs[trait]}
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Slider
                value={[expert.cognitive[trait]]}
                min={0}
                max={100}
                onValueChange={([v]) => onTraitChange(trait, v)}
                className="mt-1"
              />
              <span className="text-xs text-slate-500">{expert.cognitive[trait]}%</span>
            </div>
          ))}
        </div>

        {/* Provider Selection */}
        <div>
          <Label className="flex items-center gap-2 text-sm">
            AI Provider <span className="ml-1">{providerMeta.tier}</span>
          </Label>
          <Select
            value={expert.provider || "HuggingFace"}
            onValueChange={onProviderChange}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select AI Provider" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PROVIDERS_WITH_MODELS).map((provider) => (
                <SelectItem key={provider.value} value={provider.value}>
                  {provider.label} {provider.tier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model Selection */}
        <div>
          <Label className="text-sm">AI Model</Label>
          <Select
            value={expert.model || modelOptions[0]?.value}
            onValueChange={onModelChange}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  <span className="font-medium">{model.label}</span>
                  {model.free && <span className="text-green-600 ml-1">🆓</span>}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* API Key Input + Test */}
        <div>
          <Label className="text-sm">API Key</Label>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter your API key"
              type="password"
              value={expert.apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              className="mt-1"
              autoComplete="off"
            />
            <button
              className="border bg-white rounded px-2 py-1 text-xs flex items-center gap-1 hover:bg-amber-50 disabled:opacity-50"
              onClick={onTestApi}
              disabled={testingStatus === "testing"}
              type="button"
            >
              {testingStatus === "testing" ? (
                <><Loader2 size={12} className="animate-spin" /> Testing</>
              ) : testingStatus === "success" ? (
                <><CheckCircle2 size={14} className="text-green-600" /> Success</>
              ) : testingStatus === "error" ? (
                <><AlertCircle size={14} className="text-rose-500" /> Failed</>
              ) : (
                "Test"
              )}
            </button>
          </div>
          {apiMessage && (
            <div className={`text-xs mt-1 ${testingStatus === "success" ? "text-green-600" : "text-rose-500"}`}>
              {apiMessage}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

ExpertCard.displayName = 'ExpertCard';

const ExpertCardList: React.FC<ExpertCardListProps> = ({
  experts,
  onTraitChange,
  onApiKeyChange,
  onProviderChange,
  onModelChange,
}) => {
  // Memoize provider list to prevent unnecessary re-fetching
  const providerList = useMemo(() => 
    [...new Set(experts.map(e => e.provider || "HuggingFace"))],
    [experts]
  );

  // Memoize API keys object
  const apiKeys = useMemo(() => {
    const keys: Record<string, string> = {};
    experts.forEach(exp => { 
      if (exp.provider && exp.apiKey) {
        keys[exp.provider] = exp.apiKey;
      }
    });
    return keys;
  }, [experts]);

  const { models: availableModels } = useAvailableModels(providerList, apiKeys);

  const [testingStatus, setTestingStatus] = useState<Record<string, ProviderApiStatus>>({});
  const [apiMessages, setApiMessages] = useState<Record<string, string>>({});

  const handleTestApi = useCallback(async (expert: ExpertConfig) => {
    setTestingStatus(prev => ({ ...prev, [expert.id]: "testing" }));
    setApiMessages(prev => ({ ...prev, [expert.id]: "" }));
    
    try {
      const result = await testApiConnection({
        provider: expert.provider || "HuggingFace",
        model: expert.model || availableModels[expert.provider || "HuggingFace"]?.[0]?.value,
        apiKey: expert.apiKey,
      });
      
      setTestingStatus(prev => ({ ...prev, [expert.id]: result.ok ? "success" : "error" }));
      setApiMessages(prev => ({ ...prev, [expert.id]: result.message }));
    } catch (error) {
      setTestingStatus(prev => ({ ...prev, [expert.id]: "error" }));
      setApiMessages(prev => ({ ...prev, [expert.id]: "Connection failed" }));
    }

    // Clear status after 5 seconds
    setTimeout(() => {
      setTestingStatus(prev => ({ ...prev, [expert.id]: "idle" }));
    }, 5000);
  }, [availableModels]);

  // Memoize expert cards to prevent unnecessary re-renders
  const expertCards = useMemo(() => 
    experts.map((expert) => {
      const modelOptions = availableModels[expert.provider || "HuggingFace"] || [];
      
      return (
        <ExpertCard
          key={expert.id}
          expert={expert}
          onTraitChange={(trait, value) => onTraitChange(expert.id, trait, value)}
          onApiKeyChange={(value) => onApiKeyChange(expert.id, value)}
          onProviderChange={(value) => {
            onProviderChange(expert.id, value);
            const newModelOptions = availableModels[value] || [];
            if (newModelOptions[0]) {
              onModelChange(expert.id, newModelOptions[0].value);
            }
          }}
          onModelChange={(value) => onModelChange(expert.id, value)}
          modelOptions={modelOptions}
          testingStatus={testingStatus[expert.id] || "idle"}
          apiMessage={apiMessages[expert.id] || ""}
          onTestApi={() => handleTestApi(expert)}
        />
      );
    }),
    [experts, availableModels, testingStatus, apiMessages, onTraitChange, onApiKeyChange, onProviderChange, onModelChange, handleTestApi]
  );

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pr-4">
        {expertCards}
      </div>
    </TooltipProvider>
  );
};

export default React.memo(ExpertCardList);
