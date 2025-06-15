
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain, Lightbulb, Play, MessageCircle, Users, Clock, Pause, PlayCircle, RotateCcw, ArrowRight } from 'lucide-react';

interface InteractiveDemoProps {
  onTryChallenge?: (challenge: string) => void;
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ onTryChallenge }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [completedMessages, setCompletedMessages] = useState<any[]>([]);

  const demoChallenge = "How can we transition our traditional workforce to AI-augmented roles while maintaining operational efficiency and employee morale?";

  const experts = [
    { id: 'aristotle', name: 'Aristotle', image: '/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png', domain: 'Logic & Ethics' },
    { id: 'leonardo', name: 'Leonardo da Vinci', image: '/lovable-uploads/d1f7c4e9-a220-4971-a95f-c627572fd57f.png', domain: 'Innovation & Design' },
    { id: 'jobs', name: 'Steve Jobs', image: '/lovable-uploads/7fa67e56-1a42-4648-be84-9213f73f953c.png', domain: 'Vision & Strategy' },
    { id: 'sun-tzu', name: 'Sun Tzu', image: '/lovable-uploads/439f1d74-152a-43a7-9aac-9aa5efa8e31d.png', domain: 'Strategy & Tactics' }
  ];

  const rounds = [
    {
      title: "Round 1: Understanding the Challenge",
      messages: [
        { expert: 'aristotle', text: "We must first examine the essence of this transition. The challenge lies not merely in technology adoption, but in the fundamental relationship between human potential and artificial capability. What virtues must we cultivate to ensure this change serves human flourishing?" },
        { expert: 'leonardo', text: "I see this as a renaissance of human capability! Just as my flying machines required both mechanical precision and human imagination, AI augmentation demands we become artists of our own evolution. We must design workflows that amplify human creativity, not replace it." },
        { expert: 'jobs', text: "This isn't about technology—it's about people. The most important thing is to understand what your employees fear and what they aspire to become. We need to create a vision so compelling that resistance transforms into excitement." },
        { expert: 'sun-tzu', text: "Know your terrain before you advance. Map every role, every skill, every concern. The greatest victories come from transforming obstacles into advantages. Your workforce's current expertise is your strategic foundation." }
      ]
    },
    {
      title: "Round 2: Strategic Framework",
      messages: [
        { expert: 'aristotle', text: "A gradual approach honors both prudence and justice. Begin with those most willing to learn, creating exemplars that others may follow. This builds habits of excellence rather than forcing compliance." },
        { expert: 'leonardo', text: "Create experimental workshops! Let people play with AI tools in low-stakes environments. When people discover they can achieve things previously impossible, enthusiasm becomes contagious." },
        { expert: 'jobs', text: "Start with your best people, not your most resistant ones. Success breeds success. Show, don't tell. Let them experience the magic of human-AI collaboration firsthand." },
        { expert: 'sun-tzu', text: "Advance in phases: Reconnaissance (pilot programs), Positioning (skill development), and Engagement (full integration). Each phase builds strength for the next." }
      ]
    },
    {
      title: "Round 3: Implementation Tactics",
      messages: [
        { expert: 'aristotle', text: "Excellence is a habit, not an act. Establish mentorship pairs—those comfortable with AI supporting those who are learning. This builds community while developing capability." },
        { expert: 'leonardo', text: "Document everything! Create visual guides, success stories, and learning journeys. Make the invisible visible so others can follow the path to mastery." },
        { expert: 'jobs', text: "Focus on the experience, not the technology. Design onboarding that feels like discovery, not training. Every interaction should reinforce their growing capability and value." },
        { expert: 'sun-tzu', text: "Maintain operational readiness throughout transition. Never sacrifice today's mission for tomorrow's capability. Parallel systems until new competency is proven." }
      ]
    },
    {
      title: "Round 4: Addressing Resistance",
      messages: [
        { expert: 'aristotle', text: "Address fears through dialogue, not dismissal. Fear often masks deeper concerns about purpose and value. Show how AI amplifies human judgment rather than replacing it." },
        { expert: 'leonardo', text: "Transform skeptics into explorers! Give them the most interesting problems to solve with AI assistance. Curiosity overcomes resistance more effectively than mandates." },
        { expert: 'jobs', text: "Resistance often signals unmet needs. Listen deeply. Sometimes the strongest critics become your most powerful advocates once they feel heard and valued." },
        { expert: 'sun-tzu', text: "Convert opposition into alliance by addressing their concerns before they voice them. Anticipate objections and build solutions into your strategy." }
      ]
    },
    {
      title: "Round 5: Sustaining Success",
      messages: [
        { expert: 'aristotle', text: "True success creates a culture of continuous learning. Establish systems for ongoing skill development and ethical reflection as AI capabilities evolve." },
        { expert: 'leonardo', text: "Celebrate the marriage of human creativity and artificial capability! Create showcase events where teams demonstrate their enhanced abilities. Success should be visible and inspiring." },
        { expert: 'jobs', text: "Build this transformation into your company's story. Your people should feel they're part of something revolutionary, not just adapting to change." },
        { expert: 'sun-tzu', text: "Victory is not a destination but a discipline. Establish metrics, feedback loops, and adaptation mechanisms to maintain your strategic advantage as the landscape evolves." }
      ]
    }
  ];

  const keyInsights = [
    "Implement gradual transition with pilot programs and mentorship pairs",
    "Focus on human-AI collaboration rather than replacement",
    "Create compelling vision that transforms resistance into excitement",
    "Establish continuous learning culture with regular skill development",
    "Design experience-focused onboarding that feels like discovery"
  ];

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const currentRoundData = rounds[currentRound];
    if (!currentRoundData) return;

    const currentMsg = currentRoundData.messages[currentMessage];
    if (!currentMsg) {
      // Move to next round
      if (currentRound < rounds.length - 1) {
        setTimeout(() => {
          setCurrentRound(prev => prev + 1);
          setCurrentMessage(0);
          setTypingText('');
        }, 2000);
      } else {
        setIsPlaying(false);
      }
      return;
    }

    // Typing animation
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= currentMsg.text.length) {
        setTypingText(currentMsg.text.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCompletedMessages(prev => [...prev, { ...currentMsg, round: currentRound + 1 }]);
          setCurrentMessage(prev => prev + 1);
          setTypingText('');
        }, 1500);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [isPlaying, isPaused, currentRound, currentMessage]);

  const handlePlayDemo = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setCurrentRound(0);
    setCurrentMessage(0);
    setCompletedMessages([]);
    setTypingText('');
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentRound(0);
    setCurrentMessage(0);
    setCompletedMessages([]);
    setTypingText('');
  };

  const getCurrentExpert = () => {
    const currentRoundData = rounds[currentRound];
    if (!currentRoundData) return null;
    const currentMsg = currentRoundData.messages[currentMessage];
    if (!currentMsg) return null;
    return experts.find(e => e.id === currentMsg.expert);
  };

  const currentExpert = getCurrentExpert();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50/20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-thin tracking-wider text-slate-800 mb-6">
            Experience AGORA in Action
          </h3>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto">
            Watch how 8 historical minds collaborate to solve modern challenges
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Demo Control */}
          <div className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-3">
                  <Brain className="w-6 h-6 text-amber-600" />
                  <span>Live AI Symposium</span>
                </CardTitle>
                <CardDescription>
                  8 historical experts tackling a real business challenge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-slate-600 font-medium">Challenge:</div>
                  <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700 italic">
                    "{demoChallenge}"
                  </div>
                  
                  <div className="flex space-x-2">
                    {!isPlaying ? (
                      <Button 
                        onClick={handlePlayDemo}
                        className="flex-1 bg-gradient-to-r from-slate-700 to-amber-600 hover:from-slate-800 hover:to-amber-700"
                        size="lg"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Begin Symposium
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handlePause} variant="outline" size="lg">
                          {isPaused ? <PlayCircle className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                        </Button>
                        <Button onClick={handleReset} variant="outline" size="lg">
                          <RotateCcw className="w-5 h-5" />
                        </Button>
                      </>
                    )}
                  </div>
                  
                  {isPlaying && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Round {currentRound + 1} of {rounds.length}</span>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">
                          {rounds[currentRound]?.title}
                        </Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${((currentRound + 1) / rounds.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Expert Panel */}
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Active Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {experts.map((expert) => (
                    <div 
                      key={expert.id}
                      className={`flex items-center space-x-2 p-2 rounded-lg transition-all ${
                        currentExpert?.id === expert.id 
                          ? 'bg-amber-100 border border-amber-300 animate-pulse' 
                          : 'bg-slate-50'
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={expert.image} alt={expert.name} />
                        <AvatarFallback className="text-xs">{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-900 truncate">{expert.name}</p>
                        <p className="text-xs text-slate-600 truncate">{expert.domain}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Demo Display */}
          <div className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200 min-h-[500px]">
              <CardHeader>
                <CardTitle className="text-lg">Symposium Discussion</CardTitle>
                <CardDescription>Real-time expert dialogue</CardDescription>
              </CardHeader>
              <CardContent>
                {!isPlaying ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-slate-600" />
                    </div>
                    <p className="text-slate-600 font-light">
                      Click "Begin Symposium" to witness the convergence of timeless wisdom
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {completedMessages.map((msg, idx) => {
                      const expert = experts.find(e => e.id === msg.expert);
                      return (
                        <div key={idx} className="flex space-x-3">
                          <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                            <AvatarImage src={expert?.image} alt={expert?.name} />
                            <AvatarFallback className="text-xs">{expert?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="text-sm font-medium text-slate-900">{expert?.name}</p>
                              <Badge variant="outline" className="text-xs">Round {msg.round}</Badge>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-lg p-3">
                              <p className="text-sm text-slate-700">{msg.text}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {currentExpert && typingText && (
                      <div className="flex space-x-3">
                        <Avatar className="w-10 h-10 border-2 border-amber-300 shadow-sm">
                          <AvatarImage src={currentExpert.image} alt={currentExpert.name} />
                          <AvatarFallback className="text-xs">{currentExpert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-medium text-slate-900">{currentExpert.name}</p>
                            <Badge className="text-xs bg-amber-100 text-amber-700 animate-pulse">Speaking...</Badge>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-lg p-3">
                            <p className="text-sm text-slate-700">
                              {typingText}
                              <span className="animate-pulse">|</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Key Insights */}
            {currentRound >= rounds.length - 1 && !isPlaying && completedMessages.length > 0 && (
              <Card className="bg-gradient-to-br from-amber-50 to-slate-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    <span>Key Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {keyInsights.map((insight, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2"></div>
                        <span className="text-sm text-slate-700">{insight}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => onTryChallenge?.(demoChallenge)}
                    className="w-full bg-gradient-to-r from-slate-700 to-amber-600 hover:from-slate-800 hover:to-amber-700"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Try This Challenge in AGORA
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
