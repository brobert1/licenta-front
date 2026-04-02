'use client';

import { PgnTree } from '@chess/components/PgnViewer';
import { usePgnViewer } from '@chess/hooks';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { classnames } from '@lib';
import { NextChessground } from 'next-chessground';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameChat from './GameChat';
import LiveChessBoard from './LiveChessBoard';
import LiveGameActions from './LiveGameActions';
import OpponentCard from './OpponentCard';
import PlayerCard from './PlayerCard';

const tabButtonBase =
  'flex flex-1 items-center justify-center gap-2 border-b-2 py-3 px-2 text-xs font-semibold transition-colors sm:text-sm';

const MultiplayerGameMobile = () => {
  const {
    activeGame,
    chatRequestedBy,
    chatStatus,
    markChatRead,
    opponent,
    playerColor,
    reportTimeout,
    reset,
    setChatTabActive,
    unreadChatCount,
  } = useMultiplayerContext();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('moves');

  useEffect(() => {
    setChatTabActive(activeTab === 'chat');
    return () => setChatTabActive(false);
  }, [activeTab, setChatTabActive]);

  const hasPendingRequest = chatStatus === 'pending' && chatRequestedBy !== playerColor;
  const chatBadgeCount = hasPendingRequest ? 1 : activeTab !== 'chat' ? unreadChatCount : 0;

  const handleChatTabClick = () => {
    setChatTabActive(true);
    setActiveTab('chat');
    markChatRead();
  };

  const { tree, current, goToMoment, lastMoment, goPrevMoment, goNextMoment } = usePgnViewer(
    activeGame?.pgn || '',
    { startAtLastMove: true }
  );

  const leaveToLobby = () => {
    reset();
    router.replace('/client/play');
  };

  if (!activeGame || !opponent) return null;

  const isGameOver = activeGame.status === 'completed' || activeGame.gameOver;
  const isReviewMode = current?.index !== lastMoment?.index && lastMoment?.index > 0;

  return (
    <div className="max-w-chess-board flex w-full flex-col gap-2 pb-6">
      <OpponentCard />
      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-secondary aspect-square">
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
      <PlayerCard onTimeOut={() => reportTimeout()} />

      <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex shrink-0 border-b border-border bg-secondary">
          <button
            type="button"
            onClick={() => {
              setChatTabActive(false);
              setActiveTab('moves');
            }}
            className={classnames(
              tabButtonBase,
              activeTab === 'moves'
                ? 'border-accent text-primary'
                : 'border-transparent text-muted hover:text-primary'
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
              activeTab === 'chat'
                ? 'border-accent text-primary'
                : 'border-transparent text-muted hover:text-primary'
            )}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <i className="fas fa-comments text-xs opacity-80"></i>
              <span className="inline-flex items-center gap-1.5">
                Chat
                {chatBadgeCount > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold leading-none text-white">
                    {chatBadgeCount > 9 ? '9+' : chatBadgeCount}
                  </span>
                )}
              </span>
            </span>
          </button>
        </div>

        {activeTab === 'moves' ? (
          <div className="flex min-h-0 max-h-64 flex-1 flex-col overflow-hidden">
            <div className="min-h-0 flex-1 overflow-y-auto">
              <PgnTree
                tree={tree}
                autoScroll={true}
                current={current}
                onMoveClick={goToMoment}
              />
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 max-h-64 flex-1 flex-col overflow-hidden">
            <GameChat />
          </div>
        )}

        {!isGameOver && <LiveGameActions onPrevMove={goPrevMoment} onNextMove={goNextMoment} />}
        {isGameOver && (
          <div className="flex shrink-0 flex-col gap-3 border-t border-border bg-secondary p-4">
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={leaveToLobby}
                className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-accent bg-accent/10 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent/20"
              >
                <i className="fas fa-chess"></i>
                <span>Find new game</span>
              </button>
              <button
                type="button"
                className="rounded-lg border border-border bg-surface py-3 text-lg text-primary transition-colors hover:bg-tertiary"
                onClick={goPrevMoment}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                type="button"
                className="rounded-lg border border-border bg-surface py-3 text-lg text-primary transition-colors hover:bg-tertiary"
                onClick={goNextMoment}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplayerGameMobile;
