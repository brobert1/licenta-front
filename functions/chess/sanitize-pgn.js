/**
 * Removes comments and trims whitespace from PGN string
 * @param {string} pgn - The PGN string to sanitize
 * @returns {string} Sanitized PGN string
 */
const sanitizePgn = (pgn) => {
  if (!pgn) return '';
  return pgn.replace(/\{[^}]+\}/g, '').trim();
};

export default sanitizePgn;
