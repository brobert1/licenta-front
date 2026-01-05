const { Chess } = require('chess.js');
import findBookMove from './find-book-move';

/**
 * Gets the next book move and converts it to move object format
 * @param {string} botColor - 'white' or 'black'
 * @param {string} openingLinePgn - PGN string of the opening line
 * @param {string} fen - Current FEN position
 * @returns {object|null} - Move object {from, to, promotion} or null if no book move
 */
const getBookMove = (botColor, openingLinePgn, fen) => {
  const bookMoveSan = findBookMove(botColor, openingLinePgn, fen);

  if (!bookMoveSan) {
    return null;
  }

  try {
    const chess = new Chess(fen);
    const moveObj = chess.move(bookMoveSan);

    if (moveObj) {
      return {
        from: moveObj.from,
        to: moveObj.to,
        promotion: moveObj.promotion,
      };
    }
  } catch (error) {
    // Failed to convert book move, will fall back to engine
  }

  return null;
};

export default getBookMove;
