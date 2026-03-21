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
  beginner:     { label: 'Beginner',     style: 'Calm & Positional',      activeTier: 0 },
  intermediate: { label: 'Intermediate', style: 'Balanced & Developing',  activeTier: 1 },
  advanced:     { label: 'Advanced',     style: 'Sharp & Tactical',       activeTier: 2 },
  master:       { label: 'Master',       style: 'Tactical & Aggressive',  activeTier: 3 },
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

// ── helpers ──────────────────────────────────────────────────────────────────

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 2) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
};

const formatTimeControl = (timeControl) => {
  if (!timeControl?.initial) return '—';
  const { initial, increment } = timeControl;
  const mins = Math.round(initial / 60);
  const category = initial < 180 ? 'Bullet' : initial < 600 ? 'Blitz' : 'Rapid';
  return increment ? `${category} ${mins}+${increment}` : `${category} ${mins}min`;
};

// ── component ─────────────────────────────────────────────────────────────────

const OnlineGameSetup = () => {
  const { joinQueue, leaveQueue, inQueue, isConnected, playersOnline } = useMultiplayerContext();
  const { data: me } = useQuery('/client/account');
  const { data: games, status: gamesStatus } = useQuery('/client/play/history');
  const { data: dailyStats } = useQuery('/client/play/stats/daily');

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
      activeTier: meta.activeTier,
      fen: TIER_FENS[bot.tierKey],
    };
  }, []);

  // Win rate for the featured bot (computed from real game history)
  const botWinRate = useMemo(() => {
    if (!games?.length || !me) return null;
    const botGames = games.filter(
      (g) => g.type === 'bot' && (g.white === featuredBot.name || g.black === featuredBot.name)
    );
    if (!botGames.length) return null;
    const wins = botGames.filter((g) => {
      const isWhite = g.white === me.name;
      return (g.result === '1-0' && isWhite) || (g.result === '0-1' && !isWhite);
    }).length;
    return Math.round((wins / botGames.length) * 100);
  }, [games, me, featuredBot]);

  // Best win streak across all games (chronological order)
  const bestWinStreak = useMemo(() => {
    if (!games?.length || !me) return 0;
    let best = 0;
    let current = 0;
    // games is sorted newest-first; reverse to go chronological
    [...games].reverse().forEach((game) => {
      const isWhite = game.white === me.name;
      const won = (game.result === '1-0' && isWhite) || (game.result === '0-1' && !isWhite);
      if (won) {
        current += 1;
        if (current > best) best = current;
      } else {
        current = 0;
      }
    });
    return best;
  }, [games, me]);

  // Last 5 completed games for the recent games table
  const recentGames = useMemo(() => {
    if (!games?.length || !me) return [];
    return games.slice(0, 5).map((game) => {
      const isWhite = game.white === me.name;
      let result = 'draw';
      if (game.result === '1-0') result = isWhite ? 'win' : 'loss';
      else if (game.result === '0-1') result = isWhite ? 'loss' : 'win';
      const opponent = isWhite ? game.black : game.white;
      return {
        result,
        opponent,
        mode: formatTimeControl(game.timeControl),
        ago: timeAgo(game.createdAt),
        type: game.type, // 'bot' | 'live'
        id: game._id,
      };
    });
  }, [games, me]);

  const gamesPlayed = games?.length ?? '—';

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

  const getResultDot = (result) => {
    if (result === 'win') return 'bg-green-500';
    if (result === 'loss') return 'bg-red-500';
    return 'bg-surface-container-highest';
  };

  const getResultLabel = (result) => {
    if (result === 'win') return { text: 'Win', cls: 'text-green-500' };
    if (result === 'loss') return { text: 'Loss', cls: 'text-red-500' };
    return { text: 'Draw', cls: 'text-secondary-muted' };
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
            {isConnected ? (
              <span className="font-landing text-xs text-tertiaryGold bg-tertiaryGold/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-tertiaryGold rounded-full" />
                {playersOnline.toLocaleString()} online
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

        {/* Preparation Lab */}
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

          <NoSsr>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
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

              <div className="bg-surface-container-lowest rounded-xl flex-1 min-w-0 flex flex-col justify-between p-5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-landing text-xs font-bold uppercase tracking-widest text-tertiaryGold">
                      {featuredBot.tier}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant" />
                    <span className="font-landing text-xs text-secondary-muted">ELO {featuredBot.elo} · {featuredBot.style}</span>
                  </div>

                  <p className="font-headline text-2xl text-on-surface leading-tight mb-0.5">{featuredBot.name}</p>
                  <p className="font-landing text-xs text-secondary-muted mb-3">{featuredBot.style}</p>

                  <p className="font-landing text-xs text-secondary-muted italic leading-relaxed mb-4 line-clamp-2">
                    "{featuredBot.message}"
                  </p>

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

                  {/* Win rate vs this bot */}
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-landing text-xs text-secondary-muted">
                      Win rate vs {featuredBot.name}
                    </span>
                    {botWinRate === null ? (
                      <span className="font-landing text-xs text-secondary-muted italic">No games yet</span>
                    ) : (
                      <span className={`font-landing text-xs font-semibold ${
                        botWinRate >= 50 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {botWinRate}%
                      </span>
                    )}
                  </div>
                  <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                    {botWinRate !== null && (
                      <div
                        className={`h-full rounded-full ${botWinRate >= 50 ? 'bg-green-500' : 'bg-red-400'}`}
                        style={{ width: `${botWinRate}%` }}
                      />
                    )}
                  </div>
                </div>

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
            </div>
          </NoSsr>
        </div>

        {/* Recent Games */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted">
              Recent Games
            </p>
            <Link href="/client/play/history" className="font-landing text-xs text-tertiaryGold hover:underline">
              View all
            </Link>
          </div>

          <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
            {gamesStatus === 'loading' && (
              <div className="flex flex-col">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-5 py-3.5 ${i < 4 ? 'border-b border-outline-variant/20' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-surface-container-high animate-pulse" />
                      <div className="h-3 w-10 bg-surface-container-high rounded animate-pulse" />
                      <div className="h-3 w-24 bg-surface-container-high rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse hidden sm:block" />
                      <div className="h-3 w-12 bg-surface-container-high rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {gamesStatus === 'success' && recentGames.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <i className="fa-regular fa-chess text-3xl text-secondary-muted/40" />
                <p className="font-landing text-sm text-secondary-muted">No games played yet</p>
                <p className="font-landing text-xs text-secondary-muted/60">Play a game to see your history here</p>
              </div>
            )}

            {gamesStatus === 'success' && recentGames.length > 0 && recentGames.map((game, i) => {
              const { text, cls } = getResultLabel(game.result);
              return (
                <div
                  key={game.id || i}
                  className={`flex items-center justify-between px-5 py-3.5 hover:bg-surface-container transition-colors ${
                    i < recentGames.length - 1 ? 'border-b border-outline-variant/20' : ''
                  }`}
                >
                  {/* Left: result + opponent */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getResultDot(game.result)}`} />
                    <span className={`font-landing text-sm font-semibold w-9 flex-shrink-0 ${cls}`}>{text}</span>
                    <span className="font-landing text-xs text-secondary-muted">vs</span>
                    <span className="font-landing text-sm text-on-surface truncate">{game.opponent}</span>
                  </div>

                  {/* Right: type badge + mode + time */}
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className={`font-landing text-xs px-2 py-0.5 rounded-md font-medium hidden sm:block ${
                      game.type === 'live'
                        ? 'bg-blue-500/15 text-blue-400'
                        : 'bg-surface-container text-secondary-muted'
                    }`}>
                      {game.type === 'live' ? 'Live' : 'Bot'}
                    </span>
                    <span className="font-landing text-xs text-secondary-muted hidden md:block">{game.mode}</span>
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
          {(() => {
            const wins = dailyStats?.wins ?? 0;
            const losses = dailyStats?.losses ?? 0;
            const draws = dailyStats?.draws ?? 0;
            const total = wins + losses + draws;
            const winRate = total > 0 ? Math.round((wins / total) * 100) : null;
            const eloGained = dailyStats?.eloGained ?? 0;
            const winRatePct = winRate ?? 0;
            return (
              <>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-landing text-sm text-secondary-muted">Wins Today</span>
                    <span className="font-headline text-2xl text-on-surface">{wins}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-landing text-sm text-secondary-muted">ELO Gained</span>
                    <span className={`font-headline text-2xl ${eloGained > 0 ? 'text-green-500' : eloGained < 0 ? 'text-red-500' : 'text-secondary-muted'}`}>
                      {eloGained > 0 ? `+${eloGained}` : eloGained === 0 ? '—' : eloGained}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-landing text-sm text-secondary-muted">Win Rate</span>
                    <span className="font-headline text-2xl text-on-surface">
                      {winRate !== null ? `${winRate}%` : '—'}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-landing text-xs text-secondary-muted">
                      {total > 0 ? `${total} game${total !== 1 ? 's' : ''} today` : 'No games today'}
                    </span>
                    <span className="font-landing text-xs text-tertiaryGold">{winRatePct}%</span>
                  </div>
                  <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary-container rounded-full transition-all" style={{ width: `${winRatePct}%` }} />
                  </div>
                </div>
              </>
            );
          })()}
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
              <span className="font-landing text-sm font-semibold text-on-surface">
                {gamesStatus === 'loading' ? (
                  <span className="inline-block w-8 h-3 bg-surface-container-high rounded animate-pulse" />
                ) : (
                  gamesPlayed
                )}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-outline-variant/20 pt-3">
              <span className="font-landing text-sm text-secondary-muted">Best Win Streak</span>
              <span className="font-landing text-sm font-semibold text-on-surface">
                {gamesStatus === 'loading' ? (
                  <span className="inline-block w-4 h-3 bg-surface-container-high rounded animate-pulse" />
                ) : (
                  bestWinStreak
                )}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OnlineGameSetup;
