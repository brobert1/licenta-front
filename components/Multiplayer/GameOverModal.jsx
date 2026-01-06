import { useMultiplayerContext } from '@contexts/MultiplayerContext';

const GameOverModal = () => {
  const { activeGame, gameResult, playerColor, opponent, eloChange, reset } =
    useMultiplayerContext();

  const isGameOver = activeGame?.status === 'completed' || activeGame?.gameOver;

  if (!isGameOver) return null;

  // Determine result text
  let resultTitle = '';
  let resultSubtitle = '';
  let resultColor = 'text-white';

  if (gameResult === '1/2-1/2') {
    resultTitle = 'Draw!';
    resultSubtitle = 'The game ended in a draw';
    resultColor = 'text-amber-400';
  } else if (
    (gameResult === '1-0' && playerColor === 'white') ||
    (gameResult === '0-1' && playerColor === 'black')
  ) {
    resultTitle = 'Victory!';
    resultSubtitle = `You defeated ${opponent?.name || 'your opponent'}`;
    resultColor = 'text-green-400';
  } else {
    resultTitle = 'Defeat';
    resultSubtitle = `${opponent?.name || 'Your opponent'} wins`;
    resultColor = 'text-red-400';
  }

  // Format ELO change
  const eloText =
    eloChange !== null && eloChange !== undefined
      ? eloChange >= 0
        ? `+${eloChange}`
        : `${eloChange}`
      : null;
  const eloColor =
    eloChange > 0 ? 'text-green-400' : eloChange < 0 ? 'text-red-400' : 'text-gray-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-secondary border border-gray-700 rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4">
        {/* Result Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              gameResult === '1/2-1/2'
                ? 'bg-amber-500/20'
                : resultTitle === 'Victory!'
                ? 'bg-green-500/20'
                : 'bg-red-500/20'
            }`}
          >
            <i
              className={`fas text-3xl ${
                gameResult === '1/2-1/2'
                  ? 'fa-handshake text-amber-400'
                  : resultTitle === 'Victory!'
                  ? 'fa-trophy text-green-400'
                  : 'fa-flag text-red-400'
              }`}
            ></i>
          </div>
        </div>

        {/* Result Text */}
        <h2 className={`text-3xl font-bold text-center mb-2 ${resultColor}`}>{resultTitle}</h2>
        <p className="text-gray-400 text-center mb-6">{resultSubtitle}</p>

        {/* ELO Change */}
        {eloText && (
          <div className="bg-tertiary rounded-lg p-4 mb-6 text-center">
            <p className="text-gray-400 text-sm mb-1">Rating Change</p>
            <p className={`text-2xl font-bold font-mono ${eloColor}`}>{eloText}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-chess"></i>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
