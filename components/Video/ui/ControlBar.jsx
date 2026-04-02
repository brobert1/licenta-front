import { classnames } from '@lib';
import { Button } from '@components';
import SeekBar from './SeekBar';
import TimeDisplay from './TimeDisplay';
import VolumeControl from './VolumeControl';

const ControlBar = ({
  activeTrack,
  duration,
  isFullscreen,
  isMuted,
  onScrub,
  onScrubEnd,
  onScrubStart,
  onToggleFullscreen,
  onToggleMute,
  onTogglePlay,
  onToggleSubtitles,
  onVolumeChange,
  position,
  progressPercent,
  textTracks,
  volume,
}) => {
  const maxDuration = duration > 0 ? duration : 1;

  return (
    <div
      className={classnames(
        'absolute bottom-0 left-0 right-0 z-20 flex flex-col border-t border-white/10 bg-black/55 backdrop-blur-md',
        !isFullscreen && 'rounded-b-lg'
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 pt-2">
        <SeekBar
          maxDuration={maxDuration}
          position={position}
          progressPercent={progressPercent}
          onChange={onScrub}
          onScrubEnd={onScrubEnd}
          onScrubStart={onScrubStart}
        />
      </div>
      <div className="flex items-center gap-3 px-2 pb-2.5 sm:gap-3">
        <Button
          aria-label="Pause"
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          onClick={onTogglePlay}
        >
          <i className="fa-solid fa-pause text-xs" />
        </Button>
        <TimeDisplay duration={duration} position={position} />
        <div className="flex-1" />
        <VolumeControl
          isMuted={isMuted}
          volume={volume}
          onToggleMute={onToggleMute}
          onVolumeChange={onVolumeChange}
        />
        {textTracks.length > 0 && (
          <Button
            aria-label={activeTrack ? 'Disable subtitles' : 'Enable subtitles'}
            aria-pressed={Boolean(activeTrack)}
            className={classnames(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10',
              activeTrack ? 'text-white' : 'text-white/70 hover:text-white'
            )}
            onClick={onToggleSubtitles}
          >
            <i className="fa-solid fa-closed-captioning text-xs" />
          </Button>
        )}
        <Button
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          onClick={onToggleFullscreen}
        >
          <i
            className={classnames('fa-solid text-xs', isFullscreen ? 'fa-compress' : 'fa-expand')}
          />
        </Button>
      </div>
    </div>
  );
};

export default ControlBar;
