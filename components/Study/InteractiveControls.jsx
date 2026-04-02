import { usePuzzleContext } from '@chess/contexts';
import { Button } from '@components';
import { classnames } from '@lib';

const InteractiveControls = ({ onNextChapter, compact = false }) => {
  const { mode, setMode, isCompleted } = usePuzzleContext();

  const handleModeClick = (targetMode) => {
    if (isCompleted) return;
    setMode(mode === targetMode ? 'nohint' : targetMode);
  };

  if (compact) {
    return (
      <div className="flex-shrink-0 w-full flex items-center gap-2 pt-2 pb-1">
        <Button
          onClick={() => handleModeClick('hint')}
          disabled={isCompleted}
          className={classnames(
            'flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border',
            isCompleted
              ? 'bg-secondary text-muted border-border opacity-50 cursor-not-allowed'
              : mode === 'hint'
                ? 'bg-tertiary text-primary border-grey'
                : 'bg-secondary text-primary border-border'
          )}
        >
          Show hint
        </Button>
        <Button
          onClick={() => handleModeClick('solution')}
          disabled={isCompleted}
          className={classnames(
            'flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
            isCompleted
              ? 'bg-accent/40 text-white cursor-not-allowed'
              : mode === 'solution'
                ? 'bg-accent/80 text-white'
                : 'bg-accent text-white'
          )}
        >
          Show solution
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-full px-5 pb-5 pt-3">
      <div className="flex items-center gap-3 rounded-2xl bg-surface border border-border shadow-sm px-4 py-3 overflow-hidden">
        {isCompleted ? (
          <Button
            className="flex items-center gap-2 bg-accent text-white font-semibold text-sm rounded-xl px-5 py-3 shadow-sm hover:opacity-90 transition-opacity"
            onClick={onNextChapter}
          >
            Next chapter
            <i className="fa-solid fa-arrow-right text-xs" />
          </Button>
        ) : (
          <>
            <Button
              onClick={() => handleModeClick('hint')}
              className={classnames(
                'flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                mode === 'hint' ? 'bg-tertiary text-primary' : 'bg-secondary text-primary'
              )}
            >
              Show hint
            </Button>
            <Button
              onClick={() => handleModeClick('solution')}
              className={classnames(
                'flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                mode === 'solution' ? 'bg-accent/80 text-white' : 'bg-accent text-white'
              )}
            >
              Show solution
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default InteractiveControls;
