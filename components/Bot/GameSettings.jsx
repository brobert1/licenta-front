import { useChessContext } from '@chess/contexts/ChessContext';
import { Button } from '@components';
import { ColorSelector, TimeControl } from '@components/Bot';
import { PositionSelectorModal } from '@components/Modals';
import { useBotContext } from '@contexts/BotContext';
import { useDisclosure } from '@hooks';
import { classnames } from '@lib';
import { constants } from 'next-chessground';

const GameSettings = ({ onStartGame, isEngineReady }) => {
  const positionModal = useDisclosure();
  const moreSettings = useDisclosure();
  const { gameSettings, updateGameSettings } = useBotContext();
  const { resetGameState } = useChessContext();

  const handlePositionSelect = (position) => {
    updateGameSettings({
      selectedPosition: position,
    });
  };

  const handleTimeControlChange = (timeControlSettings) => {
    updateGameSettings({
      timeControl: {
        ...gameSettings.timeControl,
        ...timeControlSettings,
      },
    });
  };

  const handleColorChange = (color) => {
    updateGameSettings({
      playerColor: color,
    });
  };

  const handleSelectPositionClick = () => {
    positionModal.show();
  };

  const handlePlayClick = () => {
    const resolvedColor =
      gameSettings.playerColor === 'random'
        ? Math.random() < 0.5
          ? 'white'
          : 'black'
        : gameSettings.playerColor;

    updateGameSettings({ playerColor: resolvedColor });

    // Seed the shared chess context with the actual starting position so
    // timers, chat state, and turn-based UI all agree before the first move.
    resetGameState(gameSettings.selectedPosition?.fen || constants.initialFen);

    if (onStartGame) {
      onStartGame();
    }
  };

  return (
    <div className="flex flex-col p-4 gap-5 border-t border-border">
      <div className="flex flex-row flex-wrap items-end justify-between gap-4 w-full">
        <Button
          type="button"
          aria-expanded={moreSettings.isOpen}
          className="button full secondary border-border hover:bg-secondary h-10 min-h-10 px-4 py-0 font-medium text-primary shadow-sm shrink-0 flex items-center justify-center gap-2"
          onClick={moreSettings.toggle}
        >
          <span>Settings</span>
          <i
            className={classnames(
              'fas fa-chevron-down text-xs transition-transform duration-200',
              moreSettings.isOpen && 'rotate-180'
            )}
          ></i>
        </Button>
        <ColorSelector
          defaultColor={gameSettings.playerColor}
          onColorChange={handleColorChange}
          selectedPosition={gameSettings.selectedPosition}
        />
      </div>

      {moreSettings.isOpen && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-primary text-sm shrink-0">Play thematic position:</p>
            <Button
              className="button full secondary border-border hover:bg-secondary py-1.5 font-medium text-primary shadow-sm w-full sm:w-auto"
              onClick={handleSelectPositionClick}
            >
              {gameSettings.selectedPosition
                ? gameSettings.selectedPosition.name
                : 'Select position'}
            </Button>
          </div>
          <TimeControl value={gameSettings.timeControl} onChange={handleTimeControlChange} />
        </div>
      )}

      <Button
        onClick={handlePlayClick}
        disabled={!isEngineReady}
        className="button flex items-center justify-center full accent w-full font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isEngineReady ? 'Play' : 'Bots are warming up...'}
      </Button>
      <PositionSelectorModal
        initialPosition={gameSettings.selectedPosition}
        isOpen={positionModal.isOpen}
        hide={positionModal.hide}
        onPositionSelect={handlePositionSelect}
      />
    </div>
  );
};

export default GameSettings;
