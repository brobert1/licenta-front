const { Chess } = require('chess.js');

/**
 * Computes an arrow shape based on the current FEN and a move string.
 * Returns null if the move is invalid.
 */
const getMoveArrow = (fen, moveString) => {
  try {
    if (!fen || !moveString) return null;
    const chess = new Chess(fen);
    const move = chess.move(moveString);
    return {
      orig: move.from,
      dest: move.to,
      brush: 'blue',
    };
  } catch (error) {
    // Move is invalid, return null
    return null;
  }
};

export default getMoveArrow;
