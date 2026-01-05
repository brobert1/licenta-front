import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useQuery } from '@hooks';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useEffect, useState } from 'react';

const MatchFoundAnimation = () => {
  const { opponent, playerColor } = useMultiplayerContext();
  const { data: me } = useQuery('/client/account');
  const [isExiting, setIsExiting] = useState(false);

  // Trigger exit animation before unmounting (controlled by parent timeout, but we sync locally)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2500); // Start fade out 0.5s before parent unmounts (total 3s)
    return () => clearTimeout(timer);
  }, []);

  // Helper to get avatar source
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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-secondary/95 backdrop-blur-sm ${
        isExiting ? 'animate-fade-out' : 'animate-fade-in'
      }`}
    >
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-16 animate-bounce-short">
          MATCH FOUND!
        </h2>
        <div className="flex items-center justify-center w-full gap-8 md:gap-16">
          <div className="flex flex-col items-center animate-slide-in-left">
            <div className="relative mb-4">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden border-4 border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]">
                <img src={myImage} alt="Me" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                {me?.elo || 1200}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{me?.name}</p>
            <p className="text-gray-400 font-medium">
              Play as {playerColor === 'white' ? 'White' : 'Black'}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center animate-scale-in self-center mt-[-2rem]">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.6)] border-4 border-white transform rotate-12">
              <span className="text-2xl md:text-4xl font-black text-white italic -rotate-12 pt-1 pr-1">
                VS
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center animate-slide-in-right">
            <div className="relative mb-4">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden border-4 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                <img src={opponentImage} alt="Opponent" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                {opponent?.elo || '?'}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{opponent?.name || 'Opponent'}</p>
            <p className="text-gray-400 font-medium">
              Play as {playerColor === 'white' ? 'Black' : 'White'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchFoundAnimation;
