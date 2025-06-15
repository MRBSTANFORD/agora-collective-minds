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
  const {
    toast
  } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('discussion');
  const discussionState = useDiscussionState(discussionConfig.rounds);
  const [orchestrator, setOrchestrator] = useState<DiscussionOrchestrator | null>(null);
  const [apiFailures, setApiFailures] = useState(0);
  const startFreshDiscussion = useCallback(() => {
    console.log('🔄 Starting fresh discussion - resetting all state');
    discussionState.resetState();
    if (orchestrator) {
      orchestrator.reset();
    }
    setOrchestrator(null);
    setApiFailures(0);
  }, [discussionState, orchestrator]);
  const startDiscussion = useCallback(async () => {
    console.log('🚀 Start discussion button clicked');
    console.log('📊 Current state before start:', {
      isRunning: discussionState.isRunning,
      isRunningRef: discussionState.isRunningRef.current,
      currentRound: discussionState.currentRound,
      messagesCount: discussionState.messages.length
    });

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
        variant: "destructive"
      });
      return;
    }
    if (!discussionConfig.experts || discussionConfig.experts.length === 0) {
      toast({
        title: "No Experts",
        description: "At least one expert is required to start a discussion.",
        variant: "destructive"
      });
      return;
    }

    // Clean and validate expert configurations
    const validExperts = discussionConfig.experts.filter(validateExpertConfig);
    if (validExperts.length === 0) {
      toast({
        title: "Invalid Expert Configuration",
        description: "No valid experts found. Please check your expert configurations.",
        variant: "destructive"
      });
      return;
    }
    console.log(`✅ Starting discussion with ${validExperts.length} valid experts`);

    // Only reset if this is a completely fresh start (no existing messages)
    if (discussionState.currentRound === 0 && discussionState.messages.length === 0) {
      console.log('🔄 Fresh start detected - resetting state');
      discussionState.resetState();
      setOrchestrator(null);
      setApiFailures(0);
    }

    // Set running state
    discussionState.setIsRunning(true);
    discussionState.setHasError(false);
    try {
      // Create orchestrator
      let currentOrchestrator = orchestrator;
      if (!currentOrchestrator) {
        console.log('🔧 Creating new orchestrator with validated experts');
        currentOrchestrator = new DiscussionOrchestrator(validExperts, challenge, discussionConfig.rounds);
        setOrchestrator(currentOrchestrator);
      }
      console.log('🎯 Starting discussion loop:', {
        isRunningRef: discussionState.isRunningRef.current,
        orchestratorRound: currentOrchestrator.getCurrentRound(),
        maxRounds: discussionConfig.rounds,
        orchestratorComplete: currentOrchestrator.isComplete()
      });

      // Safety counter to prevent infinite loops
      let safetyCounter = 0;
      const MAX_SAFETY_ROUNDS = discussionConfig.rounds * 2; // Double the expected rounds as safety

      // Run the discussion rounds with improved loop logic
      while (discussionState.isRunningRef.current && !currentOrchestrator.isComplete() && safetyCounter < MAX_SAFETY_ROUNDS) {
        safetyCounter++;
        console.log(`🎯 About to start new round (safety: ${safetyCounter}/${MAX_SAFETY_ROUNDS})`);
        console.log(`📊 Pre-round state: Orchestrator=${currentOrchestrator.getCurrentRound()}, UI=${discussionState.currentRound}`);
        discussionState.setIsGenerating(true);
        discussionState.setCurrentSpeaker(null);
        try {
          const newMessages = await currentOrchestrator.generateRound();

          // Check if we're still supposed to be running (user might have paused)
          if (!discussionState.isRunningRef.current) {
            console.log('⏸️ Discussion was paused during round generation');
            break;
          }
          if (newMessages && newMessages.length > 0) {
            const orchestratorRound = currentOrchestrator.getCurrentRound();
            console.log(`✅ Round ${orchestratorRound} generated ${newMessages.length} messages`);

            // Sync UI state with orchestrator state
            discussionState.setCurrentRound(orchestratorRound);
            discussionState.setProgress(currentOrchestrator.getProgress());

            // Check for API failures
            const fallbackCount = newMessages.filter(msg => msg.content.includes("This challenge reminds me") || msg.content.includes("We must approach this systematically") || msg.content.includes("But first, we must ask ourselves")).length;
            if (fallbackCount === newMessages.length) {
              setApiFailures(prev => prev + 1);
              console.warn(`⚠️ All responses were fallbacks in round ${orchestratorRound}`);

              // If too many API failures, warn the user
              if (apiFailures >= 2) {
                toast({
                  title: "API Issues Detected",
                  description: "All AI providers are failing. Consider adding valid API keys for better responses.",
                  variant: "destructive"
                });
              }
            }
            discussionState.setMessages(prevMessages => [...prevMessages, ...newMessages]);

            // Update current speaker based on the last message
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage) {
              discussionState.setCurrentSpeaker(lastMessage.speaker);
            }

            // Update round progress tracking
            discussionState.setRoundProgress(prev => {
              const updated = [...prev];
              updated[orchestratorRound - 1] = 100;
              return updated;
            });

            // Call the update callback if provided
            if (onDiscussionUpdate) {
              const allMessages = [...discussionState.messages, ...newMessages];
              onDiscussionUpdate(allMessages, currentOrchestrator.isComplete());
            }
            console.log(`✅ Round ${orchestratorRound} completed successfully and UI synchronized`);
          } else {
            console.warn(`⚠️ Round generation produced no messages`);
            break;
          }
        } catch (error) {
          const currentRoundAttempt = currentOrchestrator.getCurrentRound();
          console.error(`💥 Error in round ${currentRoundAttempt}:`, error);
          discussionState.setHasError(true);
          toast({
            title: "Discussion Error",
            description: `An error occurred during round ${currentRoundAttempt}: ${error instanceof Error ? error.message : 'Unknown error'}`,
            variant: "destructive"
          });
          break;
        } finally {
          discussionState.setIsGenerating(false);
          discussionState.setCurrentSpeaker(null);
        }

        // Check for pause between rounds
        if (discussionState.isRunningRef.current && !currentOrchestrator.isComplete()) {
          console.log('⏱️ Brief pause between rounds...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Check why the loop ended
      if (safetyCounter >= MAX_SAFETY_ROUNDS) {
        console.error('🚨 Safety counter reached - stopping infinite loop');
        toast({
          title: "Discussion Stopped",
          description: "Discussion stopped due to safety limits. Please check your configuration.",
          variant: "destructive"
        });
      }
      const finalRound = currentOrchestrator.getCurrentRound();
      console.log(`🏁 Discussion completed. Final round: ${finalRound}/${discussionConfig.rounds}`);

      // Final sync of UI state
      discussionState.setCurrentRound(finalRound);
      discussionState.setProgress(currentOrchestrator.getProgress());
    } catch (error) {
      console.error('💥 Failed to initialize or run discussion:', error);
      discussionState.setHasError(true);
      toast({
        title: "Discussion Failed",
        description: `Failed to start discussion: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      discussionState.setIsRunning(false);
      console.log('🛑 Discussion process completed');
    }
  }, [discussionConfig, challenge, orchestrator, discussionState, toast, onDiscussionUpdate, apiFailures]);
  const pauseDiscussion = useCallback(() => {
    console.log('⏸️ Pausing discussion');
    discussionState.setIsRunning(false);
    discussionState.setIsGenerating(false);
    toast({
      title: "Discussion Paused",
      description: "You can resume the discussion by clicking Start Discussion again."
    });
  }, [discussionState, toast]);
  const resetDiscussion = useCallback(() => {
    console.log('🔄 Resetting discussion state completely');
    startFreshDiscussion();
    toast({
      title: "Discussion Reset",
      description: "Discussion has been reset. You can start a new discussion now."
    });
  }, [startFreshDiscussion, toast]);

  // Mobile interface takes precedence on mobile devices
  if (isMobile) {
    return <MobileDiscussionInterface messages={discussionState.messages} experts={discussionConfig.experts} isRunning={discussionState.isRunning} currentRound={discussionState.currentRound} maxRounds={discussionConfig.rounds} progress={discussionState.progress} currentSpeaker={discussionState.currentSpeaker} onStart={startDiscussion} onPause={pauseDiscussion} onReset={resetDiscussion} onExpertConfigChange={experts => {
      console.log('Expert config change requested:', experts);
    }} />;
  }
  return <ErrorBoundary>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header with AGORA Branding */}
        <div className="bg-white">
          <div className="flex items-center justify-between mb-4 bg-[#c1a80d]/50">
            <div className="flex items-center space-x-4">
              
              <div>
                <h1 className="text-2xl font-extrabold text-gray-200">AGORA Discussion</h1>
                <p className="text-gray-700">Collective Minds & Wisdom in Action</p>
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
          
          <Progress value={discussionState.progress} className="h-2 bg-indigo-400" />
          
          {discussionState.currentSpeaker && <div className="mt-3 text-center">
              <Badge className="bg-white text-indigo-600">
                {discussionConfig.experts.find(e => e.id === discussionState.currentSpeaker)?.name || discussionState.currentSpeaker} is contributing...
              </Badge>
            </div>}

          {apiFailures > 0 && <div className="mt-3 text-center">
              <Badge variant="destructive" className="bg-red-100 text-red-700">
                API Issues Detected - Consider adding valid API keys
              </Badge>
            </div>}
        </div>

        {/* Simplified Tabs Navigation - 4 tabs total */}
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
                    <Button onClick={discussionState.isRunning ? pauseDiscussion : startDiscussion} disabled={discussionState.isGenerating} className={discussionState.isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}>
                      {discussionState.isRunning ? <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause Discussion
                        </> : <>
                          <Play className="w-4 h-4 mr-2" />
                          {discussionState.messages.length > 0 ? 'Resume Discussion' : 'Start Discussion'}
                        </>}
                    </Button>
                    <Button onClick={resetDiscussion} variant="outline" disabled={discussionState.isRunning || discussionState.isGenerating}>
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
                  {discussionState.messages.length === 0 ? <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No messages yet. Start the discussion to see expert insights.</p>
                    </div> : discussionState.messages.map((message, index) => <div key={index} className="border-l-4 border-l-indigo-500 pl-4 py-2">
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
                      </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard messages={discussionState.messages} experts={discussionConfig.experts} currentRound={discussionState.currentRound} maxRounds={discussionConfig.rounds} />
          </TabsContent>

          <TabsContent value="monitoring">
            <ApiMonitoringDashboard experts={discussionConfig.experts} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsModule discussionMessages={discussionState.messages} challenge={challenge} isDiscussionComplete={discussionState.currentRound >= discussionConfig.rounds} experts={discussionConfig.experts} currentRound={discussionState.currentRound} maxRounds={discussionConfig.rounds} />
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>;
};
export default DiscussionInterface;