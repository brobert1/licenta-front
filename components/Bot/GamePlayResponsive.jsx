import { useLockBodyScroll, useWindowSize } from '@hooks';
import GamePlayDesktop from './GamePlayDesktop';
import GamePlayMobile from './GamePlayMobile';

const GamePlayResponsive = ({ model }) => {
  const { isMobile, isReady } = useWindowSize();
  useLockBodyScroll(isReady && isMobile, 'html');

  if (!isReady) return null;

  if (isMobile) return <GamePlayMobile model={model} />;

  return <GamePlayDesktop model={model} />;
};

export default GamePlayResponsive;
