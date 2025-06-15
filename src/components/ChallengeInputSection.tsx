import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ArrowRight, AlertCircle, CheckCircle, Key, Sparkles } from 'lucide-react';
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

  const exampleChallenges = [
    "How can we create a sustainable business model for a food delivery startup that benefits restaurants, drivers, and customers equally?",
    "What's the most ethical approach to implementing AI in hiring processes while ensuring fairness and reducing bias?",
    "How should we balance remote work flexibility with team collaboration and company culture in a post-pandemic world?",
    "What innovation strategy should a traditional manufacturing company adopt to compete with tech-enabled startups?"
  ];

  const handleExampleClick = (example: string) => {
    setChallenge(example);
  };

  return (
    <section className="relative" data-section="challenge-input">
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
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4"></div>
            <p className="text-slate-600 font-light">
              Describe any complex challenge - from business strategy to ethical dilemmas to innovation problems
            </p>
          </div>

          {/* Quick Examples Section */}
          <div className="mb-8 bg-amber-50/50 rounded-xl p-6 border border-amber-200">
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-amber-600 mr-2" />
              <h4 className="text-sm font-medium text-slate-700 tracking-wide uppercase">Try These Examples</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {exampleChallenges.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-left p-3 bg-white/80 hover:bg-white border border-amber-200 hover:border-amber-300 rounded-lg transition-all duration-200 text-sm text-slate-600 hover:text-slate-800"
                >
                  "{example.slice(0, 80)}..."
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <label htmlFor="challenge-title" className="block text-sm font-medium text-slate-600 mb-3 tracking-wide uppercase">
                Challenge Title (Optional)
              </label>
              <Input
                id="challenge-title"
                placeholder="e.g., Sustainable Urban Development Strategy"
                className="w-full border-slate-200 focus:border-amber-400 focus:ring-amber-400/30 bg-white/80 font-light text-lg py-4"
              />
            </div>
            
            <div>
              <label htmlFor="challenge-description" className="block text-sm font-medium text-slate-600 mb-3 tracking-wide uppercase">
                Detailed Challenge Description
              </label>
              <Textarea
                id="challenge-description"
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="Describe your challenge in detail. What are you trying to solve? What constraints do you face? What outcomes are you hoping for? The more context you provide, the better the discussion will be."
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
                    More rounds = deeper analysis and more refined solutions
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
                <span>3 (Quick insights)</span>
                <span>5 (Balanced depth)</span>
                <span>10 (Comprehensive analysis)</span>
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
                        ? `Ready to Begin • All ${totalExperts} Experts Using Free AI Models`
                        : `Configuration Active • ${expertsWithApiKeys}/${totalExperts} Experts with Premium APIs`
                      }
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Free tier ready - no API keys needed</span>
                      </div>
                      {expertsWithApiKeys > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-slate-500">
                          <Key className="w-3 h-3 text-blue-600" />
                          <span>{expertsWithApiKeys} premium models configured</span>
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
                    💡 <strong>Hybrid Setup:</strong> {totalExperts - expertsWithApiKeys} experts using free models, 
                    {expertsWithApiKeys} using premium APIs for enhanced responses.
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
                {canStart ? 'Start the Discussion' : 'Enter Your Challenge Above'}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </div>

            {!canStart && (
              <div className="flex items-center justify-center space-x-2 text-amber-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Please describe your challenge to begin the discussion</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeInputSection;
