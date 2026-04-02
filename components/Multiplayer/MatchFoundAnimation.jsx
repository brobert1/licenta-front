'use client';

import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useQuery } from '@hooks';
import { classnames } from '@lib';

const PieceBadge = ({ color }) => {
  const isWhite = color === 'white';
  return (
    <span
      className={classnames(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold',
        isWhite ? 'border border-border bg-surface text-primary' : 'bg-primary text-white'
      )}
    >
      <i className={classnames('fa-solid fa-chess-king', isWhite ? 'text-primary' : 'text-white')} />
      {isWhite ? 'White' : 'Black'}
    </span>
  );
};

const MatchFoundAnimation = () => {
  const { opponent, playerColor } = useMultiplayerContext();
  const { data: me } = useQuery('/client/account');

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
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-primary/40 px-4 py-8 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface shadow-xl">
        <div className="border-b border-border bg-secondary px-6 py-8 text-center md:px-10 md:py-10">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Pairing complete</p>
          <h2 className="mt-2 font-heading text-4xl tracking-tight text-primary md:text-5xl">Match found</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            You are paired with a rated opponent. The board opens automatically.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 px-6 py-8 md:flex-row md:justify-center md:gap-6 md:px-10 md:py-10">
          <div className="flex w-full max-w-xs flex-col items-center">
            <div className="relative mb-4">
              <div className="h-36 w-36 overflow-hidden rounded-2xl border-2 border-accent shadow-lg ring-4 ring-accent/20 md:h-44 md:w-44">
                <img src={myImage} alt="" className="h-full w-full object-cover" />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-sm">
                ELO {me?.elo ?? 400}
              </span>
            </div>
            <p className="font-heading text-xl text-primary">{me?.name || 'You'}</p>
            <p className="mt-1 text-xs text-muted">You</p>
            <div className="mt-3">
              <PieceBadge color={playerColor} />
            </div>
          </div>

          <div className="flex w-full max-w-xs flex-row items-center gap-3 md:w-auto md:max-w-none md:flex-col md:gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent md:h-16 md:w-px md:flex-none md:bg-gradient-to-b" />
            <div className="flex shrink-0 flex-col items-center gap-2">
              <span className="font-heading text-3xl italic text-accent md:text-4xl">vs</span>
              <i className="fa-solid fa-chess-board text-lg text-accent/80" aria-hidden />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent md:h-16 md:w-px md:flex-none md:bg-gradient-to-b" />
          </div>

          <div className="flex w-full max-w-xs flex-col items-center">
            <div className="relative mb-4">
              <div className="h-36 w-36 overflow-hidden rounded-2xl border-2 border-border bg-secondary shadow-lg ring-2 ring-border md:h-44 md:w-44">
                <img src={opponentImage} alt="" className="h-full w-full object-cover" />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">
                ELO {opponent?.elo ?? '—'}
              </span>
            </div>
            <p className="font-heading text-xl text-primary">{opponent?.name || 'Opponent'}</p>
            <p className="mt-1 text-xs text-muted">Opponent</p>
            <div className="mt-3">
              <PieceBadge color={oppColor} />
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-secondary px-6 py-5 text-center">
          <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
            <div
              className="h-8 w-8 rounded-full border-2 border-border border-t-accent animate-spin"
              aria-hidden
            />
            <p className="text-xs font-medium text-muted">Loading the board…</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchFoundAnimation;
