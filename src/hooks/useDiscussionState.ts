
import { useState, useRef, useCallback } from 'react';
import { DiscussionMessage } from '@/services/aiOrchestrator';

export function useDiscussionState(maxRounds: number) {
  const [isRunning, setIsRunning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);
  const [typingMessage, setTypingMessage] = useState<string>('');
  const [roundProgress, setRoundProgress] = useState<number[]>([]);
  const [hasError, setHasError] = useState(false);
  
  // Use refs to track state that needs to be accessed in async operations
  const isRunningRef = useRef(false);
  const isGeneratingRef = useRef(false);

  const resetState = useCallback(() => {
    console.log('🔄 Resetting discussion state');
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
  }, [maxRounds]);

  const updateProgress = useCallback((round: number) => {
    console.log(`📊 Updating progress: round ${round}/${maxRounds}`);
    setCurrentRound(round);
    setProgress((round / maxRounds) * 100);
    setRoundProgress(prev => {
      const updated = [...prev];
      updated[round - 1] = 100;
      return updated;
    });
  }, [maxRounds]);

  // Enhanced setters with logging for debugging
  const setIsRunningWithLog = useCallback((value: boolean) => {
    console.log(`🏃 Setting isRunning: ${value}`);
    setIsRunning(value);
    isRunningRef.current = value;
  }, []);

  const setIsGeneratingWithLog = useCallback((value: boolean) => {
    console.log(`⚙️ Setting isGenerating: ${value}`);
    setIsGenerating(value);
    isGeneratingRef.current = value;
  }, []);

  return {
    // State
    isRunning,
    isGenerating,
    currentRound,
    progress,
    messages,
    currentSpeaker,
    typingMessage,
    roundProgress,
    hasError,
    isRunningRef,
    isGeneratingRef,
    
    // Enhanced setters with logging
    setIsRunning: setIsRunningWithLog,
    setIsGenerating: setIsGeneratingWithLog,
    setCurrentRound,
    setProgress,
    setMessages,
    setCurrentSpeaker,
    setTypingMessage,
    setRoundProgress,
    setHasError,
    
    // Utilities
    resetState,
    updateProgress
  };
}
