import React from 'react';

/**
 * A React hook that throttles the updating of a value after a specified amount of time.
 *
 * @param {*} value - The value to be throttled.
 * @param {number} delay - The amount of time (in milliseconds) to wait before updating the throttled value.
 * @returns {*} The throttled value that represents the debounced value after throttling.
 */
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = React.useState<T>(value);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestValueRef = React.useRef<T>(value);

  React.useEffect(() => {
    latestValueRef.current = value;

    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(latestValueRef.current);
        timeoutRef.current = null;
      }, delay);
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(latestValueRef.current);
        timeoutRef.current = null;
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, delay]);

  return throttledValue;
}
