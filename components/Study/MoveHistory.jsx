import { GameSheet } from '@chess/components';
import { Chess } from 'chess.js';

const MoveHistory = ({ moves, current }) => {
  // Validate moves and collect only valid ones
  const game = new Chess(current.fen);
  let validMoves = [];

  try {
    for (const move of moves) {
      game.move(move);
      validMoves.push(move);
    }
  } catch (error) {
    console.warn('Invalid move in history:', error);
  }

  return (
    <div className="flex flex-col gap-1 p-2 mb-2 text-gray-300 text-sm overflow-auto max-h-[30%] min-h-20 bg-tertiary rounded-md md:bg-transparent md:rounded-none md:mb-0">
      <div className="flex gap-2">
        <div className="font-semibold">Training moves:</div>
      </div>

      <div className="flex gap-1">
        <GameSheet history={validMoves} initialFen={current.fen} />
      </div>
    </div>
  );
};

export default MoveHistory;
