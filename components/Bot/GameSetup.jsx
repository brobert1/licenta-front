import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { PositionSelectorModal } from '@components/Modals';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts/ChessContext';
import { TIME_CONTROL_OPTIONS } from '@constants/time-controls';
import { bots } from '@data/bots';
import { useDisclosure } from '@hooks';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const RECENT_GAMES = [
  { result: 'win', opponent: 'Charlotte', elo: 1200, change: '+8', time: '3 min', ago: '2h ago' },
  {
    result: 'loss',
    opponent: 'Sebastian',
    elo: 1900,
    change: '-14',
    time: '10 min',
    ago: 'Yesterday',
  },
  { result: 'win', opponent: 'Ethan', elo: 1000, change: '+6', time: 'Unlimited', ago: '2d ago' },
  { result: 'draw', opponent: 'Mason', elo: 1400, change: '+0', time: '5 min', ago: '3d ago' },
  { result: 'win', opponent: 'Luna', elo: 1700, change: '+12', time: '10 min', ago: '4d ago' },
];

const getResultColor = (result) => {
  if (result === 'win') return 'text-green-600';
  if (result === 'loss') return 'text-red-600';
  return 'text-secondary-muted';
};

const getDotColor = (result) => {
  if (result === 'win') return 'bg-green-500';
  if (result === 'loss') return 'bg-red-500';
  return 'bg-surface-container-highest';
};

const getChangeColor = (change) => {
  if (change.startsWith('+') && change !== '+0') return 'text-green-600';
  if (change.startsWith('-')) return 'text-red-600';
  return 'text-secondary-muted';
};

const ALL_BOTS = Object.values(bots).flatMap((category) => category.bots);

const GameSetup = ({ onStartGame }) => {
  const { gameSettings, updateGameSettings, selectBot, selectedBot } = useBotContext();
  const { setHistory } = useChessContext();
  const { isOpen, show, hide } = useDisclosure();
  const [selectedTimeValue, setSelectedTimeValue] = useState('10|0');
  const { query } = useRouter();

  // Pre-select bot coming from the "Challenge Bot" link on /client/play
  useEffect(() => {
    if (!query.bot) return;
    const match = ALL_BOTS.find((b) => b.name === query.bot && String(b.elo) === String(query.elo));
    if (match) selectBot(match);
  }, [query.bot, query.elo]);

  const handlePositionSelect = (position) => updateGameSettings({ selectedPosition: position });
  const handlePlayClick = () => {
    setHistory([]);
    if (onStartGame) onStartGame();
  };

  const handleTimeModeChange = (mode) => {
    if (mode === 'unlimited') {
      updateGameSettings({ timeControl: { mode, minutes: 10, increment: 0 } });
    } else {
      const [minutes, increment] = selectedTimeValue.split('|').map(Number);
      updateGameSettings({ timeControl: { mode, minutes, increment } });
    }
  };

  const handleTimeValueChange = (val) => {
    setSelectedTimeValue(val);
    const [minutes, increment] = val.split('|').map(Number);
    updateGameSettings({ timeControl: { mode: 'realtime', minutes, increment } });
  };

  const getAvatar = (name, size) =>
    createAvatar(avataaars, { seed: name, size, backgroundColor: ['404040'] }).toDataUri();

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT COLUMN */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Page Header */}
        <div>
          <h1 className="font-headline text-3xl text-on-surface">Play vs Bot</h1>
          <p className="font-landing text-sm text-secondary-muted mt-1">
            Choose your opponent and challenge the machine
          </p>
        </div>

        {/* Bot Selection */}
        <div>
          <h2 className="font-headline text-xl text-on-surface mb-4">Choose Your Opponent</h2>
          <div className="flex flex-col gap-5">
            {Object.values(bots).map((category) => (
              <div key={category.title}>
                <p className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted mb-2">
                  {category.title} — {category.eloRange}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {category.bots.map((bot) => {
                    const isSelected =
                      selectedBot.name === bot.name && String(selectedBot.elo) === String(bot.elo);
                    return (
                      <button
                        key={bot.name}
                        onClick={() => selectBot(bot)}
                        className={`rounded-xl p-4 cursor-pointer transition-all text-left ${
                          isSelected
                            ? 'bg-on-surface ring-2 ring-tertiaryGold'
                            : 'bg-surface-container-lowest hover:bg-surface-container-high'
                        }`}
                      >
                        <img
                          src={getAvatar(bot.name, 40)}
                          alt={bot.name}
                          className="w-10 h-10 rounded-full mb-2"
                        />
                        <p
                          className={`font-landing font-semibold text-sm ${
                            isSelected ? 'text-white' : 'text-on-surface'
                          }`}
                        >
                          {bot.name}
                        </p>
                        <p
                          className={`font-landing text-xs ${
                            isSelected ? 'text-tertiaryGold' : 'text-secondary-muted'
                          }`}
                        >
                          {bot.elo} ELO
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Games */}
        <div>
          <h2 className="font-headline text-xl text-on-surface mb-3">Recent Games</h2>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
            {RECENT_GAMES.map((game, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between px-5 py-3 hover:bg-surface-container cursor-default ${
                  idx < RECENT_GAMES.length - 1 ? 'border-b border-outline-variant/20' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getDotColor(game.result)}`} />
                  <span
                    className={`font-landing text-sm font-semibold ${getResultColor(game.result)}`}
                  >
                    {game.result.charAt(0).toUpperCase() + game.result.slice(1)}
                  </span>
                  <span className="text-secondary-muted text-xs mx-2">vs</span>
                  <span className="font-landing text-sm text-on-surface">
                    {game.opponent}
                    <span className="text-secondary-muted text-xs ml-1">({game.elo})</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-landing text-xs text-secondary-muted">{game.time}</span>
                  <span
                    className={`font-landing text-sm font-semibold ${getChangeColor(game.change)}`}
                  >
                    {game.change}
                  </span>
                  <span className="font-landing text-xs text-secondary-muted ml-3">{game.ago}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-1 flex flex-col">
        {/* Selected Bot Preview */}
        <div className="bg-on-surface rounded-xl p-6">
          <img
            src={getAvatar(selectedBot.name, 64)}
            alt={selectedBot.name}
            className="w-16 h-16 rounded-xl mb-3"
          />
          <h3 className="font-headline text-2xl text-white">{selectedBot.name}</h3>
          <p className="font-landing text-sm text-tertiaryGold">ELO {selectedBot.elo}</p>
          <div className="bg-surface-container/10 rounded-xl rounded-tl-none p-3 mt-3">
            <p className="font-landing text-sm text-white/80">{selectedBot.message}</p>
          </div>
        </div>

        {/* Game Settings */}
        <div className="bg-surface-container-lowest rounded-xl p-5 mt-4">
          <p className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted mb-4">
            Game Settings
          </p>

          {/* Color Selection */}
          <p className="font-landing text-sm text-on-surface mb-2">Play as</p>
          <div className="flex gap-2">
            {['white', 'black'].map((color) => {
              const isActive = gameSettings.playerColor === color;
              return (
                <button
                  key={color}
                  onClick={() => updateGameSettings({ playerColor: color })}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                    isActive
                      ? 'bg-on-surface text-white ring-2 ring-tertiaryGold'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                  title={color.charAt(0).toUpperCase() + color.slice(1)}
                >
                  <i className="fa-regular fa-chess-bishop" />
                </button>
              );
            })}
          </div>

          {/* Time Control */}
          <div className="mt-4">
            <p className="font-landing text-sm text-on-surface mb-2">Time Control</p>
            <div className="flex gap-2">
              {['unlimited', 'realtime'].map((mode) => {
                const isActive = gameSettings.timeControl.mode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => handleTimeModeChange(mode)}
                    className={`font-landing text-sm px-4 py-2 rounded-lg cursor-pointer transition-all ${
                      isActive
                        ? 'bg-on-surface text-white'
                        : 'bg-surface-container text-secondary-muted hover:bg-surface-container-high'
                    }`}
                  >
                    {mode === 'unlimited' ? 'Unlimited' : 'Real Time'}
                  </button>
                );
              })}
            </div>
            {gameSettings.timeControl.mode === 'realtime' && (
              <select
                value={selectedTimeValue}
                onChange={(e) => handleTimeValueChange(e.target.value)}
                className="w-full mt-2 bg-surface-container border-0 rounded-lg px-3 py-2 font-landing text-sm text-on-surface focus:ring-2 focus:ring-tertiaryGold outline-none"
              >
                {TIME_CONTROL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Starting Position */}
          <div className="mt-4">
            <p className="font-landing text-sm text-on-surface mb-2">Starting Position</p>
            <button
              onClick={show}
              className="w-full text-left px-4 py-2.5 bg-surface-container hover:bg-surface-container-high rounded-lg font-landing text-sm text-on-surface flex items-center justify-between transition-all"
            >
              <span>
                <i className="fa-regular fa-chess-board mr-2 text-secondary-muted" />
                {gameSettings.selectedPosition?.name || 'Standard Position'}
              </span>
              <i className="fa-regular fa-chevron-right text-secondary-muted text-xs" />
            </button>
          </div>
        </div>

        {/* Play Button */}
        <div className="mt-4">
          <button
            onClick={handlePlayClick}
            className="w-full bg-on-surface hover:opacity-90 text-white font-landing font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-regular fa-chess-knight" />
            Play vs {selectedBot.name}
          </button>
        </div>
      </div>

      <PositionSelectorModal isOpen={isOpen} hide={hide} onPositionSelect={handlePositionSelect} />
    </div>
  );
};

export default GameSetup;
