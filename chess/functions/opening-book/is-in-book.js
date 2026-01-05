import { flat } from 'chess-moments';

/**
 * Checks if current position is still within the opening book
 * @param {string} openingLinePgn - PGN string of the opening line
 * @param {string} currentFen - Current FEN position
 * @returns {boolean} - True if still in book, false otherwise
 */
const isInBook = (openingLinePgn, currentFen) => {
  if (!openingLinePgn || !currentFen) {
    return false;
  }

  const moments = flat(openingLinePgn);

  const normalizeFen = (fen) => {
    const parts = fen.split(' ');
    return parts.slice(0, 4).join(' ');
  };

  const normalizedCurrentFen = normalizeFen(currentFen);

  // Check if current position exists in the book
  for (let i = 0; i < moments.length; i++) {
    if (normalizeFen(moments[i].fen) === normalizedCurrentFen) {
      return true;
    }
  }

  return false;
};

export default isInBook;
