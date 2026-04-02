import { useLockBodyScroll, useWindowSize } from '@hooks';
import GameSetupDesktop from './GameSetupDesktop';
import GameSetupMobile from './GameSetupMobile';

const GameSetupResponsive = ({ boardKey, gameSettings, isEngineReady, onStartGame }) => {
  const { isMobile, isReady } = useWindowSize();
  useLockBodyScroll(isReady && isMobile, 'html');

  if (!isReady) return null;

  if (isMobile) return <GameSetupMobile isEngineReady={isEngineReady} onStartGame={onStartGame} />;

  return (
    <GameSetupDesktop
      boardKey={boardKey}
      gameSettings={gameSettings}
      isEngineReady={isEngineReady}
      onStartGame={onStartGame}
    />
  );
};

export default GameSetupResponsive;
