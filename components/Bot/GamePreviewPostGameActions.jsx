import { Button, Link } from '@components';
import { buildBotRematchHref } from '@functions';

const GamePreviewPostGameActions = ({
  black,
  botName,
  id,
  mode,
  onNextMove,
  onPrevMove,
  onShare,
  pgn,
  playerColor,
  startingFen,
  timeControl,
  white,
}) => {
  const handleDownload = () => {
    const blob = new Blob([pgn], { type: 'application/x-chess-pgn' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${white}-vs-${black}.pgn`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const rematchHref = buildBotRematchHref(botName, playerColor, startingFen, timeControl);
  const isOnline = mode === 'online';

  return (
    <div className="flex flex-col gap-2 overflow-hidden border-t border-border bg-surface p-3">
      <Link
        className="button full accent w-full py-2 text-center shadow-md"
        href={`/client/game-review/${id}`}
      >
        <i className="fa-solid fa-star mr-2" />
        Game Review
      </Link>
      {!isOnline && (
        <div className="flex gap-3">
          <Link
            className="button full secondary flex-1 border-border py-2 text-center text-primary shadow-sm"
            href="/client/play/bot"
          >
            <i className="fa-solid fa-plus mr-2 text-muted" />
            New Bot
          </Link>
          <Link
            className="button full secondary flex-1 border-border py-2 text-center text-primary shadow-sm"
            href={rematchHref}
          >
            <i className="fa-solid fa-rotate-right mr-2 text-muted" />
            Rematch
          </Link>
        </div>
      )}
      {isOnline && (
        <Link
          className="button full secondary w-full border-border py-2 text-center text-primary shadow-sm"
          href="/client/play"
        >
          <i className="fa-solid fa-globe mr-2 text-muted" />
          Back to online lobby
        </Link>
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            className="p-1 text-muted transition-colors hover:text-primary"
            onClick={handleDownload}
            title="Download PGN"
          >
            <i className="fa-solid fa-download text-sm" />
          </Button>
          <Button
            className="p-1 text-muted transition-colors hover:text-primary"
            onClick={onShare}
            title="Share game"
          >
            <i className="fa-solid fa-share-nodes text-sm" />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button
            className="p-1 text-muted transition-colors hover:text-primary"
            onClick={onPrevMove}
          >
            <i className="fa-solid fa-chevron-left text-sm" />
          </Button>
          <Button
            className="p-1 text-muted transition-colors hover:text-primary"
            onClick={onNextMove}
          >
            <i className="fa-solid fa-chevron-right text-sm" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GamePreviewPostGameActions;
