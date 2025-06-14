import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Pause, RotateCcw, MessageCircle, Clock, Users, Loader2, FastForward, Rewind, BookmarkPlus, Share2, BarChart3, AlertCircle } from 'lucide-react';
import { DiscussionOrchestrator, DiscussionMessage } from '@/services/aiOrchestrator';
import { useToast } from "@/hooks/use-toast";

const DiscussionInterface = ({
  challenge,
  discussionConfig,
}: {
  challenge: string;
  discussionConfig?: import('./DiscussionConfigPanel').DiscussionConfig;
}) => {
  const { toast } = useToast();
  const config = discussionConfig;
  const [maxRounds, setMaxRounds] = useState(config?.rounds || 5);
  const [orchestrator, setOrchestrator] = useState<DiscussionOrchestrator | null>(null);
  const [discussionSpeed, setDiscussionSpeed] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize orchestrator when config changes
  useEffect(() => {
    console.log('DiscussionInterface: Config or challenge changed', { 
      hasConfig: !!config, 
      hasExperts: !!config?.experts, 
      expertsCount: config?.experts?.length,
      challenge: challenge?.slice(0, 50),
      rounds: config?.rounds 
    });
    
    setMaxRounds(config?.rounds || 5);
    
    if (config?.experts && challenge?.trim()) {
      console.log('Creating new orchestrator with experts:', config.experts.map(e => e.name));
      const newOrchestrator = new DiscussionOrchestrator(config.experts, challenge, config.rounds || 5);
      setOrchestrator(newOrchestrator);
    } else {
      console.log('Cannot create orchestrator - missing config or challenge');
      setOrchestrator(null);
    }
  }, [config?.rounds, config?.experts, challenge]);

  const [isRunning, setIsRunning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);
  const [typingMessage, setTypingMessage] = useState<string>('');
  const [roundProgress, setRoundProgress] = useState<number[]>([]);
  const [hasError, setHasError] = useState(false);

  // Enhanced expert data with historical images
  const experts = [
    { 
      id: 'leonardo', 
      name: 'Leonardo da Vinci', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg',
      domain: 'Renaissance Polymath',
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      participation: 0
    },
    { 
      id: 'curie', 
      name: 'Marie Curie', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg',
      domain: 'Physics & Chemistry',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      participation: 0
    },
    { 
      id: 'socrates', 
      name: 'Socrates', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg',
      domain: 'Classical Philosophy',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      participation: 0
    },
    { 
      id: 'hypatia', 
      name: 'Hypatia of Alexandria', 
      image: '/lovable-uploads/7fa67e56-1a42-4648-be84-9213f73f953c.png',
      domain: 'Mathematics & Astronomy',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      participation: 0
    },
    { 
      id: 'einstein', 
      name: 'Albert Einstein', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      domain: 'Theoretical Physics',
      color: 'bg-violet-100 text-violet-700 border-violet-200',
      participation: 0
    },
    { 
      id: 'confucius', 
      name: 'Confucius', 
      image: '/lovable-uploads/439f1d74-152a-43a7-9aac-9aa5efa8e31d.png',
      domain: 'Ethics & Governance',
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      participation: 0
    },
    { 
      id: 'lovelace', 
      name: 'Ada Lovelace', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg',
      domain: 'Computing & Mathematics',
      color: 'bg-pink-100 text-pink-700 border-pink-200',
      participation: 0
    },
    { 
      id: 'machiavelli', 
      name: 'Niccolò Machiavelli', 
      image: '/lovable-uploads/d1f7c4e9-a220-4971-a95f-c627572fd57f.png',
      domain: 'Political Philosophy',
      color: 'bg-red-100 text-red-700 border-red-200',
      participation: 0
    }
  ];

  const startDiscussion = async () => {
    console.log('Starting discussion...', { hasOrchestrator: !!orchestrator, challenge: challenge?.slice(0, 50) });
    
    if (!orchestrator) {
      console.error('No orchestrator available - cannot start discussion');
      toast({
        title: "Cannot Start Discussion",
        description: "Please configure experts and enter a challenge first.",
        variant: "destructive",
      });
      return;
    }

    if (!challenge?.trim()) {
      console.error('No challenge provided');
      toast({
        title: "Cannot Start Discussion", 
        description: "Please enter a challenge to discuss.",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setCurrentRound(0);
    setMessages([]);
    setProgress(0);
    setRoundProgress(Array(maxRounds).fill(0));
    setHasError(false);
    
    toast({
      title: "Discussion Started",
      description: "The symposium has begun. The experts are gathering their thoughts...",
    });
    
    await generateNextRound();
  };

  const generateNextRound = async () => {
    if (!orchestrator || !isRunning) {
      console.log('Cannot generate next round - orchestrator missing or not running');
      return;
    }

    console.log('Generating next round...');
    setIsGenerating(true);
    
    try {
      const roundMessages = await orchestrator.generateRound();
      console.log('Round messages generated:', roundMessages.length);
      
      if (roundMessages.length === 0) {
        console.error('No messages generated for this round');
        setHasError(true);
        toast({
          title: "Discussion Issue",
          description: "No responses were generated this round. The discussion may have encountered issues.",
          variant: "destructive",
        });
        setIsRunning(false);
        setIsGenerating(false);
        return;
      }
      
      // Add messages one by one with typing effect
      for (let i = 0; i < roundMessages.length; i++) {
        const message = roundMessages[i];
        setCurrentSpeaker(message.speaker);
        
        // Typing effect
        await simulateTyping(message.content);
        
        setMessages(prev => [...prev, message]);
        setCurrentSpeaker(null);
        setTypingMessage('');
        
        // Update participation stats
        updateParticipation(message.speaker);
        
        // Delay between experts (adjusted by speed)
        await new Promise(resolve => setTimeout(resolve, 1000 / discussionSpeed));
      }

      const newRound = orchestrator.getCurrentRound();
      setCurrentRound(newRound);
      setProgress((newRound / maxRounds) * 100);
      
      // Update round progress
      setRoundProgress(prev => {
        const updated = [...prev];
        updated[newRound - 1] = 100;
        return updated;
      });

      // Continue to next round if not complete
      if (!orchestrator.isComplete() && isRunning) {
        setTimeout(() => generateNextRound(), 2000 / discussionSpeed);
      } else {
        setIsRunning(false);
        setIsGenerating(false);
        if (orchestrator.isComplete()) {
          toast({
            title: "Discussion Complete",
            description: "The symposium has concluded. All rounds have been completed.",
          });
        }
      }
    } catch (error) {
      console.error('Error generating round:', error);
      setHasError(true);
      setIsRunning(false);
      setIsGenerating(false);
      toast({
        title: "Discussion Error",
        description: "An error occurred during the discussion. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsGenerating(false);
  };

  const simulateTyping = async (text: string) => {
    const words = text.split(' ');
    const typingSpeed = 50 / discussionSpeed; // ms per word, adjusted by speed
    
    for (let i = 0; i <= words.length; i++) {
      setTypingMessage(words.slice(0, i).join(' '));
      await new Promise(resolve => setTimeout(resolve, typingSpeed));
    }
  };

  const updateParticipation = (expertId: string) => {
    console.log(`${expertId} participated in discussion`);
  };

  const pauseDiscussion = () => {
    setIsRunning(false);
    setIsGenerating(false);
    setCurrentSpeaker(null);
    setTypingMessage('');
  };

  const resetDiscussion = () => {
    setIsRunning(false);
    setIsGenerating(false);
    setCurrentRound(0);
    setProgress(0);
    setMessages([]);
    setCurrentSpeaker(null);
    setTypingMessage('');
    setRoundProgress(Array(maxRounds).fill(0));
    setHasError(false);
    if (config?.experts && challenge?.trim()) {
      setOrchestrator(new DiscussionOrchestrator(config.experts, challenge, config.rounds || 5));
    }
  };

  const adjustSpeed = (speed: number) => {
    setDiscussionSpeed(speed);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessage]);

  const getExpertInfo = (expertId: string) => {
    return experts.find(e => e.id === expertId);
  };

  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    return timestamp.toLocaleTimeString();
  };

  return (
    <div className="space-y-8 py-8">
      {/* Enhanced Header */}
      <Card className="bg-gradient-to-r from-slate-50 to-amber-50/30 border-amber-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                alt="AGORA Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <CardTitle className="text-2xl font-thin tracking-wide text-slate-800">
                  Active Symposium
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {experts.length} immortal minds • {maxRounds} rounds of discourse
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Round {currentRound} of {maxRounds}
              </Badge>
              {(isRunning || isGenerating) && (
                <Badge className="bg-green-100 text-green-700 animate-pulse border-green-200">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Discussion Active
                </Badge>
              )}
              {hasError && (
                <Badge variant="destructive" className="animate-pulse">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Issues Detected
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/80 rounded-lg p-4 border border-amber-100">
            <h3 className="font-medium text-slate-800 mb-2">Challenge Under Discussion:</h3>
            <p className="text-slate-700 leading-relaxed">{challenge || "No challenge specified yet"}</p>
          </div>

          {/* Show initialization status */}
          {!orchestrator && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Discussion Not Ready</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                Please configure experts and enter a challenge to begin the symposium.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {/* Enhanced Progress Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Symposium Progress</span>
                <span className="text-sm text-slate-500">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-3 bg-slate-200" />
              
              {/* Round by round progress */}
              <div className="flex gap-2 mt-3">
                {Array.from({ length: maxRounds }, (_, i) => (
                  <div key={i} className="flex-1">
                    <div className="text-xs text-slate-500 mb-1">R{i + 1}</div>
                    <Progress 
                      value={roundProgress[i] || 0} 
                      className="h-2 bg-slate-100"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Controls */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                {!isRunning ? (
                  <Button 
                    onClick={startDiscussion} 
                    className="bg-slate-700 hover:bg-slate-800 text-white"
                    disabled={!orchestrator || !challenge?.trim()}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Begin Symposium
                  </Button>
                ) : (
                  <Button onClick={pauseDiscussion} variant="outline" className="border-slate-300">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Discussion
                  </Button>
                )}
                <Button onClick={resetDiscussion} variant="outline" className="border-slate-300">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Speed Controls */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">Speed:</span>
                <div className="flex space-x-1">
                  {[0.5, 1, 2].map(speed => (
                    <Button
                      key={speed}
                      onClick={() => adjustSpeed(speed)}
                      variant={discussionSpeed === speed ? "default" : "outline"}
                      size="sm"
                      className="px-3 py-1 text-xs"
                    >
                      {speed}x
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Discussion Panel */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Enhanced Experts Panel */}
        <Card className="lg:col-span-1 border-amber-100">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Active Participants
            </CardTitle>
            <CardDescription>The assembled minds of history</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-3">
                {experts.map((expert) => (
                  <div 
                    key={expert.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 border ${
                      currentSpeaker === expert.id 
                        ? `${expert.color} shadow-md scale-105 animate-pulse` 
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                      <AvatarImage src={expert.image} alt={expert.name} />
                      <AvatarFallback className="text-xs">{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {expert.name}
                      </p>
                      <p className="text-xs text-slate-600 truncate">
                        {expert.domain}
                      </p>
                      {currentSpeaker === expert.id && (
                        <div className="flex items-center mt-1">
                          <Loader2 className="w-3 h-3 animate-spin text-green-600 mr-2" />
                          <span className="text-xs text-green-600 font-medium">Contemplating...</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Enhanced Messages Panel */}
        <Card className="lg:col-span-3 border-amber-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-slate-800">Symposium Discourse</CardTitle>
                <CardDescription>Real-time dialogue among the immortal minds</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-slate-600">
                  <BookmarkPlus className="w-4 h-4 mr-1" />
                  Bookmark
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-600">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-600">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Analytics
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] px-6">
              {messages.length === 0 && !currentSpeaker ? (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <div className="text-center py-16">
                    <MessageCircle className="w-16 h-16 mx-auto mb-6 text-slate-300" />
                    <p className="text-lg font-light">Begin the symposium to witness</p>
                    <p className="text-lg font-light">the convergence of timeless wisdom</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 py-6">
                  {messages.map((message, index) => {
                    const expert = getExpertInfo(message.speaker);
                    return (
                      <div key={index} className="flex space-x-4 animate-fade-in">
                        <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                          <AvatarImage src={expert?.image} alt={expert?.name} />
                          <AvatarFallback className="text-sm">{expert?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <p className="text-sm font-medium text-slate-900">{expert?.name}</p>
                            <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">
                              Round {message.round}
                            </Badge>
                            <span className="text-xs text-slate-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {getRelativeTime(message.timestamp)}
                            </span>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-sm text-slate-700 leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Typing indicator */}
                  {currentSpeaker && (
                    <div className="flex space-x-4 animate-fade-in">
                      <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                        <AvatarImage src={getExpertInfo(currentSpeaker)?.image} alt={getExpertInfo(currentSpeaker)?.name} />
                        <AvatarFallback className="text-sm">{getExpertInfo(currentSpeaker)?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <p className="text-sm font-medium text-slate-900">{getExpertInfo(currentSpeaker)?.name}</p>
                          <Badge className="text-xs bg-green-100 text-green-700 animate-pulse">
                            Thinking...
                          </Badge>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                          {typingMessage ? (
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {typingMessage}
                              <span className="animate-pulse">|</span>
                            </p>
                          ) : (
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiscussionInterface;
