
import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Play, Pause, RotateCcw, MessageSquare, Users, BarChart3, Activity, FileText } from "lucide-react";
import { DiscussionOrchestrator, DiscussionMessage } from '@/services/aiOrchestrator';
import { ExpertConfig } from './ExpertCardList';
import ExpertCardList from './ExpertCardList';
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
    if (discussionState.isRunningRef.current) return;

    discussionState.setIsRunning(true);
    discussionState.isRunningRef.current = true;
    discussionState.setHasError(false);

    if (discussionState.currentRound === 0) {
      discussionState.resetState();
      console.log('🚀 Starting new discussion with config:', discussionConfig, 'challenge:', challenge);
    } else {
      console.log('⏯️ Resuming discussion from round:', discussionState.currentRound);
    }

    try {
      // Initialize orchestrator if not already created or if starting fresh
      let currentOrchestrator = orchestrator;
      if (!currentOrchestrator || discussionState.currentRound === 0) {
        console.log('🔧 Creating new orchestrator...');
        currentOrchestrator = new DiscussionOrchestrator(discussionConfig.experts, challenge, discussionConfig.rounds);
        setOrchestrator(currentOrchestrator);
      }

      // Run the discussion rounds
      while (discussionState.isRunningRef.current && discussionState.currentRound < discussionConfig.rounds) {
        const round = discussionState.currentRound + 1;
        discussionState.setIsGenerating(true);
        discussionState.isGeneratingRef.current = true;
        discussionState.setCurrentSpeaker(null);

        try {
          console.log(`🎯 Starting round ${round}/${discussionConfig.rounds}`);
          const newMessages = await currentOrchestrator.generateRound();
          discussionState.setMessages(prevMessages => [...prevMessages, ...newMessages]);

          // Update current speaker based on the last message
          if (newMessages.length > 0) {
            discussionState.setCurrentSpeaker(newMessages[newMessages.length - 1].speaker);
          }

          discussionState.updateProgress(round);
          console.log(`✅ Round ${round} completed successfully`);
          
          // Call the update callback if provided
          if (onDiscussionUpdate) {
            onDiscussionUpdate(discussionState.messages, discussionState.currentRound >= discussionConfig.rounds);
          }
        } catch (error) {
          console.error(`💥 Error in round ${round}:`, error);
          discussionState.setHasError(true);
          toast({
            title: "Discussion Error",
            description: `An error occurred during round ${round}: ${error instanceof Error ? error.message : 'Unknown error'}`,
            variant: "destructive",
          });
          break; // Stop the discussion on error
        } finally {
          discussionState.setIsGenerating(false);
          discussionState.isGeneratingRef.current = false;
        }
      }

    } catch (error) {
      console.error('💥 Failed to initialize orchestrator:', error);
      discussionState.setHasError(true);
      toast({
        title: "Initialization Error",
        description: `Failed to start discussion: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      discussionState.setIsRunning(false);
      discussionState.isRunningRef.current = false;
      console.log('🛑 Discussion completed or stopped.');
    }
  }, [discussionConfig, challenge, orchestrator, discussionState, toast, onDiscussionUpdate]);

  const pauseDiscussion = useCallback(() => {
    console.log('⏸️ Pausing discussion');
    discussionState.setIsRunning(false);
    discussionState.isRunningRef.current = false;
  }, [discussionState]);

  const resetDiscussion = useCallback(() => {
    console.warn('🔄 Resetting discussion state');
    discussionState.resetState();
    setOrchestrator(null);
  }, [discussionState]);

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
        onPause={() => discussionState.setIsRunning(false)}
        onReset={resetDiscussion}
        onExpertConfigChange={(experts) => {
          // Note: This would need to be handled by parent component
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

        {/* Enhanced Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="discussion" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Discussion
            </TabsTrigger>
            <TabsTrigger value="experts" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Experts
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

          <TabsContent value="experts">
            <ExpertCardList
              experts={discussionConfig.experts}
              onTraitChange={(id, trait, value) => {
                // Note: This would need to be handled by parent component
                console.log('Trait change requested:', id, trait, value);
              }}
              onApiKeyChange={(id, value) => {
                // Note: This would need to be handled by parent component
                console.log('API key change requested:', id, value);
              }}
              onProviderChange={(id, value) => {
                // Note: This would need to be handled by parent component
                console.log('Provider change requested:', id, value);
              }}
              onModelChange={(id, value) => {
                // Note: This would need to be handled by parent component
                console.log('Model change requested:', id, value);
              }}
            />
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
