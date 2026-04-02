import { Analysis } from '@chess/components/Engine';
import { PgnTree } from '@chess/components/PgnViewer';
import { useEqualHeight, usePgnViewer } from '@chess/hooks';
import { time } from '@functions';
import { useQuery } from '@hooks';
import { NextChessground } from 'next-chessground';
import { useState } from 'react';
import GamePreviewBotCard from './GamePreviewBotCard';
import GamePreviewChatTranscript from './GamePreviewChatTranscript';
import GamePreviewPostGameActions from './GamePreviewPostGameActions';
import GamePreviewSidebarTabs from './GamePreviewSidebarTabs';
import GamePreviewUserCard from './GamePreviewUserCard';
import GameResultBanner from './GameResultBanner';

const GamePreviewLayoutLarge = ({ game }) => {
  const {
    _id: id,
    botElo,
    botName,
    chatMessages,
    createdAt,
    mode,
    opening,
    outcome,
    pgn,
    playerColor,
    playerName,
    startingFen,
    terminationReason,
    timeControl,
  } = game || {};
  const { data: me } = useQuery('/client/account');
  const white = playerColor === 'white' ? playerName : botName;
  const black = playerColor === 'black' ? playerName : botName;
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState('analysis');
  const isOnline = mode === 'online';

  const { tree, current, lastMove, goToMoment, goNextMoment, goPrevMoment, onUserMove } =
    usePgnViewer(pgn, { startAtLastMove: true });

  const orientation = playerColor || 'white';

  const { sourceRef, targetRef } = useEqualHeight();

  const handleShare = async () => {
    if (!navigator.share) return;
    await navigator.share({
      title: `${white} vs ${black}`,
      text: `Check out this chess game between ${white} and ${black}${createdAt ? `, played on ${time(createdAt, 'd MMM yyyy')}` : ''}.`,
      url: `${process.env.APP_BASE_URL}/game/${id}`,
    });
  };

  return (
    <div className="grid grid-cols-5 outline-none w-full gap-6">
      <div className="col-span-3 max-w-chess-board">
        <div ref={sourceRef} className="flex flex-col gap-2">
          <GamePreviewBotCard botElo={botElo} botName={botName} mode={mode} />
          <NextChessground
            fen={current.fen}
            lastMove={lastMove}
            orientation={orientation}
            onMove={onUserMove}
          />
          <GamePreviewUserCard playerName={playerName} />
        </div>
      </div>
      <div ref={targetRef} className="col-span-2 flex flex-col overflow-hidden rounded-md">
        <GamePreviewSidebarTabs
          analysisOpen={isAnalysisOpen}
          isOnline={isOnline}
          onAnalysisToggle={setIsAnalysisOpen}
          onTabChange={setSidebarTab}
          tab={sidebarTab}
        />
        <div className="bg-white relative flex flex-col flex-grow min-h-0">
          {sidebarTab === 'analysis' && (
            <Analysis current={current} isAnalysisOpen={isAnalysisOpen} />
          )}
          <div className="flex flex-col flex-grow min-h-0">
            {sidebarTab === 'analysis' ? (
              <div className="overflow-y-auto min-h-0 flex-grow">
                <PgnTree tree={tree} current={current} onMoveClick={goToMoment} />
              </div>
            ) : (
              <GamePreviewChatTranscript messages={chatMessages} viewerId={me?._id} />
            )}
            <GameResultBanner
              botName={botName}
              outcome={outcome}
              playerColor={playerColor}
              playerName={playerName}
              terminationReason={terminationReason}
            />
            <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-2">
              <p className="truncate text-sm text-primary" title={opening || 'Starting position'}>
                {opening || 'Starting position'}
              </p>
              <i className="fas fa-book-atlas text-sm text-muted" />
            </div>
          </div>
        </div>
        <GamePreviewPostGameActions
          black={black}
          botName={botName}
          id={id}
          mode={mode}
          onNextMove={goNextMoment}
          onPrevMove={goPrevMoment}
          onShare={handleShare}
          pgn={pgn}
          playerColor={playerColor}
          startingFen={startingFen}
          timeControl={timeControl}
          white={white}
        />
      </div>
    </div>
  );
};

export default GamePreviewLayoutLarge;
