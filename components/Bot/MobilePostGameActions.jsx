import { Button, Link } from '@components';
import { classnames } from '@lib';

const postGameActionClass =
  'm-0 flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg py-2 text-muted transition-colors hover:bg-secondary hover:text-primary active:bg-tertiary';

const MobilePostGameActions = ({
  canReviewGame,
  canShareGame,
  isGuest,
  onCopyPgn,
  onDownload,
  onNewBot,
  onRematch,
  onShare,
  reviewHref,
}) => {
  return (
    <>
      <Button className={postGameActionClass} onClick={onRematch}>
        <i className="fa-solid fa-rotate-right text-base leading-none" />
        <span className="text-xs leading-none">Rematch</span>
      </Button>
      <Button className={postGameActionClass} onClick={onNewBot}>
        <i className="fa-solid fa-plus text-base leading-none" />
        <span className="text-xs leading-none">New</span>
      </Button>
      <Link
        href={reviewHref}
        aria-label="Review game"
        title="Review"
        className={classnames(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-lg transition-opacity hover:opacity-90 active:opacity-80',
          !canReviewGame && 'pointer-events-none opacity-50'
        )}
      >
        <i className="fa-solid fa-star text-lg leading-none" />
      </Link>
      <Button className={postGameActionClass} onClick={onDownload}>
        <i className="fa-solid fa-download text-base leading-none" />
        <span className="text-xs leading-none">Download</span>
      </Button>
      {isGuest ? (
        <Button className={postGameActionClass} onClick={onCopyPgn}>
          <i className="fa-solid fa-copy text-base leading-none" />
          <span className="text-xs leading-none">Copy PGN</span>
        </Button>
      ) : (
        <Button
          className={classnames(
            postGameActionClass,
            !canShareGame && 'cursor-not-allowed opacity-40'
          )}
          onClick={onShare}
          disabled={!canShareGame}
        >
          <i className="fa-solid fa-share-nodes text-base leading-none" />
          <span className="text-xs leading-none">Share</span>
        </Button>
      )}
    </>
  );
};

export default MobilePostGameActions;
