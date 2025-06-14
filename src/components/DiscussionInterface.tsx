import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Pause, RotateCcw, MessageCircle, Clock } from 'lucide-react';

const DiscussionInterface = ({
  challenge,
  discussionConfig,
}: {
  challenge: string;
  discussionConfig?: import('./DiscussionConfigPanel').DiscussionConfig;
}) => {
  // Accept config
  const config = discussionConfig;

  // Use rounds, expert config for simulation
  const [maxRounds, setMaxRounds] = useState(config?.rounds || 5);

  useEffect(() => {
    setMaxRounds(config?.rounds || 5);
  }, [config?.rounds]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);

  const experts = [
    { id: 'leonardo', name: 'Leonardo da Vinci', avatar: '🎨', color: 'bg-orange-100 text-orange-700' },
    { id: 'curie', name: 'Marie Curie', avatar: '⚛️', color: 'bg-blue-100 text-blue-700' },
    { id: 'socrates', name: 'Socrates', avatar: '🏛️', color: 'bg-purple-100 text-purple-700' },
    { id: 'hypatia', name: 'Hypatia', avatar: '📐', color: 'bg-emerald-100 text-emerald-700' },
    { id: 'einstein', name: 'Albert Einstein', avatar: '🌌', color: 'bg-violet-100 text-violet-700' },
    { id: 'confucius', name: 'Confucius', avatar: '☯️', color: 'bg-amber-100 text-amber-700' },
    { id: 'lovelace', name: 'Ada Lovelace', avatar: '💻', color: 'bg-pink-100 text-pink-700' },
    { id: 'machiavelli', name: 'Machiavelli', avatar: '👑', color: 'bg-red-100 text-red-700' }
  ];

  // Simulated discussion messages
  const sampleMessages = [
    {
      speaker: 'leonardo',
      content: "Ah, sustainable urban development! Like a great painting, a city must balance form and function, beauty and utility. We must observe nature's patterns - how trees create cooling canopies, how water flows efficiently, how light penetrates the forest canopy.",
      round: 1,
      timestamp: new Date()
    },
    {
      speaker: 'curie',
      content: "Indeed, Leonardo. But we must approach this with rigorous methodology. What are the measurable impacts of green infrastructure? I propose we examine the empirical data on urban heat island effects, air quality improvements, and energy consumption patterns.",
      round: 1,
      timestamp: new Date()
    },
    {
      speaker: 'socrates',
      content: "But first, my friends, we must ask: what do we mean by 'sustainable'? Sustainable for whom? For how long? Are we seeking sustainability of our comfort, or sustainability of justice? These questions shape all our solutions.",
      round: 1,
      timestamp: new Date()
    },
    {
      speaker: 'einstein',
      content: "Socrates raises profound questions! Perhaps we need a thought experiment: imagine a city as a living organism. What would its metabolism look like? How would energy flow through its systems? The solutions may emerge from reimagining the very nature of urban space.",
      round: 2,
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
    // This would integrate with OpenAI API in production
    // For now, we'll simulate the discussion with sample messages
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
          setTimeout(addMessage, 3000); // Add new message every 3 seconds
        } else {
          setIsRunning(false);
          setCurrentSpeaker(null);
        }
      }
    };
    
    setTimeout(addMessage, 1000);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-indigo-900">Expert Discussion</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
              Round {currentRound} of {maxRounds}
            </Badge>
            {isRunning && (
              <Badge className="bg-green-100 text-green-700 animate-pulse">
                <MessageCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            )}
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-indigo-900 mb-2">Challenge:</h3>
          <p className="text-indigo-700">{challenge || "Sustainable Urban Development in the 21st Century"}</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Discussion Progress</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex space-x-3">
            {!isRunning ? (
              <Button onClick={startDiscussion} className="bg-indigo-600 hover:bg-indigo-700">
                <Play className="w-4 h-4 mr-2" />
                Start Discussion
              </Button>
            ) : (
              <Button onClick={pauseDiscussion} variant="outline">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            )}
            <Button onClick={resetDiscussion} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Discussion Panel */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Experts Panel */}
        <div className="lg:col-span-1">
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-lg text-indigo-900">Active Experts</CardTitle>
              <CardDescription>Currently participating in discussion</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {experts.map((expert) => (
                    <div 
                      key={expert.id}
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${
                        currentSpeaker === expert.id 
                          ? 'bg-indigo-100 border-2 border-indigo-300' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-2xl">{expert.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {expert.name}
                        </p>
                        {currentSpeaker === expert.id && (
                          <div className="flex items-center mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                            <span className="text-xs text-green-600">Speaking...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Messages Panel */}
        <div className="lg:col-span-3">
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-lg text-indigo-900">Discussion Timeline</CardTitle>
              <CardDescription>Real-time expert dialogue and insights</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96 px-6 pb-6">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Start the discussion to see expert insights</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => {
                      const expert = getExpertInfo(message.speaker);
                      return (
                        <div key={index} className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${expert.color}`}>
                              <span className="text-lg">{expert.avatar}</span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="text-sm font-medium text-gray-900">{expert.name}</p>
                              <Badge variant="outline" className="text-xs">
                                Round {message.round}
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-3">
                              <p className="text-sm text-gray-700 leading-relaxed">{message.content}</p>
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
    </div>
  );
};

export default DiscussionInterface;
