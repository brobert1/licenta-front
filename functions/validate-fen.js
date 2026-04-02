import { Chess } from 'chess.js';

const validateFen = (value) => {
  const fen = (value || '').trim();
  if (!fen) {
    return '';
  }

  try {
    // Throws for invalid FEN formats and values.
    new Chess(fen);
    return '';
  } catch (err) {
    return err?.message || 'Invalid FEN';
  }
};

export default validateFen;
