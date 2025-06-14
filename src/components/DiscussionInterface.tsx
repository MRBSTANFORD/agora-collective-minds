import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DiscussionOrchestrator, DiscussionMessage } from '@/services/aiOrchestrator';
import { useToast } from "@/hooks/use-toast";
import DiscussionHeader from './discussion/DiscussionHeader';
import DiscussionControls from './discussion/DiscussionControls';
import ExpertsPanel from './discussion/ExpertsPanel';
import MessagesPanel from './discussion/MessagesPanel';

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
      console.log('✅ Orchestrator created successfully');
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

  const startDiscussion = useCallback(async () => {
    console.log('🚀 Starting discussion...', { 
      hasOrchestrator: !!orchestrator, 
      challenge: challenge?.slice(0, 50),
      expertsCount: config?.experts?.length,
      currentIsRunning: isRunning,
      currentIsGenerating: isGenerating
    });
    
    // Enhanced validation
    if (!orchestrator) {
      console.error('❌ No orchestrator available - cannot start discussion');
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

    console.log('✅ Validation passed, initializing discussion state...');
    
    // Reset all state first
    setCurrentRound(0);
    setMessages([]);
    setProgress(0);
    setRoundProgress(Array(maxRounds).fill(0));
    setHasError(false);
    setCurrentSpeaker(null);
    setTypingMessage('');
    setIsGenerating(false);
    
    // Set running state LAST and immediately call generateNextRound
    setIsRunning(true);
    
    console.log(`✅ Starting symposium with ${config.experts.length} experts for ${maxRounds} rounds`);
    
    toast({
      title: "Discussion Started",
      description: `The symposium has begun with ${config.experts.length} experts. Watch as they share their wisdom...`,
    });
    
    // Add a small delay to ensure state is updated
    setTimeout(() => {
      console.log('🎯 Calling generateNextRound after state update...');
      generateNextRound();
    }, 100);
  }, [orchestrator, challenge, config?.experts, maxRounds, isRunning, isGenerating, toast]);

  const generateNextRound = useCallback(async () => {
    console.log('🔄 generateNextRound called with state:', {
      hasOrchestrator: !!orchestrator,
      isRunning,
      isGenerating,
      currentRound: orchestrator?.getCurrentRound() || 0
    });

    if (!orchestrator) {
      console.error('❌ generateNextRound: No orchestrator available');
      setHasError(true);
      setIsRunning(false);
      toast({
        title: "Discussion Error",
        description: "Discussion orchestrator is not available. Please restart the discussion.",
        variant: "destructive",
      });
      return;
    }

    if (!isRunning) {
      console.error('❌ generateNextRound: Discussion is not running');
      return;
    }

    if (isGenerating) {
      console.warn('⚠️ generateNextRound: Already generating, skipping...');
      return;
    }

    console.log(`🎬 Generating round ${orchestrator.getCurrentRound() + 1}...`);
    setIsGenerating(true);
    
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

      // Continue to next round if not complete
      if (!orchestrator.isComplete() && isRunning) {
        console.log(`🔄 Preparing for round ${newRound + 1}`);
        setTimeout(() => {
          console.log('🎯 Calling generateNextRound for next round...');
          generateNextRound();
        }, 2000 / discussionSpeed);
      } else {
        console.log('🏁 Discussion completed or stopped');
        setIsRunning(false);
        setIsGenerating(false);
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
      setIsGenerating(false);
      toast({
        title: "Discussion Error",
        description: "An error occurred during the discussion. Please try restarting the symposium.",
        variant: "destructive",
      });
    }
    
    setIsGenerating(false);
  }, [orchestrator, isRunning, isGenerating, maxRounds, discussionSpeed, toast]);

  const simulateTyping = useCallback(async (text: string) => {
    const words = text.split(' ');
    const typingSpeed = 50 / discussionSpeed; // ms per word, adjusted by speed
    
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
    setIsGenerating(false);
    setCurrentSpeaker(null);
    setTypingMessage('');
  }, []);

  const resetDiscussion = useCallback(() => {
    console.log('🔄 Resetting discussion...');
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
      console.log('🔄 Recreating orchestrator after reset');
      setOrchestrator(new DiscussionOrchestrator(config.experts, challenge, config.rounds || 5));
    }
  }, [config?.experts, challenge, config?.rounds, maxRounds]);

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

  return (
    <div className="space-y-8 py-8">
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
  );
};

export default DiscussionInterface;
