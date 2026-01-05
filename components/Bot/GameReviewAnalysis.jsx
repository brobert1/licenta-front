import { Analysis, EngineSettings } from '@chess/components/Engine';
import { PgnTree } from '@chess/components/PgnViewer';
import { annotationSquareClasses } from '@chess/constants/moment-annotations';
import { useEngineSettings, usePgnViewer } from '@chess/hooks';
import { AnalysisIcon, GameReviewControls } from '@components/Bot';
import { Toggle } from '@components';
import { useEqualHeight, useProfile } from '@hooks';
import { getNextMoments } from 'chess-moments';
import { NextChessground } from 'next-chessground';
import { useEffect, useRef, useState } from 'react';

const GameReviewAnalysis = ({ pgn, isLoading, game }) => {
  const { black, opening } = game || {};
  const { me } = useProfile();
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
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const { memory, numLines, setMemory, setNumLines } = useEngineSettings();
  const boardRef = useRef();

  const orientation = me?.name === black ? 'black' : 'white';

  const isAtEnd =
    !getNextMoments(moments, current) || getNextMoments(moments, current).length === 0;

  const annotationClass = annotationSquareClasses[current?.suffix] || '';

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 outline-none w-full gap-6">
      <div className="lg:col-span-3 max-w-chess-board">
        <div ref={sourceRef} className={`relative ${annotationClass}`}>
          <NextChessground
            ref={boardRef}
            fen={current.fen}
            lastMove={lastMove}
            orientation={orientation}
            onMove={onUserMove}
            viewOnly={false}
          />
          <AnalysisIcon
            boardOrientation={orientation}
            suffix={current?.suffix}
            lastMove={lastMove?.[1]}
            fen={current?.fen}
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
        <div className="flex flex-col h-full overflow-hidden rounded-md bg-secondary relative">
          <div className="bg-tertiary text-white flex items-center justify-between gap-2 px-3 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <i className="fas fa-circle-star text-accent text-lg"></i>
              <span className="text-white font-bold text-lg">Game Review</span>
            </div>
            <div className="flex items-center">
              <Toggle
                label=""
                initialState={isAnalysisOpen}
                onToggle={setIsAnalysisOpen}
                extraClass="!w-8 !h-4 after:!h-3 after:!w-3 after:!top-[2px] after:!start-[2px] peer-checked:after:!translate-x-4"
                disabled={isLoading}
              />
              <EngineSettings
                numLines={numLines}
                onNumLinesChange={setNumLines}
                memory={memory}
                onMemoryChange={setMemory}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="relative flex flex-col flex-grow min-h-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                <p className="text-white text-lg">Analyzing game</p>
              </div>
            ) : (
              <div className="flex flex-col flex-grow min-h-0">
                <Analysis
                  current={current}
                  isAnalysisOpen={isAnalysisOpen}
                  numLines={numLines}
                  memory={memory}
                />
                <div className="overflow-y-auto min-h-0 flex-grow">
                  <PgnTree
                    tree={tree}
                    current={current}
                    onMoveClick={goToMoment}
                    autoScroll={true}
                    analysis={true}
                  />
                </div>
                {opening && (
                  <div className="px-4 py-3 bg-tertiary border-t border-gray-700 flex items-center justify-between">
                    <p className="text-sm text-white">{opening || 'Starting position'}</p>
                    <i className="fas fa-book-atlas text-white text-sm"></i>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameReviewAnalysis;
