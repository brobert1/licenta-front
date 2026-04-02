import { DEFAULT_GAME_SETTINGS, findBotByName } from '@data/bots';
import resolveStartingPosition from './resolve-starting-position';

const getQueryValue = (value) => (Array.isArray(value) ? value[0] : value);

const getPlayerColor = (value) =>
  ['black', 'random', 'white'].includes(value) ? value : DEFAULT_GAME_SETTINGS.playerColor;

const getTimeControl = (minutesValue, incrementValue) => {
  if (minutesValue === undefined) return DEFAULT_GAME_SETTINGS.timeControl;

  const increment = Number(incrementValue ?? 0);
  const minutes = Number(minutesValue);
  if (!Number.isFinite(minutes) || minutes <= 0) return DEFAULT_GAME_SETTINGS.timeControl;
  if (!Number.isFinite(increment) || increment < 0) return DEFAULT_GAME_SETTINGS.timeControl;

  return { mode: 'realtime', minutes, increment };
};

const buildRematchKey = (botName, settings) =>
  `${botName}:${settings.playerColor}:${settings.timeControl.mode}:${settings.timeControl.minutes}:${settings.timeControl.increment}:${settings.selectedPosition?.fen || 'default'}`;

const parseBotRematchState = (query) => {
  const botName = getQueryValue(query?.bot);
  const rematchBot = findBotByName(botName);
  if (!rematchBot) return { rematchBot: null, rematchKey: 'default', rematchSettings: null };

  const rematchSettings = {
    ...DEFAULT_GAME_SETTINGS,
    playerColor: getPlayerColor(getQueryValue(query?.color)),
    selectedPosition: resolveStartingPosition(getQueryValue(query?.startingFen)),
    timeControl: getTimeControl(getQueryValue(query?.minutes), getQueryValue(query?.increment)),
  };

  return {
    rematchBot,
    rematchKey: buildRematchKey(rematchBot.name, rematchSettings),
    rematchSettings,
  };
};

export default parseBotRematchState;
