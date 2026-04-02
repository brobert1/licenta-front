'use client';

import { useMultiplayerContext } from '@contexts/MultiplayerContext';

const ResignConfirmCard = () => {
  const { resignPending, confirmResign, cancelResign } = useMultiplayerContext();

  if (!resignPending) return null;

  return (
    <div className="mb-3 flex animate-fade-in flex-col rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
          <i className="fas fa-flag text-sm text-red-700"></i>
        </div>
        <div>
          <p className="text-sm font-semibold text-red-900">Resign game?</p>
          <p className="text-xs text-red-800">This cannot be undone.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={confirmResign}
          className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-100 px-3 text-sm font-semibold text-red-900 transition-colors hover:bg-red-200"
        >
          <i className="fas fa-check text-xs"></i>
          Yes, resign
        </button>
        <button
          type="button"
          onClick={cancelResign}
          className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm font-semibold text-primary transition-colors hover:bg-tertiary"
        >
          <i className="fas fa-times text-xs"></i>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResignConfirmCard;
