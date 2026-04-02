import { useCallback, useEffect, useState } from 'react';

const useFullscreen = (rootRef) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = rootRef?.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else el.requestFullscreen?.();
  }, [rootRef]);

  return { isFullscreen, toggleFullscreen };
};

export default useFullscreen;
