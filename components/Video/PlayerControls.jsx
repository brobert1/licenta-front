import { useControlsVisibility, useFullscreen, usePlayerControls } from '@hooks/video';
import { classnames } from '@lib';
import { useEffect } from 'react';
import { ControlBar, PlayOverlay } from './ui';

const PlayerControls = ({ player, rootRef }) => {
  const {
    activeTrack,
    duration,
    handleScrub,
    handleVolumeChange,
    isMuted,
    onScrubEnd,
    onScrubStart,
    playing,
    position,
    progressPercent,
    startPlayback,
    textTracks,
    toggleMute,
    togglePlay,
    toggleSubtitles,
    volume,
  } = usePlayerControls(player);

  const { isFullscreen, toggleFullscreen } = useFullscreen(rootRef);
  const { visible, show, hide } = useControlsVisibility(playing);

  // Attach mouse + keyboard listeners to the player container
  useEffect(() => {
    const el = rootRef?.current;
    if (!el) return;

    const onKeyDown = (e) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };

    el.addEventListener('mousemove', show);
    el.addEventListener('mouseleave', hide);
    el.addEventListener('keydown', onKeyDown);

    return () => {
      el.removeEventListener('mousemove', show);
      el.removeEventListener('mouseleave', hide);
      el.removeEventListener('keydown', onKeyDown);
    };
  }, [rootRef, show, hide, togglePlay]);

  // Hide the cursor when controls are hidden while playing
  useEffect(() => {
    const el = rootRef?.current;
    if (!el) return;
    el.style.cursor = playing && !visible ? 'none' : '';
  }, [rootRef, playing, visible]);

  return (
    <div className="absolute inset-0" onClick={togglePlay}>
      {!playing && <PlayOverlay onPlay={startPlayback} />}
      {playing && (
        <div
          className={classnames(
            'absolute inset-0',
            visible
              ? 'opacity-100'
              : 'pointer-events-none opacity-0 transition-opacity duration-300'
          )}
        >
          <ControlBar
            activeTrack={activeTrack}
            duration={duration}
            isFullscreen={isFullscreen}
            isMuted={isMuted}
            position={position}
            progressPercent={progressPercent}
            textTracks={textTracks}
            onScrub={handleScrub}
            onScrubEnd={onScrubEnd}
            onScrubStart={onScrubStart}
            onToggleFullscreen={toggleFullscreen}
            onToggleMute={toggleMute}
            onTogglePlay={togglePlay}
            onToggleSubtitles={toggleSubtitles}
            onVolumeChange={handleVolumeChange}
            volume={volume}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerControls;
