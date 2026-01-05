import { Button } from '@components';
import { useDrillContext } from '@contexts/DrillContext';
import { useWindowSize } from '@hooks';
import { classnames } from '@lib';
import { useMemo } from 'react';

const ChangeHintMode = ({ mode, setMode, isCompleted, isPreview }) => {
  const { values } = useDrillContext();
  const { hasNoMoves } = values;
  const { isMobile } = useWindowSize();

  // Disable hint modes if the drill has no moves, is completed, or is in preview mode
  const disabled = useMemo(() => {
    return hasNoMoves || isCompleted || isPreview;
  }, [isCompleted, hasNoMoves, isPreview]);

  return (
    <div className={classnames('flex items-center w-full gap-2', !isMobile && 'hint-mode')}>
      <Button
        className={classnames(
          'button mini tertiary flex items-center px-2 py-2 md:px-3 md:bg-tertiary md:min-h-9',
          mode === 'text' && 'ring-2 ring-accent'
        )}
        onClick={() => setMode('text')}
        title="Learn Mode"
      >
        <i className="fa-solid fa-book md:hidden" />
        <span className="hidden md:flex items-center">
          <span className="text-xs 2xl:text-sm font-semibold mr-1.5">Learn Mode</span>
          <i className="fa-solid fa-book hidden lg:flex" />
        </span>
      </Button>
      <div className="flex flex-wrap gap-1 items-center justify-center rounded py-0.5 md:bg-tertiary md:px-2">
        <h3 className="hidden md:flex text-white text-xs 2xl:text-sm font-semibold mr-1">
          Drill mode
        </h3>
        <Button
          className={classnames(
            'button mini tertiary flex items-center px-2 py-2',
            disabled ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-secondary',
            mode === 'arrows' && !disabled && 'ring-2 ring-accent'
          )}
          onClick={() => setMode('arrows')}
          title="Arrow hints"
          disabled={disabled}
        >
          <i className="w-4 fa-solid fa-arrow-up" />
        </Button>
        <Button
          className={classnames(
            'button mini tertiary flex items-center px-2 py-2',
            disabled ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-secondary',
            mode === 'squares' && !disabled && 'ring-2 ring-accent'
          )}
          onClick={() => setMode('squares')}
          title="Square hints"
          disabled={disabled}
        >
          <i className="w-4 fa-regular fa-square" />
        </Button>
        <Button
          className={classnames(
            'button mini tertiary flex items-center px-2 py-2',
            disabled ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-secondary',
            mode === 'nohint' && !disabled && 'ring-2 ring-accent'
          )}
          onClick={() => setMode('nohint')}
          title="No hints"
          disabled={disabled}
        >
          <i className="w-4 fa-regular fa-eye-slash" />
        </Button>
      </div>
    </div>
  );
};

export default ChangeHintMode;
