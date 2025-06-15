
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DiscussionMessage } from '@/services/aiOrchestrator';
import { ExpertConfig } from '@/components/ExpertCardList';
import { MessageSquare, Users, Settings, BarChart3, Play, Pause, RotateCcw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileDiscussionInterfaceProps {
  messages: DiscussionMessage[];
  experts: ExpertConfig[];
  isRunning: boolean;
  currentRound: number;
  maxRounds: number;
  progress: number;
  currentSpeaker: string | null;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onExpertConfigChange: (experts: ExpertConfig[]) => void;
}

const MobileDiscussionInterface: React.FC<MobileDiscussionInterfaceProps> = ({
  messages,
  experts,
  isRunning,
  currentRound,
  maxRounds,
  progress,
  currentSpeaker,
  onStart,
  onPause,
  onReset,
  onExpertConfigChange
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null; // Only render on mobile
  }

  const getExpertName = (expertId: string) => {
    const expert = experts.find(e => e.id === expertId);
    return expert?.name || expertId;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-indigo-900">AGORA</h1>
          <p className="text-xs text-gray-600">Round {currentRound}/{maxRounds}</p>
        </div>
        
        <div className="flex space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Expert Configuration</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                {experts.map(expert => (
                  <Card key={expert.id} className="p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{expert.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {expert.provider || 'HuggingFace'}
                      </Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
                      <div>C: {expert.cognitive.creativity}%</div>
                      <div>S: {expert.cognitive.skepticism}%</div>
                      <div>O: {expert.cognitive.optimism}%</div>
                    </div>
                  </Card>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Discussion Analytics</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <Card>
                  <CardContent className="p-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
                      <div className="text-xs text-gray-600">Total Messages</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {messages.reduce((sum, m) => sum + m.content.split(' ').length, 0)}
                      </div>
                      <div className="text-xs text-gray-600">Total Words</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{Math.round(progress)}%</div>
                      <div className="text-xs text-gray-600">Progress</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 py-2 border-b">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {currentSpeaker && (
          <div className="mt-1 text-xs text-center text-gray-600">
            <span className="font-medium">{getExpertName(currentSpeaker)}</span> is speaking...
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="bg-white px-4 py-3 border-b flex justify-center space-x-3">
        <Button
          onClick={isRunning ? onPause : onStart}
          className={`flex-1 ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start
            </>
          )}
        </Button>
        
        <Button
          onClick={onReset}
          variant="outline"
          disabled={isRunning}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No messages yet. Start the discussion to see expert insights.</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <Card key={index} className="border-l-4 border-l-indigo-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium">
                        {getExpertName(message.speaker)}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          Round {message.round}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm leading-relaxed text-gray-700">
                      {message.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MobileDiscussionInterface;
