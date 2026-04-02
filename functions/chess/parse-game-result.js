const REASON_LABELS = {
  checkmate: 'Checkmate',
  resignation: 'Resignation',
  timeout: 'Lost on time',
  stalemate: 'Stalemate',
  threefold_repetition: 'Threefold repetition',
  fifty_move_rule: '50-move rule',
  insufficient_material: 'Insufficient material',
  timeout_insufficient_material: 'Timeout vs insufficient material',
};

const parseGameResult = ({ gameWinner, terminationReason, botName, playerColor }) => {
  if (!gameWinner) return null;

  const botColor = playerColor === 'white' ? 'black' : 'white';
  const isDraw = gameWinner === 'Draw';
  const botWon = gameWinner === botName;

  if (isDraw) {
    return {
      score: '1/2-1/2',
      reasonText: terminationReason
        ? (REASON_LABELS[terminationReason] ?? terminationReason)
        : null,
      resultText: 'Draw',
    };
  }

  const winnerColor = botWon ? botColor : playerColor;
  const loserColor = winnerColor === 'white' ? 'black' : 'white';
  const winnerLabel = winnerColor === 'white' ? 'White' : 'Black';
  const loserLabel = loserColor === 'white' ? 'White' : 'Black';

  let reasonText = null;
  if (terminationReason === 'resignation') {
    reasonText = `${loserLabel} resigned`;
  } else if (terminationReason === 'timeout') {
    reasonText = `${loserLabel} lost on time`;
  } else if (terminationReason) {
    reasonText = REASON_LABELS[terminationReason] ?? terminationReason;
  }

  return {
    score: winnerColor === 'white' ? '1-0' : '0-1',
    reasonText,
    resultText: `${winnerLabel} wins`,
  };
};

export default parseGameResult;
