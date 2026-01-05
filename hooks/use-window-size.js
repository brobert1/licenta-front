import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = width < 768;
  const isMd = width >= 768 && width < 1536;
  const is2xl = width >= 1536;

  return { width, isMobile, isMd, is2xl };
}
