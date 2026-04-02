import { Button } from '@components';

const PlayOverlay = ({ onPlay }) => (
  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 transition-colors">
    <Button
      aria-label="Play video"
      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-none backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
      type="button"
      onClick={onPlay}
    >
      <i className="fa-solid fa-play pl-0.5 text-lg text-white/95" />
    </Button>
  </div>
);

export default PlayOverlay;
