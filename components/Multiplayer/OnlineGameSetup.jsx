import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useQuery } from '@hooks';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { NoSsr } from '@components';
import { NextChessground } from 'next-chessground';
import { bots } from '@data/bots';

// One iconic FEN per difficulty tier — shown alongside the featured bot
const TIER_FENS = {
  beginner:     'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
  intermediate: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
  advanced:     'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQR1K1 w - - 0 8',
  master:       'rnbqkb1r/1p2pppp/p2p1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq - 0 7',
};

const TIER_META = {
  beginner:     { label: 'Beginner',     style: 'Calm & Positional',      winRate: '78%', activeTier: 0 },
  intermediate: { label: 'Intermediate', style: 'Balanced & Developing',  winRate: '51%', activeTier: 1 },
  advanced:     { label: 'Advanced',     style: 'Sharp & Tactical',       winRate: '28%', activeTier: 2 },
  master:       { label: 'Master',       style: 'Tactical & Aggressive',  winRate: '12%', activeTier: 3 },
};

const ALL_BOTS = Object.entries(bots).flatMap(([tierKey, category]) =>
  category.bots.map((bot) => ({ ...bot, tierKey }))
);

const TIME_CATEGORIES = [
  {
    name: 'Bullet',
    icon: 'fa-bolt',
    description: 'Instant action',
    controls: [
      { label: '1 min', initial: 60, increment: 0 },
      { label: '1 | 1', initial: 60, increment: 1 },
      { label: '2 | 1', initial: 120, increment: 1 },
    ],
  },
  {
    name: 'Blitz',
    icon: 'fa-fire',
    description: 'Strategic speed',
    controls: [
      { label: '3 min', initial: 180, increment: 0 },
      { label: '3 | 2', initial: 180, increment: 2 },
      { label: '5 min', initial: 300, increment: 0 },
    ],
  },
  {
    name: 'Rapid',
    icon: 'fa-clock',
    description: 'The classic choice',
    controls: [
      { label: '10 min', initial: 600, increment: 0 },
      { label: '15 | 10', initial: 900, increment: 10 },
      { label: '30 min', initial: 1800, increment: 0 },
    ],
  },
];

const DEFAULT_TIME_CONTROL = TIME_CATEGORIES[1].controls[0];

const RECENT_GAMES = [
  { result: 'win',  opponent: 'Magnus_K',   rating: 2481, change: '+8',  mode: 'Blitz 3+2',   ago: '2h ago' },
  { result: 'loss', opponent: 'Anatoly_V',  rating: 2310, change: '-14', mode: 'Rapid 10+0',  ago: 'Yesterday' },
  { result: 'win',  opponent: 'Judit_H',    rating: 2195, change: '+6',  mode: 'Bullet 1+0',  ago: '2d ago' },
  { result: 'draw', opponent: 'Fischer_R',  rating: 2402, change: '+0',  mode: 'Blitz 5+0',   ago: '3d ago' },
  { result: 'win',  opponent: 'Tal_M',      rating: 2250, change: '+12', mode: 'Rapid 15+10', ago: '4d ago' },
];

const OnlineGameSetup = () => {
  const { joinQueue, leaveQueue, inQueue, isConnected } = useMultiplayerContext();
  const { data: me } = useQuery('/client/account');
  const [selectedCategory, setSelectedCategory] = useState(1); // Blitz default
  const [selectedTimeControl, setSelectedTimeControl] = useState(DEFAULT_TIME_CONTROL);

  // Pick a random bot once per mount
  const featuredBot = useMemo(() => {
    const bot = ALL_BOTS[Math.floor(Math.random() * ALL_BOTS.length)];
    const meta = TIER_META[bot.tierKey];
    return {
      name: bot.name,
      elo: bot.elo,
      tier: meta.label,
      tierKey: bot.tierKey,
      message: bot.message,
      style: meta.style,
      winRate: meta.winRate,
      activeTier: meta.activeTier,
      fen: TIER_FENS[bot.tierKey],
    };
  }, []);

  const handleCategoryClick = (categoryIndex, firstControl) => {
    if (inQueue) return;
    setSelectedCategory(categoryIndex);
    setSelectedTimeControl(firstControl);
  };

  const handlePillClick = (e, tc) => {
    e.stopPropagation();
    if (inQueue) return;
    setSelectedTimeControl(tc);
  };

  const handleFindGame = () => {
    if (inQueue) {
      leaveQueue();
    } else {
      joinQueue({ initial: selectedTimeControl.initial, increment: selectedTimeControl.increment });
    }
  };

  const getResultColor = (result) => {
    if (result === 'win') return 'bg-green-500';
    if (result === 'loss') return 'bg-red-500';
    return 'bg-surface-container-highest';
  };

  const getResultLabel = (result) => {
    if (result === 'win') return { text: 'Win', cls: 'text-green-600' };
    if (result === 'loss') return { text: 'Loss', cls: 'text-red-600' };
    return { text: 'Draw', cls: 'text-secondary-muted' };
  };

  const getChangeColor = (change) => {
    if (change.startsWith('+') && change !== '+0') return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-secondary-muted';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ── LEFT COLUMN ── */}
      <div className="lg:col-span-2 flex flex-col gap-6">

        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline text-3xl text-on-surface">Play Chess</h1>
              <p className="font-landing text-sm text-secondary-muted mt-1">
                Challenge a live opponent or test your skills against a bot
              </p>
            </div>
            {/* Connection status */}
            {isConnected ? (
              <span className="font-landing text-xs text-tertiaryGold bg-tertiaryGold/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-tertiaryGold rounded-full" />
                12,402 online
              </span>
            ) : (
              <span className="font-landing text-xs text-secondary-muted bg-surface-container px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <i className="fa-regular fa-circle-notch fa-spin text-xs" />
                Connecting...
              </span>
            )}
          </div>
        </div>

        {/* Online Play — Time Control Cards */}
        <div>
          <p className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted mb-3">
            Play Online
          </p>
          <div className="grid grid-cols-3 gap-3">
            {TIME_CATEGORIES.map((cat, idx) => {
              const isSelected = selectedCategory === idx;
              return (
                <div
                  key={cat.name}
                  onClick={() => handleCategoryClick(idx, cat.controls[0])}
                  className={`rounded-xl p-5 cursor-pointer transition-all ${
                    inQueue ? 'opacity-60 cursor-not-allowed' : ''
                  } ${
                    isSelected
                      ? 'bg-on-surface shadow-md'
                      : 'bg-surface-container-lowest hover:bg-surface-container-high'
                  }`}
                >
                  <i
                    className={`fa-regular ${cat.icon} text-lg mb-3 block ${
                      isSelected ? 'text-tertiaryGold' : 'text-secondary-muted'
                    }`}
                  />
                  <p
                    className={`font-headline text-xl mb-0.5 ${
                      isSelected ? 'text-white' : 'text-on-surface'
                    }`}
                  >
                    {cat.name}
                  </p>
                  <p
                    className={`font-landing text-xs mb-3 ${
                      isSelected ? 'text-white/60' : 'text-secondary-muted'
                    }`}
                  >
                    {cat.description}
                  </p>
                  {/* Time control pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.controls.map((tc) => {
                      const isPillActive = selectedTimeControl?.label === tc.label && isSelected;
                      return (
                        <button
                          key={tc.label}
                          onClick={(e) => handlePillClick(e, tc)}
                          disabled={inQueue}
                          className={`px-2.5 py-1 rounded-lg font-landing text-xs font-medium transition-all ${
                            isPillActive
                              ? 'bg-tertiary-container text-white'
                              : isSelected
                              ? 'bg-white/10 text-white/70 hover:bg-white/20'
                              : 'bg-surface-container text-secondary-muted hover:bg-surface-container-high'
                          }`}
                        >
                          {tc.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preparation Lab — bot practice featured card */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-flask text-xl text-tertiaryGold" aria-hidden />
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-surface leading-none">
                Preparation Lab
              </h2>
            </div>
            <span className="font-landing text-xs text-secondary-muted">12 opponents · ELO 500–2400</span>
          </div>

          {/* NoSsr prevents hydration mismatch from Math.random() */}
          <NoSsr>
          {/* Outer wrapper — board and card are siblings, same height */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">

            {/* Board — fixed width, self-stretch so it fills the card height */}
            <div className="flex-shrink-0 rounded-xl overflow-hidden self-stretch relative" style={{ width: '300px' }}>
              <NoSsr>
                <NextChessground
                  readOnly
                  fen={featuredBot.fen}
                  orientation="white"
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', display: 'block' }}
                />
              </NoSsr>
            </div>

            {/* Info card — sibling to the board */}
            <div className="bg-surface-container-lowest rounded-xl flex-1 min-w-0 flex flex-col justify-between p-5">
              <div>
                {/* Tier badge + ELO */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-landing text-xs font-bold uppercase tracking-widest text-tertiaryGold">
                    {featuredBot.tier}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant" />
                  <span className="font-landing text-xs text-secondary-muted">ELO {featuredBot.elo} · {featuredBot.style}</span>
                </div>

                {/* Bot name */}
                <p className="font-headline text-2xl text-on-surface leading-tight mb-0.5">{featuredBot.name}</p>
                <p className="font-landing text-xs text-secondary-muted mb-3">{featuredBot.style}</p>

                {/* Quote */}
                <p className="font-landing text-xs text-secondary-muted italic leading-relaxed mb-4 line-clamp-2">
                  "{featuredBot.message}"
                </p>

                {/* Difficulty tier row */}
                <div className="flex items-center gap-1.5 mb-4">
                  {[
                    { label: 'Beginner',     color: 'bg-green-500',  idx: 0 },
                    { label: 'Intermediate', color: 'bg-blue-400',   idx: 1 },
                    { label: 'Advanced',     color: 'bg-orange-400', idx: 2 },
                    { label: 'Master',       color: 'bg-red-500',    idx: 3 },
                  ].map((tier) => (
                    <span
                      key={tier.label}
                      className={`font-landing text-xs px-2.5 py-1 rounded-full transition-all ${
                        tier.idx === featuredBot.activeTier
                          ? `${tier.color} text-white font-semibold`
                          : 'bg-surface-container text-secondary-muted'
                      }`}
                    >
                      {tier.label}
                    </span>
                  ))}
                </div>

                {/* Win rate */}
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-landing text-xs text-secondary-muted">Win rate vs {featuredBot.name}</span>
                  <span className="font-landing text-xs font-semibold text-red-500">{featuredBot.winRate}</span>
                </div>
                <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: featuredBot.winRate }} />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <Link href={`/client/play/bot?bot=${encodeURIComponent(featuredBot.name)}&elo=${featuredBot.elo}`} className="flex-1">
                  <div className="w-full bg-on-surface hover:opacity-90 text-white font-landing font-bold text-sm py-2.5 rounded-lg transition-all text-center cursor-pointer">
                    Challenge Bot
                  </div>
                </Link>
                <Link href="/client/play/bot">
                  <div className="bg-surface-container hover:bg-surface-container-high text-on-surface font-landing font-semibold text-sm py-2.5 px-4 rounded-lg transition-all text-center cursor-pointer whitespace-nowrap">
                    View All
                  </div>
                </Link>
              </div>
            </div>
            {/* end info card */}
          </div>
          {/* end outer wrapper */}
          </NoSsr>
        </div>

        {/* Recent Games */}
        <div>
          <p className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted mb-3">
            Recent Games
          </p>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
            {RECENT_GAMES.map((game, i) => {
              const { text, cls } = getResultLabel(game.result);
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between px-5 py-3 hover:bg-surface-container transition-colors ${
                    i < RECENT_GAMES.length - 1 ? 'border-b border-outline-variant/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getResultColor(game.result)}`} />
                    <span className={`font-landing text-sm font-semibold ${cls}`}>{text}</span>
                    <span className="font-landing text-xs text-secondary-muted">vs</span>
                    <span className="font-landing text-sm text-on-surface">
                      {game.opponent}
                      <span className="text-secondary-muted text-xs ml-1">({game.rating})</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-landing text-xs text-secondary-muted hidden sm:block">{game.mode}</span>
                    <span className={`font-landing text-sm font-semibold ${getChangeColor(game.change)}`}>
                      {game.change}
                    </span>
                    <span className="font-landing text-xs text-secondary-muted w-16 text-right">{game.ago}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="flex flex-col gap-4">

        {/* Find Match CTA */}
        <div className="bg-on-surface rounded-xl p-6">
          {inQueue ? (
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-tertiaryGold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-headline text-xl text-white mb-1">Searching...</p>
              <p className="font-landing text-sm text-white/60 mb-1">
                {TIME_CATEGORIES[selectedCategory]?.name} · {selectedTimeControl?.label}
              </p>
              <p className="font-landing text-xs text-white/40 mb-5">
                Matching ±200 ELO ({me?.elo || 1200})
              </p>
              <button
                onClick={handleFindGame}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-landing font-bold py-3 rounded-xl transition-all"
              >
                Cancel Search
              </button>
            </div>
          ) : (
            <>
              <p className="font-landing text-xs text-tertiaryGold font-bold uppercase tracking-widest mb-1">
                {TIME_CATEGORIES[selectedCategory]?.name} · {selectedTimeControl?.label}
              </p>
              <p className="font-headline text-2xl text-white mb-1">Find a Match</p>
              <p className="font-landing text-xs text-white/50 mb-5">
                Matching players within ±200 ELO of {me?.elo || 1200}
              </p>
              <button
                onClick={handleFindGame}
                disabled={!isConnected}
                className="w-full bg-tertiary-container hover:opacity-90 text-white font-landing font-bold py-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <i className="fa-regular fa-chess-knight" />
                Find Match
              </button>
            </>
          )}
        </div>

        {/* Daily Performance */}
        <div className="bg-surface-container-lowest rounded-xl p-5">
          <p className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted mb-4">
            Daily Performance
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <span className="font-landing text-sm text-secondary-muted">Wins Today</span>
              <span className="font-headline text-2xl text-on-surface">14</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-landing text-sm text-secondary-muted">ELO Gained</span>
              <span className="font-headline text-2xl text-green-600">+22</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-landing text-sm text-secondary-muted">Win Rate</span>
              <span className="font-headline text-2xl text-on-surface">74%</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="font-landing text-xs text-secondary-muted">Progress to Next Tier</span>
              <span className="font-landing text-xs text-tertiaryGold">75%</span>
            </div>
            <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-tertiary-container rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </div>

        {/* Your Stats */}
        <div className="bg-surface-container-lowest rounded-xl p-5">
          <p className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted mb-4">
            Your Stats
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-landing text-sm text-secondary-muted">Current ELO</span>
              <span className="font-landing text-sm font-semibold text-on-surface">{me?.elo || 1200}</span>
            </div>
            <div className="flex justify-between items-center border-t border-outline-variant/20 pt-3">
              <span className="font-landing text-sm text-secondary-muted">Games Played</span>
              <span className="font-landing text-sm font-semibold text-on-surface">248</span>
            </div>
            <div className="flex justify-between items-center border-t border-outline-variant/20 pt-3">
              <span className="font-landing text-sm text-secondary-muted">Best Win Streak</span>
              <span className="font-landing text-sm font-semibold text-on-surface">7</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OnlineGameSetup;
