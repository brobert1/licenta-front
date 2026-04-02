import { Button } from '@components';
import { classnames } from '@lib';

const volumeIcon = (volume) => {
  if (volume < 0.05) return 'fa-volume-xmark';
  if (volume < 0.5) return 'fa-volume-low';
  return 'fa-volume-high';
};

const VolumeControl = ({ isMuted, onToggleMute, onVolumeChange, volume }) => (
  <div
    className="group relative flex items-center justify-center"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 flex flex-col items-center gap-2 rounded-lg bg-black/55 px-3 py-3 backdrop-blur-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150">
      <span className="text-white/60 text-xs tabular-nums select-none">
        {Math.round(volume * 100)}%
      </span>
      <input
        aria-label="Volume"
        className="video-player-range--volume"
        max={1}
        min={0}
        step={0.02}
        style={{ '--vol-progress': `${Math.round(volume * 100)}%` }}
        type="range"
        value={volume}
        onChange={onVolumeChange}
      />
    </div>
    <Button
      aria-label={isMuted ? 'Unmute' : 'Mute'}
      aria-pressed={isMuted}
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      onClick={onToggleMute}
    >
      <i className={classnames('fa-solid text-xs', volumeIcon(volume))} />
    </Button>
  </div>
);

export default VolumeControl;
