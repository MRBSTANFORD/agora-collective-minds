import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    cognitive: { creativity: 70, skepticism: 85, optimism: 60 },
    apiKey: "",
  },
  {
    id: 'socrates',
    name: 'Socrates',
    cognitive: { creativity: 60, skepticism: 90, optimism: 55 },
    apiKey: "",
  },
  {
    id: 'hypatia',
    name: 'Hypatia of Alexandria',
    cognitive: { creativity: 75, skepticism: 70, optimism: 80 },
    apiKey: "",
  },
  {
    id: 'einstein',
    name: 'Albert Einstein',
    cognitive: { creativity: 100, skepticism: 60, optimism: 75 },
    apiKey: "",
  },
  {
    id: 'confucius',
    name: 'Confucius',
    cognitive: { creativity: 65, skepticism: 45, optimism: 85 },
    apiKey: "",
  },
  {
    id: 'lovelace',
    name: 'Ada Lovelace',
    cognitive: { creativity: 90, skepticism: 50, optimism: 90 },
    apiKey: "",
  },
  {
    id: 'machiavelli',
    name: 'Niccolò Machiavelli',
    cognitive: { creativity: 80, skepticism: 95, optimism: 40 },
    apiKey: "",
  }
];

const defaultApiKey = ""; // Leave empty = use HuggingFace

type ExpertConfig = typeof defaultExperts[0];

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

  const handleRounds = (value: number) => setRounds(value);

  const handleSave = () => {
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
      <DrawerContent className="max-w-2xl mx-auto p-6">
        <DrawerHeader>
          <DrawerTitle>Symposium Configuration</DrawerTitle>
          <DrawerDescription>
            Set number of rounds and configure experts' cognitive style and API keys.<br />
            (Leave API Key blank to use default free HuggingFace, or add your OpenAI/Perplexity/etc key)
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-8">
          <div>
            <Label htmlFor="rounds">Number of Rounds</Label>
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
          <div className="relative">
            {/* Scroll for expert list */}
            <ScrollArea className="max-h-[420px] md:max-h-[560px] rounded-lg border border-slate-100 pr-2">
              <ExpertCardList
                experts={experts}
                onTraitChange={handleTrait}
                onApiKeyChange={handleApiKey}
              />
            </ScrollArea>
          </div>
          <div className="flex w-full justify-end">
            <Button onClick={handleSave} className="bg-amber-600 text-white">
              Save Symposium Settings
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
