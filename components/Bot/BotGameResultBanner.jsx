import { useBotContext } from '@contexts/BotContext';
import GameResultBanner from './GameResultBanner';

const BotGameResultBanner = () => {
  const { gameSettings, gameWinner, selectedBot, terminationReason } = useBotContext();

  return (
    <GameResultBanner
      botName={selectedBot.name}
      gameWinner={gameWinner}
      playerColor={gameSettings.playerColor}
      terminationReason={terminationReason}
    />
  );
};

export default BotGameResultBanner;
