
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ExpertConfig = {
  id: string;
  name: string;
  cognitive: {
    creativity: number;
    skepticism: number;
    optimism: number;
  };
  apiKey: string;
};

type ExpertCardListProps = {
  experts: ExpertConfig[];
  onTraitChange: (id: string, trait: "creativity" | "skepticism" | "optimism", value: number) => void;
  onApiKeyChange: (id: string, value: string) => void;
};

const ExpertCardList: React.FC<ExpertCardListProps> = ({
  experts,
  onTraitChange,
  onApiKeyChange
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2 px-2">
    {experts.map((ex) => (
      <Card key={ex.id} className="mb-4 bg-slate-50 border-amber-100">
        <CardHeader>
          <CardTitle className="text-base font-medium">{ex.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <Label>Creativity</Label>
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
            <Label>Skepticism</Label>
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
            <Label>Optimism</Label>
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
            <Label>API Key</Label>
            <Input
              placeholder="Leave blank for HuggingFace"
              type="password"
              value={ex.apiKey}
              onChange={e => onApiKeyChange(ex.id, e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default ExpertCardList;
