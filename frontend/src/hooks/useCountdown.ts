import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountdownReturn {
  secondsLeft: number;
  isCountingDown: boolean;
  startCountdown: (seconds?: number) => void;
  stopCountdown: () => void;
}

/**
 * Reusable custom hook for countdown timers (e.g. OTP resend, email verification, forgot password).
 * Handles interval updates and automatic cleanup on unmount.
 * 
 * @param defaultSeconds Initial/default duration in seconds (default: 60)
 */
export function useCountdown(defaultSeconds: number = 60): UseCountdownReturn {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopCountdown = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setSecondsLeft(0);
  }, []);

  const startCountdown = useCallback(
    (seconds: number = defaultSeconds) => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }

      setSecondsLeft(seconds);

      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current !== null) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [defaultSeconds]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    secondsLeft,
    isCountingDown: secondsLeft > 0,
    startCountdown,
    stopCountdown,
  };
}
