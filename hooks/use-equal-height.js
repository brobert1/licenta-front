import { useEffect, useRef } from 'react';

const MD_MIN_WIDTH = '(min-width: 768px)';

const useEqualHeight = (options = {}) => {
  const { desktopOnly = false } = options;
  const sourceRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const source = sourceRef.current;
    const target = targetRef.current;
    if (!source || !target) return;

    const shouldSync = () =>
      !desktopOnly || (typeof window !== 'undefined' && window.matchMedia(MD_MIN_WIDTH).matches);

    const updateHeight = () => {
      try {
        if (!shouldSync()) {
          target.style.height = '';
          return;
        }
        const height = source.offsetHeight;
        target.style.height = height > 0 ? `${height}px` : '';
      } catch {
        return;
      }
    };

    updateHeight();

    const mql = typeof window !== 'undefined' ? window.matchMedia(MD_MIN_WIDTH) : null;
    const onBreakpoint = () => updateHeight();
    if (mql) mql.addEventListener('change', onBreakpoint);

    const resizeObserver = new ResizeObserver(() => updateHeight());
    resizeObserver.observe(source);

    return () => {
      if (mql) mql.removeEventListener('change', onBreakpoint);
      resizeObserver.disconnect();
    };
  }, [desktopOnly]);

  return { sourceRef, targetRef };
};

export default useEqualHeight;
