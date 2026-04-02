import { useEffect } from 'react';

/**
 * Custom Hook to lock page scroll
 *
 * Prevents the page from scrolling when invoked. It locks the scroll by setting
 * `overflow: hidden` on the chosen root element and restores the original value on cleanup.
 */
const targets = {
  body: () => document.body,
  html: () => document.documentElement,
};

const useLockBodyScroll = (locked = true, target = 'body') => {
  useEffect(() => {
    if (!locked) {
      return undefined;
    }

    const element = targets[target]?.();
    if (!element) {
      return undefined;
    }

    const originalOverflow = element.style.overflow;
    element.style.overflow = 'hidden';

    return () => {
      element.style.overflow = originalOverflow;
    };
  }, [locked, target]);
};

export default useLockBodyScroll;
