import { Chess } from 'chess.js';
import { format } from 'date-fns';

const createGamePgn = (history, white, black, startingFen, headers = {}) => {
  const chess = new Chess(startingFen);

  // Replay all moves from history
  history.forEach((move) => {
    chess.move(move);
  });

  const today = format(new Date(), 'yyyy.MM.dd');

  // Set default PGN headers
  chess.setHeader('Event', headers.Event || '');
  chess.setHeader('Site', headers.Site || '');
  chess.setHeader('Date', today);
  chess.setHeader('Round', headers.Round || '');
  chess.setHeader('White', white);
  chess.setHeader('Black', black);
  chess.setHeader('Result', headers.Result || '*');

  // Apply any additional custom headers
  Object.entries(headers).forEach(([key, value]) => {
    if (!['Event', 'Site', 'Date', 'Round', 'White', 'Black', 'Result'].includes(key)) {
      chess.setHeader(key, value);
    }
  });

  return chess.pgn();
};

export default createGamePgn;
