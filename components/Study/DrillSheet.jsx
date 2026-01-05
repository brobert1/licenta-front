import { PgnTree } from '@chess/components/PgnViewer';
import AccuracyCalculator from './AccuracyCalculator';
import DrillTree from './DrillTree';

const DrillSheet = ({ mode, name, pgnProps, isCompleted, handleRetry }) => {
  const { tree, current, goToMoment } = pgnProps;

  return (
    <div className="overflow-hidden rounded-md flex flex-col h-full">
      <div className="relative flex flex-col flex-grow min-h-0">
        <div className="bg-tertiary text-white">
          <p className="text-white font-semibold border-b p-2.5 border-white/10 overflow-hidden whitespace-nowrap text-ellipsis">
            {name}
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
