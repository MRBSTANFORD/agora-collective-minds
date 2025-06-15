
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ArrowRight, AlertCircle, CheckCircle, Key } from 'lucide-react';
import { DiscussionConfigPanel, DiscussionConfig } from "@/components/DiscussionConfigPanel";

interface ChallengeInputSectionProps {
  challenge: string;
  setChallenge: (value: string) => void;
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
  // Calculate configuration status
  const expertsWithApiKeys = discussionConfig.experts.filter(e => e.apiKey && e.apiKey.trim() !== '').length;
  const totalExperts = discussionConfig.experts.length;
  const allUsingHuggingFace = discussionConfig.experts.every(e => e.provider === 'HuggingFace');

  return (
    <section className="relative">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-12 relative overflow-hidden">
        {/* Subtle Greek key pattern */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                alt="AGORA Logo" 
                className="w-12 h-12 object-contain mr-4 opacity-80"
              />
              <h3 className="text-3xl font-thin tracking-wider text-slate-800">
                Present Your Challenge
              </h3>
            </div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            <div>
              <label htmlFor="challenge-title" className="block text-sm font-medium text-slate-600 mb-3 tracking-wide uppercase">
                Challenge Proposition
              </label>
              <Input
                id="challenge-title"
                placeholder="e.g., Sustainable Urban Development in the Digital Age"
                className="w-full border-slate-200 focus:border-amber-400 focus:ring-amber-400/30 bg-white/80 font-light text-lg py-4"
              />
            </div>
            
            <div>
              <label htmlFor="challenge-description" className="block text-sm font-medium text-slate-600 mb-3 tracking-wide uppercase">
                Detailed Exposition
              </label>
              <Textarea
                id="challenge-description"
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="Illuminate your challenge with precision. What complexities seek resolution? What constraints must be honored? What vision guides your inquiry?"
                className="w-full h-40 border-slate-200 focus:border-amber-400 focus:ring-amber-400/30 bg-white/80 font-light text-base leading-relaxed"
              />
            </div>

            {/* Prominent Rounds Selector */}
            <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700 tracking-wide uppercase">
                    Discussion Rounds
                  </Label>
                  <p className="text-xs text-slate-500 mt-1">
                    Number of iterative exchanges between the experts
                  </p>
                </div>
                <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">
                  {rounds} rounds
                </Badge>
              </div>
              <Slider
                value={[rounds]}
                min={3}
                max={10}
                step={1}
                onValueChange={([value]) => onRoundsChange(value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>3 (Quick)</span>
                <span>5 (Balanced)</span>
                <span>10 (Deep)</span>
              </div>
            </div>

            {/* Enhanced Configuration Status & Advanced Settings */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${allUsingHuggingFace ? 'bg-green-500' : expertsWithApiKeys > 0 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {allUsingHuggingFace 
                        ? `Ready to Begin • ${totalExperts} Experts Using Free HuggingFace`
                        : `Configuration Active • ${expertsWithApiKeys}/${totalExperts} Experts with API Keys`
                      }
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Free tier ready</span>
                      </div>
                      {expertsWithApiKeys > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-slate-500">
                          <Key className="w-3 h-3 text-blue-600" />
                          <span>{expertsWithApiKeys} premium configured</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <DiscussionConfigPanel
                  initialConfig={discussionConfig}
                  onChange={onConfigChange}
                />
              </div>
              
              {!allUsingHuggingFace && expertsWithApiKeys < totalExperts && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <p className="text-xs text-blue-700">
                    💡 <strong>Mixed Configuration:</strong> {totalExperts - expertsWithApiKeys} experts will use free HuggingFace, 
                    {expertsWithApiKeys} will use premium APIs for enhanced responses.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center pt-4">
              <Button
                onClick={onStartDiscussion}
                className="px-12 py-4 text-lg font-light tracking-wider text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                disabled={!canStart}
              >
                {canStart ? 'Convene the Symposium' : 'Enter Your Challenge Above'}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </div>

            {!canStart && (
              <div className="flex items-center justify-center space-x-2 text-amber-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Please describe your challenge to begin the symposium</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeInputSection;
