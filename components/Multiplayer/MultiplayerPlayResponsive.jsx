'use client';

import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useLockBodyScroll, useWindowSize } from '@hooks';
import GameOverModal from './GameOverModal';
import MultiplayerGameDesktop from './MultiplayerGameDesktop';
import MultiplayerGameMobile from './MultiplayerGameMobile';

const MultiplayerPlayResponsive = () => {
  const { activeGame, opponent } = useMultiplayerContext();
  const { isMobile, isReady } = useWindowSize();

  useLockBodyScroll(isReady && isMobile, 'html');

  if (!isReady) return null;
  if (!activeGame || !opponent) return null;

  return (
    <>
      {isMobile ? <MultiplayerGameMobile /> : <MultiplayerGameDesktop />}
      <GameOverModal />
    </>
  );
};

export default MultiplayerPlayResponsive;
