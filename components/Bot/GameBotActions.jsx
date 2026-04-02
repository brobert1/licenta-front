import { Button } from '@components';
import { useGameActionControls } from '@hooks';
import GameResignModal from './GameResignModal';

const GameBotActions = ({ mutation, onPrevMove, onNextMove, onTakeback, currentOpening }) => {
  const controls = useGameActionControls({ currentOpening, mutation });

  return (
    <>
      <div className="flex flex-col bg-surface border-t border-border gap-2 p-3">
        <div className="grid grid-cols-4 gap-2">
          <Button
            className="button full secondary border-border text-lg w-full text-muted hover:text-primary transition-colors hover:bg-secondary hover:border-accent/50 shadow-sm"
            onClick={controls.openResignModal}
          >
            <i className="fa-solid fa-flag"></i>
          </Button>
          <Button
            className="button full secondary border-border text-lg w-full text-muted hover:text-primary transition-colors hover:bg-secondary hover:border-accent/50 shadow-sm"
            onClick={onPrevMove}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
          <Button
            className="button full secondary border-border text-lg w-full text-muted hover:text-primary transition-colors hover:bg-secondary hover:border-accent/50 shadow-sm"
            onClick={onNextMove}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
          <Button
            className="button full secondary border-border text-lg w-full text-muted hover:text-primary transition-colors hover:bg-secondary hover:border-accent/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            onClick={onTakeback}
            disabled={!controls.canTakeback}
          >
            <i className="fa-solid fa-reply"></i>
          </Button>
        </div>
      </div>
      <GameResignModal
        isOpen={controls.isResignModalOpen}
        onClose={controls.hideResignModal}
        onConfirm={controls.handleResignConfirm}
      />
    </>
  );
};

export default GameBotActions;
