import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { NoSsr } from '@components';
import { PositionSelectorModal } from '@components/Modals';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts/ChessContext';
import { TIME_CONTROL_OPTIONS } from '@constants/time-controls';
import { bots } from '@data/bots';
import { useDisclosure, useElementWidth, useQuery, useRerender } from '@hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextChessground } from 'next-chessground';

const getAvatar = (name, size = 48) =>
  createAvatar(avataaars, { seed: name, size, backgroundColor: ['404040'] }).toDataUri();

const ALL_BOTS = Object.values(bots).flatMap((cat) => cat.bots);

const TIER_KEYS = ['beginner', 'intermediate', 'advanced', 'master'];

const GameSetup = ({ onStartGame }) => {
  const { beginBotMatch, gameSettings, updateGameSettings, selectBot, selectedBot } = useBotContext();
  const { setHistory } = useChessContext();
  const { isOpen, show, hide } = useDisclosure();
  const [tierKey, setTierKey] = useState('intermediate');
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
    const key = TIER_KEYS.find((k) =>
      bots[k].bots.some(
        (b) => b.name === selectedBot.name && String(b.elo) === String(selectedBot.elo)
      )
    );
    if (key) setTierKey(key);
  }, [selectedBot.name, selectedBot.elo]);

  useEffect(() => {
    rerender();
  }, [gameSettings.playerColor, gameSettings.selectedPosition]);

  const handlePlayClick = () => {
    beginBotMatch(gameSettings.playerColor);
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

  const handleTierChange = (key) => {
    if (key === tierKey) return;
    setTierKey(key);
    selectBot(bots[key].bots[0]);
  };

  const boardOrientation =
    gameSettings.playerColor === 'random' ? 'white' : gameSettings.playerColor;

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
                  orientation={boardOrientation}
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

      {/* RIGHT: tier tabs, list, divided settings */}
      <aside className="md:col-span-2 flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
        <header className="flex-shrink-0 px-5 pt-5 pb-4">
          <h2 className="font-headline text-2xl tracking-tight text-on-surface">Bot game</h2>
          <p className="mt-1 font-landing text-sm text-secondary-muted">
            Choose a level, opponent, and rules — then play.
          </p>
        </header>

        <div className="flex-shrink-0 px-5 pb-4">
          <div
            className="flex rounded-lg bg-surface-container p-1"
            role="tablist"
            aria-label="Difficulty"
          >
            {TIER_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tierKey === key}
                onClick={() => handleTierChange(key)}
                className={`flex-1 rounded-md py-2 font-landing text-xs font-semibold transition-all ${
                  tierKey === key
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                    : 'text-secondary-muted hover:text-on-surface'
                }`}
              >
                {bots[key].title}
              </button>
            ))}
          </div>
          <p className="mt-2 font-landing text-xs text-secondary-muted">{bots[tierKey].eloRange}</p>
        </div>

        {/* Bot message — fixed above list so it stays visible */}
        <div className="flex-shrink-0 px-5 pb-4">
          <div className="rounded-xl border-2 border-tertiaryGold/45 bg-tertiaryGold/12 p-4 shadow-sm">
            <div className="mb-3 flex items-start gap-3">
              <img
                src={getAvatar(selectedBot.name, 48)}
                className="h-12 w-12 shrink-0 rounded-xl ring-2 ring-surface-container-lowest shadow-sm"
                alt=""
              />
              <div className="min-w-0 pt-0.5">
                <p className="font-landing text-xs font-bold uppercase tracking-widest text-tertiaryGold">
                  What they say
                </p>
                <p className="font-headline text-lg leading-tight text-on-surface">{selectedBot.name}</p>
                <p className="font-landing text-xs text-secondary-muted">ELO {selectedBot.elo}</p>
              </div>
            </div>
            <p className="font-landing text-base font-medium leading-relaxed text-on-surface">
              &ldquo;{selectedBot.message}&rdquo;
            </p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
          <p className="mb-2 font-landing text-xs font-semibold uppercase tracking-widest text-secondary-muted">
            Opponents in this tier
          </p>
          <div className="flex flex-col gap-1">
            {bots[tierKey].bots.map((bot) => {
              const isSelected =
                selectedBot.name === bot.name && String(selectedBot.elo) === String(bot.elo);
              return (
                <button
                  key={`${bot.name}-${bot.elo}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectBot(bot)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    isSelected
                      ? 'bg-tertiaryGold/10 ring-1 ring-tertiaryGold/40'
                      : 'hover:bg-surface-container'
                  }`}
                >
                  <img
                    src={getAvatar(bot.name, 40)}
                    className="h-10 w-10 shrink-0 rounded-lg"
                    alt=""
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-landing text-sm font-semibold text-on-surface">{bot.name}</p>
                    <p className="font-landing text-xs text-secondary-muted">ELO {bot.elo}</p>
                  </div>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? 'border-tertiaryGold bg-tertiaryGold'
                        : 'border-outline-variant/50 bg-transparent'
                    }`}
                    aria-hidden
                  >
                    {isSelected && <i className="fa-solid fa-check text-xs text-white" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <footer className="flex flex-shrink-0 flex-col gap-3 border-t border-outline-variant/15 bg-surface-container-low px-5 py-4">
          <div className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest divide-y divide-outline-variant/15">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <span className="font-landing text-sm text-on-surface">Time</span>
              <div className="flex gap-1 rounded-lg bg-surface-container p-0.5">
                {['unlimited', 'realtime'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleTimeModeChange(mode)}
                    className={`rounded-md px-3 py-1.5 font-landing text-xs font-semibold transition-all ${
                      gameSettings.timeControl.mode === mode
                        ? 'bg-on-surface text-white'
                        : 'text-secondary-muted hover:text-on-surface'
                    }`}
                  >
                    {mode === 'unlimited' ? 'Unlimited' : 'Timed'}
                  </button>
                ))}
              </div>
            </div>

            {gameSettings.timeControl.mode === 'realtime' && (
              <div className="px-4 py-3">
                <label className="sr-only" htmlFor="bot-setup-time-preset">
                  Clock preset
                </label>
                <select
                  id="bot-setup-time-preset"
                  value={selectedTimeValue}
                  onChange={(e) => handleTimeValueChange(e.target.value)}
                  className="w-full rounded-lg border-0 bg-surface-container py-2 px-3 font-landing text-sm text-on-surface outline-none focus:ring-2 focus:ring-tertiaryGold"
                >
                  {TIME_CONTROL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <span className="font-landing text-sm text-on-surface">Your color</span>
              <div className="flex flex-wrap items-center justify-end gap-1">
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
                    type="button"
                    onClick={() => handleColorChange(color)}
                    title={color === 'white' ? 'White' : 'Black'}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${bg} ${
                      gameSettings.playerColor === color
                        ? 'ring-2 ring-tertiaryGold ring-offset-2 ring-offset-surface-container-lowest'
                        : 'opacity-40 hover:opacity-100'
                    }`}
                  >
                    <i className={`fa-solid ${icon} text-sm ${text}`} />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleColorChange('random')}
                  title="Random — revealed when the game starts"
                  className={`flex h-9 items-center gap-1.5 rounded-lg border px-2.5 font-landing text-xs font-semibold transition-all ${
                    gameSettings.playerColor === 'random'
                      ? 'border-tertiaryGold bg-tertiaryGold/10 text-on-surface ring-2 ring-tertiaryGold ring-offset-2 ring-offset-surface-container-lowest'
                      : 'border-outline-variant/30 bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <i className="fa-solid fa-shuffle text-sm" />
                  <span className="hidden sm:inline">Random</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={show}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-container/60"
            >
              <span className="font-landing text-sm text-on-surface">Starting position</span>
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate font-landing text-sm font-medium text-secondary-muted">
                  {gameSettings.selectedPosition?.name || 'Standard'}
                </span>
                <i className="fa-regular fa-chevron-right shrink-0 text-secondary-muted text-xs" />
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={handlePlayClick}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-tertiary-container py-3.5 font-landing text-base font-bold text-white transition-all hover:opacity-90"
          >
            <i className="fa-regular fa-chess-knight" />
            Play vs {selectedBot.name}
          </button>
        </footer>
      </aside>

      <PositionSelectorModal isOpen={isOpen} hide={hide} onPositionSelect={handlePositionSelect} />
    </div>
  );
};

export default GameSetup;
