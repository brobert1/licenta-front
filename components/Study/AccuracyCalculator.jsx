import { useDrillContext } from '@contexts/DrillContext';
import { classnames } from '@lib';
import { isEmpty } from 'lodash';

const AccuracyCalculator = ({ onRetryMistakes }) => {
  const { values } = useDrillContext();
  const { goodMoves, totalMoves, wrongMoves, accuracy } = values || {};
  const isClean = isEmpty(wrongMoves);

  return (
    <div
      className={classnames(
        'rounded-xl lg:rounded-none border p-4 space-y-3',
        isClean ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={classnames(
            'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
            isClean ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
          )}
        >
          <i className={classnames('text-xs fas', isClean ? 'fa-trophy' : 'fa-exclamation')} />
        </div>
        <span className="text-sm font-semibold text-primary">
          {isClean ? 'Completed!' : 'Almost complete'}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 bg-surface rounded-xl lg:rounded-none p-3 border border-border flex flex-col items-center">
          <div className="text-xs text-muted mb-1">Moves</div>
          <div className="text-base font-bold text-primary">
            {goodMoves}/{totalMoves}
          </div>
        </div>
        <div className="flex-1 bg-surface rounded-xl lg:rounded-none p-3 border border-border flex flex-col items-center">
          <div className="text-xs text-muted mb-1">Accuracy</div>
          <div className="text-base font-bold text-primary">
            {accuracy === 'N/A' ? accuracy : `${accuracy}%`}
          </div>
        </div>
        {isClean ? (
          <div className="flex-1 bg-emerald-100 rounded-xl lg:rounded-none p-3 border border-emerald-200 flex flex-col items-center justify-center">
            <i className="fas fa-check text-emerald-600 text-sm mb-1" />
            <div className="text-xs font-semibold text-emerald-700">Well done!</div>
          </div>
        ) : (
          <button
            onClick={onRetryMistakes}
            className="flex-1 bg-accent text-white rounded-xl lg:rounded-none p-3 hover:opacity-90 transition-opacity flex flex-col items-center justify-center"
          >
            <i className="fas fa-redo text-xs mb-1" />
            <div className="text-xs font-semibold">Retry</div>
            <div className="text-xs font-semibold">mistakes</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default AccuracyCalculator;
