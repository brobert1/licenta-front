import { Link } from '@components';

const HARDCODED_GAMES = [
  { opponent: 'GM_Arkadiv', timeControl: 'Blitz • 3m+2s', result: '+8', icon: 'fa-circle-check' },
  { opponent: 'Stockfish_16', timeControl: 'Classical • 30m', result: '-14', icon: 'fa-circle-xmark' },
  { opponent: 'IM_Nakamura_Fan', timeControl: 'Bullet • 1m', result: '0', icon: 'fa-grip-lines' },
];

const RecentGames = () => (
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
      {HARDCODED_GAMES.map((game, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20"
        >
          <div className="flex items-center gap-3">
            <i className={`fa-regular ${game.icon} text-secondary-muted`} />
            <div>
              <p className="font-landing font-medium text-on-surface">vs. {game.opponent}</p>
              <p className="text-sm text-secondary-muted">{game.timeControl}</p>
            </div>
          </div>
          <span
            className={`font-headline font-semibold ${
              game.result.startsWith('+') ? 'text-green-600' : game.result.startsWith('-') ? 'text-red-600' : 'text-secondary-muted'
            }`}
          >
            {game.result}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default RecentGames;
