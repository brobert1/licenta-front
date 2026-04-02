import { Button } from '@components';
import { classnames } from '@lib';

const inGameActionBase =
  'm-0 flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2.5 text-muted transition-colors hover:bg-secondary hover:text-primary active:bg-tertiary';

const MobileInGameActions = ({ canTakeback, onResign, onTakeback }) => {
  return (
    <>
      <Button className={classnames(inGameActionBase, 'rounded-l-lg')} onClick={onResign}>
        <i className="fa-solid fa-flag text-base leading-none" />
        <span className="text-xs leading-none">Resign</span>
      </Button>
      <Button
        className={classnames(
          inGameActionBase,
          'rounded-r-lg border-l border-border',
          'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent'
        )}
        disabled={!canTakeback}
        onClick={onTakeback}
      >
        <i className="fa-solid fa-reply text-base leading-none" />
        <span className="text-xs leading-none">Undo</span>
      </Button>
    </>
  );
};

export default MobileInGameActions;
