import { useEffect, useRef, useState } from 'react';

const useInlineVideoCollapse = (showVideo, videoUrl, enabled) => {
  const videoRef = useRef(null);
  const [keepPlayerMounted, setKeepPlayerMounted] = useState(false);
  const prevVideoUrlRef = useRef(videoUrl);

  useEffect(() => {
    if (!enabled) {
      setKeepPlayerMounted(false);
      prevVideoUrlRef.current = videoUrl;
      return;
    }

    if (!videoUrl) {
      setKeepPlayerMounted(false);
      prevVideoUrlRef.current = videoUrl;
      return;
    }

    if (prevVideoUrlRef.current !== videoUrl) {
      prevVideoUrlRef.current = videoUrl;
      setKeepPlayerMounted(false);
    }

    if (showVideo) {
      setKeepPlayerMounted(true);
    }
  }, [enabled, showVideo, videoUrl]);

  useEffect(() => {
    if (!showVideo) {
      videoRef.current?.pause?.().catch(() => {});
    }
  }, [showVideo]);

  return { keepPlayerMounted, videoRef };
};

export default useInlineVideoCollapse;
