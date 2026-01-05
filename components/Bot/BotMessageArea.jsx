import { memo } from 'react';
import { useBotChat } from '@hooks';
import { useChessContext } from '@chess/contexts';
import { useBotContext } from '@contexts/BotContext';
import { SelectedBot } from '.';

const BotMessageArea = () => {
  const { history, isUserTurn } = useChessContext();
  const { gameWinner } = useBotContext();
  const { gameSettings } = useBotContext();

  // isolated to prevent main component re-renders
  const { currentMessage } = useBotChat({
    history,
    playerColor: gameSettings.playerColor,
    gameWinner,
    isUserTurn,
  });

  return <SelectedBot showInfo={false} message={currentMessage} />;
};

export default memo(BotMessageArea);
