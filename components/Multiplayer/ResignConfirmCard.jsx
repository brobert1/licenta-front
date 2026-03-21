import { useMultiplayerContext } from '@contexts/MultiplayerContext';

const ResignConfirmCard = () => {
  const { resignPending, confirmResign, cancelResign } = useMultiplayerContext();

  if (!resignPending) return null;

  return (
    <div className="mb-3 flex animate-fade-in flex-col rounded-xl border border-red-200 bg-red-50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
          <i className="fas fa-flag text-sm text-red-700"></i>
        </div>
        <div>
          <p className="font-landing text-sm font-semibold text-red-900">Resign Game?</p>
          <p className="font-landing text-xs text-red-800">This action cannot be undone</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={confirmResign}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-100 py-2 px-3 font-landing text-sm font-medium text-red-900 transition-colors hover:bg-red-200"
        >
          <i className="fas fa-check text-xs"></i>
          Yes, Resign
        </button>
        <button
          type="button"
          onClick={cancelResign}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/10 bg-gameplay-control py-2 px-3 font-landing text-sm font-medium text-on-surface transition-colors hover:bg-gameplay-elevated"
        >
          <i className="fas fa-times text-xs"></i>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResignConfirmCard;
