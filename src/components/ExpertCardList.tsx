
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

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
};

type ExpertCardListProps = {
  experts: ExpertConfig[];
  onTraitChange: (id: string, trait: "creativity" | "skepticism" | "optimism", value: number) => void;
  onApiKeyChange: (id: string, value: string) => void;
  onProviderChange: (id: string, value: string) => void;
};

const EXPERT_PROVIDERS = [
  { label: "HuggingFace (Free)", value: "HuggingFace", description: "Free models via HuggingFace Inference API" },
  { label: "OpenAI", value: "OpenAI", description: "GPT models (API key required)" },
  { label: "Anthropic Claude", value: "Anthropic", description: "Claude models (API key required)" },
  { label: "Perplexity", value: "Perplexity", description: "Perplexity AI models (API key required)" },
  { label: "Groq", value: "Groq", description: "Fast inference with Groq (API key required)" },
];

const traitDocs: Record<string, string> = {
  creativity: "How divergent and imaginative the expert is. Higher values mean bolder, more inventive ideas and unconventional approaches.",
  skepticism: "How much the expert questions assumptions and challenges points. Higher values means more critical thinking and analytical rigor.",
  optimism: "How positively the expert frames possibilities and outcomes. Higher values mean a focus on hope, opportunity, and constructive solutions.",
  provider: "Choose which AI model or service this expert uses for responses. Each provider has different strengths and characteristics.",
  apiKey: "Your personal API key for the selected provider. Leave blank to use free HuggingFace models. Keep your API keys secure and never share them.",
};

const ExpertCardList: React.FC<ExpertCardListProps> = ({
  experts,
  onTraitChange,
  onApiKeyChange,
  onProviderChange,
}) => (
  <TooltipProvider>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pr-4">
      {experts.map((expert) => (
        <Card key={expert.id} className="bg-slate-50/80 border-amber-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              {expert.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cognitive Traits */}
            <div className="space-y-3">
              <div>
                <Label className="flex items-center gap-2 text-sm">
                  Creativity
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">
                        <Info size={12} className="text-amber-500 hover:text-amber-600" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      {traitDocs.creativity}
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Slider
                  value={[expert.cognitive.creativity]}
                  min={0}
                  max={100}
                  onValueChange={([v]) => onTraitChange(expert.id, "creativity", v)}
                  className="mt-1"
                />
                <span className="text-xs text-slate-500">{expert.cognitive.creativity}%</span>
              </div>

              <div>
                <Label className="flex items-center gap-2 text-sm">
                  Skepticism
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">
                        <Info size={12} className="text-slate-500 hover:text-amber-600" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      {traitDocs.skepticism}
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Slider
                  value={[expert.cognitive.skepticism]}
                  min={0}
                  max={100}
                  onValueChange={([v]) => onTraitChange(expert.id, "skepticism", v)}
                  className="mt-1"
                />
                <span className="text-xs text-slate-500">{expert.cognitive.skepticism}%</span>
              </div>

              <div>
                <Label className="flex items-center gap-2 text-sm">
                  Optimism
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">
                        <Info size={12} className="text-rose-500 hover:text-amber-600" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      {traitDocs.optimism}
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Slider
                  value={[expert.cognitive.optimism]}
                  min={0}
                  max={100}
                  onValueChange={([v]) => onTraitChange(expert.id, "optimism", v)}
                  className="mt-1"
                />
                <span className="text-xs text-slate-500">{expert.cognitive.optimism}%</span>
              </div>
            </div>

            {/* AI Provider Selection */}
            <div>
              <Label className="flex items-center gap-2 text-sm">
                AI Provider
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      <Info size={12} className="text-blue-500 hover:text-amber-600" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    {traitDocs.provider}
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Select
                value={expert.provider || "HuggingFace"}
                onValueChange={(value) => onProviderChange(expert.id, value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select AI Provider" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERT_PROVIDERS.map((provider) => (
                    <SelectItem key={provider.value} value={provider.value}>
                      <div>
                        <div className="font-medium">{provider.label}</div>
                        <div className="text-xs text-slate-500">{provider.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* API Key Input */}
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
              <Input
                placeholder={expert.provider === "HuggingFace" ? "Not required for HuggingFace" : "Enter your API key"}
                type="password"
                value={expert.apiKey}
                onChange={(e) => onApiKeyChange(expert.id, e.target.value)}
                className="mt-1"
                autoComplete="off"
                disabled={expert.provider === "HuggingFace"}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </TooltipProvider>
);

export default ExpertCardList;
