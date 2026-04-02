const getSideToMove = (fen) => {
  try {
    // FEN format: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    // The side to move is indicated by the second part of the FEN string.
    // 'w' means white to move, 'b' means black to move.

    const parts = fen.split(' ');
    return parts[1];
  } catch {
    return null;
  }
};

export default getSideToMove;
