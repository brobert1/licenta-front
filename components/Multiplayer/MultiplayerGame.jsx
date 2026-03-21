import { PgnTree } from '@chess/components/PgnViewer';
import { usePgnViewer } from '@chess/hooks';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useElementWidth } from '@hooks';
import { classnames } from '@lib';
import { NextChessground } from 'next-chessground';
import { useRouter } from 'next/router';
import { useState } from 'react';
import GameChat from './GameChat';
import GameOverModal from './GameOverModal';
import LiveChessBoard from './LiveChessBoard';
import LiveGameActions from './LiveGameActions';
import OpponentCard from './OpponentCard';
import PlayerCard from './PlayerCard';

const tabButtonBase =
  'flex flex-1 items-center justify-center gap-2 border-b-2 py-3 px-2 font-landing text-xs font-semibold transition-colors sm:text-sm';

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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('moves');
  const { ref: boardTrackRef, width: boardTrackWidth } = useElementWidth();

  const hasPendingRequest = chatStatus === 'pending' && chatRequestedBy !== playerColor;
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
      <div className="flex min-h-0 flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border border-black/10 bg-gameplay p-10 text-center">
          <h2 className="font-landing text-lg font-semibold text-on-surface">No active game</h2>
          <p className="mt-2 text-sm text-secondary-muted font-landing">
            Join the lobby to start playing online.
          </p>
          <button
            type="button"
            onClick={() => { reset(); router.replace('/client/play'); }}
            className="mt-6 w-full rounded-lg border border-black/10 bg-gameplay-control py-3 text-sm font-semibold text-on-surface font-landing transition-colors hover:bg-gameplay-elevated"
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
      <div className="bot-gameplay grid w-full h-full grid-cols-1 gap-4 overflow-hidden p-6 md:grid-cols-5 md:gap-6">
        <div className="flex h-full min-h-0 flex-col overflow-hidden md:col-span-3">
          <div
            className={classnames(
              'mx-auto flex max-w-full flex-1 min-h-0 flex-col gap-2',
              boardTrackWidth > 0 ? '' : 'w-full'
            )}
            style={boardTrackWidth > 0 ? { width: boardTrackWidth } : undefined}
          >
            <OpponentCard />
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden w-full">
              <div
                ref={boardTrackRef}
                className="bot-gameplay-board h-full aspect-square max-w-full relative overflow-hidden rounded-lg"
              >
                <div className={classnames('h-full', isReviewMode && 'invisible')}>
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
            </div>
            <PlayerCard onTimeOut={() => reportTimeout()} />
          </div>
        </div>

        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-black/10 bg-gameplay md:col-span-2">
          <div className="flex shrink-0 border-b border-black/10 bg-gameplay-control">
            <button
              type="button"
              onClick={() => setActiveTab('moves')}
              className={classnames(
                tabButtonBase,
                activeTab === 'moves'
                  ? 'border-tertiary-container text-on-surface'
                  : 'border-transparent text-secondary-muted hover:text-on-surface'
              )}
            >
              <i className="fas fa-chess-knight text-xs opacity-80"></i>
              Moves
            </button>
            <button
              type="button"
              onClick={handleChatTabClick}
              className={classnames(
                tabButtonBase,
                'relative',
                activeTab === 'chat'
                  ? 'border-tertiary-container text-on-surface'
                  : 'border-transparent text-secondary-muted hover:text-on-surface'
              )}
            >
              <i className="fas fa-comments text-xs opacity-80"></i>
              Chat
              {chatBadgeCount > 0 && (
                <span className="absolute right-2 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-on-primary">
                  {chatBadgeCount > 9 ? '9+' : chatBadgeCount}
                </span>
              )}
            </button>
          </div>

          {activeTab === 'moves' ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-gameplay">
              <div className="relative flex min-h-0 flex-1 flex-col">
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <PgnTree
                      chrome="gameplay"
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
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <GameChat />
            </div>
          )}

          {!isGameOver && (
            <LiveGameActions onPrevMove={goPrevMoment} onNextMove={goNextMoment} />
          )}
          {isGameOver && (
            <div className="flex shrink-0 flex-col gap-3 border-t border-black/10 bg-gameplay-control p-4">
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-tertiary-container py-3 text-sm font-semibold text-on-surface font-landing transition-colors hover:opacity-90"
                >
                  <i className="fas fa-chess"></i>
                  <span>Find New Game</span>
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-black/10 bg-gameplay-control py-3 text-lg text-on-surface transition-colors hover:bg-gameplay-elevated"
                  onClick={goPrevMoment}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-black/10 bg-gameplay-control py-3 text-lg text-on-surface transition-colors hover:bg-gameplay-elevated"
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
