
import { useEffect } from "react";

/**
 * Custom React hook to run an async function with cancel support.
 * Accepts an async function with AbortSignal and runs it whenever deps change.
 * Cancels stale executions if new run starts (debounced effect).
 */
export function useAsyncWithCancel(
  asyncFn: (signal?: AbortSignal) => void | Promise<void>,
  deps: any[]
) {
  useEffect(() => {
    const controller = new AbortController();
    void asyncFn(controller.signal);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, deps);
}
