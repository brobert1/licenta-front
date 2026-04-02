import { PgnTreeMobile } from '@chess/components/PgnViewer';
import GameBoardStage from './GameBoardStage';
import MobileBotBanner from './MobileBotBanner';
import MobileGameActions from './MobileGameActions';
import MobileTimerBar from './MobileTimerBar';

const GamePlayMobile = ({ model }) => {
  const { actions, board, clock, game, review } = model;

  return (
    <div className="max-w-chess-board flex flex-col gap-2 pb-28">
      <MobileBotBanner />
      <GameBoardStage
        actions={actions}
        board={board}
        clock={clock}
        gameWinner={game.gameWinner}
        review={review}
      />
      {clock.isTimedGame && (
        <MobileTimerBar
          botInitialTime={clock.botInitialTime}
          isBotTurn={clock.isBotTurn}
          mutation={game.mutation}
          playerInitialTime={clock.playerInitialTime}
          setBotTime={clock.setBotTime}
          setPlayerTime={clock.setPlayerTime}
        />
      )}
      <PgnTreeMobile
        canGoNext={review.canGoNext}
        canGoPrev={review.canGoPrev}
        current={review.current}
        mainlineMoments={review.mainlineMoments}
        onMoveClick={review.goToMoment}
        onNextMove={review.goNextMoment}
        onPrevMove={review.goPrevMoment}
      />
      <MobileGameActions
        currentOpening={game.currentOpening}
        mutation={game.mutation}
        onNewBot={actions.handleBackToSetup}
        onRematch={actions.handleRematch}
        onTakeback={actions.handleTakeback}
      />
    </div>
  );
};

export default GamePlayMobile;
