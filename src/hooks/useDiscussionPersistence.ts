
import { useState, useEffect, useCallback } from 'react';
import { DiscussionMessage } from '@/services/aiOrchestrator';

interface DiscussionState {
  messages: DiscussionMessage[];
  currentRound: number;
  challenge: string;
  timestamp: number;
}

const STORAGE_KEY = 'agora-discussion-state';
const STORAGE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function useDiscussionPersistence() {
  const [savedState, setSavedState] = useState<DiscussionState | null>(null);

  const saveDiscussion = useCallback((
    messages: DiscussionMessage[],
    currentRound: number,
    challenge: string
  ) => {
    try {
      const state: DiscussionState = {
        messages,
        currentRound,
        challenge,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      console.log('💾 Discussion state saved to localStorage');
    } catch (error) {
      console.warn('Failed to save discussion state:', error);
    }
  }, []);

  const loadDiscussion = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const state: DiscussionState = JSON.parse(stored);
        
        // Check if state is not expired
        if (Date.now() - state.timestamp < STORAGE_EXPIRY) {
          setSavedState(state);
          console.log('📂 Discussion state loaded from localStorage');
          return state;
        } else {
          // Clean up expired state
          localStorage.removeItem(STORAGE_KEY);
          console.log('🧹 Expired discussion state removed');
        }
      }
    } catch (error) {
      console.warn('Failed to load discussion state:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
    return null;
  }, []);

  const clearSavedDiscussion = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedState(null);
    console.log('🗑️ Discussion state cleared');
  }, []);

  useEffect(() => {
    loadDiscussion();
  }, [loadDiscussion]);

  return {
    savedState,
    saveDiscussion,
    loadDiscussion,
    clearSavedDiscussion,
    hasSavedState: !!savedState
  };
}
