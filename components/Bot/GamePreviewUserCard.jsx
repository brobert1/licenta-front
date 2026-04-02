const GamePreviewUserCard = ({ playerName }) => {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-2 shadow-sm">
      <div className="rounded bg-secondary">
        <div className="flex h-12 w-12 items-center justify-center rounded-md">
          <i className="fas fa-user text-xl text-muted" />
        </div>
      </div>
      <p className="text-base font-semibold text-primary">{playerName || 'User'}</p>
    </div>
  );
};

export default GamePreviewUserCard;
