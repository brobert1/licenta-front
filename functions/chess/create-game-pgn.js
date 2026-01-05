import { Chess } from 'chess.js';
import { format } from 'date-fns';

const createGamePgn = (history, white, black, startingFen) => {
  const chess = new Chess(startingFen);

  // Replay all moves from history
  history.forEach((move) => {
    chess.move(move);
  });

  // Set PGN headers
  chess.setHeader('Event', `${white} vs ${black}`);
  chess.setHeader('Date', format(new Date(), 'dd.MM.yyyy'));
  chess.setHeader('Site', '');
  chess.setHeader('Round', '');
  chess.setHeader('Result', '');
  chess.setHeader('White', white);
  chess.setHeader('Black', black);

  return chess.pgn();
};

export default createGamePgn;
