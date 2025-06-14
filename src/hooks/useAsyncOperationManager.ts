
import { useRef, useCallback, useEffect } from 'react';

interface AsyncOperation {
  id: string;
  controller: AbortController;
  timeout: NodeJS.Timeout;
  startTime: number;
}

export function useAsyncOperationManager() {
  const operationsRef = useRef<Map<string, AsyncOperation>>(new Map());

  const startOperation = useCallback((id: string, timeoutMs: number = 15000) => {
    // Cancel existing operation with same id
    cancelOperation(id);

    const controller = new AbortController();
    const startTime = performance.now();
    
    const timeout = setTimeout(() => {
      controller.abort();
      console.warn(`⚠️ Operation ${id} timed out after ${timeoutMs}ms`);
      operationsRef.current.delete(id);
    }, timeoutMs);

    operationsRef.current.set(id, {
      id,
      controller,
      timeout,
      startTime
    });

    return controller.signal;
  }, []);

  const cancelOperation = useCallback((id: string) => {
    const operation = operationsRef.current.get(id);
    if (operation) {
      operation.controller.abort();
      clearTimeout(operation.timeout);
      operationsRef.current.delete(id);
      
      const duration = performance.now() - operation.startTime;
      console.log(`🛑 Operation ${id} cancelled after ${duration.toFixed(2)}ms`);
    }
  }, []);

  const finishOperation = useCallback((id: string) => {
    const operation = operationsRef.current.get(id);
    if (operation) {
      clearTimeout(operation.timeout);
      operationsRef.current.delete(id);
      
      const duration = performance.now() - operation.startTime;
      console.log(`✅ Operation ${id} completed in ${duration.toFixed(2)}ms`);
    }
  }, []);

  const cancelAllOperations = useCallback(() => {
    operationsRef.current.forEach((operation) => {
      operation.controller.abort();
      clearTimeout(operation.timeout);
    });
    operationsRef.current.clear();
    console.log('🛑 All async operations cancelled');
  }, []);

  const getActiveOperations = useCallback(() => {
    return Array.from(operationsRef.current.keys());
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cancelAllOperations;
  }, [cancelAllOperations]);

  return {
    startOperation,
    cancelOperation,
    finishOperation,
    cancelAllOperations,
    getActiveOperations
  };
}
