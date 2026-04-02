import startingPositions from '@constants/starting-positions';
import { constants } from 'next-chessground';
import validateFen from './validate-fen';

const resolveStartingPosition = (fen) => {
  if (!fen || fen === constants.initialFen) return null;

  const matchedPosition = startingPositions.find((position) => position.fen === fen);
  if (matchedPosition) return matchedPosition;
  if (validateFen(fen)) return null;

  return {
    description: 'Custom FEN position',
    fen,
    name: 'Custom Position',
  };
};

export default resolveStartingPosition;
