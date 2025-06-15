
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, MessageSquare, BarChart3, Activity, FileText } from "lucide-react";
import { DiscussionOrchestrator, DiscussionMessage } from '@/services/aiOrchestrator';
import { ExpertConfig } from './ExpertCardList';
import { useDiscussionState } from '@/hooks/useDiscussionState';
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import ReportsModule from './ReportsModule';
import AnalyticsDashboard from './analytics/AnalyticsDashboard';
import ApiMonitoringDashboard from './monitoring/ApiMonitoringDashboard';
import MobileDiscussionInterface from './mobile/MobileDiscussionInterface';
import { useIsMobile } from '@/hooks/use-mobile';

export interface DiscussionConfig {
  rounds: number;
  experts: ExpertConfig[];
}

interface DiscussionInterfaceProps {
  challenge: string;
  discussionConfig: DiscussionConfig;
  onDiscussionUpdate?: (messages: any[], complete: boolean) => void;
}

// Clean API keys to fix malformed prefixes
const cleanApiKey = (apiKey: string): string => {
  if (!apiKey) return '';
  const cleaned = apiKey.trim();
  // Fix duplicate prefixes like "hf hf_"
  if (cleaned.startsWith('hf hf_')) {
    return cleaned.replace('hf ', '');
  }
  return cleaned;
};

// Validate expert configuration
const validateExpertConfig = (expert: ExpertConfig): boolean => {
  if (!expert.id || !expert.name) {
    console.warn(`❌ Expert missing id or name:`, expert);
    return false;
  }
  
  // Clean the API key
  if (expert.apiKey) {
    expert.apiKey = cleanApiKey(expert.apiKey);
  }
  
  // Set default provider if missing
  if (!expert.provider) {
    console.warn(`⚠️ Expert ${expert.name} missing provider, defaulting to HuggingFace`);
    expert.provider = 'HuggingFace';
  }
  
  return true;
};

const DiscussionInterface: React.FC<DiscussionInterfaceProps> = ({
  discussionConfig,
  challenge,
  onDiscussionUpdate
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('discussion');
  
  const discussionState = useDiscussionState(discussionConfig.rounds);
  const [orchestrator, setOrchestrator] = useState<DiscussionOrchestrator | null>(null);

  const startDiscussion = useCallback(async () => {
    console.log('🚀 Start discussion button clicked');
    
    // Prevent multiple simultaneous starts
    if (discussionState.isRunningRef.current) {
      console.log('⚠️ Discussion already running, ignoring start request');
      return;
    }

    // Validate inputs
    if (!challenge || !challenge.trim()) {
      toast({
        title: "Challenge Required",
        description: "Please enter a challenge before starting the discussion.",
        variant: "destructive",
      });
      return;
    }

    if (!discussionConfig.experts || discussionConfig.experts.length === 0) {
      toast({
        title: "No Experts",
        description: "At least one expert is required to start a discussion.",
        variant: "destructive",
      });
      return;
    }

    // Clean and validate expert configurations
    const validExperts = discussionConfig.experts.filter(validateExpertConfig);
    if (validExperts.length === 0) {
      toast({
        title: "Invalid Expert Configuration",
        description: "No valid experts found. Please check your expert configurations.",
        variant: "destructive",
      });
      return;
    }

    console.log(`✅ Starting discussion with ${validExperts.length} valid experts`);

    discussionState.setIsRunning(true);
    discussionState.isRunningRef.current = true;
    discussionState.setHasError(false);

    // Only reset state if starting fresh (round 0)
    if (discussionState.currentRound === 0) {
      console.log('🔄 Resetting state for fresh discussion');
      discussionState.resetState();
    } else {
      console.log(`⏯️ Resuming discussion from round ${discussionState.currentRound}`);
    }

    try {
      // Create orchestrator only once or if starting fresh
      let currentOrchestrator = orchestrator;
      if (!currentOrchestrator || discussionState.currentRound === 0) {
        console.log('🔧 Creating new orchestrator with validated experts');
        currentOrchestrator = new DiscussionOrchestrator(validExperts, challenge, discussionConfig.rounds);
        setOrchestrator(currentOrchestrator);
      }

      // Run the discussion rounds with improved loop logic
      while (discussionState.isRunningRef.current && discussionState.currentRound < discussionConfig.rounds) {
        const nextRound = discussionState.currentRound + 1;
        console.log(`🎯 Starting round ${nextRound}/${discussionConfig.rounds}`);
        
        discussionState.setIsGenerating(true);
        discussionState.isGeneratingRef.current = true;
        discussionState.setCurrentSpeaker(null);

        try {
          const newMessages = await currentOrchestrator.generateRound();
          
          if (newMessages && newMessages.length > 0) {
            console.log(`✅ Round ${nextRound} generated ${newMessages.length} messages`);
            discussionState.setMessages(prevMessages => [...prevMessages, ...newMessages]);

            // Update current speaker based on the last message
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage) {
              discussionState.setCurrentSpeaker(lastMessage.speaker);
            }

            discussionState.updateProgress(nextRound);
            
            // Call the update callback if provided
            if (onDiscussionUpdate) {
              const allMessages = [...discussionState.messages, ...newMessages];
              onDiscussionUpdate(allMessages, nextRound >= discussionConfig.rounds);
            }
          } else {
            console.warn(`⚠️ Round ${nextRound} generated no messages`);
          }
          
        } catch (error) {
          console.error(`💥 Error in round ${nextRound}:`, error);
          discussionState.setHasError(true);
          toast({
            title: "Discussion Error",
            description: `An error occurred during round ${nextRound}: ${error instanceof Error ? error.message : 'Unknown error'}`,
            variant: "destructive",
          });
          break; // Stop the discussion on error
        } finally {
          discussionState.setIsGenerating(false);
          discussionState.isGeneratingRef.current = false;
          discussionState.setCurrentSpeaker(null);
        }

        // Small delay between rounds to prevent overwhelming
        if (discussionState.isRunningRef.current && discussionState.currentRound < discussionConfig.rounds) {
          console.log('⏱️ Brief pause between rounds...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      console.log(`🏁 Discussion completed. Final round: ${discussionState.currentRound}/${discussionConfig.rounds}`);

    } catch (error) {
      console.error('💥 Failed to initialize or run discussion:', error);
      discussionState.setHasError(true);
      toast({
        title: "Discussion Failed",
        description: `Failed to start discussion: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      discussionState.setIsRunning(false);
      discussionState.isRunningRef.current = false;
      console.log('🛑 Discussion process completed');
    }
  }, [discussionConfig, challenge, orchestrator, discussionState, toast, onDiscussionUpdate]);

  const pauseDiscussion = useCallback(() => {
    console.log('⏸️ Pausing discussion');
    discussionState.setIsRunning(false);
    discussionState.isRunningRef.current = false;
    discussionState.setIsGenerating(false);
    discussionState.isGeneratingRef.current = false;
  }, [discussionState]);

  const resetDiscussion = useCallback(() => {
    console.log('🔄 Resetting discussion state completely');
    discussionState.resetState();
    setOrchestrator(null);
    
    toast({
      title: "Discussion Reset",
      description: "Discussion has been reset. You can start a new discussion now.",
    });
  }, [discussionState, toast]);

  // Mobile interface takes precedence on mobile devices
  if (isMobile) {
    return (
      <MobileDiscussionInterface
        messages={discussionState.messages}
        experts={discussionConfig.experts}
        isRunning={discussionState.isRunning}
        currentRound={discussionState.currentRound}
        maxRounds={discussionConfig.rounds}
        progress={discussionState.progress}
        currentSpeaker={discussionState.currentSpeaker}
        onStart={startDiscussion}
        onPause={pauseDiscussion}
        onReset={resetDiscussion}
        onExpertConfigChange={(experts) => {
          console.log('Expert config change requested:', experts);
        }}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header with AGORA Branding */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg border border-indigo-100 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">AGORA Discussion</h1>
                <p className="text-indigo-100">Collective Minds & Wisdom in Action</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-indigo-100">
                Round {discussionState.currentRound} of {discussionConfig.rounds}
              </div>
              <div className="text-2xl font-bold">
                {Math.round(discussionState.progress)}%
              </div>
            </div>
          </div>
          
          <Progress 
            value={discussionState.progress} 
            className="h-2 bg-indigo-400"
          />
          
          {discussionState.currentSpeaker && (
            <div className="mt-3 text-center">
              <Badge className="bg-white text-indigo-600">
                {discussionConfig.experts.find(e => e.id === discussionState.currentSpeaker)?.name || discussionState.currentSpeaker} is contributing...
              </Badge>
            </div>
          )}
        </div>

        {/* Simplified Tabs Navigation - Removed Experts Tab */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discussion" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Discussion
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussion" className="space-y-6">
            {/* Discussion Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Discussion Controls</span>
                  <div className="flex space-x-2">
                    <Button
                      onClick={discussionState.isRunning ? pauseDiscussion : startDiscussion}
                      disabled={discussionState.isGenerating}
                      className={discussionState.isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                    >
                      {discussionState.isRunning ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause Discussion
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          {discussionState.messages.length > 0 ? 'Resume Discussion' : 'Start Discussion'}
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={resetDiscussion}
                      variant="outline"
                      disabled={discussionState.isRunning || discussionState.isGenerating}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{discussionState.messages.length}</div>
                    <div className="text-sm text-blue-700">Messages</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{discussionConfig.experts.length}</div>
                    <div className="text-sm text-green-700">Active Experts</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{discussionState.currentRound}</div>
                    <div className="text-sm text-purple-700">Current Round</div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">
                      {discussionState.messages.reduce((sum, m) => sum + m.content.split(' ').length, 0)}
                    </div>
                    <div className="text-sm text-amber-700">Total Words</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages Display */}
            <Card>
              <CardHeader>
                <CardTitle>Expert Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {discussionState.messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No messages yet. Start the discussion to see expert insights.</p>
                    </div>
                  ) : (
                    discussionState.messages.map((message, index) => (
                      <div key={index} className="border-l-4 border-l-indigo-500 pl-4 py-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-indigo-900">
                            {discussionConfig.experts.find(e => e.id === message.speaker)?.name || message.speaker}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">Round {message.round}</Badge>
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{message.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard
              messages={discussionState.messages}
              experts={discussionConfig.experts}
              currentRound={discussionState.currentRound}
              maxRounds={discussionConfig.rounds}
            />
          </TabsContent>

          <TabsContent value="monitoring">
            <ApiMonitoringDashboard experts={discussionConfig.experts} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsModule
              discussionMessages={discussionState.messages}
              challenge={challenge}
              isDiscussionComplete={discussionState.currentRound >= discussionConfig.rounds}
              experts={discussionConfig.experts}
              currentRound={discussionState.currentRound}
              maxRounds={discussionConfig.rounds}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default DiscussionInterface;
