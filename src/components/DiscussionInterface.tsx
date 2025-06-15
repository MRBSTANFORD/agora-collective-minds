import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DiscussionOrchestrator, DiscussionMessage } from '@/services/aiOrchestrator';
import { useToast } from "@/hooks/use-toast";
import { useDiscussionPersistence } from '@/hooks/useDiscussionPersistence';
import { DiscussionErrorBoundary } from '@/components/ui/DiscussionErrorBoundary';
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
  
  // Persistence hook
  const { 
    savedState, 
    saveDiscussion, 
    clearSavedDiscussion, 
    hasSavedState 
  } = useDiscussionPersistence();
  
  // Use refs to track state that needs to be accessed in async operations
  const isRunningRef = useRef(false);
  const isGeneratingRef = useRef(false);

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

  // Discussion state
  const [isRunning, setIsRunning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);
  const [typingMessage, setTypingMessage] = useState<string>('');
  const [roundProgress, setRoundProgress] = useState<number[]>([]);
  const [hasError, setHasError] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);

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
    if (messages.length > 0 && currentRound > 0) {
      saveDiscussion(messages, currentRound, challenge);
    }
  }, [messages, currentRound, challenge, saveDiscussion]);

  // Sync refs with state
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    isGeneratingRef.current = isGenerating;
  }, [isGenerating]);

  const handleRestoreSession = useCallback(() => {
    if (savedState) {
      setMessages(savedState.messages);
      setCurrentRound(savedState.currentRound);
      setProgress((savedState.currentRound / maxRounds) * 100);
      setRoundProgress(Array(maxRounds).fill(0).map((_, i) => i < savedState.currentRound ? 100 : 0));
      setShowRecovery(false);
      
      toast({
        title: "Session Restored",
        description: `Resumed at round ${savedState.currentRound} with ${savedState.messages.length} messages.`,
      });
    }
  }, [savedState, maxRounds, toast]);

  const handleDiscardSession = useCallback(() => {
    clearSavedDiscussion();
    setShowRecovery(false);
  }, [clearSavedDiscussion]);

  const handleErrorReset = useCallback(() => {
    console.log('🔄 Resetting after error...');
    setHasError(false);
    setIsRunning(false);
    isRunningRef.current = false;
    setIsGenerating(false);
    isGeneratingRef.current = false;
    setCurrentSpeaker(null);
    setTypingMessage('');
  }, []);

  const startDiscussion = useCallback(async () => {
    console.log('🚀 Starting discussion...', { 
      hasOrchestrator: !!orchestrator, 
      challenge: challenge?.slice(0, 50),
      expertsCount: config?.experts?.length,
      currentIsRunning: isRunningRef.current,
      currentIsGenerating: isGeneratingRef.current
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
    setCurrentRound(0);
    setMessages([]);
    setProgress(0);
    setRoundProgress(Array(maxRounds).fill(0));
    setHasError(false);
    setCurrentSpeaker(null);
    setTypingMessage('');
    setIsGenerating(false);
    setShowRecovery(false);
    clearSavedDiscussion();
    
    // Set running state and start immediately
    setIsRunning(true);
    isRunningRef.current = true;
    
    console.log(`✅ Starting symposium with ${config.experts.length} experts for ${maxRounds} rounds`);
    
    toast({
      title: "Discussion Started",
      description: `The symposium has begun with ${config.experts.length} experts. Watch as they share their wisdom...`,
    });
    
    // Start generation immediately without setTimeout
    generateNextRound();
  }, [orchestrator, challenge, config?.experts, maxRounds, toast, clearSavedDiscussion]);

  const generateNextRound = useCallback(async () => {
    console.log('🔄 generateNextRound called with state:', {
      hasOrchestrator: !!orchestrator,
      isRunning: isRunningRef.current,
      isGenerating: isGeneratingRef.current,
      currentRound: orchestrator?.getCurrentRound() || 0
    });

    if (!orchestrator) {
      console.error('❌ generateNextRound: No orchestrator available');
      setHasError(true);
      setIsRunning(false);
      isRunningRef.current = false;
      toast({
        title: "Discussion Error",
        description: "Discussion orchestrator is not available. Please restart the discussion.",
        variant: "destructive",
      });
      return;
    }

    if (!isRunningRef.current) {
      console.log('⏹️ generateNextRound: Discussion not running, stopping');
      return;
    }

    if (isGeneratingRef.current) {
      console.warn('⚠️ generateNextRound: Already generating, skipping...');
      return;
    }

    console.log(`🎬 Generating round ${orchestrator.getCurrentRound() + 1}...`);
    setIsGenerating(true);
    isGeneratingRef.current = true;
    
    try {
      const startTime = Date.now();
      console.log('📡 Calling orchestrator.generateRound()...');
      const roundMessages = await orchestrator.generateRound();
      const endTime = Date.now();
      
      console.log(`✅ Round completed in ${endTime - startTime}ms with ${roundMessages.length} messages`);
      
      if (roundMessages.length === 0) {
        console.error('❌ No messages generated for this round');
        setHasError(true);
        toast({
          title: "Discussion Issue",
          description: "No responses were generated this round. Check expert configurations and API keys.",
          variant: "destructive",
        });
        setIsRunning(false);
        isRunningRef.current = false;
        setIsGenerating(false);
        isGeneratingRef.current = false;
        return;
      }
      
      // Add messages one by one with typing effect
      for (let i = 0; i < roundMessages.length; i++) {
        const message = roundMessages[i];
        console.log(`💬 Displaying message ${i + 1}/${roundMessages.length} from ${message.speaker}: ${message.content.slice(0, 50)}...`);
        setCurrentSpeaker(message.speaker);
        
        // Typing effect
        await simulateTyping(message.content);
        
        setMessages(prev => {
          console.log(`📝 Adding message to state, total will be: ${prev.length + 1}`);
          return [...prev, message];
        });
        setCurrentSpeaker(null);
        setTypingMessage('');
        
        // Update participation stats
        updateParticipation(message.speaker);
        
        // Delay between experts (adjusted by speed)
        await new Promise(resolve => setTimeout(resolve, 1000 / discussionSpeed));
      }

      const newRound = orchestrator.getCurrentRound();
      console.log(`📊 Updating progress: round ${newRound} of ${maxRounds}`);
      setCurrentRound(newRound);
      setProgress((newRound / maxRounds) * 100);
      
      // Update round progress
      setRoundProgress(prev => {
        const updated = [...prev];
        updated[newRound - 1] = 100;
        return updated;
      });

      // Continue to next round if not complete and still running
      if (!orchestrator.isComplete() && isRunningRef.current) {
        console.log(`🔄 Preparing for round ${newRound + 1}`);
        setTimeout(() => {
          if (isRunningRef.current) {
            console.log('🎯 Calling generateNextRound for next round...');
            generateNextRound();
          }
        }, 2000 / discussionSpeed);
      } else {
        console.log('🏁 Discussion completed or stopped');
        setIsRunning(false);
        isRunningRef.current = false;
        setIsGenerating(false);
        isGeneratingRef.current = false;
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
      setHasError(true);
      setIsRunning(false);
      isRunningRef.current = false;
      setIsGenerating(false);
      isGeneratingRef.current = false;
      toast({
        title: "Discussion Error",
        description: "An error occurred during the discussion. Please check your API keys and try again.",
        variant: "destructive",
      });
    }
    
    setIsGenerating(false);
    isGeneratingRef.current = false;
  }, [orchestrator, maxRounds, discussionSpeed, toast]);

  const simulateTyping = useCallback(async (text: string) => {
    const words = text.split(' ');
    const typingSpeed = 50 / discussionSpeed;
    
    for (let i = 0; i <= words.length; i++) {
      setTypingMessage(words.slice(0, i).join(' '));
      await new Promise(resolve => setTimeout(resolve, typingSpeed));
    }
  }, [discussionSpeed]);

  const updateParticipation = useCallback((expertId: string) => {
    console.log(`👤 ${expertId} participated in discussion`);
  }, []);

  const pauseDiscussion = useCallback(() => {
    console.log('⏸️ Pausing discussion...');
    setIsRunning(false);
    isRunningRef.current = false;
    setIsGenerating(false);
    isGeneratingRef.current = false;
    setCurrentSpeaker(null);
    setTypingMessage('');
  }, []);

  const resetDiscussion = useCallback(() => {
    console.log('🔄 Resetting discussion...');
    setIsRunning(false);
    isRunningRef.current = false;
    setIsGenerating(false);
    isGeneratingRef.current = false;
    setCurrentRound(0);
    setProgress(0);
    setMessages([]);
    setCurrentSpeaker(null);
    setTypingMessage('');
    setRoundProgress(Array(maxRounds).fill(0));
    setHasError(false);
    setShowRecovery(false);
    clearSavedDiscussion();
    
    if (config?.experts && challenge?.trim()) {
      console.log('🔄 Recreating orchestrator after reset');
      setOrchestrator(new DiscussionOrchestrator(config.experts, challenge, config.rounds || 5));
    }
  }, [config?.experts, challenge, config?.rounds, maxRounds, clearSavedDiscussion]);

  const adjustSpeed = useCallback((speed: number) => {
    console.log(`⚡ Adjusting discussion speed to ${speed}x`);
    setDiscussionSpeed(speed);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessage, scrollToBottom]);

  const getExpertInfo = useCallback((expertId: string) => {
    return experts.find(e => e.id === expertId);
  }, [experts]);

  const getRelativeTime = useCallback((timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    return timestamp.toLocaleTimeString();
  }, []);

  // Update the callback when messages or completion status changes
  useEffect(() => {
    if (onDiscussionUpdate) {
      onDiscussionUpdate(messages, orchestrator?.isComplete() || false);
    }
  }, [messages, orchestrator, onDiscussionUpdate]);

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
          currentRound={currentRound}
          progress={progress}
          roundProgress={roundProgress}
          isRunning={isRunning}
          isGenerating={isGenerating}
          hasError={hasError}
          orchestrator={orchestrator}
        />

        <div className="space-y-4">
          <DiscussionControls
            isRunning={isRunning}
            isGenerating={isGenerating}
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
            currentSpeaker={currentSpeaker}
          />

          <MessagesPanel
            messages={messages}
            currentSpeaker={currentSpeaker}
            typingMessage={typingMessage}
            experts={experts}
            getExpertInfo={getExpertInfo}
            getRelativeTime={getRelativeTime}
          />
        </div>
      </div>
    </DiscussionErrorBoundary>
  );
};

// Helper functions for expert data
function getExpertImage(id: string): string {
  const images: Record<string, string> = {
    leonardo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg',
    curie: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg',
    socrates: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg',
    hypatia: '/lovable-uploads/7fa67e56-1a42-4648-be84-9213f73f953c.png',
    einstein: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
    confucius: '/lovable-uploads/439f1d74-152a-43a7-9aac-9aa5efa8e31d.png',
    lovelace: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg',
    machiavelli: '/lovable-uploads/d1f7c4e9-a220-4971-a95f-c627572fd57f.png'
  };
  return images[id] || '';
}

function getExpertDomain(id: string): string {
  const domains: Record<string, string> = {
    leonardo: 'Renaissance Polymath',
    curie: 'Physics & Chemistry',
    socrates: 'Classical Philosophy',
    hypatia: 'Mathematics & Astronomy',
    einstein: 'Theoretical Physics',
    confucius: 'Ethics & Governance',
    lovelace: 'Computing & Mathematics',
    machiavelli: 'Political Philosophy'
  };
  return domains[id] || '';
}

function getExpertColor(id: string): string {
  const colors: Record<string, string> = {
    leonardo: 'bg-orange-100 text-orange-700 border-orange-200',
    curie: 'bg-blue-100 text-blue-700 border-blue-200',
    socrates: 'bg-purple-100 text-purple-700 border-purple-200',
    hypatia: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    einstein: 'bg-violet-100 text-violet-700 border-violet-200',
    confucius: 'bg-amber-100 text-amber-700 border-amber-200',
    lovelace: 'bg-pink-100 text-pink-700 border-pink-200',
    machiavelli: 'bg-red-100 text-red-700 border-red-200'
  };
  return colors[id] || 'bg-gray-100 text-gray-700 border-gray-200';
}

export default DiscussionInterface;
