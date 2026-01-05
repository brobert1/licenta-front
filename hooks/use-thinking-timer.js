import { useEffect, useRef } from 'react';

const useThinkingTimer = ({ isActive, onThinkingShort, onThinkingLong }) => {
  const timeoutsRef = useRef({ short: null, long: null });

  useEffect(() => {
    if (isActive) {
      timeoutsRef.current.short = setTimeout(onThinkingShort, 15000);
      timeoutsRef.current.long = setTimeout(onThinkingLong, 61000);
    }

    return () => {
      clearTimeout(timeoutsRef.current.short);
      clearTimeout(timeoutsRef.current.long);
    };
  }, [isActive, onThinkingShort, onThinkingLong]);
};

export default useThinkingTimer;
