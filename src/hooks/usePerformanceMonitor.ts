import { useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

export function usePerformanceMonitor(componentName: string, threshold = 100) {
  const renderStartRef = useRef<number>(0);
  const metricsRef = useRef<PerformanceMetrics[]>([]);

  const startMeasurement = useCallback(() => {
    renderStartRef.current = performance.now();
  }, []);

  const endMeasurement = useCallback(() => {
    if (renderStartRef.current > 0) {
      const renderTime = performance.now() - renderStartRef.current;
      
      if (renderTime > threshold) {
        console.warn(`⚠️ Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }

      metricsRef.current.push({
        renderTime,
        componentName,
        timestamp: Date.now()
      });

      // Keep only last 10 measurements
      if (metricsRef.current.length > 10) {
        metricsRef.current = metricsRef.current.slice(-10);
      }

      renderStartRef.current = 0;
    }
  }, [componentName, threshold]);

  // Start measurement on every render
  useEffect(() => {
    startMeasurement();
    return endMeasurement;
  });

  return {
    getMetrics: () => metricsRef.current,
    clearMetrics: () => { metricsRef.current = []; }
  };
}
