import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    // Set real dimensions after mount so server and client agree on first render
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const onResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isReady = width !== null;
  const isMobile = isReady && width < 768;
  const isMd = isReady && width >= 768 && width < 1536;
  const is2xl = isReady && width >= 1536;
  const isSmallHeight = height !== null && height < 700;

  return { width, height, isReady, isMobile, isMd, is2xl, isSmallHeight };
}
