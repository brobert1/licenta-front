import { Button } from '@components';
import { classnames } from '@lib';

const GameReviewControls = ({ onStart, onPrev, onNext, onEnd, onPlay, isPlaying, isAtEnd }) => {
  return (
    <div className="sticky bottom-0 lg:bg-secondary lg:border-t lg:border-white/10 lg:px-4 py-4">
      <div className="flex items-center justify-center gap-2 w-full">
        <Button className="button tertiary text-2xl flex-1 py-3" onClick={onStart}>
          <i className="fa-solid fa-backward-fast"></i>
        </Button>
        <Button className="button tertiary text-2xl flex-1 py-3" onClick={onPrev}>
          <i className="fa-solid fa-chevron-left"></i>
        </Button>
        <Button
          className="button tertiary text-2xl flex-1 py-3"
          onClick={onPlay}
          disabled={isAtEnd}
        >
          <i className={classnames('fa-solid', isPlaying ? 'fa-pause' : 'fa-play')}></i>
        </Button>
        <Button className="button tertiary text-2xl flex-1 py-3" onClick={onNext}>
          <i className="fa-solid fa-chevron-right"></i>
        </Button>
        <Button className="button tertiary text-2xl flex-1 py-3" onClick={onEnd}>
          <i className="fa-solid fa-forward-fast"></i>
        </Button>
      </div>
    </div>
  );
};

export default GameReviewControls;
