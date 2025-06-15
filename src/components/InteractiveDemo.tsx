
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, Play, MessageCircle, Users, Clock } from 'lucide-react';

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      title: "Challenge Submission",
      description: "You present your strategic challenge to the AGORA",
      content: "How can we increase customer retention while reducing acquisition costs in a competitive SaaS market?"
    },
    {
      title: "Expert Analysis Begins",
      description: "8 AI-powered experts start analyzing your challenge",
      experts: ["Aristotle", "Leonardo da Vinci", "Steve Jobs", "Sun Tzu"]
    },
    {
      title: "Collaborative Discussion",
      description: "Experts engage in structured dialogue and debate",
      messages: [
        { expert: "Aristotle", text: "We must first understand the essence of customer value..." },
        { expert: "Jobs", text: "Focus on the user experience. What makes them stay?" },
        { expert: "Sun Tzu", text: "Know your competition, but master your strengths..." }
      ]
    },
    {
      title: "Synthesized Insights",
      description: "Collective wisdom distilled into actionable recommendations",
      insights: [
        "Implement value-based onboarding journey",
        "Create customer success milestone celebrations",
        "Develop predictive churn analysis system"
      ]
    }
  ];

  const handlePlayDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    // Auto-advance through steps
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50/20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-thin tracking-wider text-slate-800 mb-6">
            Experience AGORA in Action
          </h3>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto">
            See how historical wisdom meets modern challenges in this interactive demonstration
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Demo Control */}
          <div className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-3">
                  <Play className="w-6 h-6 text-amber-600" />
                  <span>Interactive Demo</span>
                </CardTitle>
                <CardDescription>
                  Experience the full AGORA process without API keys
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handlePlayDemo}
                  disabled={isPlaying}
                  className="w-full bg-gradient-to-r from-slate-700 to-amber-600 hover:from-slate-800 hover:to-amber-700"
                  size="lg"
                >
                  {isPlaying ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Demo in Progress...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start Demo Experience
                    </>
                  )}
                </Button>
                
                {isPlaying && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="text-sm text-slate-600">{currentStep + 1} of {demoSteps.length}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <Users className="w-8 h-8 text-amber-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">8 Expert Minds</div>
                <div className="text-xs text-slate-600">Diverse perspectives</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <MessageCircle className="w-8 h-8 text-slate-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">Structured Discussion</div>
                <div className="text-xs text-slate-600">Organized insights</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <Brain className="w-8 h-8 text-amber-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">Deep Analysis</div>
                <div className="text-xs text-slate-600">Multi-layered thinking</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <Lightbulb className="w-8 h-8 text-slate-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">Clear Actions</div>
                <div className="text-xs text-slate-600">Implementable steps</div>
              </div>
            </div>
          </div>

          {/* Demo Display */}
          <div>
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200 min-h-[400px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                    {isPlaying ? `Step ${currentStep + 1}` : 'Ready to Start'}
                  </Badge>
                  {isPlaying && (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!isPlaying ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-slate-600" />
                    </div>
                    <p className="text-slate-600 font-light">
                      Click "Start Demo Experience" to see AGORA in action
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-slate-800 mb-2">
                        {demoSteps[currentStep]?.title}
                      </h4>
                      <p className="text-slate-600 text-sm mb-4">
                        {demoSteps[currentStep]?.description}
                      </p>
                    </div>

                    {demoSteps[currentStep]?.content && (
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-slate-700 italic">
                          "{demoSteps[currentStep].content}"
                        </p>
                      </div>
                    )}

                    {demoSteps[currentStep]?.experts && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-700">Experts Engaged:</p>
                        <div className="flex flex-wrap gap-2">
                          {demoSteps[currentStep].experts.map((expert, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-amber-50 text-amber-700">
                              {expert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {demoSteps[currentStep]?.messages && (
                      <div className="space-y-3">
                        {demoSteps[currentStep].messages.map((msg, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-3 border border-slate-200">
                            <div className="font-medium text-slate-800 text-sm">{msg.expert}</div>
                            <div className="text-slate-600 text-sm">{msg.text}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {demoSteps[currentStep]?.insights && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-700">Key Recommendations:</p>
                        <div className="space-y-2">
                          {demoSteps[currentStep].insights.map((insight, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2"></div>
                              <span className="text-slate-700 text-sm">{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
