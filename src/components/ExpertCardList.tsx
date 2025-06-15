import React, { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, CheckCircle2, AlertCircle, Loader2, RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { testApiConnection, ProviderApiStatus } from "@/services/apiTester";
import { useAvailableModels, LLMModel } from "@/hooks/useAvailableModels";
import { PROVIDERS_WITH_MODELS, traitDocs } from "@/config/providerConfig";
import { useEnhancedModels, EnhancedLLMModel } from "@/hooks/useEnhancedModels";

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
  isModelsLoading: boolean;
  onRefreshModels: () => void;
}>(({ 
  expert, 
  onTraitChange, 
  onApiKeyChange, 
  onProviderChange, 
  onModelChange,
  modelOptions,
  testingStatus,
  apiMessage,
  onTestApi,
  isModelsLoading,
  onRefreshModels
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

        {/* Enhanced Model Selection with real-time info */}
        <div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">AI Model</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefreshModels}
              disabled={isModelsLoading}
              className="h-6 px-2 text-xs"
            >
              <RefreshCw className={`w-3 h-3 mr-1 ${isModelsLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <Select
            value={expert.model || modelOptions[0]?.value}
            onValueChange={onModelChange}
            disabled={isModelsLoading}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={isModelsLoading ? "Loading models..." : "Select Model"} />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.length === 0 && !isModelsLoading ? (
                <SelectItem value="no-models" disabled>
                  No models available
                </SelectItem>
              ) : (
                modelOptions.map((model) => (
                  <SelectItem key={model.value} value={model.value} disabled={!model.available}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{model.label}</span>
                      <div className="flex items-center gap-1 ml-2">
                        {model.free && <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">Free</Badge>}
                        {!model.available && <Badge variant="outline" className="text-xs text-gray-500">API Key Required</Badge>}
                        {model.capabilities?.includes('web_search') && <Zap className="w-3 h-3 text-blue-500" />}
                      </div>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {modelOptions.length > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              {modelOptions.filter(m => m.free).length} free, {modelOptions.filter(m => m.available).length} available
            </div>
          )}
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

  // Use enhanced discovery system
  const { 
    loading: modelsLoading, 
    providers: providerStatuses, 
    models: availableModels, 
    error: modelsError, 
    refreshDiscovery, 
    summary 
  } = useEnhancedModels(providerList, apiKeys);

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
          isModelsLoading={modelsLoading}
          onRefreshModels={refreshDiscovery}
        />
      );
    }),
    [experts, availableModels, testingStatus, apiMessages, modelsLoading, onTraitChange, onApiKeyChange, onProviderChange, onModelChange, handleTestApi, refreshDiscovery]
  );

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Enhanced Model Discovery Status */}
        {(modelsLoading || modelsError || summary.totalModels > 0) && (
          <Card className="bg-blue-50/50 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {modelsLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span className="text-sm text-blue-700">Discovering providers and models...</span>
                    </>
                  ) : modelsError ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-700">Discovery failed: {modelsError}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">
                        Found {summary.availableProviders}/{summary.totalProviders} working providers, {summary.totalModels} models ({summary.freeModels} free)
                      </span>
                    </>
                  )}
                </div>
                {!modelsLoading && (
                  <Button variant="ghost" size="sm" onClick={refreshDiscovery}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                )}
              </div>
              
              {/* Show provider status indicators */}
              {summary.workingProviders.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {summary.workingProviders.map(provider => {
                    const status = providerStatuses[provider];
                    return (
                      <Badge 
                        key={provider} 
                        variant={status?.freeModelsAvailable ? "default" : "outline"}
                        className="text-xs"
                      >
                        {provider} {status?.freeModelsAvailable && "🆓"}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Expert Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pr-4">
          {expertCards}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default React.memo(ExpertCardList);
