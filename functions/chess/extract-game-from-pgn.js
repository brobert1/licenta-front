import { Chess } from 'chess.js';
import { parsePgnHeaders } from '@chess/functions';
import { normalizePgn } from '@functions';

const extractGameFromPgn = (pgnString) => {
  try {
    // Normalize the PGN
    const normalizedPgn = normalizePgn(pgnString);

    // Extract headers using existing utility
    const headers = parsePgnHeaders(normalizedPgn);

    // Load into Chess.js to count moves and validate
    const chess = new Chess();
    chess.loadPgn(normalizedPgn);
    const moveCount = chess.history().length;

    // Extract player names with fallbacks
    const white = headers.White || 'White';
    const black = headers.Black || 'Black';

    // Determine result and winner
    const result = headers.Result || '*';
    let winner = null;

    if (result === '1-0') {
      winner = white;
    } else if (result === '0-1') {
      winner = black;
    } else if (result === '1/2-1/2' || result === 'Draw') {
      winner = 'Draw';
    }

    // Build game object for uploaded/pasted PGN games.
    // playerColor/playerName/botName/outcome are not available for arbitrary PGN uploads.
    return {
      white,
      black,
      result: winner || 'Unknown',
      pgn: normalizedPgn,
      opening: headers.Opening || headers.ECO || null,
      moves: moveCount,
      createdAt: headers.Date || headers.UTCDate || null,
    };
  } catch (error) {
    console.error('Failed to extract game from PGN:', error);
    throw new Error('Invalid PGN format. Unable to parse game data.');
  }
};

export default extractGameFromPgn;
