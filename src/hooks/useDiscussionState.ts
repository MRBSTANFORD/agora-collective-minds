
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

  // Enhanced round setter with validation
  const setCurrentRoundWithValidation = useCallback((round: number) => {
    console.log(`📊 Setting current round: ${round} (max: ${maxRounds})`);
    
    // Validate round number
    if (round < 0) {
      console.warn(`⚠️ Invalid round number: ${round}, setting to 0`);
      setCurrentRound(0);
      return;
    }
    
    if (round > maxRounds) {
      console.warn(`⚠️ Round ${round} exceeds max rounds ${maxRounds}, capping at max`);
      setCurrentRound(maxRounds);
      return;
    }
    
    setCurrentRound(round);
  }, [maxRounds]);

  // Enhanced progress setter with validation
  const setProgressWithValidation = useCallback((progressValue: number) => {
    console.log(`📈 Setting progress: ${progressValue}%`);
    
    // Validate progress value
    if (progressValue < 0) {
      console.warn(`⚠️ Invalid progress: ${progressValue}%, setting to 0%`);
      setProgress(0);
      return;
    }
    
    if (progressValue > 100) {
      console.warn(`⚠️ Progress ${progressValue}% exceeds 100%, capping at 100%`);
      setProgress(100);
      return;
    }
    
    setProgress(progressValue);
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
    
    // Enhanced setters with logging and validation
    setIsRunning: setIsRunningWithLog,
    setIsGenerating: setIsGeneratingWithLog,
    setCurrentRound: setCurrentRoundWithValidation,
    setProgress: setProgressWithValidation,
    setMessages,
    setCurrentSpeaker,
    setTypingMessage,
    setRoundProgress,
    setHasError,
    
    // Utilities
    resetState
  };
}
