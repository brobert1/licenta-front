import { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { classnames } from '@lib';

const Timer = ({ initialTime = 180, isActive = false, increment = 0, onTimeOut, onTimeChange }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const wasActive = useRef(isActive);
  const hasTimedOut = useRef(false);

  useEffect(() => {
    setTimeLeft(initialTime);
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

  // Report time changes to parent
  useEffect(() => {
    if (onTimeChange) {
      onTimeChange(timeLeft);
    }
  }, [timeLeft, onTimeChange]);

  // Handle increment when player finishes their move
  useEffect(() => {
    // If we were active and now we're not, player just made a move - add increment
    if (wasActive.current && !isActive && increment > 0) {
      setTimeLeft((prev) => prev + increment);
    }

    // Update the ref for next comparison
    wasActive.current = isActive;
  }, [isActive, increment]);

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    return format(date, 'mm : ss');
  };

  return (
    <div
      className={classnames(
        'flex items-center justify-center py-1.5 px-3 border-2 rounded-lg transition-all duration-300 w-24 font-mono text-sm',
        isActive && 'bg-tertiary-container/15 border-tertiary-container text-on-surface',
        !isActive && 'bg-gameplay-elevated border-gameplay-control text-grey opacity-70'
      )}
    >
      <p className="font-mono">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
