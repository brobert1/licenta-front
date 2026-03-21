import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useQuery } from '@hooks';
import { classnames } from '@lib';
import { useRouter } from 'next/router';

const PieceBadge = ({ color }) => {
  const isWhite = color === 'white';
  return (
    <span
      className={classnames(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-landing text-xs font-bold',
        isWhite
          ? 'border border-outline-variant/35 bg-surface-container-lowest text-on-surface'
          : 'bg-on-surface text-white'
      )}
    >
      <i
        className={classnames('fa-solid fa-chess-king text-xs', isWhite ? 'text-on-surface' : 'text-white')}
      />
      {isWhite ? 'White' : 'Black'}
    </span>
  );
};

const GameOverModal = () => {
  const { activeGame, gameResult, playerColor, opponent, eloChange, reset } =
    useMultiplayerContext();
  const { data: me } = useQuery('/client/account');
  const router = useRouter();

  const isGameOver = activeGame?.status === 'completed' || activeGame?.gameOver;

  if (!isGameOver) return null;

  let resultTitle = '';
  let resultSubtitle = '';
  let tone = 'draw';

  if (gameResult === '1/2-1/2') {
    resultTitle = 'Draw!';
    resultSubtitle = 'The game ended in a draw';
    tone = 'draw';
  } else if (
    (gameResult === '1-0' && playerColor === 'white') ||
    (gameResult === '0-1' && playerColor === 'black')
  ) {
    resultTitle = 'Victory!';
    resultSubtitle = `You outplayed ${opponent?.name || 'your opponent'}`;
    tone = 'win';
  } else {
    resultTitle = 'Defeat';
    resultSubtitle = `${opponent?.name || 'Your opponent'} took the point`;
    tone = 'loss';
  }

  const oppColor = playerColor === 'white' ? 'black' : 'white';

  const getAvatarSrc = (user, seedName) => {
    if (user?.image?.path) {
      return user.image.path;
    }
    return createAvatar(avataaars, {
      seed: user?.name || seedName,
      size: 80,
      backgroundColor: ['e6e8ea'],
    }).toDataUri();
  };

  const myImage = getAvatarSrc(me, 'me');
  const opponentImage = getAvatarSrc(opponent, 'opponent');

  const eloText =
    eloChange !== null && eloChange !== undefined
      ? eloChange >= 0
        ? `+${eloChange}`
        : `${eloChange}`
      : null;

  const accentBar = {
    draw: 'bg-tertiary-container',
    win: 'bg-green-500',
    loss: 'bg-red-500',
  }[tone];

  const iconRing = {
    draw: 'border-amber-200 bg-amber-50 shadow-sm',
    win: 'border-green-200 bg-green-50 shadow-sm',
    loss: 'border-red-200 bg-red-50 shadow-sm',
  }[tone];

  const iconClass = {
    draw: 'fa-handshake text-amber-700',
    win: 'fa-trophy text-green-600',
    loss: 'fa-flag text-red-600',
  }[tone];

  const titleClass = {
    draw: 'text-tertiaryGold',
    win: 'text-green-700',
    loss: 'text-red-700',
  }[tone];

  const eloColor =
    eloChange > 0
      ? 'text-green-600'
      : eloChange < 0
        ? 'text-red-600'
        : 'text-secondary-muted';

  const eloIcon = eloChange > 0 ? 'fa-arrow-up' : eloChange < 0 ? 'fa-arrow-down' : 'fa-minus';

  const handlePlayAgain = () => {
    reset();
    router.replace('/client/play');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-black/45 px-4 py-8 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mp-game-over-title"
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-outline-variant/25 bg-surface-container-lowest shadow-2xl ring-4 ring-tertiaryGold/10">
        <div className={classnames('h-1.5 w-full', accentBar)} aria-hidden />

        <div className="border-b border-outline-variant/15 bg-gradient-to-br from-tertiaryGold/12 via-surface-container-lowest to-surface-container-low px-6 pb-6 pt-7 text-center">
          <p className="font-landing text-xs font-bold uppercase tracking-widest text-tertiaryGold">
            Game over
          </p>
          <div className="mt-4 flex justify-center">
            <div
              className={classnames(
                'flex h-16 w-16 items-center justify-center rounded-2xl border-2 shadow-md',
                iconRing
              )}
            >
              <i className={classnames('fas text-3xl', iconClass)} aria-hidden />
            </div>
          </div>
          <h2
            id="mp-game-over-title"
            className={classnames('mt-4 font-headline text-4xl tracking-tight', titleClass)}
          >
            {resultTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-sm font-landing text-sm leading-relaxed text-secondary-muted">
            {resultSubtitle}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <div className="flex animate-slide-in-left flex-col items-center gap-2">
              <div className="overflow-hidden rounded-xl border-2 border-tertiaryGold/40 bg-surface-container p-0.5 shadow-sm ring-2 ring-tertiaryGold/15">
                <img src={myImage} alt="" className="h-14 w-14 rounded-lg object-cover" />
              </div>
              <span className="w-24 truncate text-center font-landing text-xs font-semibold text-on-surface">
                {me?.name || 'You'}
              </span>
              <PieceBadge color={playerColor} />
            </div>

            <div className="flex flex-col items-center gap-1 px-2">
              <span className="font-headline text-2xl italic text-tertiaryGold/90">vs</span>
              <span className="font-landing text-xs uppercase tracking-widest text-secondary-muted">
                Final
              </span>
            </div>

            <div className="flex animate-slide-in-right flex-col items-center gap-2">
              <div className="overflow-hidden rounded-xl border-2 border-outline-variant/30 bg-surface-container p-0.5 shadow-sm">
                <img src={opponentImage} alt="" className="h-14 w-14 rounded-lg object-cover" />
              </div>
              <span className="w-24 truncate text-center font-landing text-xs font-semibold text-on-surface">
                {opponent?.name || 'Opponent'}
              </span>
              <PieceBadge color={oppColor} />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-5">
          {eloText && (
            <div className="mb-5 flex items-center gap-4 rounded-xl border border-black/10 bg-gameplay-elevated px-4 py-4">
              <div
                className={classnames(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-surface-container-lowest',
                  eloChange > 0 && 'text-green-600',
                  eloChange < 0 && 'text-red-600',
                  eloChange === 0 && 'text-secondary-muted'
                )}
              >
                <i className={classnames('fa-solid text-lg', eloIcon)} aria-hidden />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="font-landing text-xs font-bold uppercase tracking-widest text-secondary-muted">
                  Rating change
                </p>
                <p className={classnames('font-mono text-2xl font-bold tabular-nums', eloColor)}>
                  {eloText}
                </p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handlePlayAgain}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-tertiary-container py-3.5 font-landing text-base font-bold text-on-surface shadow-sm transition-opacity hover:opacity-95"
          >
            <i className="fas fa-chess" aria-hidden />
            Play again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
