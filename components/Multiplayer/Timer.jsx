import { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { classnames } from '@lib';

const Timer = ({ initialTime = 180, isActive = false, increment = 0, onTimeOut, serverTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const wasActive = useRef(isActive);
  const hasTimedOut = useRef(false);
  const lastServerSync = useRef(Date.now());

  // Sync with server time when received
  useEffect(() => {
    if (serverTime !== undefined && serverTime !== null) {
      // Server time is in milliseconds, convert to seconds
      const serverSeconds = Math.floor(serverTime / 1000);
      setTimeLeft(serverSeconds);
      lastServerSync.current = Date.now();
    }
  }, [serverTime]);

  // Initialize with initial time
  useEffect(() => {
    if (serverTime === undefined || serverTime === null) {
      setTimeLeft(initialTime);
    }
    hasTimedOut.current = false;
  }, [initialTime]);

  // Handle countdown when timer is active
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

  // Handle increment when player finishes their move
  useEffect(() => {
    // If we were active and now we're not, player just made a move
    // Don't add increment here as server handles it and will sync
    wasActive.current = isActive;
  }, [isActive, increment]);

  const formatTime = (seconds) => {
    if (seconds >= 3600) {
      // Show hours if needed
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
        'flex items-center justify-center py-1.5 px-3 text-base border-2 rounded-md transition-all duration-300 min-w-[80px]',
        isActive && !isLowTime && 'bg-green-500/10 border-green-900 text-white',
        isActive &&
          isLowTime &&
          !isCriticalTime &&
          'bg-yellow-500/20 border-yellow-600 text-yellow-200',
        isActive && isCriticalTime && 'bg-red-500/20 border-red-600 text-red-200 animate-pulse',
        !isActive && 'bg-black/20 border-neutral-700 text-neutral-400 opacity-60'
      )}
    >
      <p className="font-mono tabular-nums">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
