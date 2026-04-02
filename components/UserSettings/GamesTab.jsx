import { Error, Link } from '@components';
import { LoadMoreOnClick } from '@components/Buttons';
import { GameFiltersForm } from '@components/Forms';
import { useInfiniteQuery, useQuery } from '@hooks';
import { useMemo, useState } from 'react';
import GamesTabRow from './GamesTabRow';
import GamesTabSkeleton from './GamesTabSkeleton';

const outcomeToScore = (outcome) => {
  if (outcome === 'win') return '1';
  if (outcome === 'loss') return '0';
  return '½';
};

const GamesTab = () => {
  const [options, setOptions] = useState({});
  const { data: me } = useQuery('/client/account');

  const { data, error, status, ...infiniteProps } = useInfiniteQuery('/client/play/history', {
    per_page: 7,
    ...options,
  });

  const games = useMemo(() => (data?.pages ? data.pages.flat() : []), [data]);

  const rows = useMemo(() => {
    if (!games.length || !me?._id) return [];
    const mid = String(me._id);
    return games.map((game) => {
      if (game.mode === 'online') {
        const isWhite = String(game.whitePlayer) === mid;
        const opponentName = isWhite ? game.black : game.white;
        let outcome = 'draw';
        if (game.result === '1-0') outcome = isWhite ? 'win' : 'loss';
        else if (game.result === '0-1') outcome = isWhite ? 'loss' : 'win';
        return {
          game,
          gameSource: 'online',
          opponentName,
          opponentElo: null,
          userScore: outcomeToScore(outcome),
        };
      }
      return {
        game,
        gameSource: 'bot',
        opponentName: game.botName,
        opponentElo: game.botElo,
        userScore: outcomeToScore(game.outcome),
      };
    });
  }, [games, me]);

  if (status === 'error') return <Error message={error?.message} />;

  return (
    <div className="flex flex-col">
      <GameFiltersForm setOptions={setOptions} />
      {status === 'loading' ? (
        <GamesTabSkeleton />
      ) : !rows.length ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted">
          <i className="fa-solid fa-chess-board mb-4 text-4xl opacity-50" />
          <p>You haven't played any games.</p>
          <Link href="/client/play" className="mt-4 button full accent hover:underline">
            Play now
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-border bg-surface overflow-hidden">
            <div className="border-b border-border bg-white px-4 py-3">
              <h2 className="font-heading text-lg font-semibold text-primary">Game History</h2>
            </div>
            <div className="divide-y divide-border">
              {rows.map(({ game, gameSource, opponentName, opponentElo, userScore }) => (
                <div
                  key={game._id}
                  className="bg-surface px-4 hover:bg-tertiary/50 transition-colors"
                >
                  <GamesTabRow
                    game={game}
                    gameSource={gameSource}
                    opponentName={opponentName}
                    opponentElo={opponentElo}
                    userScore={userScore}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="[&_.button]:bg-accent [&_.button]:w-full [&_.button]:text-white">
            <LoadMoreOnClick {...infiniteProps} />
          </div>
        </>
      )}
    </div>
  );
};

export default GamesTab;
