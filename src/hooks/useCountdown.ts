import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/lib/utils';

export function useCountdown(endTime: string): { hours: number; minutes: number; seconds: number; isExpired: boolean } {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(endTime);
      setTimeLeft(remaining);
      if (remaining.total <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return {
    hours: timeLeft.hours,
    minutes: timeLeft.minutes,
    seconds: timeLeft.seconds,
    isExpired: timeLeft.total <= 0,
  };
}
