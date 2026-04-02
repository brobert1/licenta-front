import { useState, useEffect } from 'react';
import GameReviewUpload from './GameReviewUpload';
import GameReviewLayout from './GameReviewLayout';
import { Button } from '@components';
import { isValidPgn, pgnSplit } from '@functions';
import { extractGameFromPgn } from '@functions/chess';
import { toaster } from '@lib';

const GameReviewFromPgn = ({ isGuest = false, initialGame = null }) => {
  const [phase, setPhase] = useState('upload'); // 'upload' | 'review'
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    if (!initialGame) return;
    if (initialGame.pgn) {
      setGameData(initialGame);
      setPhase('review');
      return;
    }
    try {
      const pgns = pgnSplit(initialGame);
      const firstPgn = pgns[0];

      if (!firstPgn || !isValidPgn(firstPgn)) {
        toaster.error(
          'Your saved game could not be loaded. Please paste or upload a PGN to review.'
        );
        return;
      }
      const data = extractGameFromPgn(firstPgn);
      setGameData(data);
      setPhase('review');
    } catch {
      toaster.error('Your saved game could not be loaded. Please paste or upload a PGN to review.');
    }
  }, []);

  const handlePgnUploaded = (data) => {
    setGameData(data);
    setPhase('review');
  };

  const handleBackToUpload = () => {
    setPhase('upload');
    setGameData(null);
  };

  if (phase === 'upload') {
    return <GameReviewUpload onPgnUploaded={handlePgnUploaded} />;
  }

  return (
    <div>
      <div className="mb-4">
        <Button
          onClick={handleBackToUpload}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tertiary bg-white hover:border-accent/40 hover:text-accent text-sm font-medium text-muted shadow-sm hover:shadow transition-all duration-200"
        >
          <i className="fas fa-arrow-left text-xs" />
          Analyze Another Game
        </Button>
      </div>
      <GameReviewLayout game={gameData} isGuest={isGuest} />
    </div>
  );
};

export default GameReviewFromPgn;
