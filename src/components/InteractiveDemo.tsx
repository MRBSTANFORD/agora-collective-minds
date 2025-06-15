
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Brain, Lightbulb, Play, MessageCircle, Users, Clock, ArrowRight } from 'lucide-react';

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoChallenge = "How can we preserve human agency and critical thinking in an age of increasingly sophisticated AI, while still harnessing AI's potential to solve complex global challenges?";

  const experts = [
    { id: 'leonardo', name: 'Leonardo da Vinci', initial: 'L', color: 'bg-amber-500' },
    { id: 'curie', name: 'Marie Curie', initial: 'M', color: 'bg-blue-500' },
    { id: 'socrates', name: 'Socrates', initial: 'S', color: 'bg-purple-500' },
    { id: 'hypatia', name: 'Hypatia', initial: 'H', color: 'bg-green-500' },
    { id: 'einstein', name: 'Einstein', initial: 'E', color: 'bg-indigo-500' },
    { id: 'confucius', name: 'Confucius', initial: 'C', color: 'bg-orange-500' },
    { id: 'lovelace', name: 'Ada Lovelace', initial: 'A', color: 'bg-pink-500' },
    { id: 'machiavelli', name: 'Machiavelli', initial: 'N', color: 'bg-slate-600' }
  ];

  const demoSteps = [
    {
      title: "Challenge Submission",
      description: "Present your complex challenge to the AGORA council",
      content: demoChallenge,
      type: "challenge"
    },
    {
      title: "Round 1: Initial Perspectives",
      description: "Each expert offers their foundational viewpoint",
      type: "discussion",
      messages: [
        { 
          expert: "Leonardo da Vinci", 
          avatar: "L", 
          color: "bg-amber-500",
          text: "Like my anatomical studies revealed hidden connections in the human form, we must examine the intricate relationship between human creativity and artificial capability. The key lies not in opposition, but in understanding how these forces can flow together like tributaries forming a mighty river." 
        },
        { 
          expert: "Marie Curie", 
          avatar: "M", 
          color: "bg-blue-500",
          text: "My research with radioactive elements taught me that invisible forces can be both transformative and dangerous. We must apply rigorous methodology to measure AI's impact on human cognition, establishing clear protocols for preserving independent thinking while leveraging computational power." 
        },
        { 
          expert: "Socrates", 
          avatar: "S", 
          color: "bg-purple-500",
          text: "But do we truly understand what we mean by 'human agency'? Before we can preserve it, we must examine: What distinguishes human judgment from artificial computation? Can we be certain that our thinking is genuinely 'critical' or merely the product of our own unconscious patterns?" 
        }
      ]
    },
    {
      title: "Round 2: Deeper Analysis",
      description: "Experts build on each other's insights",
      type: "discussion",
      messages: [
        { 
          expert: "Hypatia", 
          avatar: "H", 
          color: "bg-green-500",
          text: "Building on Socrates' questioning, my work in mathematics shows us that true understanding comes through geometric proof and logical progression. We must create educational frameworks that teach humans to think alongside AI, not in competition with it." 
        },
        { 
          expert: "Einstein", 
          avatar: "E", 
          color: "bg-indigo-500",
          text: "Imagine a thought experiment: What if human creativity and AI capability exist in a state of complementarity, like wave and particle? The uncertainty principle suggests we cannot perfectly measure both human autonomy and AI efficiency simultaneously—we must choose our observation carefully." 
        },
        { 
          expert: "Confucius", 
          avatar: "C", 
          color: "bg-orange-500",
          text: "The superior person understands that technology, like governance, must serve human flourishing. We must cultivate wisdom (zhi) and benevolence (ren) in how we deploy AI, ensuring it strengthens rather than weakens the bonds between people and their capacity for moral reasoning." 
        }
      ]
    },
    {
      title: "Round 3: Practical Solutions",
      description: "Moving from analysis to actionable approaches",
      type: "discussion",
      messages: [
        { 
          expert: "Ada Lovelace", 
          avatar: "A", 
          color: "bg-pink-500",
          text: "My algorithms for Babbage's Engine revealed that machines excel at symbol manipulation but lack poetical science—the ability to weave together disparate concepts with intuitive leaps. We should design AI systems that explicitly preserve spaces for human imagination and serendipitous discovery." 
        },
        { 
          expert: "Machiavelli", 
          avatar: "N", 
          color: "bg-slate-600",
          text: "Reality demands we acknowledge that those who control AI will shape human agency. We must establish governance structures that prevent any single entity from monopolizing these tools, ensuring distributed access while maintaining accountability for their use." 
        },
        { 
          expert: "Leonardo da Vinci", 
          avatar: "L", 
          color: "bg-amber-500",
          text: "As my flying machine required understanding both bird anatomy and mechanical principles, our solution needs bio-digital literacy—teaching humans to understand AI's capabilities while strengthening uniquely human faculties like empathy, artistic vision, and ethical reasoning." 
        }
      ]
    },
    {
      title: "Round 4: Integration & Synthesis",
      description: "Weaving together diverse perspectives",
      type: "discussion", 
      messages: [
        { 
          expert: "Marie Curie", 
          avatar: "M", 
          color: "bg-blue-500",
          text: "Like isolating radium required both patience and precision, preserving human agency demands careful calibration. We need measurement frameworks to assess when AI enhances versus replaces human judgment, with clear thresholds for intervention." 
        },
        { 
          expert: "Socrates", 
          avatar: "S", 
          color: "bg-purple-500",
          text: "Perhaps our greatest insight is recognizing the limits of our knowledge. An AI-human partnership built on humility—where both acknowledge their boundaries—might preserve the essential human capacity for wonder and self-examination." 
        }
      ]
    },
    {
      title: "Round 5: Unified Recommendations",
      description: "Collective wisdom distilled into clear actions",
      type: "synthesis",
      insights: [
        "Develop 'Bio-Digital Literacy' curricula that teach humans to work symbiotically with AI while strengthening uniquely human capabilities",
        "Establish governance frameworks preventing AI monopolization and ensuring distributed access with accountability",
        "Create 'Human Agency Preserves'—domains explicitly protected for human-only decision making in critical areas",
        "Implement measurement protocols to assess AI's impact on human cognitive independence and intervene when thresholds are crossed",
        "Design AI systems with built-in 'imagination spaces' that require human creativity and ethical reasoning to complete complex tasks"
      ]
    }
  ];

  const handlePlayDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50/20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
              alt="AGORA Logo" 
              className="w-12 h-12 object-contain mr-4 opacity-80"
            />
            <h3 className="text-4xl font-thin tracking-wider text-slate-800">
              Experience AGORA in Action
            </h3>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto">
            Watch how our 8 historical minds tackle a modern challenge about AI and human agency
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
                  Experience a complete AGORA discussion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  <div>
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

                {/* Expert Avatars */}
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">The 8 Historical Minds</p>
                  <div className="grid grid-cols-4 gap-3">
                    {experts.map((expert) => (
                      <div key={expert.id} className="flex flex-col items-center space-y-1">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={`${expert.color} text-white text-xs font-medium`}>
                            {expert.initial}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-slate-600 text-center leading-tight">{expert.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <Users className="w-8 h-8 text-amber-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">8 Expert Minds</div>
                <div className="text-xs text-slate-600">Historical perspectives</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <MessageCircle className="w-8 h-8 text-slate-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">5 Discussion Rounds</div>
                <div className="text-xs text-slate-600">Deep exploration</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <Brain className="w-8 h-8 text-amber-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">Complex Analysis</div>
                <div className="text-xs text-slate-600">Multi-layered thinking</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <Lightbulb className="w-8 h-8 text-slate-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">Actionable Insights</div>
                <div className="text-xs text-slate-600">Practical solutions</div>
              </div>
            </div>
          </div>

          {/* Demo Display */}
          <div>
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200 min-h-[500px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                    {isPlaying ? demoSteps[currentStep]?.title : 'Ready to Start'}
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
                    <p className="text-slate-600 font-light mb-4">
                      Click "Start Demo Experience" to see AGORA in action
                    </p>
                    <p className="text-sm text-slate-500">
                      Featuring the actual 8 experts from our platform
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <p className="text-slate-600 text-sm mb-4">
                        {demoSteps[currentStep]?.description}
                      </p>
                    </div>

                    {demoSteps[currentStep]?.content && (
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-slate-700 italic text-sm leading-relaxed">
                          "{demoSteps[currentStep].content}"
                        </p>
                      </div>
                    )}

                    {demoSteps[currentStep]?.messages && (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {demoSteps[currentStep].messages.map((msg, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
                            <div className="flex items-center space-x-2 mb-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className={`${msg.color} text-white text-xs`}>
                                  {msg.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-slate-800 text-sm">{msg.expert}</span>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">{msg.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {demoSteps[currentStep]?.insights && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-slate-700">Synthesized Recommendations:</p>
                        <div className="space-y-2">
                          {demoSteps[currentStep].insights.map((insight, idx) => (
                            <div key={idx} className="flex items-start space-x-2 bg-amber-50 rounded-lg p-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                              <span className="text-slate-700 text-sm leading-relaxed">{insight}</span>
                            </div>
                          ))}
                        </div>
                        
                        {currentStep === demoSteps.length - 1 && (
                          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-slate-50 rounded-lg border border-amber-200">
                            <div className="text-center">
                              <p className="text-sm text-slate-600 mb-3">Ready to explore your own challenge?</p>
                              <Button 
                                className="bg-gradient-to-r from-slate-700 to-amber-600 hover:from-slate-800 hover:to-amber-700 text-white"
                                onClick={() => {
                                  // Scroll to challenge input section
                                  const challengeSection = document.querySelector('[data-section="challenge-input"]');
                                  if (challengeSection) {
                                    challengeSection.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }}
                              >
                                Try AGORA Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        )}
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
