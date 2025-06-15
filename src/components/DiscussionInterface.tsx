import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DiscussionOrchestrator, DiscussionMessage } from '@/services/aiOrchestrator';
import { useToast } from "@/hooks/use-toast";
import { useDiscussionPersistence } from '@/hooks/useDiscussionPersistence';
import { useDiscussionState } from '@/hooks/useDiscussionState';
import { DiscussionErrorBoundary } from '@/components/ui/DiscussionErrorBoundary';
import { getExpertImage, getExpertDomain, getExpertColor, getRelativeTime } from '@/utils/expertUtils';
import DiscussionHeader from './discussion/DiscussionHeader';
import DiscussionControls from './discussion/DiscussionControls';
import ExpertsPanel from './discussion/ExpertsPanel';
import MessagesPanel from './discussion/MessagesPanel';
import DiscussionRecovery from './discussion/DiscussionRecovery';

const DiscussionInterface = ({
  challenge,
  discussionConfig,
  onDiscussionUpdate,
}: {
  challenge: string;
  discussionConfig?: import('./DiscussionConfigPanel').DiscussionConfig;
  onDiscussionUpdate?: (messages: DiscussionMessage[], complete: boolean) => void;
}) => {
  const { toast } = useToast();
  const config = discussionConfig;
  const [maxRounds, setMaxRounds] = useState(config?.rounds || 5);
  const [orchestrator, setOrchestrator] = useState<DiscussionOrchestrator | null>(null);
  const [discussionSpeed, setDiscussionSpeed] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use the extracted discussion state hook
  const discussionState = useDiscussionState(maxRounds);
  
  // Persistence hook
  const { 
    savedState, 
    saveDiscussion, 
    clearSavedDiscussion, 
    hasSavedState 
  } = useDiscussionPersistence();
  
  const [showRecovery, setShowRecovery] = useState(false);

  // Initialize orchestrator when config changes
  useEffect(() => {
    console.log('🔧 DiscussionInterface: Config changed', { 
      hasConfig: !!config, 
      hasExperts: !!config?.experts, 
      expertsCount: config?.experts?.length,
      challenge: challenge?.slice(0, 50),
      rounds: config?.rounds 
    });
    
    setMaxRounds(config?.rounds || 5);
    
    if (config?.experts && challenge?.trim()) {
      console.log('🔧 Creating orchestrator with configured experts:', config.experts.map(e => ({ name: e.name, provider: e.provider, hasApiKey: !!e.apiKey })));
      const newOrchestrator = new DiscussionOrchestrator(config.experts, challenge, config.rounds || 5);
      setOrchestrator(newOrchestrator);
      console.log('✅ Orchestrator created with actual expert config');
    } else {
      console.log('❌ Cannot create orchestrator - missing config or challenge');
      setOrchestrator(null);
    }
  }, [config?.rounds, config?.experts, challenge]);

  // Use configured experts instead of hardcoded ones
  const experts = config?.experts?.map(expert => ({
    id: expert.id,
    name: expert.name,
    image: getExpertImage(expert.id),
    domain: getExpertDomain(expert.id),
    color: getExpertColor(expert.id),
    participation: 0
  })) || [];

  // Check for saved state on mount
  useEffect(() => {
    if (hasSavedState && savedState && savedState.challenge === challenge) {
      setShowRecovery(true);
    }
  }, [hasSavedState, savedState, challenge]);

  // Auto-save discussion progress
  useEffect(() => {
    if (discussionState.messages.length > 0 && discussionState.currentRound > 0) {
      saveDiscussion(discussionState.messages, discussionState.currentRound, challenge);
    }
  }, [discussionState.messages, discussionState.currentRound, challenge, saveDiscussion]);

  const handleRestoreSession = useCallback(() => {
    if (savedState) {
      discussionState.setMessages(savedState.messages);
      discussionState.setCurrentRound(savedState.currentRound);
      discussionState.setProgress((savedState.currentRound / maxRounds) * 100);
      discussionState.setRoundProgress(Array(maxRounds).fill(0).map((_, i) => i < savedState.currentRound ? 100 : 0));
      setShowRecovery(false);
      
      toast({
        title: "Session Restored",
        description: `Resumed at round ${savedState.currentRound} with ${savedState.messages.length} messages.`,
      });
    }
  }, [savedState, maxRounds, toast, discussionState]);

  const handleDiscardSession = useCallback(() => {
    clearSavedDiscussion();
    setShowRecovery(false);
  }, [clearSavedDiscussion]);

  const handleErrorReset = useCallback(() => {
    console.log('🔄 Resetting after error...');
    discussionState.resetState();
    discussionState.setCurrentSpeaker(null);
    discussionState.setTypingMessage('');
  }, [discussionState]);

  const startDiscussion = useCallback(async () => {
    console.log('🚀 Starting discussion...', { 
      hasOrchestrator: !!orchestrator, 
      challenge: challenge?.slice(0, 50),
      expertsCount: config?.experts?.length,
      currentIsRunning: discussionState.isRunningRef.current,
      currentIsGenerating: discussionState.isGeneratingRef.current
    });
    
    if (!orchestrator) {
      console.error('❌ No orchestrator available');
      toast({
        title: "Cannot Start Discussion",
        description: "Please configure experts and enter a challenge first.",
        variant: "destructive",
      });
      return;
    }

    if (!challenge?.trim()) {
      console.error('❌ No challenge provided');
      toast({
        title: "Cannot Start Discussion", 
        description: "Please enter a challenge to discuss.",
        variant: "destructive",
      });
      return;
    }

    if (!config?.experts?.length) {
      console.error('❌ No experts configured');
      toast({
        title: "Cannot Start Discussion",
        description: "Please select and configure at least one expert.",
        variant: "destructive",
      });
      return;
    }

    console.log('✅ Validation passed, starting discussion...');
    
    // Reset state
    discussionState.resetState();
    discussionState.setCurrentSpeaker(null);
    discussionState.setTypingMessage('');
    setShowRecovery(false);
    clearSavedDiscussion();
    
    // Set running state and start immediately
    discussionState.setIsRunning(true);
    discussionState.isRunningRef.current = true;
    
    console.log(`✅ Starting symposium with ${config.experts.length} experts for ${maxRounds} rounds`);
    
    toast({
      title: "Discussion Started",
      description: `The symposium has begun with ${config.experts.length} experts. Watch as they share their wisdom...`,
    });
    
    // Start generation immediately without setTimeout
    generateNextRound();
  }, [orchestrator, challenge, config?.experts, maxRounds, toast, clearSavedDiscussion, discussionState]);

  const generateNextRound = useCallback(async () => {
    console.log('🔄 generateNextRound called with state:', {
      hasOrchestrator: !!orchestrator,
      isRunning: discussionState.isRunningRef.current,
      isGenerating: discussionState.isGeneratingRef.current,
      currentRound: orchestrator?.getCurrentRound() || 0
    });

    if (!orchestrator) {
      console.error('❌ generateNextRound: No orchestrator available');
      discussionState.setHasError(true);
      discussionState.setIsRunning(false);
      discussionState.isRunningRef.current = false;
      toast({
        title: "Discussion Error",
        description: "Discussion orchestrator is not available. Please restart the discussion.",
        variant: "destructive",
      });
      return;
    }

    if (!discussionState.isRunningRef.current) {
      console.log('⏹️ generateNextRound: Discussion not running, stopping');
      return;
    }

    if (discussionState.isGeneratingRef.current) {
      console.warn('⚠️ generateNextRound: Already generating, skipping...');
      return;
    }

    console.log(`🎬 Generating round ${orchestrator.getCurrentRound() + 1}...`);
    discussionState.setIsGenerating(true);
    discussionState.isGeneratingRef.current = true;
    
    try {
      const startTime = Date.now();
      console.log('📡 Calling orchestrator.generateRound()...');
      const roundMessages = await orchestrator.generateRound();
      const endTime = Date.now();
      
      console.log(`✅ Round completed in ${endTime - startTime}ms with ${roundMessages.length} messages`);
      
      if (roundMessages.length === 0) {
        console.error('❌ No messages generated for this round');
        discussionState.setHasError(true);
        toast({
          title: "Discussion Issue",
          description: "No responses were generated this round. Check expert configurations and API keys.",
          variant: "destructive",
        });
        discussionState.setIsRunning(false);
        discussionState.isRunningRef.current = false;
        discussionState.setIsGenerating(false);
        discussionState.isGeneratingRef.current = false;
        return;
      }
      
      // Add messages one by one with typing effect
      for (let i = 0; i < roundMessages.length; i++) {
        const message = roundMessages[i];
        console.log(`💬 Displaying message ${i + 1}/${roundMessages.length} from ${message.speaker}: ${message.content.slice(0, 50)}...`);
        discussionState.setCurrentSpeaker(message.speaker);
        
        // Typing effect
        await simulateTyping(message.content);
        
        discussionState.setMessages(prev => {
          console.log(`📝 Adding message to state, total will be: ${prev.length + 1}`);
          return [...prev, message];
        });
        discussionState.setCurrentSpeaker(null);
        discussionState.setTypingMessage('');
        
        // Update participation stats
        updateParticipation(message.speaker);
        
        // Delay between experts (adjusted by speed)
        await new Promise(resolve => setTimeout(resolve, 1000 / discussionSpeed));
      }

      const newRound = orchestrator.getCurrentRound();
      console.log(`📊 Updating progress: round ${newRound} of ${maxRounds}`);
      discussionState.updateProgress(newRound);

      // Continue to next round if not complete and still running
      if (!orchestrator.isComplete() && discussionState.isRunningRef.current) {
        console.log(`🔄 Preparing for round ${newRound + 1}`);
        setTimeout(() => {
          if (discussionState.isRunningRef.current) {
            console.log('🎯 Calling generateNextRound for next round...');
            generateNextRound();
          }
        }, 2000 / discussionSpeed);
      } else {
        console.log('🏁 Discussion completed or stopped');
        discussionState.setIsRunning(false);
        discussionState.isRunningRef.current = false;
        discussionState.setIsGenerating(false);
        discussionState.isGeneratingRef.current = false;
        if (orchestrator.isComplete()) {
          console.log('✅ Discussion completed successfully');
          toast({
            title: "Discussion Complete",
            description: `The symposium has concluded after ${maxRounds} rounds of enlightening discourse.`,
          });
        }
      }
    } catch (error) {
      console.error('💥 Error generating round:', error);
      discussionState.setHasError(true);
      discussionState.setIsRunning(false);
      discussionState.isRunningRef.current = false;
      discussionState.setIsGenerating(false);
      discussionState.isGeneratingRef.current = false;
      toast({
        title: "Discussion Error",
        description: "An error occurred during the discussion. Please check your API keys and try again.",
        variant: "destructive",
      });
    }
    
    discussionState.setIsGenerating(false);
    discussionState.isGeneratingRef.current = false;
  }, [orchestrator, maxRounds, discussionSpeed, toast, discussionState]);

  const simulateTyping = useCallback(async (text: string) => {
    const words = text.split(' ');
    const typingSpeed = 50 / discussionSpeed;
    
    for (let i = 0; i <= words.length; i++) {
      discussionState.setTypingMessage(words.slice(0, i).join(' '));
      await new Promise(resolve => setTimeout(resolve, typingSpeed));
    }
  }, [discussionSpeed, discussionState]);

  const updateParticipation = useCallback((expertId: string) => {
    console.log(`👤 ${expertId} participated in discussion`);
  }, []);

  const pauseDiscussion = useCallback(() => {
    console.log('⏸️ Pausing discussion...');
    discussionState.setIsRunning(false);
    discussionState.isRunningRef.current = false;
    discussionState.setIsGenerating(false);
    discussionState.isGeneratingRef.current = false;
    discussionState.setCurrentSpeaker(null);
    discussionState.setTypingMessage('');
  }, [discussionState]);

  const resetDiscussion = useCallback(() => {
    console.log('🔄 Resetting discussion...');
    discussionState.resetState();
    discussionState.setCurrentSpeaker(null);
    discussionState.setTypingMessage('');
    setShowRecovery(false);
    clearSavedDiscussion();
    
    if (config?.experts && challenge?.trim()) {
      console.log('🔄 Recreating orchestrator after reset');
      setOrchestrator(new DiscussionOrchestrator(config.experts, challenge, config.rounds || 5));
    }
  }, [config?.experts, challenge, config?.rounds, clearSavedDiscussion, discussionState]);

  const adjustSpeed = useCallback((speed: number) => {
    console.log(`⚡ Adjusting discussion speed to ${speed}x`);
    setDiscussionSpeed(speed);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [discussionState.messages, discussionState.typingMessage, scrollToBottom]);

  const getExpertInfo = useCallback((expertId: string) => {
    return experts.find(e => e.id === expertId);
  }, [experts]);

  // Update the callback when messages or completion status changes
  useEffect(() => {
    if (onDiscussionUpdate) {
      onDiscussionUpdate(discussionState.messages, orchestrator?.isComplete() || false);
    }
  }, [discussionState.messages, orchestrator, onDiscussionUpdate]);

  return (
    <DiscussionErrorBoundary onReset={handleErrorReset}>
      <div className="space-y-8 py-8">
        {showRecovery && savedState && (
          <DiscussionRecovery
            savedState={savedState}
            onRestore={handleRestoreSession}
            onDiscard={handleDiscardSession}
          />
        )}

        <DiscussionHeader
          challenge={challenge}
          expertsCount={experts.length}
          maxRounds={maxRounds}
          currentRound={discussionState.currentRound}
          progress={discussionState.progress}
          roundProgress={discussionState.roundProgress}
          isRunning={discussionState.isRunning}
          isGenerating={discussionState.isGenerating}
          hasError={discussionState.hasError}
          orchestrator={orchestrator}
        />

        <div className="space-y-4">
          <DiscussionControls
            isRunning={discussionState.isRunning}
            isGenerating={discussionState.isGenerating}
            orchestrator={orchestrator}
            challenge={challenge}
            discussionSpeed={discussionSpeed}
            onStart={startDiscussion}
            onPause={pauseDiscussion}
            onReset={resetDiscussion}
            onSpeedChange={adjustSpeed}
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <ExpertsPanel
            experts={experts}
            currentSpeaker={discussionState.currentSpeaker}
          />

          <MessagesPanel
            messages={discussionState.messages}
            currentSpeaker={discussionState.currentSpeaker}
            typingMessage={discussionState.typingMessage}
            experts={experts}
            getExpertInfo={getExpertInfo}
            getRelativeTime={getRelativeTime}
          />
        </div>
      </div>
    </DiscussionErrorBoundary>
  );
};

export default DiscussionInterface;
