import { GameReviewAnalysis, GameReviewOverview } from '@components/Bot';
import { useGameReview } from '@hooks';
import { useState } from 'react';

const GameReviewLayout = ({ game }) => {
  const { pgn } = game || {};
  const { analyzedPgn, isAnalyzing, analyzeGame } = useGameReview();
  const [isAnalysisMode, setIsAnalysisMode] = useState(false);
  const currentPgn = analyzedPgn || pgn;

  const handleStartAnalysis = async () => {
    setIsAnalysisMode(true);
    try {
      await analyzeGame(pgn);
    } catch (error) {
      console.error('Failed to analyze game:', error);
      setIsAnalysisMode(false);
    }
  };

  return (
    <>
      {!isAnalysisMode ? (
        <GameReviewOverview game={game} onStartAnalysis={handleStartAnalysis} />
      ) : (
        <GameReviewAnalysis pgn={currentPgn} isLoading={isAnalyzing} game={game} />
      )}
    </>
  );
};

export default GameReviewLayout;
