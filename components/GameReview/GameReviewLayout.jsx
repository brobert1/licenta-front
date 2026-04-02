import GameReviewAnalysis from './GameReviewAnalysis';
import ReviewSidebar from './ReviewSidebar';
import { useEqualHeight, useGameReview, useQuery } from '@hooks';
import { constants, NextChessground } from 'next-chessground';
import { useEffect, useState } from 'react';

const GameReviewLayout = ({ game, isGuest = false }) => {
  const { pgn, playerColor } = game || {};
  const { analyzedPgn, accuracy, accuracyPercentage, evaluations, isAnalyzing, analyzeGame } =
    useGameReview();
  const { sourceRef, targetRef } = useEqualHeight({ desktopOnly: true });

  // Only fetch user data if not a guest
  const { data: me } = useQuery(isGuest ? null : '/client/account');

  const [phase, setPhase] = useState('loading');
  const currentPgn = analyzedPgn || pgn;
  const orientation = playerColor || 'white';

  // Start analysis immediately on mount
  useEffect(() => {
    if (pgn) analyzeGame(pgn);
  }, []);

  // Transition to results when analysis completes
  useEffect(() => {
    if (!isAnalyzing && analyzedPgn) setPhase('results');
  }, [isAnalyzing, analyzedPgn]);

  if (phase === 'review') {
    return (
      <GameReviewAnalysis
        pgn={currentPgn}
        isLoading={false}
        game={game}
        me={me}
        onBack={() => setPhase('results')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 outline-none w-full gap-6">
      <div className="hidden md:block md:col-span-3 max-w-chess-board">
        <div ref={sourceRef}>
          <NextChessground fen={constants.initialFen} viewOnly={true} orientation={orientation} />
        </div>
      </div>
      <div ref={targetRef} className="md:col-span-2 flex flex-col overflow-hidden">
        <ReviewSidebar
          game={game}
          me={me}
          isAnalyzing={isAnalyzing}
          analyzedPgn={analyzedPgn}
          accuracy={accuracy}
          accuracyPercentage={accuracyPercentage}
          evaluations={evaluations}
          onStartReview={() => setPhase('review')}
        />
      </div>
    </div>
  );
};

export default GameReviewLayout;
