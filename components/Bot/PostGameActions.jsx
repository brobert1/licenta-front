import { Button, Link } from '@components';
import { useGameActionControls } from '@hooks';

const PostGameActions = ({ onNewBot, onRematch, onPrevMove, onNextMove }) => {
  const controls = useGameActionControls({});

  return (
    <div className="flex flex-col flex-shrink-0 bg-surface border-t border-border gap-2 p-3 overflow-hidden animate-post-game-expand">
      <Link
        className="button full text-center accent w-full py-2 shadow-md hover:shadow-lg transition-all"
        href={controls.reviewHref}
      >
        <i className="fa-solid fa-star mr-2"></i>
        Game Review
      </Link>
      <div className="flex gap-3">
        <Button
          className="button full secondary border-border hover:bg-secondary text-primary text-sm flex-1 py-2 shadow-sm"
          onClick={onNewBot}
        >
          <i className="fa-solid fa-plus mr-2 text-muted"></i>
          New Bot
        </Button>
        <Button
          className="button full secondary border-border hover:bg-secondary text-primary text-sm flex-1 py-2 shadow-sm"
          onClick={onRematch}
        >
          <i className="fa-solid fa-rotate-right mr-2 text-muted"></i>
          Rematch
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <Button
          className="text-muted hover:text-primary transition-colors p-1"
          onClick={controls.handleDownloadPgn}
          title="Download PGN"
        >
          <i className="fa-solid fa-download text-sm"></i>
        </Button>
        <div className="flex gap-3">
          <Button
            className="text-muted hover:text-primary transition-colors p-1"
            onClick={onPrevMove}
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </Button>
          <Button
            className="text-muted hover:text-primary transition-colors p-1"
            onClick={onNextMove}
          >
            <i className="fa-solid fa-chevron-right text-sm"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostGameActions;
