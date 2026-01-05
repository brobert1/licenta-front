import { Button } from '@components';
import { time } from '@functions';
import { useEqualHeight } from '@hooks';
import { useQuery } from '@hooks';
import { classnames } from '@lib';
import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { constants, NextChessground } from 'next-chessground';

const GameReviewOverview = ({ game, onStartAnalysis }) => {
  const { white, black, moves, createdAt, user, result } = game || {};
  const { data: me } = useQuery('/client/account');
  const { sourceRef, targetRef } = useEqualHeight();

  const userColor = user?.name === white ? 'white' : 'black';
  const opponentName = userColor === 'white' ? black : white;
  const userName = user?.name;

  const userWon = result === userName;
  const opponentWon = result === opponentName;

  const generateBotAvatar = (name) => {
    const avatar = createAvatar(avataaars, {
      seed: name,
      size: 80,
      backgroundColor: ['404040'],
    });
    return avatar.toDataUri();
  };

  const botAvatarSrc = generateBotAvatar(opponentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 outline-none w-full gap-6">
      <div className="lg:col-span-3 max-w-chess-board">
        <div ref={sourceRef}>
          <NextChessground fen={constants.initialFen} viewOnly={true} />
        </div>
      </div>
      <div ref={targetRef} className="lg:col-span-2 flex flex-col overflow-hidden">
        <div className="flex flex-col h-full overflow-hidden rounded-md bg-secondary relative">
          <div className="bg-tertiary text-white flex items-center justify-center gap-2 px-3 py-3 border-b border-white/10">
            <i className="fas fa-circle-star text-accent text-lg"></i>
            <span className="text-white font-bold text-lg">Game Review</span>
          </div>
          <div className="relative flex flex-col flex-grow min-h-0">
            <div className="flex flex-col flex-grow min-h-0 justify-center">
              <div className="flex flex-col items-center justify-center gap-6 p-6">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={classnames(
                        'bg-tertiary border-2 rounded relative',
                        userWon ? 'border-yellow-500' : 'border-gray-600'
                      )}
                    >
                      {me?.image?.path ? (
                        <img
                          src={me?.image?.path}
                          className="w-20 h-20 object-cover rounded"
                          alt={userName}
                        />
                      ) : (
                        <div className="w-20 h-20 flex items-center justify-center rounded">
                          <i className="fas fa-user text-3xl text-white"></i>
                        </div>
                      )}
                      <div className="absolute top-0 right-0 overflow-hidden w-8 h-8 rounded-tr">
                        <div
                          className={classnames(
                            'absolute transform rotate-45 shadow-sm',
                            userColor === 'white' ? 'bg-white' : 'bg-gray-900',
                            'w-11 h-3 top-1.5 right-[-10px]'
                          )}
                        ></div>
                      </div>
                    </div>
                    <span className="text-white font-semibold">{userName}</span>
                  </div>
                  <div className="text-white text-2xl font-bold">VS</div>
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={classnames(
                        'bg-tertiary border-2 rounded relative',
                        opponentWon ? 'border-yellow-500' : 'border-gray-600'
                      )}
                    >
                      <img
                        src={botAvatarSrc}
                        className="w-20 h-20 object-cover rounded"
                        alt={opponentName}
                      />
                      <div className="absolute top-0 right-0 overflow-hidden w-8 h-8 rounded-tr">
                        <div
                          className={classnames(
                            'absolute transform rotate-45 shadow-sm',
                            userColor === 'white' ? 'bg-gray-900' : 'bg-white',
                            'w-11 h-3 top-1.5 right-[-10px]'
                          )}
                        ></div>
                      </div>
                    </div>
                    <span className="text-white font-semibold">{opponentName}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex items-center gap-6 text-white">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-chess-board text-accent"></i>
                      <span className="font-medium">{moves} moves</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-calendar text-accent"></i>
                      <span className="font-medium">{time(createdAt, 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
                <Button className="button full accent text-lg py-2 px-6" onClick={onStartAnalysis}>
                  <i className="fas fa-microscope mr-2"></i>
                  Start Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameReviewOverview;
