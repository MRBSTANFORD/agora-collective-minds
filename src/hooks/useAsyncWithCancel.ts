
import { useEffect, useRef, useCallback } from "react";

interface AsyncOptions {
  timeout?: number;
  retries?: number;
}

/**
 * Safe async hook with timeout protection and proper cancellation
 */
export function useAsyncWithCancel(
  asyncFn: (signal?: AbortSignal) => void | Promise<void>,
  deps: any[],
  options: AsyncOptions = {}
) {
  const { timeout = 15000, retries = 0 } = options;
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const executeWithTimeout = useCallback(async (attemptNumber = 0) => {
    cleanup();
    
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Set timeout
    timeoutRef.current = setTimeout(() => {
      controller.abort();
      console.warn(`⚠️ Async operation timed out after ${timeout}ms`);
    }, timeout);

    try {
      await asyncFn(controller.signal);
      cleanup();
    } catch (error) {
      cleanup();
      
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Async operation was cancelled');
        return;
      }

      if (attemptNumber < retries) {
        console.log(`Retrying async operation (attempt ${attemptNumber + 1}/${retries})`);
        setTimeout(() => executeWithTimeout(attemptNumber + 1), 1000);
        return;
      }

      console.error('Async operation failed:', error);
    }
  }, [asyncFn, timeout, retries, cleanup]);

  useEffect(() => {
    executeWithTimeout();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);
}
