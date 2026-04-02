import { PgnTree } from '@chess/components/PgnViewer';
import AccuracyCalculator from './AccuracyCalculator';
import DrillTree from './DrillTree';

const DrillSheet = ({ mode, name, pgnProps, isCompleted, handleRetry }) => {
  const { tree, current, goToMoment } = pgnProps;

  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface shadow-sm flex flex-col h-full">
      <div className="relative flex flex-col flex-grow min-h-0">
        <div className="bg-secondary text-primary">
          <p className="text-primary font-semibold border-b p-2.5 border-border overflow-hidden whitespace-nowrap text-ellipsis">
            Moves: {name}
          </p>
        </div>
        <div className="bg-secondary flex-1 flex flex-col overflow-y-auto min-h-0 flex-grow">
          {mode === 'text' ? (
            <PgnTree tree={tree} current={current} onMoveClick={goToMoment} />
          ) : (
            <DrillTree mode={mode} isCompleted={isCompleted} />
          )}
        </div>
      </div>
      {isCompleted && <AccuracyCalculator onRetryMistakes={handleRetry} />}
    </div>
  );
};

export default DrillSheet;
