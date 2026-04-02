import { DEFAULT_GAME_SETTINGS } from '@data/bots';
import { constants } from 'next-chessground';

const getPlayerColor = (value) =>
  ['black', 'random', 'white'].includes(value) ? value : DEFAULT_GAME_SETTINGS.playerColor;

const hasTimedGame = (timeControl) =>
  timeControl?.minutes !== null &&
  timeControl?.minutes !== undefined &&
  Number.isFinite(Number(timeControl.minutes)) &&
  Number(timeControl.minutes) > 0;

const buildBotRematchHref = (botName, playerColor, startingFen, timeControl) => {
  if (!botName) return '/client/play/bot';

  const params = new URLSearchParams({ bot: botName, color: getPlayerColor(playerColor) });
  if (startingFen && startingFen !== constants.initialFen) {
    params.set('startingFen', startingFen);
  }
  if (hasTimedGame(timeControl)) {
    params.set('increment', timeControl.increment ?? 0);
    params.set('minutes', timeControl.minutes);
  }

  return `/client/play/bot?${params.toString()}`;
};

export default buildBotRematchHref;
