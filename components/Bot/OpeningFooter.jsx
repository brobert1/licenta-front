const OpeningFooter = ({ currentOpening, history, resumedOpeningName }) => {
  const openingDisplay =
    history.length === 0
      ? 'Starting position'
      : currentOpening?.name || resumedOpeningName || 'Starting position';

  return (
    <div className="px-4 py-2 bg-surface border-t border-border flex items-center justify-between">
      <p className="text-sm text-primary truncate" title={openingDisplay}>
        {openingDisplay}
      </p>
      <i className="fas fa-book-atlas text-muted text-sm"></i>
    </div>
  );
};

export default OpeningFooter;
