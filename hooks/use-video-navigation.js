import { useRef } from 'react';

/**
 * Seek the Vimeo Player instance attached by {@link Video} (via onVideoRef).
 * Does not start playback (no autoplay on chapter change).
 */
const useVideoNavigation = () => {
  const videoRef = useRef(null);

  const seekToTime = (timestamp) => {
    const player = videoRef.current;
    const seconds = Number(timestamp);

    if (!player || !Number.isFinite(seconds) || seconds < 0) return;

    player.setCurrentTime(seconds).catch(() => {});
  };

  return {
    seekToTime,
    videoRef,
  };
};

export default useVideoNavigation;
