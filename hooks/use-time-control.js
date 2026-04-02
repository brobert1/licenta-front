import { useEffect, useState, useRef, useCallback } from 'react';

const useTimeControl = ({
  initialTime = 180,
  isActive = false,
  increment = 0,
  onTimeOut,
  onTimeChange,
}) => {
  const timeLeftMsRef = useRef(initialTime * 1000);
  const startTimestampRef = useRef(null);
  const wasActive = useRef(isActive);
  const hasTimedOut = useRef(false);

  const [displaySeconds, setDisplaySeconds] = useState(initialTime);

  // Reset when initialTime changes (rematch, takeback)
  useEffect(() => {
    timeLeftMsRef.current = initialTime * 1000;
    startTimestampRef.current = null;
    hasTimedOut.current = false;
    setDisplaySeconds(Math.ceil(initialTime));
  }, [initialTime]);

  const getRemainingMs = useCallback(() => {
    if (startTimestampRef.current === null) return timeLeftMsRef.current;

    const elapsed = Date.now() - startTimestampRef.current;
    return Math.max(0, timeLeftMsRef.current - elapsed);
  }, []);

  // Handle countdown when timer is active
  useEffect(() => {
    if (!isActive || getRemainingMs() <= 0) return;

    startTimestampRef.current = Date.now();

    const interval = setInterval(() => {
      const remainingMs = getRemainingMs();
      setDisplaySeconds(Math.ceil(remainingMs / 1000));

      if (remainingMs <= 0 && !hasTimedOut.current && onTimeOut) {
        hasTimedOut.current = true;
        onTimeOut();
      }
    }, 100);

    return () => {
      timeLeftMsRef.current = getRemainingMs();
      startTimestampRef.current = null;
      clearInterval(interval);
    };
  }, [isActive, onTimeOut, getRemainingMs]);

  // Report time changes to parent — use precise ms rather than the ceil'd
  // display value to avoid accumulating rounding errors over multiple moves
  useEffect(() => {
    if (onTimeChange) onTimeChange(getRemainingMs() / 1000);
  }, [displaySeconds, onTimeChange, getRemainingMs]);

  // Handle increment when player finishes their move
  useEffect(() => {
    if (wasActive.current && !isActive && increment > 0) {
      timeLeftMsRef.current += increment * 1000;
      setDisplaySeconds(Math.ceil(timeLeftMsRef.current / 1000));
    }

    wasActive.current = isActive;
  }, [isActive, increment]);

  return displaySeconds;
};

export default useTimeControl;
