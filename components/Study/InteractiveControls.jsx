import { Button } from '@components';
import { usePuzzleContext } from '@chess/contexts';
import { classnames } from '@lib';

const InteractiveControls = () => {
  const { mode, setMode, isCompleted } = usePuzzleContext();

  const getButtonClass = (targetMode) =>
    classnames(
      'button tertiary flex-1 font-semibold text-sm px-4 py-3',
      isCompleted ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-secondary',
      mode === targetMode && !isCompleted && 'ring-2 ring-accent'
    );

  const handleModeClick = (targetMode) => {
    if (isCompleted) return;
    // Toggle off if clicking same mode, otherwise switch to new mode
    setMode(mode === targetMode ? 'nohint' : targetMode);
  };

  return (
    <div className="bg-zinc-700 rounded-b-md p-3">
      <div className="flex gap-2">
        <Button
          className={getButtonClass('hint')}
          onClick={() => handleModeClick('hint')}
          disabled={isCompleted}
          title="Show hint on origin square"
        >
          HINT
        </Button>
        <Button
          className={getButtonClass('solution')}
          onClick={() => handleModeClick('solution')}
          disabled={isCompleted}
          title="Show solution arrow"
        >
          SOLUTION
        </Button>
      </div>
    </div>
  );
};

export default InteractiveControls;
