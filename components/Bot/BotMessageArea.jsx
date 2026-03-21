import { memo } from 'react';
import { useBotChat } from '@hooks';
import { useChessContext } from '@chess/contexts';
import { useBotContext } from '@contexts/BotContext';
import { SelectedBot } from '.';

const BotMessageArea = () => {
  const { history, isUserTurn } = useChessContext();
  const { gameSettings, gameWinner, matchPlayerColor } = useBotContext();

  const colorForChat = matchPlayerColor || gameSettings.playerColor;
  const safeColorForChat = colorForChat === 'random' ? 'white' : colorForChat;

  // isolated to prevent main component re-renders
  const { currentMessage } = useBotChat({
    history,
    playerColor: safeColorForChat,
    gameWinner,
    isUserTurn,
  });

  return <SelectedBot chrome="gameplay" message={currentMessage} showInfo={false} />;
};

export default memo(BotMessageArea);
