import { useEqualHeight } from '@hooks';
import BotCard from './BotCard';
import DesktopSidebar from './DesktopSidebar';
import GameBoardStage from './GameBoardStage';
import MobileBotBanner from './MobileBotBanner';
import UserCard from './UserCard';

const GamePlayDesktop = ({ model }) => {
  const { actions, board, clock, game, review } = model;

  const { sourceRef, targetRef } = useEqualHeight();

  return (
    <div className="w-full grid grid-cols-5 gap-6">
      <div ref={sourceRef} className="col-span-3 max-w-chess-board h-min flex flex-col gap-2">
        <MobileBotBanner />
        <BotCard
          showTimer={clock.isTimedGame}
          mutation={game.mutation}
          timerKey={board.boardKey}
          onTimeChange={clock.setBotTime}
          initialTime={clock.botInitialTime}
          isEngineReady={board.isEngineReady}
        />
        <GameBoardStage
          actions={actions}
          board={board}
          clock={clock}
          gameWinner={game.gameWinner}
          review={review}
        />
        <UserCard
          showTimer={clock.isTimedGame}
          mutation={game.mutation}
          timerKey={board.boardKey}
          onTimeChange={clock.setPlayerTime}
          initialTime={clock.playerInitialTime}
        />
      </div>
      <DesktopSidebar actions={actions} game={game} review={review} targetRef={targetRef} />
    </div>
  );
};

export default GamePlayDesktop;
