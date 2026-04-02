import { useEffect, useLayoutEffect, useState } from 'react';

const PANEL_TRANSITION_MS = 700;

const useVideoPanel = (videoUrl, prevVideoUrl) => {
  const [displayVideoUrl, setDisplayVideoUrl] = useState(videoUrl || prevVideoUrl);
  // Start from what was previously shown, not what's currently available.
  // The useEffect below then transitions into the correct state, triggering
  // the expand or collapse animation in both directions.
  const [isExpanded, setIsExpanded] = useState(!!prevVideoUrl);

  // Keep URL in sync before paint so VideoPlayer remount keys match the current src.
  useLayoutEffect(() => {
    if (videoUrl) {
      setDisplayVideoUrl(videoUrl);
    }
  }, [videoUrl]);

  useEffect(() => {
    let animationFrameId;
    let timeoutId;

    if (videoUrl) {
      animationFrameId = requestAnimationFrame(() => setIsExpanded(true));
    } else {
      setIsExpanded(false);
      timeoutId = setTimeout(() => setDisplayVideoUrl(null), PANEL_TRANSITION_MS);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [videoUrl]);

  return { displayVideoUrl, isExpanded };
};

export default useVideoPanel;
