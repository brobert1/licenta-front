import { Button } from '@components';
import { ColorSelector, TimeControl } from '@components/Bot';
import { PositionSelectorModal } from '@components/Modals';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts/ChessContext';
import { useDisclosure } from '@hooks';

const GameSettings = ({ onStartGame }) => {
  const { isOpen, show, hide } = useDisclosure();
  const { beginBotMatch, gameSettings, updateGameSettings } = useBotContext();
  const { setHistory } = useChessContext();

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
    show();
  };

  const handlePlayClick = () => {
    beginBotMatch(gameSettings.playerColor);
    setHistory([]);
    if (onStartGame) {
      onStartGame();
    }
  };

  return (
    <div className="flex flex-col p-4 gap-5">
      <div className="flex items-center gap-4">
        <p className="text-white text-sm">Play thematic position:</p>
        <Button
          className="button full secondary border-neutral-700 hover:bg-tertiary py-1.5 font-medium"
          onClick={handleSelectPositionClick}
        >
          {gameSettings.selectedPosition ? gameSettings.selectedPosition.name : 'Select position'}
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
        <TimeControl value={gameSettings.timeControl} onChange={handleTimeControlChange} />
        <ColorSelector
          defaultColor={gameSettings.playerColor}
          onColorChange={handleColorChange}
          selectedPosition={gameSettings.selectedPosition}
        />
      </div>
      <Button
        onClick={handlePlayClick}
        className="button flex items-center justify-center full accent w-full font-bold text-xl"
      >
        Play
      </Button>
      <PositionSelectorModal isOpen={isOpen} hide={hide} onPositionSelect={handlePositionSelect} />
    </div>
  );
};

export default GameSettings;
