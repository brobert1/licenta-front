import { getMoveNumber } from '@chess/functions';

const getMomentsStats = (moments, currentFen, firstTurn) => {
  try {
    const moves = moments.filter((move) => move.depth === 1 && move.move);

    // Count white moves
    const opponent = firstTurn === 'w' ? 'b' : 'w';
    const whiteMoves = moves.filter((move) => move?.fen?.split(' ')[1] === opponent);

    // Move number
    const currentIndex = getMoveNumber(currentFen);

    // Extra comment from current moment or from next moment
    const currentMoment = moments.find((move) => move?.fen === currentFen);
    const nextMoment = moments.find((move) => move?.index === currentMoment?.index + 1);
    const extraComment = currentMoment?.comment || nextMoment?.comment;

    return {
      hasNoMoves: moves.length === 0,
      whiteMoves: whiteMoves.length,
      currentIndex,
      extraComment,
    };
  } catch {
    return {};
  }
};

export default getMomentsStats;
