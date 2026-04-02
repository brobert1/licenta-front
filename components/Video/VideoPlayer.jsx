import { useVideoLifecycle } from '@hooks/video';
import { classnames } from '@lib';
import { useCallback, useRef } from 'react';
import PlayerControls from './PlayerControls';

const SEEK_STEP_SECONDS = 5;

const VideoPlayer = ({ onVideoRef, src }) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  const { embedUrl, handleIframeLoad, isLoaded, iframeSrc, player, sourceKey } = useVideoLifecycle(
    src,
    {
      iframeRef,
      onVideoRef,
    }
  );

  const handleContainerKeyDown = useCallback(
    (e) => {
      if (!player) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

      const target = e.target;
      const tag = target?.tagName;
      const isRangeInput = tag === 'INPUT' && target?.type === 'range';
      if (
        !isRangeInput &&
        (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || target?.isContentEditable)
      ) {
        return;
      }

      if (!containerRef.current?.contains(target)) return;

      e.preventDefault();
      e.stopPropagation();

      const delta = e.key === 'ArrowRight' ? SEEK_STEP_SECONDS : -SEEK_STEP_SECONDS;

      Promise.all([player.getCurrentTime(), player.getDuration()])
        .then(([current, dur]) => {
          const end = typeof dur === 'number' && dur > 0 ? dur : current + Math.abs(delta);
          player.setCurrentTime(Math.min(end, Math.max(0, current + delta)));
        })
        .catch(() => {});
    },
    [player]
  );

  if (!embedUrl) return null;

  return (
    <div
      ref={containerRef}
      aria-keyshortcuts="ArrowLeft ArrowRight"
      aria-label="Video player. Left and right arrow keys seek five seconds."
      className="video-player-container overflow-hidden rounded-lg bg-black ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
      role="region"
      tabIndex={0}
      onKeyDown={handleContainerKeyDown}
    >
      <div className="video-player-inner relative w-full aspect-video bg-black overflow-hidden">
        <iframe
          key={sourceKey}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className={classnames(
            'relative z-0 h-full w-full border-0 transition-opacity duration-500 ease-in-out',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          credentialless=""
          referrerPolicy="strict-origin-when-cross-origin"
          ref={iframeRef}
          src={iframeSrc}
          title="Vimeo video"
          onLoad={handleIframeLoad}
        />
        {!isLoaded && (
          <div
            aria-busy="true"
            aria-label="Loading video"
            className="absolute inset-0 z-10 bg-tertiary"
          />
        )}
        {player && <PlayerControls player={player} rootRef={containerRef} />}
      </div>
    </div>
  );
};

export default VideoPlayer;
