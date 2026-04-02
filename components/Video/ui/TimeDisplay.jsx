import { formatTimestamp } from '@functions';

const TimeDisplay = ({ duration, position }) => (
  <span className="shrink-0 text-xs tabular-nums text-white/50">
    <span className="sm:hidden">{formatTimestamp(position)}</span>
    <span className="hidden sm:inline">
      {formatTimestamp(position)} / {formatTimestamp(duration)}
    </span>
  </span>
);

export default TimeDisplay;
