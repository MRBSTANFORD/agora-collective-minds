import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, MessageCircle, Settings } from 'lucide-react';
import { DiscussionConfig, DiscussionConfigPanel } from "@/components/DiscussionConfigPanel";

interface ChallengeInputSectionProps {
  challenge: string;
  setChallenge: (challenge: string) => void;
  rounds: number;
  onRoundsChange: (rounds: number) => void;
  discussionConfig: DiscussionConfig;
  onConfigChange: (config: DiscussionConfig) => void;
  onStartDiscussion: () => void;
  canStart: boolean;
}

const ChallengeInputSection: React.FC<ChallengeInputSectionProps> = ({
  challenge,
  setChallenge,
  rounds,
  onRoundsChange,
  discussionConfig,
  onConfigChange,
  onStartDiscussion,
  canStart
}) => {
  return (
    <section className="py-20" data-section="challenge-input">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Define Your Challenge
            </CardTitle>
            <CardDescription>
              Describe the strategic question you want history's greatest minds to solve
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="e.g., How can we increase customer retention while reducing acquisition costs?"
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              className="bg-slate-50 border-slate-200 focus-visible:ring-slate-500 text-slate-800"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-50 border-slate-200">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-sm font-medium text-slate-700">
                    <Users className="w-4 h-4 mr-2 inline-block align-middle" />
                    Expert Panel
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Configure the AI experts for your discussion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DiscussionConfigPanel 
                    config={discussionConfig}
                    onConfigChange={onConfigChange}
                  />
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border-slate-200">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-sm font-medium text-slate-700">
                    <MessageCircle className="w-4 h-4 mr-2 inline-block align-middle" />
                    Rounds of Discussion
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Set the depth of the conversation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <input
                      type="range"
                      min="3"
                      max="7"
                      value={rounds}
                      onChange={(e) => onRoundsChange(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <Badge className="ml-3 text-sm text-amber-700 bg-amber-50 border-amber-200">
                      {rounds} Rounds
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border-slate-200">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-sm font-medium text-slate-700">
                    <Settings className="w-4 h-4 mr-2 inline-block align-middle" />
                    Advanced Configuration
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Customize advanced parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    Coming Soon!
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={onStartDiscussion}
              disabled={!canStart}
              className="w-full bg-gradient-to-r from-slate-700 to-amber-600 hover:from-slate-800 hover:to-amber-700"
            >
              Start Discussion
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ChallengeInputSection;
