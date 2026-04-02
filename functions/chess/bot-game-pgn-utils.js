import createGamePgn from './create-game-pgn';
import getGamePlayers from './get-game-players';
import { constants } from 'next-chessground';

export const getGameResult = (gameWinner, white) => {
  if (gameWinner === 'Draw' || gameWinner === 'Game Over') return '1/2-1/2';
  return gameWinner === white ? '1-0' : '0-1';
};

export const buildBotGamePgn = ({
  history,
  gameSettings,
  gameWinner,
  savedGameId,
  playerName,
  botName,
}) => {
  const { white, black } = getGamePlayers(gameSettings.playerColor, playerName, botName);
  const fen = gameSettings.selectedPosition?.fen || constants.initialFen;

  const headers = {
    Event: 'Play vs Bot',
    Site: process.env.APP_BASE_URL,
    Round: '?',
    Result: getGameResult(gameWinner, white),
    Link: `${process.env.APP_BASE_URL}/client/game-review/${savedGameId}`,
  };

  return createGamePgn(history, white, black, fen, headers);
};
