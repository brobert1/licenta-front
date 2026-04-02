import { useBotContext } from '@contexts/BotContext';
import { useRerender } from '@hooks';
import { useEffect } from 'react';
import GameSetupResponsive from './GameSetupResponsive';

const GameSetup = ({ onStartGame, isEngineReady }) => {
  const { gameSettings } = useBotContext();
  const [boardKey, rerender] = useRerender('board');

  useEffect(() => {
    rerender();
  }, [gameSettings.playerColor, gameSettings.selectedPosition, rerender]);

  return (
    <GameSetupResponsive
      gameSettings={gameSettings}
      boardKey={boardKey}
      isEngineReady={isEngineReady}
      onStartGame={onStartGame}
    />
  );
};

export default GameSetup;
