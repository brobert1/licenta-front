import getGamePlayers from './get-game-players';

/**
 * Determines the winner of a chess game based on the game state
 * @param {Object} chess - The chess.js instance
 * @param {string} botName - The name of the bot player
 * @param {string} playerName - The name of the human player
 * @param {string} playerColor - The color the human player is playing ('white' or 'black')
 * @returns {string} - The winner: playerName, botName, 'Draw', or 'Game Over'
 */
const determineGameWinner = (chess, botName, playerName, playerColor) => {
  if (!chess.isGameOver()) {
    return null;
  }

  if (chess.isCheckmate()) {
    const { white, black } = getGamePlayers(playerColor, playerName, botName);
    return chess.turn() === 'w'
      ? white === playerName
        ? botName
        : playerName
      : black === playerName
      ? botName
      : playerName;
  }

  if (chess.isStalemate() || chess.isDraw()) {
    return 'Draw';
  }

  // Fallback for other game over scenarios
  return 'Game Over';
};

export default determineGameWinner;
