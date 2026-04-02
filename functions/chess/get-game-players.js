/**
 * Determines white and black players based on player color and opponent
 * @param {string} playerColor - The color the human player is playing ('white' or 'black')
 * @param {string} playerName - The name of the human player
 * @param {string} opponentName - The name of the opponent (bot)
 * @returns {object} Object with white and black player names
 */
const getGamePlayers = (playerColor, playerName, opponentName) => {
  return {
    white: playerColor === 'white' ? playerName : opponentName,
    black: playerColor === 'black' ? playerName : opponentName,
  };
};

export default getGamePlayers;
