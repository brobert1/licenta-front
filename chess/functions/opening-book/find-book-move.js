const { Chess } = require('chess.js');
import { flat } from 'chess-moments';
import parseFen from '../parse-fen';

/**
 * Finds the bot's book move based on current position (supports variations)
 * @param {string} botColor - 'white' or 'black'
 * @param {string} openingLinePgn - PGN string of the opening line
 * @param {string} currentFen - Current FEN position
 * @returns {string|null} - SAN move string or null if no book move found
 */
const findBookMove = (botColor, openingLinePgn, currentFen) => {
  if (!openingLinePgn) {
    return null;
  }

  const moments = flat(openingLinePgn);

  if (moments.length === 0) {
    return null;
  }

  const fenData = parseFen(currentFen);
  if (!fenData) {
    return null;
  }

  const currentTurn = fenData.activeColor; // 'w' or 'b'
  const botTurn = botColor === 'white' ? 'w' : 'b';
  const isBotTurn = currentTurn === botTurn;

  if (!isBotTurn) {
    return null;
  }

  // Find the current position in the book by matching FEN
  let currentMoment = null;

  // Normalize FENs for comparison (only position, ignore move counters)
  const normalizeFen = (fen) => {
    const parts = fen.split(' ');
    return parts.slice(0, 4).join(' '); // position, turn, castling, en passant
  };

  const normalizedCurrentFen = normalizeFen(currentFen);

  // Find the moment that matches current position
  for (let i = 0; i < moments.length; i++) {
    if (normalizeFen(moments[i].fen) === normalizedCurrentFen) {
      currentMoment = moments[i];
      break;
    }
  }

  if (!currentMoment) {
    return null;
  }

  // Find all possible next moves from this position
  const possibleNextMoves = [];

  for (let i = 0; i < moments.length; i++) {
    const moment = moments[i];

    if (moment.move && moment.index > currentMoment.index) {
      try {
        const chess = new Chess(currentFen);
        const testMove = chess.move(moment.move);

        if (testMove && normalizeFen(chess.fen()) === normalizeFen(moment.fen)) {
          possibleNextMoves.push(moment.move);
        }
      } catch (error) {
        // Move not legal from this position
      }
    }
  }

  if (possibleNextMoves.length === 0) {
    return null;
  }

  // Randomly select from available moves to add variety
  const randomIndex = Math.floor(Math.random() * possibleNextMoves.length);
  return possibleNextMoves[randomIndex];
};

export default findBookMove;
