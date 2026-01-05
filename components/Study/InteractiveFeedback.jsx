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
        'text-white flex items-center justify-between font-semibold border-b p-2.5 border-white/10',
        'rounded-t-md',
        key === 'start' && 'bg-blue-600',
        key === 'success' && 'bg-green-700',
        key === 'finish' && 'bg-green-700',
        key === 'error' && 'bg-red-700'
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default InteractiveFeedback;
