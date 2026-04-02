import { usePuzzleContext } from '@chess/contexts';
import { feedbackMap } from '@constants/feedback';
import { classnames } from '@lib';

const InteractiveFeedback = () => {
  const { feedback, isCompleted } = usePuzzleContext();

  // Determine the correct feedback state:
  // 1. Error feedback for wrong moves
  // 2. Finish feedback for correct moves that complete the puzzle
  // 3. Success feedback for correct moves that don't complete the puzzle
  // 4. Start feedback when no moves have been made or between turns
  let key = feedback || 'start';
  if (feedback === 'success' && isCompleted) {
    key = 'finish';
  }

  const { message } = feedbackMap[key] || {};

  return (
    <div
      className={classnames(
        'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-300',
        key === 'start' && 'bg-blue-50 border border-blue-200',
        key === 'success' && 'bg-emerald-50 border border-emerald-200',
        key === 'finish' && 'bg-emerald-50 border border-emerald-200',
        key === 'error' && 'bg-red-50 border border-red-200'
      )}
    >
      <div
        className={classnames(
          'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0',
          key === 'start' && 'bg-blue-100 text-blue-600',
          key === 'success' && 'bg-emerald-100 text-emerald-600',
          key === 'finish' && 'bg-emerald-100 text-emerald-600',
          key === 'error' && 'bg-red-100 text-red-600'
        )}
      >
        {key === 'error' ? (
          <i className="fas fa-times text-sm" />
        ) : key === 'finish' ? (
          <i className="fas fa-trophy text-sm" />
        ) : (
          <i className="fas fa-chess text-sm" />
        )}
      </div>
      <div>
        <p className="font-semibold text-primary text-sm">{message}</p>
        {key === 'start' && <p className="text-muted text-xs">Find the best move to continue.</p>}
      </div>
    </div>
  );
};

export default InteractiveFeedback;
