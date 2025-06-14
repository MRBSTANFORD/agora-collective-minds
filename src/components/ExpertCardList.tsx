
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  { label: "HuggingFace (Free)", value: "HuggingFace" },
  { label: "OpenAI (API Key Required)", value: "OpenAI" },
  { label: "Perplexity (API Key Required)", value: "Perplexity" },
];

const traitDocs: Record<string, string> = {
  creativity: "How divergent and imaginative the expert is. Higher values mean bolder, more inventive ideas.",
  skepticism: "How much the expert questions assumptions and challenges points. Higher values means more critical thinking.",
  optimism: "How positively the expert frames possibilities and outcomes. Higher values mean a focus on hope and opportunity.",
  provider: "Choose which AI model or service this expert uses for answers. OpenAI & Perplexity require your own API key.",
  apiKey: "Insert your personal API key for the selected provider (leave blank for free HuggingFace). Never share your private API key with others.",
};

const ExpertCardList: React.FC<ExpertCardListProps> = ({
  experts,
  onTraitChange,
  onApiKeyChange,
  onProviderChange,
}) => (
  <TooltipProvider>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2 px-2">
      {experts.map((ex) => (
        <Card key={ex.id} className="mb-4 bg-slate-50 border-amber-100">
          <CardHeader>
            <CardTitle className="text-base font-medium">{ex.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <Label className="flex items-center gap-2">
                Creativity
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      <Info size={14} className="text-amber-400 hover:text-amber-600" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">{traitDocs.creativity}</TooltipContent>
                </Tooltip>
              </Label>
              <Slider
                value={[ex.cognitive.creativity]}
                min={0}
                max={100}
                onValueChange={([v]) => onTraitChange(ex.id, "creativity", v)}
                className="mt-1"
              />
              <span className="text-xs text-slate-500 ml-2">{ex.cognitive.creativity}%</span>
            </div>
            <div className="mb-2">
              <Label className="flex items-center gap-2">
                Skepticism
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      <Info size={14} className="text-slate-400 hover:text-amber-600" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">{traitDocs.skepticism}</TooltipContent>
                </Tooltip>
              </Label>
              <Slider
                value={[ex.cognitive.skepticism]}
                min={0}
                max={100}
                onValueChange={([v]) => onTraitChange(ex.id, "skepticism", v)}
                className="mt-1"
              />
              <span className="text-xs text-slate-500 ml-2">{ex.cognitive.skepticism}%</span>
            </div>
            <div className="mb-2">
              <Label className="flex items-center gap-2">
                Optimism
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      <Info size={14} className="text-rose-400 hover:text-amber-600" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">{traitDocs.optimism}</TooltipContent>
                </Tooltip>
              </Label>
              <Slider
                value={[ex.cognitive.optimism]}
                min={0}
                max={100}
                onValueChange={([v]) => onTraitChange(ex.id, "optimism", v)}
                className="mt-1"
              />
              <span className="text-xs text-slate-500 ml-2">{ex.cognitive.optimism}%</span>
            </div>
            <div className="mt-2">
              <Label className="flex items-center gap-2">
                Provider
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      <Info size={14} className="text-blue-400 hover:text-amber-600" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">{traitDocs.provider}</TooltipContent>
                </Tooltip>
              </Label>
              <select
                className="mt-1 w-full border rounded px-2 py-1 bg-white text-slate-700"
                value={ex.provider || "HuggingFace"}
                onChange={e => onProviderChange(ex.id, e.target.value)}
              >
                {EXPERT_PROVIDERS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <Label className="flex items-center gap-2">
                API Key
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      <Info size={14} className="text-slate-400 hover:text-amber-600" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">{traitDocs.apiKey}</TooltipContent>
                </Tooltip>
              </Label>
              <Input
                placeholder="Leave blank for HuggingFace"
                type="password"
                value={ex.apiKey}
                onChange={e => onApiKeyChange(ex.id, e.target.value)}
                className="mt-1"
                autoComplete="off"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </TooltipProvider>
);

export default ExpertCardList;
