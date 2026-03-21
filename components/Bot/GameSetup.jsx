import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { NoSsr } from '@components';
import { PositionSelectorModal } from '@components/Modals';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts/ChessContext';
import { TIME_CONTROL_OPTIONS } from '@constants/time-controls';
import { bots } from '@data/bots';
import { useDisclosure, useElementWidth, useQuery, useRerender } from '@hooks';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextChessground } from 'next-chessground';

const getAvatar = (name, size = 48) =>
  createAvatar(avataaars, { seed: name, size, backgroundColor: ['404040'] }).toDataUri();

const ALL_BOTS = Object.values(bots).flatMap((cat) => cat.bots);

const GameSetup = ({ onStartGame }) => {
  const { gameSettings, updateGameSettings, selectBot, selectedBot } = useBotContext();
  const { setHistory } = useChessContext();
  const { isOpen, show, hide } = useDisclosure();
  const [selectedTimeValue, setSelectedTimeValue] = useState('10|0');
  const [boardKey, rerender] = useRerender('board');
  const { ref: boardTrackRef, width: boardTrackWidth } = useElementWidth();
  const { query } = useRouter();
  const { data: me } = useQuery('/client/account');

  useEffect(() => {
    if (!query.bot) return;
    const match = ALL_BOTS.find(
      (b) => b.name === query.bot && String(b.elo) === String(query.elo)
    );
    if (match) selectBot(match);
  }, [query.bot, query.elo]);

  useEffect(() => {
    rerender();
  }, [gameSettings.playerColor, gameSettings.selectedPosition]);

  const handlePlayClick = () => {
    setHistory([]);
    if (onStartGame) onStartGame();
  };

  const handlePositionSelect = (pos) => updateGameSettings({ selectedPosition: pos });

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

  const handleColorChange = (color) => updateGameSettings({ playerColor: color });

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 h-full overflow-hidden p-6">
      {/* LEFT: board column */}
      <div className="md:col-span-3 h-full flex flex-col overflow-hidden">
        <div
          className={`flex flex-col gap-2 flex-1 min-h-0 max-w-full mx-auto ${
            boardTrackWidth > 0 ? '' : 'w-full'
          }`}
          style={boardTrackWidth > 0 ? { width: boardTrackWidth } : undefined}
        >
          {/* Bot card */}
          <div className="flex-shrink-0 flex items-center justify-between gap-3 bg-surface-container-lowest rounded-xl px-4 py-3 border border-outline-variant/20">
            <div className="flex items-center gap-3 min-w-0">
              <img src={getAvatar(selectedBot.name, 40)} className="w-10 h-10 rounded-lg shrink-0" alt="" />
              <div className="min-w-0">
                <p className="font-landing font-semibold text-sm text-on-surface truncate">
                  {selectedBot.name}
                </p>
                <p className="font-landing text-xs text-secondary-muted">ELO {selectedBot.elo}</p>
              </div>
            </div>
            <span className="font-landing text-xs text-secondary-muted bg-surface-container px-2 py-1 rounded-lg shrink-0">
              Bot
            </span>
          </div>

          {/* Board */}
          <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden w-full">
            <div ref={boardTrackRef} className="h-full aspect-square max-w-full">
              <NoSsr>
                <NextChessground
                  key={boardKey}
                  readOnly
                  fen={gameSettings.selectedPosition?.fen}
                  orientation={gameSettings.playerColor}
                />
              </NoSsr>
            </div>
          </div>

          {/* User card */}
          <div className="flex-shrink-0 flex items-center justify-between gap-3 bg-surface-container-lowest rounded-xl px-4 py-3 border border-outline-variant/20">
            <div className="flex items-center gap-3 min-w-0">
              {me?.image?.path ? (
                <img src={me.image.path} className="w-10 h-10 rounded-lg object-cover shrink-0" alt="" />
              ) : (
                <img src={getAvatar(me?.name || 'User', 40)} className="w-10 h-10 rounded-lg shrink-0" alt="" />
              )}
              <div className="min-w-0">
                <p className="font-landing font-semibold text-sm text-on-surface truncate">{me?.name || 'You'}</p>
                <p className="font-landing text-xs text-secondary-muted">ELO {me?.elo || 1200}</p>
              </div>
            </div>
            <span className="font-landing text-xs text-tertiaryGold bg-tertiaryGold/10 px-2 py-1 rounded-lg shrink-0">
              You
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: settings panel */}
      <div
        className="md:col-span-2 h-full flex flex-col rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container-lowest"
      >
        {/* Panel header */}
        <div className="px-5 py-4 border-b border-outline-variant/20 flex-shrink-0">
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-robot text-tertiaryGold" />
            <h2 className="font-headline text-xl text-on-surface">Play Bots</h2>
          </div>
        </div>

        {/* Selected bot preview */}
        <div className="px-5 py-4 border-b border-outline-variant/20 flex-shrink-0">
          <div className="flex gap-3">
            <img
              src={getAvatar(selectedBot.name, 56)}
              className="w-14 h-14 rounded-xl flex-shrink-0"
              alt=""
            />
            <div className="flex-1 min-w-0">
              <div className="bg-surface-container rounded-xl rounded-tl-none px-3 py-2.5 mb-2">
                <p className="font-landing text-xs text-secondary-muted italic line-clamp-2">
                  &ldquo;{selectedBot.message}&rdquo;
                </p>
              </div>
              <p className="font-landing text-sm font-semibold text-on-surface">
                {selectedBot.name}
                <span className="text-secondary-muted font-normal ml-2">{selectedBot.elo}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable bot list */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {Object.values(bots).map((category) => (
            <div key={category.title}>
              <div className="px-5 py-2 bg-surface-container-low sticky top-0 z-10">
                <p className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted">
                  {category.title}{' '}
                  <span className="font-normal normal-case tracking-normal">· {category.eloRange}</span>
                </p>
              </div>
              {category.bots.map((bot) => {
                const isSelected =
                  selectedBot.name === bot.name && String(selectedBot.elo) === String(bot.elo);
                return (
                  <button
                    key={bot.name}
                    onClick={() => selectBot(bot)}
                    className={`w-full flex items-center gap-3 px-5 py-3 transition-colors text-left border-b border-outline-variant/10 last:border-0 ${
                      isSelected ? 'bg-on-surface' : 'hover:bg-surface-container'
                    }`}
                  >
                    <img
                      src={getAvatar(bot.name, 36)}
                      className="w-9 h-9 rounded-lg flex-shrink-0"
                      alt=""
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-landing text-sm font-semibold ${
                          isSelected ? 'text-white' : 'text-on-surface'
                        }`}
                      >
                        {bot.name}
                      </p>
                      <p
                        className={`font-landing text-xs ${
                          isSelected ? 'text-white/60' : 'text-secondary-muted'
                        }`}
                      >
                        ELO {bot.elo}
                      </p>
                    </div>
                    {isSelected && (
                      <i className="fa-solid fa-check text-tertiaryGold text-xs flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Settings + Play button */}
        <div className="border-t border-outline-variant/20 px-5 py-4 flex flex-col gap-4 flex-shrink-0">
          {/* Time control */}
          <div className="flex items-center justify-between">
            <span className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted">
              Time Control
            </span>
            <div className="flex gap-1.5">
              {['unlimited', 'realtime'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleTimeModeChange(mode)}
                  className={`font-landing text-xs px-3 py-1.5 rounded-lg transition-all ${
                    gameSettings.timeControl.mode === mode
                      ? 'bg-on-surface text-white'
                      : 'bg-surface-container text-secondary-muted hover:bg-surface-container-high'
                  }`}
                >
                  {mode === 'unlimited' ? 'Unlimited' : 'Timed'}
                </button>
              ))}
            </div>
          </div>

          {gameSettings.timeControl.mode === 'realtime' && (
            <select
              value={selectedTimeValue}
              onChange={(e) => handleTimeValueChange(e.target.value)}
              className="w-full bg-surface-container border-0 rounded-lg px-3 py-2 font-landing text-sm text-on-surface focus:ring-2 focus:ring-tertiaryGold outline-none"
            >
              {TIME_CONTROL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {/* Color selector */}
          <div className="flex items-center justify-between">
            <span className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted">
              Play as
            </span>
            <div className="flex gap-1.5">
              {[
                {
                  color: 'white',
                  icon: 'fa-chess-king',
                  bg: 'bg-white border border-outline-variant/30',
                  text: 'text-on-surface',
                },
                { color: 'black', icon: 'fa-chess-king', bg: 'bg-on-surface', text: 'text-white' },
              ].map(({ color, icon, bg, text }) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${bg} ${
                    gameSettings.playerColor === color
                      ? 'ring-2 ring-tertiaryGold'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <i className={`fa-solid ${icon} text-sm ${text}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Position selector */}
          <button
            onClick={show}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-surface-container hover:bg-surface-container-high rounded-lg transition-all"
          >
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-chess-board text-secondary-muted text-sm" />
              <span className="font-landing text-sm text-on-surface">
                {gameSettings.selectedPosition?.name || 'Starting Position'}
              </span>
            </div>
            <i className="fa-regular fa-chevron-right text-secondary-muted text-xs" />
          </button>

          {/* Play button */}
          <button
            onClick={handlePlayClick}
            className="w-full bg-tertiary-container hover:opacity-90 text-white font-landing font-bold text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
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
