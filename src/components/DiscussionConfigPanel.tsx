import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings } from "lucide-react";
import ExpertCardList, { ExpertConfig } from "./ExpertCardList";

const defaultExperts = [
  {
    id: 'leonardo',
    name: 'Leonardo da Vinci',
    cognitive: { creativity: 95, skepticism: 40, optimism: 85 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    cognitive: { creativity: 70, skepticism: 85, optimism: 60 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'socrates',
    name: 'Socrates',
    cognitive: { creativity: 60, skepticism: 90, optimism: 55 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'hypatia',
    name: 'Hypatia of Alexandria',
    cognitive: { creativity: 75, skepticism: 70, optimism: 80 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'einstein',
    name: 'Albert Einstein',
    cognitive: { creativity: 100, skepticism: 60, optimism: 75 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'confucius',
    name: 'Confucius',
    cognitive: { creativity: 65, skepticism: 45, optimism: 85 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'lovelace',
    name: 'Ada Lovelace',
    cognitive: { creativity: 90, skepticism: 50, optimism: 90 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'machiavelli',
    name: 'Niccolò Machiavelli',
    cognitive: { creativity: 80, skepticism: 95, optimism: 40 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  }
];

export interface DiscussionConfig {
  rounds: number;
  experts: ExpertConfig[];
}

export function DiscussionConfigPanel({
  onChange,
  initialConfig
}: {
  onChange: (config: DiscussionConfig) => void;
  initialConfig?: DiscussionConfig;
}) {
  const [rounds, setRounds] = useState<number>(initialConfig?.rounds || 5);
  const [experts, setExperts] = useState<ExpertConfig[]>(initialConfig?.experts || defaultExperts);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTrait = (id: string, trait: "creativity" | "skepticism" | "optimism", value: number) => {
    setExperts((current) =>
      current.map((expert) =>
        expert.id === id
          ? { ...expert, cognitive: { ...expert.cognitive, [trait]: value } }
          : expert
      )
    );
  };

  const handleApiKey = (id: string, value: string) => {
    setExperts((current) =>
      current.map((expert) =>
        expert.id === id
          ? { ...expert, apiKey: value }
          : expert
      )
    );
  };

  const handleProvider = (id: string, value: string) => {
    setExperts((current) =>
      current.map((expert) =>
        expert.id === id
          ? { ...expert, provider: value }
          : expert
      )
    );
  };

  const handleModel = (id: string, value: string) => {
    setExperts((current) =>
      current.map((expert) =>
        expert.id === id
          ? { ...expert, model: value }
          : expert
      )
    );
  };

  const handleRounds = (value: number) => setRounds(value);

  const handleSave = () => {
    console.log('💾 Saving symposium configuration:', {
      rounds,
      experts: experts.map(e => ({
        id: e.id,
        name: e.name,
        provider: e.provider,
        hasApiKey: !!e.apiKey
      }))
    });
    
    onChange({
      rounds,
      experts,
    });
    setDrawerOpen(false);
  };

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="flex items-center text-slate-700 gap-2">
          <Settings className="w-4 h-4" />
          Symposium Settings
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-4xl mx-auto h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Symposium Configuration</DrawerTitle>
          <DrawerDescription>
            Configure the discussion rounds and each expert's cognitive profile, AI provider, and API credentials.<br />
            <span className="text-blue-600">🔑 BYOK (Bring Your Own Key): Test any LLM model with your own API keys for maximum flexibility and privacy.</span><br />
            <span className="text-green-600">💡 LLM7.io (default) works WITHOUT API key - start discussions immediately! Get a token at token.llm7.io for higher limits.</span>
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {/* Rounds Configuration */}
              <Card className="border-amber-100">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800">Discussion Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="rounds">Number of Rounds (3-10)</Label>
                    <Slider
                      value={[rounds]}
                      min={3}
                      max={10}
                      step={1}
                      onValueChange={([v]) => handleRounds(v)}
                      className="mt-2 w-full"
                    />
                    <span className="ml-2 text-sm font-light text-slate-600">{rounds} discussion rounds</span>
                  </div>
                </CardContent>
              </Card>

              {/* Expert Configuration */}
              <Card className="border-amber-100">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800">Expert Configuration</CardTitle>
                  <CardDescription>
                    Customize each expert's cognitive traits and AI provider settings with BYOK approach.<br />
                    <strong className="text-blue-600">🔑 Test different models from OpenAI, Anthropic, Google Gemini, and more!</strong><br />
                    <strong className="text-green-600">💡 LLM7.io is the default - works WITHOUT API key for instant access!</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpertCardList
                    experts={experts}
                    onTraitChange={handleTrait}
                    onApiKeyChange={handleApiKey}
                    onProviderChange={handleProvider}
                    onModelChange={handleModel}
                  />
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex w-full justify-end pt-4 pb-6">
                <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700 text-white px-8">
                  Save Symposium Settings
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
