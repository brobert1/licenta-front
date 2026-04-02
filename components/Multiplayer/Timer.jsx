import { classnames } from '@lib';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

const Timer = ({ initialTime = 180, isActive = false, increment = 0, onTimeOut, serverTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const wasActive = useRef(isActive);
  const hasTimedOut = useRef(false);

  useEffect(() => {
    if (serverTime !== undefined && serverTime !== null) {
      const serverSeconds = Math.max(0, Math.ceil(serverTime / 1000));
      setTimeLeft(serverSeconds);
    }
  }, [serverTime]);

  useEffect(() => {
    if (serverTime === undefined || serverTime === null) {
      setTimeLeft(initialTime);
    }
    hasTimedOut.current = false;
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      hasTimedOut.current = false;
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = Math.max(0, prev - 1);

        if (newTime === 0 && !hasTimedOut.current && onTimeOut) {
          hasTimedOut.current = true;
          onTimeOut();
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeOut]);

  useEffect(() => {
    if (!isActive || !onTimeOut || timeLeft > 0) return;
    if (hasTimedOut.current) return;
    hasTimedOut.current = true;
    onTimeOut();
  }, [isActive, timeLeft, onTimeOut]);

  useEffect(() => {
    wasActive.current = isActive;
  }, [isActive, increment]);

  const formatTime = (seconds) => {
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    const date = new Date(seconds * 1000);
    return format(date, 'mm:ss');
  };

  const isLowTime = timeLeft <= 30;
  const isCriticalTime = timeLeft <= 10;

  return (
    <div
      className={classnames(
        'flex min-w-20 items-center justify-center rounded-lg border-2 px-3 py-1.5 font-mono text-sm tabular-nums transition-all duration-300',
        isActive &&
          !isLowTime &&
          'border-accent bg-accent/10 text-primary',
        isActive && isLowTime && !isCriticalTime && 'border-amber-500 bg-amber-50 text-amber-900',
        isActive && isCriticalTime && 'animate-pulse border-red-500 bg-red-50 text-red-800',
        !isActive && 'border-border bg-tertiary text-grey opacity-70'
      )}
    >
      <p className="font-mono">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
