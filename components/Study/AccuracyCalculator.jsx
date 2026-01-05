import { useDrillContext } from '@contexts/DrillContext';
import { isEmpty } from 'lodash';

const AccuracyCalculator = ({ onRetryMistakes }) => {
  const { values } = useDrillContext();
  const { goodMoves, totalMoves, wrongMoves, accuracy } = values || {};

  return (
    <div className="bg-zinc-700 rounded-b-md p-3">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <i className="fas fa-check-circle text-green-500 text-xs"></i>
          <span className="text-white font-medium text-xs">
            {isEmpty(wrongMoves) ? 'Completed' : 'Almost Complete'}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="bg-secondary rounded-md p-3 flex flex-col items-center text-white min-w-[80px]">
          <div className="text-xs opacity-75 mb-1">Moves</div>
          <div className="text-lg font-bold">
            {goodMoves}/{totalMoves}
          </div>
        </div>
        <div className="bg-secondary rounded-md p-3 flex flex-col items-center text-white flex-1">
          <div className="text-xs opacity-75 mb-1">ACCURACY</div>
          <div className="text-lg font-bold">{accuracy === 'N/A' ? accuracy : `${accuracy}%`}</div>
        </div>
        <div className="min-w-[100px]">
          {isEmpty(wrongMoves) ? (
            <div className="bg-green-600 text-white rounded-md p-3 text-center h-full flex flex-col justify-center">
              <div className="text-xs font-semibold">WELL</div>
              <div className="text-xs font-semibold">DONE!</div>
            </div>
          ) : (
            <button
              onClick={onRetryMistakes}
              className="bg-accent text-white rounded-md p-3 hover:bg-accent/80 transition-colors h-full w-full flex flex-col justify-center"
            >
              <div className="text-xs font-semibold">RETRY</div>
              <div className="text-xs font-semibold">MISTAKES</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccuracyCalculator;
