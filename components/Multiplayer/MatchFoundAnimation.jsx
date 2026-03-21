import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useQuery } from '@hooks';
import { useEffect, useState } from 'react';

const PieceBadge = ({ color }) => {
  const isWhite = color === 'white';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-landing text-xs font-bold ${
        isWhite
          ? 'border border-outline-variant/35 bg-surface-container-lowest text-on-surface'
          : 'bg-on-surface text-white'
      }`}
    >
      <i className={`fa-solid fa-chess-king ${isWhite ? 'text-on-surface' : 'text-white'}`} />
      {isWhite ? 'White' : 'Black'}
    </span>
  );
};

const MatchFoundAnimation = () => {
  const { opponent, playerColor } = useMultiplayerContext();
  const { data: me } = useQuery('/client/account');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const getAvatarSrc = (user, seedName) => {
    if (user?.image?.path) {
      return user.image.path;
    }
    return createAvatar(avataaars, {
      seed: user?.name || seedName,
      size: 96,
      backgroundColor: ['404040'],
    }).toDataUri();
  };

  const opponentImage = getAvatarSrc(opponent, 'opponent');
  const myImage = getAvatarSrc(me, 'me');
  const oppColor = playerColor === 'white' ? 'black' : 'white';

  return (
    <div
      className={`fixed inset-0 z-50 grid min-h-screen place-items-center overflow-y-auto bg-black/40 px-4 py-6 backdrop-blur-md lg:pl-64 ${
        isExiting ? 'animate-fade-out' : 'animate-fade-in'
      }`}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-outline-variant/25 bg-surface-container-lowest shadow-xl">
        <div className="border-b border-outline-variant/15 bg-gradient-to-br from-tertiaryGold/12 via-surface-container-lowest to-surface-container-low px-6 py-8 text-center md:px-10 md:py-10">
          <p className="font-landing text-xs font-bold uppercase tracking-widest text-tertiaryGold">
            Pairing complete
          </p>
          <h2 className="mt-2 font-headline text-4xl tracking-tight text-on-surface md:text-5xl">
            Match found
          </h2>
          <p className="mx-auto mt-3 max-w-md font-landing text-sm leading-relaxed text-secondary-muted">
            You&apos;re paired with a rated opponent. The board opens automatically.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 px-6 py-8 md:flex-row md:justify-center md:gap-6 md:px-10 md:py-10">
          <div className="flex w-full max-w-xs flex-col items-center animate-slide-in-left">
            <div className="relative mb-4">
              <div className="h-36 w-36 overflow-hidden rounded-2xl border-2 border-tertiaryGold shadow-lg ring-4 ring-tertiaryGold/20 md:h-44 md:w-44">
                <img src={myImage} alt="" className="h-full w-full object-cover" />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tertiary-container px-3 py-1 font-landing text-xs font-bold text-white shadow-sm">
                ELO {me?.elo ?? 1200}
              </span>
            </div>
            <p className="font-headline text-xl text-on-surface">{me?.name || 'You'}</p>
            <p className="mt-1 font-landing text-xs text-secondary-muted">You</p>
            <div className="mt-3">
              <PieceBadge color={playerColor} />
            </div>
          </div>

          <div className="flex w-full max-w-xs flex-row items-center gap-3 md:w-auto md:max-w-none md:flex-col md:gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-outline-variant/45 to-transparent md:h-16 md:w-px md:flex-none md:bg-gradient-to-b" />
            <div className="flex shrink-0 flex-col items-center gap-2">
              <span className="font-headline text-3xl italic text-tertiaryGold md:text-4xl">vs</span>
              <i className="fa-solid fa-chess-board text-lg text-tertiaryGold/70" aria-hidden />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-outline-variant/45 to-transparent md:h-16 md:w-px md:flex-none md:bg-gradient-to-b" />
          </div>

          <div className="flex w-full max-w-xs flex-col items-center animate-slide-in-right">
            <div className="relative mb-4">
              <div className="h-36 w-36 overflow-hidden rounded-2xl border-2 border-outline-variant/35 bg-surface-container shadow-lg ring-2 ring-outline-variant/15 md:h-44 md:w-44">
                <img src={opponentImage} alt="" className="h-full w-full object-cover" />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-on-surface px-3 py-1 font-landing text-xs font-bold text-white shadow-sm">
                ELO {opponent?.elo ?? '—'}
              </span>
            </div>
            <p className="font-headline text-xl text-on-surface">{opponent?.name || 'Opponent'}</p>
            <p className="mt-1 font-landing text-xs text-secondary-muted">Opponent</p>
            <div className="mt-3">
              <PieceBadge color={oppColor} />
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/15 bg-surface-container/50 px-6 py-4 text-center">
          <p className="font-landing text-xs text-secondary-muted">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary-container animate-pulse" />
              Loading the board…
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchFoundAnimation;
