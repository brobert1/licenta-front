import { Link } from '@components';
import { useQuery } from '@hooks';
import { useMemo } from 'react';

const formatTimeControl = (tc) => {
  if (!tc?.initial) return '—';
  const mins = Math.round(tc.initial / 60);
  const category = tc.initial < 180 ? 'Bullet' : tc.initial < 600 ? 'Blitz' : 'Rapid';
  return tc.increment ? `${category} · ${mins}+${tc.increment}` : `${category} · ${mins}min`;
};

const RecentGames = () => {
  const { data: me } = useQuery('/client/account');
  const { data: games, status } = useQuery('/client/play/history');

  const recentGames = useMemo(() => {
    if (!games?.length || !me) return [];
    return games.slice(0, 4).map((game) => {
      const isWhite = game.white === me.name;
      let outcome = 'draw';
      if (game.result === '1-0') outcome = isWhite ? 'win' : 'loss';
      else if (game.result === '0-1') outcome = isWhite ? 'loss' : 'win';
      return {
        id: game._id,
        outcome,
        opponent: isWhite ? game.black : game.white,
        timeControl: formatTimeControl(game.timeControl),
        type: game.type,
      };
    });
  }, [games, me]);

  const resultIcon = (outcome) => {
    if (outcome === 'win') return { icon: 'fa-circle-check', cls: 'text-green-500' };
    if (outcome === 'loss') return { icon: 'fa-circle-xmark', cls: 'text-red-500' };
    return { icon: 'fa-grip-lines', cls: 'text-secondary-muted' };
  };

  const resultLabel = (outcome) => {
    if (outcome === 'win') return { text: 'Win', cls: 'text-green-500' };
    if (outcome === 'loss') return { text: 'Loss', cls: 'text-red-500' };
    return { text: 'Draw', cls: 'text-secondary-muted' };
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-headline text-xl text-on-surface">Recent Games</h2>
        <Link
          href="/client/play/history"
          className="text-sm font-landing font-semibold text-tertiaryGold hover:underline"
        >
          History
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {status === 'loading' &&
          [0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-surface-container-high animate-pulse" />
                <div>
                  <div className="h-3.5 w-28 bg-surface-container-high rounded animate-pulse mb-1" />
                  <div className="h-3 w-20 bg-surface-container-high rounded animate-pulse" />
                </div>
              </div>
              <div className="h-4 w-10 bg-surface-container-high rounded animate-pulse" />
            </div>
          ))}

        {status === 'success' && recentGames.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <i className="fa-regular fa-chess text-3xl text-secondary-muted/40" />
            <p className="font-landing text-sm text-secondary-muted">No games played yet</p>
            <Link href="/client/play" className="font-landing text-xs text-tertiaryGold hover:underline">
              Play now
            </Link>
          </div>
        )}

        {status === 'success' &&
          recentGames.map((game) => {
            const { icon, cls } = resultIcon(game.outcome);
            const { text, cls: textCls } = resultLabel(game.outcome);
            return (
              <div
                key={game.id}
                className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 hover:bg-surface-container transition-colors"
              >
                <div className="flex items-center gap-3">
                  <i className={`fa-regular ${icon} ${cls}`} />
                  <div>
                    <p className="font-landing font-medium text-on-surface">vs. {game.opponent}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-secondary-muted">{game.timeControl}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                        game.type === 'live'
                          ? 'bg-blue-500/15 text-blue-400'
                          : 'bg-surface-container text-secondary-muted'
                      }`}>
                        {game.type === 'live' ? 'Live' : 'Bot'}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`font-landing font-semibold text-sm ${textCls}`}>{text}</span>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default RecentGames;
