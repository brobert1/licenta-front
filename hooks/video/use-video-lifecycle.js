import { buildVimeoPlayerSrc, parseVimeoEmbedInput } from '@functions';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Player from '@vimeo/player';

const useVideoLifecycle = (src, { iframeRef, onVideoRef }) => {
  const { embedUrl, sourceKey, startSeconds } = useMemo(() => {
    if (!src) return {};

    const parsed = parseVimeoEmbedInput(src);
    if (!parsed) return {};

    return {
      embedUrl: buildVimeoPlayerSrc(parsed),
      sourceKey: `${parsed.videoId}:${parsed.privacyHash || ''}`,
      startSeconds: parsed.startSeconds,
    };
  }, [src]);

  const [iframeSrc, setIframeSrc] = useState(embedUrl);
  const [iframeLoadCount, setIframeLoadCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [player, setPlayer] = useState(null);
  const playerRef = useRef(null);
  const prevSourceKeyRef = useRef(null);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useLayoutEffect(() => {
    if (!embedUrl || !sourceKey) return;

    const isSameSource = prevSourceKeyRef.current === sourceKey;

    if (isSameSource && playerRef.current) {
      playerRef.current.setCurrentTime(startSeconds).catch(() => {});
    } else if (!isSameSource) {
      setIframeSrc(embedUrl);
      setIsLoaded(false);
    }

    prevSourceKeyRef.current = sourceKey;
  }, [embedUrl, sourceKey, startSeconds]);

  // Initialize and destroy the Vimeo Player when the iframe (re)loads
  useEffect(() => {
    if (!iframeSrc || iframeLoadCount === 0) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    const instance = new Player(iframe);

    (async () => {
      try {
        await instance.ready();
        if (cancelled) {
          instance.destroy().catch(() => {});
          return;
        }
        instance.pause().catch(() => {});
        if (onVideoRef) onVideoRef.current = instance;
        setPlayer(instance);
      } catch (_) {
        /* ignore */
      }
    })();

    return () => {
      cancelled = true;
      instance.destroy().catch(() => {});
      if (onVideoRef) onVideoRef.current = null;
      setPlayer(null);
    };
  }, [iframeLoadCount, iframeSrc, onVideoRef]);

  const handleIframeLoad = useCallback(() => {
    setIsLoaded(true);
    setIframeLoadCount((n) => n + 1);
  }, []);

  return { embedUrl, handleIframeLoad, isLoaded, iframeSrc, player, sourceKey };
};

export default useVideoLifecycle;
