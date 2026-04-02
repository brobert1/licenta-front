'use client';

import { Link, NoSsr } from '@components';
import PlayersOnlineBadge from '@components/Client/PlayersOnlineBadge';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { bots } from '@data/bots';
import { useQuery } from '@hooks';
import { NextChessground } from 'next-chessground';
import { stringifyUrl } from 'query-string';
import { useEffect, useMemo, useState } from 'react';

const TIER_FENS = {
  beginner: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
  intermediate: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
  advanced: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQR1K1 w - - 0 8',
  master: 'rnbqkb1r/1p2pppp/p2p1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq - 0 7',
};

const TIER_META = {
  beginner: { label: 'Beginner', style: 'Calm & positional', activeTier: 0 },
  intermediate: { label: 'Intermediate', style: 'Balanced & developing', activeTier: 1 },
  advanced: { label: 'Advanced', style: 'Sharp & tactical', activeTier: 2 },
  master: { label: 'Master', style: 'Tactical & aggressive', activeTier: 3 },
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

const QUEUE_WAITING_TIPS = [
  'Tip: lock in a first-move idea—you will need it the second the clock starts.',
  'Blitz rewards pattern speed; one clean tactic often decides the game.',
  'Rapid is a marathon—save your deepest think for the one critical moment.',
  'Micro-break: look away from the screen for ten seconds.',
  'Every titled player has waited in a queue like this—patience is part of prep.',
];

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

const formatLiveTimeControl = (timeControl) => {
  if (!timeControl?.initial) return '—';
  const { initial, increment } = timeControl;
  const mins = Math.round(initial / 60);
  const category = initial < 180 ? 'Bullet' : initial < 600 ? 'Blitz' : 'Rapid';
  return increment ? `${category} ${mins}+${increment}` : `${category} ${mins}min`;
};

const formatBotTimeControl = (tc) => {
  if (!tc?.minutes) return '—';
  const initial = tc.minutes * 60;
  const inc = tc.increment ?? 0;
  return formatLiveTimeControl({ initial, increment: inc });
};

const playHistoryUrl = stringifyUrl({ url: '/client/play/history', query: { per_page: 50 } });

const OnlineGameSetup = () => {
  const { joinQueue, leaveQueue, inQueue, isConnected, playersOnline } = useMultiplayerContext();
  const { data: me } = useQuery('/client/account');
  const { data: historyPayload, status: gamesStatus } = useQuery(playHistoryUrl);
  const { data: dailyStats } = useQuery('/client/play/stats/daily');

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedTimeControl, setSelectedTimeControl] = useState(DEFAULT_TIME_CONTROL);
  const [queueTipIndex, setQueueTipIndex] = useState(0);

  const allGames = historyPayload?.pages ?? [];

  useEffect(() => {
    if (!inQueue) {
      setQueueTipIndex(0);
      return undefined;
    }
    const id = setInterval(() => {
      setQueueTipIndex((i) => (i + 1) % QUEUE_WAITING_TIPS.length);
    }, 5200);
    return () => clearInterval(id);
  }, [inQueue]);

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

  const botWinRate = useMemo(() => {
    if (!allGames.length || !me) return null;
    const botGamesVs = allGames.filter(
      (g) => (g.mode === 'bot' || !g.mode) && g.botName === featuredBot.name
    );
    if (!botGamesVs.length) return null;
    const wins = botGamesVs.filter((g) => g.outcome === 'win').length;
    return Math.round((wins / botGamesVs.length) * 100);
  }, [allGames, me, featuredBot.name]);

  const mergedHistory = useMemo(() => {
    if (!me) return [];
    return allGames
      .map((g) => {
        if (g.mode === 'online') {
          const mid = String(me._id);
          const isWhite = String(g.whitePlayer) === mid;
          let result = 'draw';
          if (g.result === '1-0') result = isWhite ? 'win' : 'loss';
          else if (g.result === '0-1') result = isWhite ? 'loss' : 'win';
          return {
            type: 'online',
            sortAt: g.updatedAt || g.createdAt,
            result,
            opponent: isWhite ? g.black : g.white,
            timeLabel: formatLiveTimeControl(g.timeControl),
            id: g._id,
          };
        }
        return {
          type: 'bot',
          sortAt: g.createdAt,
          result: g.outcome,
          opponent: g.botName,
          timeLabel: formatBotTimeControl(g.timeControl),
          id: g._id,
        };
      })
      .sort((a, b) => new Date(b.sortAt).getTime() - new Date(a.sortAt).getTime());
  }, [allGames, me]);

  const bestWinStreak = useMemo(() => {
    if (!mergedHistory.length) return 0;
    let best = 0;
    let current = 0;
    [...mergedHistory].reverse().forEach((game) => {
      if (game.result === 'win') {
        current += 1;
        if (current > best) best = current;
      } else {
        current = 0;
      }
    });
    return best;
  }, [mergedHistory]);

  const recentGames = useMemo(() => mergedHistory.slice(0, 5), [mergedHistory]);

  const gamesPlayed = historyPayload?.pageParams?.count ?? allGames.length;

  const handleCategoryClick = (categoryIndex, firstControl) => {
    if (inQueue) return;
    setSelectedCategory(categoryIndex);
    setSelectedTimeControl(firstControl);
  };

  const handlePillClick = (e, categoryIndex, tc) => {
    e.stopPropagation();
    if (inQueue) return;
    setSelectedCategory(categoryIndex);
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
    return 'bg-grey';
  };

  const getResultLabel = (result) => {
    if (result === 'win') return { text: 'Win', cls: 'text-green-600' };
    if (result === 'loss') return { text: 'Loss', cls: 'text-red-600' };
    return { text: 'Draw', cls: 'text-muted' };
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-heading text-3xl text-primary">Play online</h1>
              <p className="mt-1 text-sm text-muted">Rated games against real opponents</p>
            </div>
            <PlayersOnlineBadge />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Time control</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {TIME_CATEGORIES.map((cat, idx) => {
              const isSelected = selectedCategory === idx;
              return (
                <div
                  key={cat.name}
                  onClick={() => handleCategoryClick(idx, cat.controls[0])}
                  className={`cursor-pointer rounded-xl border border-border p-5 transition-all ${
                    inQueue ? 'cursor-not-allowed opacity-60' : ''
                  } ${isSelected ? 'bg-primary text-white shadow-md' : 'bg-surface hover:bg-secondary'}`}
                >
                  <i
                    className={`fa-regular ${cat.icon} mb-3 block text-lg ${
                      isSelected ? 'text-accent' : 'text-muted'
                    }`}
                  />
                  <p className={`font-heading text-xl ${isSelected ? 'text-white' : 'text-primary'}`}>
                    {cat.name}
                  </p>
                  <p className={`mb-3 text-xs ${isSelected ? 'text-white/70' : 'text-muted'}`}>
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.controls.map((tc) => {
                      const isPillActive =
                        isSelected &&
                        selectedTimeControl?.initial === tc.initial &&
                        selectedTimeControl?.increment === tc.increment;
                      return (
                        <button
                          key={tc.label}
                          type="button"
                          onClick={(e) => handlePillClick(e, idx, tc)}
                          disabled={inQueue}
                          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                            isPillActive
                              ? 'bg-accent text-white'
                              : isSelected
                                ? 'bg-white/15 text-white/80 hover:bg-white/25'
                                : 'bg-secondary text-muted hover:bg-tertiary'
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

        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-flask text-xl text-accent" aria-hidden />
              <h2 className="font-heading text-xl font-bold text-primary sm:text-2xl">Preparation lab</h2>
            </div>
            <span className="text-xs text-muted">Train vs Maia bots from Play</span>
          </div>

          <NoSsr>
            <div className="flex flex-col items-stretch gap-4 sm:flex-row">
              <div className="relative w-full max-w-sm shrink-0 self-stretch overflow-hidden rounded-xl border border-border bg-secondary aspect-square sm:max-w-xs">
                <NextChessground viewOnly fen={featuredBot.fen} orientation="white" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between rounded-xl border border-border bg-surface p-5">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">
                      {featuredBot.tier}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="text-xs text-muted">
                      ELO {featuredBot.elo} · {featuredBot.style}
                    </span>
                  </div>

                  <p className="font-heading text-2xl text-primary">{featuredBot.name}</p>
                  <p className="mb-3 text-xs text-muted">{featuredBot.style}</p>

                  <p className="mb-4 line-clamp-2 text-xs italic leading-relaxed text-muted">
                    &ldquo;{featuredBot.message}&rdquo;
                  </p>

                  <div className="mb-4 flex flex-wrap items-center gap-1.5">
                    {[
                      { label: 'Beginner', color: 'bg-green-500', idx: 0 },
                      { label: 'Intermediate', color: 'bg-blue-400', idx: 1 },
                      { label: 'Advanced', color: 'bg-orange-400', idx: 2 },
                      { label: 'Master', color: 'bg-red-500', idx: 3 },
                    ].map((tier) => (
                      <span
                        key={tier.label}
                        className={`rounded-full px-2.5 py-1 text-xs transition-all ${
                          tier.idx === featuredBot.activeTier
                            ? `${tier.color} font-semibold text-white`
                            : 'bg-secondary text-muted'
                        }`}
                      >
                        {tier.label}
                      </span>
                    ))}
                  </div>

                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-muted">Win rate vs {featuredBot.name}</span>
                    {botWinRate === null ? (
                      <span className="text-xs italic text-muted">No games yet</span>
                    ) : (
                      <span
                        className={`text-xs font-semibold ${botWinRate >= 50 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {botWinRate}%
                      </span>
                    )}
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-secondary">
                    {botWinRate !== null && (
                      <div
                        className={`h-full rounded-full ${botWinRate >= 50 ? 'bg-green-500' : 'bg-orange-400'}`}
                        style={{ width: `${botWinRate}%` }}
                      />
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/client/play/bot?bot=${encodeURIComponent(featuredBot.name)}`}
                    className="flex-1 rounded-lg bg-accent py-2.5 text-center text-sm font-bold text-white transition-opacity hover:bg-accent-hover"
                  >
                    Challenge bot
                  </Link>
                  <Link
                    href="/client/play/bot"
                    className="rounded-lg border border-border bg-secondary px-4 py-2.5 text-center text-sm font-semibold text-primary transition-colors hover:bg-tertiary"
                  >
                    All bots
                  </Link>
                </div>
              </div>
            </div>
          </NoSsr>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-muted">Recent games</p>
            <Link href="/client/profile" className="text-xs font-semibold text-accent hover:underline">
              View all
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            {gamesStatus === 'loading' && (
              <div className="flex flex-col">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-5 py-3.5 ${
                      i < 4 ? 'border-b border-border' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-tertiary" />
                      <div className="h-3 w-24 animate-pulse rounded bg-tertiary" />
                    </div>
                    <div className="h-3 w-12 animate-pulse rounded bg-tertiary" />
                  </div>
                ))}
              </div>
            )}

            {gamesStatus === 'success' && recentGames.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-10">
                <i className="fa-regular fa-chess text-3xl text-muted opacity-40" />
                <p className="text-sm text-muted">No games yet</p>
              </div>
            )}

            {gamesStatus === 'success' &&
              recentGames.map((game, i) => {
                const { text, cls } = getResultLabel(game.result);
                const href = `/client/play/view-game/${game.id}`;
                return (
                  <Link
                    key={game.id || i}
                    href={href}
                    className={`flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-secondary ${
                      i < recentGames.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${getResultDot(game.result)}`} />
                      <span className={`w-9 shrink-0 text-sm font-semibold ${cls}`}>{text}</span>
                      <span className="text-xs text-muted">vs</span>
                      <span className="truncate text-sm text-primary">{game.opponent}</span>
                    </div>
                    <div className="ml-3 flex shrink-0 items-center gap-3">
                      <span
                        className={`hidden text-xs font-medium sm:block ${
                          game.type === 'online' ? 'text-interactive' : 'text-muted'
                        }`}
                      >
                        {game.type === 'online' ? 'Online' : 'Bot'}
                      </span>
                      <span className="hidden text-xs text-muted md:block">{game.timeLabel}</span>
                      <span className="w-16 text-right text-xs text-muted">{timeAgo(game.sortAt)}</span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          {inQueue ? (
            <div className="flex flex-col gap-4 text-left" aria-busy="true" aria-live="polite" role="status">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-accent/30 bg-secondary text-accent">
                  <i className="fa-solid fa-chess-clock text-2xl" aria-hidden />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="flex flex-wrap items-center gap-2 font-heading text-xl text-primary">
                    In the queue
                    <span className="inline-flex items-end gap-1 pb-1" aria-hidden>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-accent" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-accent delay-75" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-accent delay-150" />
                    </span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    We will seat you when another player picks the same time control and a compatible rating.
                  </p>
                  {playersOnline > 0 && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-accent">
                      <i className="fa-solid fa-earth-americas" aria-hidden />
                      {playersOnline} player{playersOnline === 1 ? '' : 's'} online
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-accent/30 bg-accent/5 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">While you wait</p>
                <p key={queueTipIndex} className="mt-1.5 text-sm leading-relaxed text-primary animate-fade-in">
                  {QUEUE_WAITING_TIPS[queueTipIndex]}
                </p>
              </div>

              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                <li className="flex items-center justify-between gap-4 bg-secondary px-4 py-3">
                  <span className="text-sm text-muted">Time control</span>
                  <span className="text-right text-sm font-semibold text-primary">
                    {TIME_CATEGORIES[selectedCategory]?.name} · {selectedTimeControl?.label}
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4 bg-secondary px-4 py-3">
                  <span className="text-sm text-muted">Your rating</span>
                  <span className="text-right text-sm font-semibold text-primary">
                    {me?.elo ?? 400}
                    <span className="font-normal text-muted"> · ±200</span>
                  </span>
                </li>
              </ul>

              <button
                type="button"
                onClick={handleFindGame}
                className="w-full rounded-xl border-2 border-dashed border-border py-3 text-sm font-semibold text-muted transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
              >
                Leave queue
              </button>
            </div>
          ) : (
            <>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-accent">
                {TIME_CATEGORIES[selectedCategory]?.name} · {selectedTimeControl?.label}
              </p>
              <p className="mb-1 font-heading text-2xl text-primary">Find a match</p>
              <p className="mb-5 text-xs text-muted">
                Matching players within ±200 ELO of {me?.elo ?? 400}
              </p>
              <button
                type="button"
                onClick={handleFindGame}
                disabled={!isConnected}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                <i className="fa-regular fa-chess-knight" />
                Find match
              </button>
            </>
          )}
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">Daily performance</p>
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
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted">Wins today</span>
                    <span className="font-heading text-2xl text-primary">{wins}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted">ELO gained</span>
                    <span
                      className={`font-heading text-2xl ${
                        eloGained > 0 ? 'text-green-600' : eloGained < 0 ? 'text-red-600' : 'text-muted'
                      }`}
                    >
                      {eloGained > 0 ? `+${eloGained}` : eloGained === 0 ? '—' : eloGained}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted">Win rate</span>
                    <span className="font-heading text-2xl text-primary">
                      {winRate !== null ? `${winRate}%` : '—'}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between">
                    <span className="text-xs text-muted">
                      {total > 0 ? `${total} game${total !== 1 ? 's' : ''} today` : 'No live games today'}
                    </span>
                    <span className="text-xs text-accent">{winRatePct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{ width: `${winRatePct}%` }}
                    />
                  </div>
                </div>
              </>
            );
          })()}
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">Your stats</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Current ELO</span>
              <span className="text-sm font-semibold text-primary">{me?.elo ?? 400}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm text-muted">Games tracked</span>
              <span className="text-sm font-semibold text-primary">
                {gamesStatus === 'loading' ? (
                  <span className="inline-block h-3 w-8 animate-pulse rounded bg-tertiary" />
                ) : (
                  gamesPlayed
                )}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm text-muted">Best win streak</span>
              <span className="text-sm font-semibold text-primary">
                {gamesStatus === 'loading' ? (
                  <span className="inline-block h-3 w-4 animate-pulse rounded bg-tertiary" />
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
