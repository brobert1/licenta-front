import { NoSsr } from '@components';
import { MultiplayerUserCard } from '@components/Multiplayer';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useQuery } from '@hooks';
import { useEqualHeight } from '@hooks';
import { NextChessground } from 'next-chessground';
import { useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

const TIME_CATEGORIES = [
  {
    name: 'Bullet',
    icon: 'fa-bolt',
    controls: [
      { label: '1 min', initial: 60, increment: 0 },
      { label: '1 | 1', initial: 60, increment: 1 },
      { label: '2 | 1', initial: 120, increment: 1 },
    ],
  },
  {
    name: 'Blitz',
    icon: 'fa-fire',
    controls: [
      { label: '3 min', initial: 180, increment: 0 },
      { label: '3 | 2', initial: 180, increment: 2 },
      { label: '5 min', initial: 300, increment: 0 },
    ],
  },
  {
    name: 'Rapid',
    icon: 'fa-clock',
    controls: [
      { label: '10 min', initial: 600, increment: 0 },
      { label: '15 | 10', initial: 900, increment: 10 },
      { label: '30 min', initial: 1800, increment: 0 },
    ],
  },
];

const DEFAULT_TIME_CONTROL = TIME_CATEGORIES[1].controls[0];

const OnlineGameSetup = () => {
  const { sourceRef, targetRef } = useEqualHeight();
  const { joinQueue, leaveQueue, inQueue, isConnected } = useMultiplayerContext();
  const { data: me } = useQuery('/client/account');
  const [selectedTimeControl, setSelectedTimeControl] = useState(DEFAULT_TIME_CONTROL);

  const handleSelectTimeControl = (tc) => {
    if (inQueue) return;
    setSelectedTimeControl(tc);
  };

  const handleFindGame = () => {
    if (inQueue) {
      leaveQueue();
    } else {
      joinQueue({
        initial: selectedTimeControl.initial,
        increment: selectedTimeControl.increment,
      });
    }
  };

  const generateOpponentAvatar = () => {
    const avatar = createAvatar(avataaars, {
      seed: 'random-opponent',
      size: 48,
      backgroundColor: ['404040'],
    });
    return avatar.toDataUri();
  };

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
      <div ref={sourceRef} className="md:col-span-3 max-w-chess-board h-min flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 lg:p-2 p-1 bg-secondary rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-tertiary rounded">
              <img
                src={generateOpponentAvatar()}
                className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md opacity-30"
                alt="Opponent"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500 font-medium text-base">Waiting for opponent...</p>
            </div>
          </div>
        </div>
        <NoSsr>
          <NextChessground
            readOnly
            fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            orientation="white"
          />
        </NoSsr>
        <MultiplayerUserCard />
      </div>
      <div
        ref={targetRef}
        className="md:col-span-2 bg-secondary rounded-lg flex flex-col overflow-hidden min-h-[800px] md:min-h-0"
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-white text-2xl font-bold mb-1">Play Online</h2>
          <p className="text-gray-400 text-sm">Find an opponent and play live</p>
        </div>
        {!isConnected && (
          <div className="m-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
            <p className="text-yellow-200 text-sm text-center">
              <i className="fas fa-circle-notch fa-spin mr-2"></i>
              Connecting to server...
            </p>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6">
          {TIME_CATEGORIES.map((category) => (
            <div key={category.name} className="mb-5 last:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <i className={`fas ${category.icon} text-white`}></i>
                <span className="text-white font-semibold">{category.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {category.controls.map((tc) => (
                  <button
                    key={tc.label}
                    onClick={() => handleSelectTimeControl(tc)}
                    disabled={inQueue}
                    className={`py-3 px-2 rounded text-sm font-medium transition-all border ${
                      selectedTimeControl?.label === tc.label
                        ? 'bg-primary border-primary text-white'
                        : 'bg-tertiary border-tertiary text-gray-300 hover:border-primary/50'
                    } ${inQueue ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {tc.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {inQueue && (
            <div className="bg-tertiary/50 rounded-lg p-4 mt-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary mx-auto mb-3"></div>
              <p className="text-white font-semibold mb-1">Searching for opponent...</p>
              <p className="text-gray-400 text-sm">Time: {selectedTimeControl?.label}</p>
              <p className="text-gray-500 text-xs mt-2">
                Matching players with similar ELO ({me?.elo || 1200} ± 200)
              </p>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleFindGame}
            disabled={!isConnected}
            className={`w-full font-bold text-lg py-4 rounded-lg shadow-xl transition-all transform ${
              inQueue
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-primary hover:bg-primary-dark hover:scale-105'
            } text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
          >
            {inQueue ? (
              <>
                <i className="fas fa-times mr-2"></i>
                Cancel Search
              </>
            ) : (
              <>
                <i className="fas fa-chess-knight mr-2"></i>
                Find Game
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnlineGameSetup;
