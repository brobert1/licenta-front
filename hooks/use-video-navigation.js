import { useRef } from 'react';

/**
 * Custom hook for video navigation
 * @returns {Object} Video navigation utilities
 */
const useVideoNavigation = () => {
  const videoRef = useRef(null);

  /**
   * Seek to a specific timestamp in the video
   * @param {number} timestamp - Time in seconds to seek to
   */
  const seekToTime = (timestamp) => {
    if (videoRef.current && timestamp) {
      videoRef.current.currentTime = timestamp;
      videoRef.current.play();
    }
  };

  return {
    videoRef,
    seekToTime
  };
};

export default useVideoNavigation;
