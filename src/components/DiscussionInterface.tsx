
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Pause, RotateCcw, MessageCircle, Clock, Users } from 'lucide-react';

const DiscussionInterface = ({
  challenge,
  discussionConfig,
}: {
  challenge: string;
  discussionConfig?: import('./DiscussionConfigPanel').DiscussionConfig;
}) => {
  const config = discussionConfig;
  const [maxRounds, setMaxRounds] = useState(config?.rounds || 5);

  useEffect(() => {
    setMaxRounds(config?.rounds || 5);
  }, [config?.rounds]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);

  // Updated expert data with historical images
  const experts = [
    { 
      id: 'leonardo', 
      name: 'Leonardo da Vinci', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg',
      domain: 'Renaissance Polymath',
      color: 'bg-orange-100 text-orange-700 border-orange-200' 
    },
    { 
      id: 'curie', 
      name: 'Marie Curie', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg',
      domain: 'Physics & Chemistry',
      color: 'bg-blue-100 text-blue-700 border-blue-200' 
    },
    { 
      id: 'socrates', 
      name: 'Socrates', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg',
      domain: 'Classical Philosophy',
      color: 'bg-purple-100 text-purple-700 border-purple-200' 
    },
    { 
      id: 'hypatia', 
      name: 'Hypatia of Alexandria', 
      image: '/lovable-uploads/7fa67e56-1a42-4648-be84-9213f73f953c.png',
      domain: 'Mathematics & Astronomy',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200' 
    },
    { 
      id: 'einstein', 
      name: 'Albert Einstein', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      domain: 'Theoretical Physics',
      color: 'bg-violet-100 text-violet-700 border-violet-200' 
    },
    { 
      id: 'confucius', 
      name: 'Confucius', 
      image: '/lovable-uploads/439f1d74-152a-43a7-9aac-9aa5efa8e31d.png',
      domain: 'Ethics & Governance',
      color: 'bg-amber-100 text-amber-700 border-amber-200' 
    },
    { 
      id: 'lovelace', 
      name: 'Ada Lovelace', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg',
      domain: 'Computing & Mathematics',
      color: 'bg-pink-100 text-pink-700 border-pink-200' 
    },
    { 
      id: 'machiavelli', 
      name: 'Niccolò Machiavelli', 
      image: '/lovable-uploads/d1f7c4e9-a220-4971-a95f-c627572fd57f.png',
      domain: 'Political Philosophy',
      color: 'bg-red-100 text-red-700 border-red-200' 
    }
  ];

  // Enhanced simulated discussion messages with more sophisticated content
  const sampleMessages = [
    {
      speaker: 'leonardo',
      content: "Miei cari colleghi, sustainable urban development is like designing a living organism! Observe how nature creates cities - ant colonies, bee hives, coral reefs. Each follows patterns of efficiency, beauty, and harmony with environment. We must sketch the city as I would sketch anatomy - understanding every system's connection to the whole.",
      round: 1,
      timestamp: new Date()
    },
    {
      speaker: 'curie',
      content: "Leonardo's biological analogy is compelling, but we must ground it in empirical measurement. I propose systematic study: measure air quality before and after green infrastructure, quantify energy consumption patterns, analyze pollution reduction data. Without rigorous methodology, we risk building on assumptions rather than knowledge.",
      round: 1,
      timestamp: new Date()
    },
    {
      speaker: 'socrates',
      content: "But Marie, my dear friend, before we measure, we must question our very foundations. What is 'sustainable'? Sustainable for the wealthy or the poor? For this generation or the next seven? Are we solving real problems, or merely the problems of those with power to define them? True wisdom begins with admitting our ignorance.",
      round: 1,
      timestamp: new Date()
    },
    {
      speaker: 'hypatia',
      content: "Socrates raises essential questions about justice and inclusion. As one who faced exclusion from discourse, I propose we mathematically model different stakeholder needs. Create geometric representations where each community's requirements form vertices of our urban design polygon. The optimal solution maximizes area while maintaining structural integrity.",
      round: 2,
      timestamp: new Date()
    },
    {
      speaker: 'einstein',
      content: "Fascinating! Hypatia's geometric approach reminds me of spacetime - how mass warps the fabric of reality. Perhaps urban density warps the 'fabric' of social and environmental sustainability. We need thought experiments: What if transportation moved at light speed? What if energy was truly infinite? These impossible scenarios illuminate real constraints.",
      round: 2,
      timestamp: new Date()
    },
    {
      speaker: 'confucius',
      content: "My honored colleagues speak wisely of measurement and modeling, but governance requires harmony between human nature and social order. Sustainable cities must cultivate virtue in their citizens. When people respect their environment as they respect their ancestors, conservation becomes natural, not enforced. Right relationships create right actions.",
      round: 2,
      timestamp: new Date()
    },
    {
      speaker: 'lovelace',
      content: "I envision an analytical engine for the city - algorithms that process real-time data from every street, building, and transport node. Like my work with Babbage's machine, we can program adaptive responses: traffic flows adjust automatically, energy distribution optimizes in real-time, waste systems respond to usage patterns. The city becomes a vast, intelligent computation.",
      round: 3,
      timestamp: new Date()
    },
    {
      speaker: 'machiavelli',
      content: "Ada's computational vision is admirable, but we must face political reality. Sustainable cities require sustainable power structures. Who controls this data? Who programs these algorithms? I've observed that good intentions matter less than who holds the keys. We must design systems that work even when governed by those who care more for power than environment.",
      round: 3,
      timestamp: new Date()
    }
  ];

  const startDiscussion = () => {
    setIsRunning(true);
    setCurrentRound(1);
    simulateDiscussion();
  };

  const pauseDiscussion = () => {
    setIsRunning(false);
  };

  const resetDiscussion = () => {
    setIsRunning(false);
    setCurrentRound(0);
    setProgress(0);
    setMessages([]);
    setCurrentSpeaker(null);
  };

  const simulateDiscussion = () => {
    let messageIndex = 0;
    
    const addMessage = () => {
      if (messageIndex < sampleMessages.length && isRunning) {
        const message = sampleMessages[messageIndex];
        setMessages(prev => [...prev, message]);
        setCurrentSpeaker(message.speaker);
        setProgress((messageIndex + 1) / sampleMessages.length * 100);
        
        if (message.round > currentRound) {
          setCurrentRound(message.round);
        }
        
        messageIndex++;
        
        if (messageIndex < sampleMessages.length) {
          setTimeout(addMessage, 4000); // Slower pace for reading
        } else {
          setIsRunning(false);
          setCurrentSpeaker(null);
        }
      }
    };
    
    setTimeout(addMessage, 1500);
  };

  useEffect(() => {
    if (isRunning) {
      simulateDiscussion();
    }
  }, [isRunning]);

  const getExpertInfo = (expertId) => {
    return experts.find(e => e.id === expertId);
  };

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
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
              {isRunning && (
                <Badge className="bg-green-100 text-green-700 animate-pulse border-green-200">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Discussion Active
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/80 rounded-lg p-4 border border-amber-100">
            <h3 className="font-medium text-slate-800 mb-2">Challenge Under Discussion:</h3>
            <p className="text-slate-700 leading-relaxed">{challenge || "Sustainable Urban Development in the Digital Age"}</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Symposium Progress</span>
                <span className="text-sm text-slate-500">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-3 bg-slate-200" />
            </div>

            <div className="flex space-x-4">
              {!isRunning ? (
                <Button onClick={startDiscussion} className="bg-slate-700 hover:bg-slate-800 text-white">
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
          </div>
        </CardContent>
      </Card>

      {/* Discussion Panel */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Experts Panel */}
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
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all border ${
                      currentSpeaker === expert.id 
                        ? `${expert.color} shadow-md scale-105` 
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
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                          <span className="text-xs text-green-600 font-medium">Speaking...</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Messages Panel */}
        <Card className="lg:col-span-3 border-amber-100">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">Symposium Discourse</CardTitle>
            <CardDescription>Real-time dialogue among the immortal minds</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] px-6">
              {messages.length === 0 ? (
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
                      <div key={index} className="flex space-x-4">
                        <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                          <AvatarImage src={expert.image} alt={expert.name} />
                          <AvatarFallback className="text-sm">{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <p className="text-sm font-medium text-slate-900">{expert.name}</p>
                            <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">
                              Round {message.round}
                            </Badge>
                            <span className="text-xs text-slate-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-slate-700 leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
