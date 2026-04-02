import { Button } from '@components';
import { useDrillContext } from '@contexts/DrillContext';
import { useWindowSize } from '@hooks';
import { classnames } from '@lib';
import { useMemo } from 'react';

const ChangeHintMode = ({ mode, setMode, isCompleted }) => {
  const { values } = useDrillContext();
  const { hasNoMoves } = values;
  const { isMobile } = useWindowSize();

  // Disable hint modes if the drill has no moves or is completed
  const disabled = useMemo(() => {
    return hasNoMoves || isCompleted;
  }, [isCompleted, hasNoMoves]);

  return (
    <div className={classnames('flex items-center w-full gap-2', !isMobile && 'hint-mode')}>
      <Button
        className={classnames(
          'inline-flex items-center rounded border border-border px-2 py-2 text-primary bg-surface md:px-3 md:min-h-9 transition-colors hover:bg-secondary',
          mode === 'text' && 'ring-2 ring-accent bg-secondary'
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
      <div className="flex flex-wrap gap-1 items-center justify-center rounded py-0.5 px-2 bg-tertiary border border-white/10">
        <h3 className="hidden md:flex text-primary text-xs 2xl:text-sm font-semibold mr-1">
          Drill mode
        </h3>
        <Button
          className={classnames(
            'inline-flex items-center rounded border border-border px-2 py-2 text-primary bg-surface transition-colors',
            disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-secondary',
            mode === 'arrows' && !disabled && 'ring-2 ring-accent bg-secondary'
          )}
          onClick={() => setMode('arrows')}
          title="Arrow hints"
          disabled={disabled}
        >
          <i className="w-4 fa-solid fa-arrow-up" />
        </Button>
        <Button
          className={classnames(
            'inline-flex items-center rounded border border-border px-2 py-2 text-primary bg-surface transition-colors',
            disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-secondary',
            mode === 'squares' && !disabled && 'ring-2 ring-accent bg-secondary'
          )}
          onClick={() => setMode('squares')}
          title="Square hints"
          disabled={disabled}
        >
          <i className="w-4 fa-regular fa-square" />
        </Button>
        <Button
          className={classnames(
            'inline-flex items-center rounded border border-border px-2 py-2 text-primary bg-surface transition-colors',
            disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-secondary',
            mode === 'nohint' && !disabled && 'ring-2 ring-accent bg-secondary'
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
