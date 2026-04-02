import { constants, NextChessground } from 'next-chessground';

const GameBoardStage = ({ actions, board, clock, gameWinner, review }) => {
  const {
    BoardComponent,
    boardKey,
    botElo,
    gameBoardRef,
    openingLine,
    playerColor,
    resumeHistory,
    selectedPosition,
    timeControl,
  } = board;
  const { botTime, playerTime } = clock;
  const { current, isReviewMode } = review;

  return (
    <div className="relative">
      <div className={isReviewMode ? 'invisible' : undefined}>
        <BoardComponent
          boardRef={gameBoardRef}
          key={boardKey}
          handleGameOver={actions.onGameOver}
          elo={botElo}
          fen={selectedPosition?.fen || constants.initialFen}
          playerColor={playerColor}
          orientation={playerColor}
          thinkTime={2000}
          onMove={actions.onMove}
          openingLine={openingLine}
          timeControl={timeControl}
          playerTime={playerTime}
          botTime={botTime}
          viewOnly={!!gameWinner}
          resumeHistory={resumeHistory}
        />
      </div>
      {isReviewMode && (
        <div className="absolute inset-0">
          <NextChessground
            fen={current.fen}
            lastMove={current?.from && current?.to ? [current.from, current.to] : null}
            orientation={playerColor}
            viewOnly={true}
          />
        </div>
      )}
    </div>
  );
};

export default GameBoardStage;
