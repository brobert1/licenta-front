const SeekBar = ({
  maxDuration,
  onChange,
  onScrubEnd,
  onScrubStart,
  position,
  progressPercent,
}) => (
  <input
    aria-label="Seek"
    className="video-player-range--seek min-w-0 flex-1"
    max={maxDuration}
    min={0}
    step={0.25}
    style={{ '--seek-progress': `${progressPercent}%` }}
    type="range"
    value={Math.min(position, maxDuration)}
    onPointerCancel={onScrubEnd}
    onPointerDown={onScrubStart}
    onPointerUp={onScrubEnd}
    onChange={onChange}
  />
);

export default SeekBar;
