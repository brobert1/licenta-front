import { useEffect } from 'react';

/**
 * Custom Hook to lock the body scroll
 *
 * Prevents the body from scrolling when invoked. It locks the scroll by setting `overflow: hidden` on the body
 * and restores the original overflow style on cleanup.
 */
const useLockBodyScroll = () => {
  useEffect(() => {
    // Lock the scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore the original overflow
      document.body.style.overflow = originalOverflow;
    };
  }, []); // Empty dependency array ensures the effect runs only on mount and cleanup on unmount
};

export default useLockBodyScroll;
