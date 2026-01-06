import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { PgnTree } from '@chess/components/PgnViewer';
import { usePgnViewer } from '@chess/hooks';
import { classnames } from '@lib';
import { NextChessground } from 'next-chessground';
import { useState } from 'react';
import LiveChessBoard from './LiveChessBoard';
import OpponentCard from './OpponentCard';
import PlayerCard from './PlayerCard';
import LiveGameActions from './LiveGameActions';
import GameOverModal from './GameOverModal';
import GameChat from './GameChat';

const MultiplayerGame = () => {
  const {
    activeGame,
    playerColor,
    opponent,
    reset,
    reportTimeout,
    unreadChatCount,
    markChatRead,
    chatStatus,
    chatRequestedBy,
  } = useMultiplayerContext();
  const [activeTab, setActiveTab] = useState('moves'); // 'moves' | 'chat'

  // Check if there's a pending chat request for us (opponent sent request)
  const hasPendingRequest = chatStatus === 'pending' && chatRequestedBy !== playerColor;
  // Show badge if unread messages OR pending request
  const chatBadgeCount = hasPendingRequest ? 1 : activeTab !== 'chat' ? unreadChatCount : 0;

  const handleChatTabClick = () => {
    setActiveTab('chat');
    markChatRead();
  };

  const { tree, current, goToMoment, lastMoment, goPrevMoment, goNextMoment } = usePgnViewer(
    activeGame?.pgn || '',
    { startAtLastMove: true }
  );

  if (!activeGame || !opponent) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-white text-xl">No active game</p>
          <button
            onClick={reset}
            className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg"
          >
            Back to Lobby
          </button>
        </div>
      </div>
    );
  }

  const isGameOver = activeGame.status === 'completed' || activeGame.gameOver;
  const isReviewMode = current?.index !== lastMoment?.index && lastMoment?.index > 0;

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
        <div className="md:col-span-3 max-w-chess-board h-min flex flex-col gap-2">
          <OpponentCard />
          <div className="relative">
            <div className={classnames(isReviewMode && 'invisible')}>
              <LiveChessBoard />
            </div>
            {isReviewMode && (
              <div className="absolute inset-0">
                <NextChessground
                  fen={current.fen}
                  lastMove={current?.from && current?.to ? [current.from, current.to] : null}
                  orientation={playerColor}
                  viewOnly={true}
                />
              </div>
            )}
          </div>
          <PlayerCard onTimeOut={() => reportTimeout()} />
        </div>
        <div className="md:col-span-2 flex rounded-lg overflow-hidden flex-col">
          <div className="flex bg-secondary">
            <button
              onClick={() => setActiveTab('moves')}
              className={classnames(
                'flex-1 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2 relative',
                activeTab === 'moves' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
              )}
            >
              <i className="fas fa-chess-knight"></i>
              Moves
              {activeTab === 'moves' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_-2px_8px_rgba(var(--primary-rgb),0.5)]"></div>
              )}
            </button>
            <button
              onClick={handleChatTabClick}
              className={classnames(
                'flex-1 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2 relative',
                activeTab === 'chat' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
              )}
            >
              <i className="fas fa-comments"></i>
              Chat
              {chatBadgeCount > 0 && (
                <span className="absolute top-2 right-4 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1 animate-pulse">
                  {chatBadgeCount > 9 ? '9+' : chatBadgeCount}
                </span>
              )}
              {activeTab === 'chat' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_-2px_8px_rgba(var(--primary-rgb),0.5)]"></div>
              )}
            </button>
          </div>
          {activeTab === 'moves' ? (
            <div className="flex flex-col h-full overflow-hidden bg-secondary">
              <div className="relative flex flex-col flex-grow min-h-0">
                <div className="flex flex-col flex-grow min-h-0">
                  <div className="overflow-y-auto min-h-0 flex-grow">
                    <PgnTree
                      tree={tree}
                      autoScroll={true}
                      current={current}
                      onMoveClick={goToMoment}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <GameChat />
          )}
          {!isGameOver && <LiveGameActions onPrevMove={goPrevMoment} onNextMove={goNextMoment} />}
          {isGameOver && (
            <div className="flex flex-col bg-secondary gap-4 p-4">
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={reset}
                  className="col-span-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <i className="fas fa-chess"></i>
                  <span className="text-sm">Find New Game</span>
                </button>
                <button
                  className="button full tertiary border-0 text-lg w-full hover:text-neutral-300 transition-colors hover:bg-neutral-700"
                  onClick={goPrevMoment}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  className="button full tertiary border-0 text-lg w-full hover:text-neutral-300 transition-colors hover:bg-neutral-700"
                  onClick={goNextMoment}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <GameOverModal />
    </>
  );
};

export default MultiplayerGame;
