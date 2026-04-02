import { PgnTree } from '@chess/components/PgnViewer';
import { usePgnViewer } from '@chess/hooks';
import { GameResultBanner } from '@components/Bot';
import { GameReviewControls, ReviewPlayerCards } from '@components/GameReview';
import { useEqualHeight } from '@hooks';
import { getNextMoments } from 'chess-moments';
import { NextChessground } from 'next-chessground';
import { useEffect, useRef, useState } from 'react';

const GameViewerBoard = ({ game }) => {
  const { botName, outcome, moves, opening, pgn, playerColor, playerName, terminationReason } =
    game || {};
  const orientation = playerColor || 'white';
  const white = playerColor === 'white' ? playerName : botName;
  const black = playerColor === 'black' ? playerName : botName;

  const {
    tree,
    current,
    lastMove,
    onUserMove,
    goToMoment,
    goNextMoment,
    goPrevMoment,
    goToStart,
    goToEnd,
    moments,
  } = usePgnViewer(pgn, { autoSelectMainline: true });

  const { sourceRef, targetRef } = useEqualHeight();
  const [isPlaying, setIsPlaying] = useState(false);
  const boardRef = useRef();

  const isAtEnd =
    !getNextMoments(moments, current) || getNextMoments(moments, current).length === 0;

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const nextMoments = getNextMoments(moments, current);

      if (!nextMoments || nextMoments.length === 0) {
        setIsPlaying(false);
        return;
      }

      const nextMove = nextMoments[0];
      if (nextMove && boardRef.current?.move) {
        boardRef.current.move(nextMove.from, nextMove.to);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying, current, moments]);

  const resultLabel =
    outcome === 'draw' ? 'Draw' : outcome === 'win' ? `${playerName} won` : `${botName} won`;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">
          {white} <span className="text-muted font-normal">vs</span> {black}
        </h1>
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
            <i className="fa-solid fa-trophy text-yellow-400 text-xs"></i>
            {resultLabel}
          </span>
          {moves && (
            <span className="text-muted text-sm">
              <i className="fa-solid fa-chess-clock mr-1.5"></i>
              {moves} moves
            </span>
          )}
          {opening && (
            <span className="text-muted text-sm">
              <i className="fa-solid fa-book-atlas mr-1.5"></i>
              {opening}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 outline-none w-full gap-6">
        <div className="lg:col-span-3 max-w-chess-board">
          <div ref={sourceRef}>
            <NextChessground
              ref={boardRef}
              fen={current.fen}
              lastMove={lastMove}
              orientation={orientation}
              onMove={onUserMove}
              viewOnly={false}
            />
          </div>
          <div className="lg:hidden mt-2">
            <GameReviewControls
              onStart={goToStart}
              onPrev={goPrevMoment}
              onNext={goNextMoment}
              onEnd={goToEnd}
              onPlay={handlePlayPause}
              isPlaying={isPlaying}
              isAtEnd={isAtEnd}
            />
          </div>
        </div>
        <div ref={targetRef} className="lg:col-span-2 flex flex-col overflow-hidden">
          <div className="flex flex-col h-full overflow-hidden rounded-md bg-secondary">
            <ReviewPlayerCards game={game} me={null} isLoading={false} showAccuracy={false} />
            <div className="overflow-y-auto min-h-0 flex-grow bg-white">
              <PgnTree
                tree={tree}
                current={current}
                onMoveClick={goToMoment}
                autoScroll={true}
                analysis={false}
              />
            </div>
            <GameResultBanner
              botName={botName}
              outcome={outcome}
              playerColor={playerColor}
              playerName={playerName}
              terminationReason={terminationReason}
            />
            {opening && (
              <div className="px-4 py-3 bg-tertiary border-t border-border flex items-center justify-between">
                <p className="text-sm text-primary">{opening}</p>
                <i className="fas fa-book-atlas text-primary text-sm"></i>
              </div>
            )}
            <div className="hidden lg:block">
              <GameReviewControls
                onStart={goToStart}
                onPrev={goPrevMoment}
                onNext={goNextMoment}
                onEnd={goToEnd}
                onPlay={handlePlayPause}
                isPlaying={isPlaying}
                isAtEnd={isAtEnd}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameViewerBoard;
