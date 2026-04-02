import { parseGameResult } from '@functions/chess';

const getWinner = ({ botName, gameWinner, outcome, playerName }) => {
  if (gameWinner) return gameWinner;
  if (outcome === 'draw') return 'Draw';
  if (outcome === 'loss') return botName;
  if (outcome === 'win') return playerName;
  return null;
};

const GameResultBanner = ({
  botName,
  className = '',
  gameWinner,
  outcome,
  playerColor,
  playerName,
  terminationReason,
}) => {
  const result = parseGameResult({
    botName,
    gameWinner: getWinner({ botName, gameWinner, outcome, playerName }),
    playerColor,
    terminationReason,
  });

  if (!result) return null;

  const { score, reasonText, resultText } = result;
  const details = reasonText ? `${reasonText} • ${resultText}` : resultText;

  return (
    <div className={`flex flex-col items-center border-t border-border py-2 ${className}`.trim()}>
      <span className="text-primary font-bold text-lg">{score}</span>
      <span className="text-muted text-sm italic">{details}</span>
    </div>
  );
};

export default GameResultBanner;
