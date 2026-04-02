import { MobileEngineAnalysis } from '@chess/components/Engine';
import { PgnTree } from '@chess/components/PgnViewer';
import { usePgnViewer } from '@chess/hooks';
import { Button, Link } from '@components';
import { ClientHeader } from '@components/Client';
import { StockfishMobileToggle } from '@components/Study';
import { time } from '@functions';
import { useQuery } from '@hooks';
import { classnames } from '@lib';
import { NextChessground } from 'next-chessground';
import { useState } from 'react';
import GamePreviewChatTranscript from './GamePreviewChatTranscript';
import GamePreviewSidebarTabs from './GamePreviewSidebarTabs';
import GameResultBanner from './GameResultBanner';

const GamePreviewLayoutSmall = ({ game }) => {
  const {
    _id: id,
    botName,
    chatMessages,
    createdAt,
    mode,
    outcome,
    pgn,
    playerColor,
    playerName,
    terminationReason,
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

  const handleShare = async () => {
    if (!navigator.share) return;
    await navigator.share({
      title: `${white} vs ${black}`,
      text: `Check out this chess game between ${white} and ${black}${createdAt ? `, played on ${time(createdAt, 'd MMM yyyy')}` : ''}.`,
      url: `${process.env.APP_BASE_URL}/game/${id}`,
    });
  };

  return (
    <>
      {(!isOnline || sidebarTab === 'analysis') && (
        <StockfishMobileToggle isActive={isAnalysisOpen} onToggle={setIsAnalysisOpen} />
      )}
      <div className="flex flex-col h-screen bg-secondary overflow-hidden">
        <ClientHeader />
        <div className="flex items-center justify-center gap-2 pt-3 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-neutral-300 flex-shrink-0" />
            <span className="font-medium text-primary">{white}</span>
          </span>
          <span>—</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-500 flex-shrink-0" />
            <span className="font-medium text-primary">{black}</span>
          </span>
          {createdAt && (
            <>
              <span>·</span>
              <span>{time(createdAt, 'd MMM yyyy')}</span>
            </>
          )}
        </div>
        <div className="w-full px-12 pt-3 flex-shrink-0 flex justify-center">
          <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-border bg-surface">
            <NextChessground
              fen={current.fen}
              lastMove={lastMove}
              orientation={orientation}
              onMove={onUserMove}
            />
          </div>
        </div>
        <div
          className={classnames(
            'flex-shrink-0 w-full px-4 flex justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
            sidebarTab === 'analysis' && isAnalysisOpen
              ? 'max-h-24 mt-4 opacity-100 translate-y-0'
              : 'max-h-0 mt-0 opacity-0 -translate-y-2'
          )}
          aria-hidden={!(sidebarTab === 'analysis' && isAnalysisOpen)}
        >
          <MobileEngineAnalysis fen={current?.fen} isActive={isAnalysisOpen} />
        </div>
        <div className="flex-1 flex flex-col min-h-0 mt-4 relative transition-all duration-300">
          <div className="flex-1 overflow-y-auto rounded-t-2xl bg-surface border border-border border-b-0 overflow-hidden">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-tertiary" />
            </div>
            {isOnline && (
              <div className="px-4 pb-2">
                <GamePreviewSidebarTabs
                  analysisOpen={isAnalysisOpen}
                  className="rounded-lg border border-border"
                  isOnline={isOnline}
                  onAnalysisToggle={setIsAnalysisOpen}
                  onTabChange={setSidebarTab}
                  renderAnalysisToggle={false}
                  tab={sidebarTab}
                />
              </div>
            )}
            <div className="px-5 pb-6">
              {sidebarTab === 'analysis' ? (
                <PgnTree
                  tree={tree}
                  current={current}
                  onMoveClick={goToMoment}
                  autoScroll={true}
                  compact={true}
                />
              ) : (
                <div className="flex max-h-72 min-h-0 flex-col overflow-hidden">
                  <GamePreviewChatTranscript messages={chatMessages} viewerId={me?._id} />
                </div>
              )}
              <GameResultBanner
                botName={botName}
                className="mt-4"
                outcome={outcome}
                playerColor={playerColor}
                playerName={playerName}
                terminationReason={terminationReason}
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-10 rounded-t-2xl bg-gradient-to-b from-surface to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
        </div>

        <div className="flex-shrink-0 w-full px-5 pb-5 pt-3">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface border border-border shadow-sm px-4 py-3">
            <div className="flex items-center gap-2">
              <Link
                href={`/client/game-review/${id}`}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl bg-accent px-3 py-2 text-xs font-medium leading-tight text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Game Review
                <i className="fa-solid fa-circle-star text-xs leading-none" />
              </Link>
              <Button
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-secondary text-primary hover:bg-tertiary active:bg-border transition-colors"
                onClick={handleShare}
                aria-label="Share game"
              >
                <i className="fa-solid fa-share-nodes text-sm" />
              </Button>
            </div>
            <div className="flex items-center gap-1 rounded-xl bg-secondary p-1">
              <Button
                className="flex items-center justify-center w-11 h-11 rounded-lg text-primary hover:bg-tertiary active:bg-border transition-colors"
                onClick={goPrevMoment}
                aria-label="Previous move"
              >
                <i className="fa-solid fa-chevron-left" />
              </Button>
              <Button
                className="flex items-center justify-center w-11 h-11 rounded-lg text-primary hover:bg-tertiary active:bg-border transition-colors"
                onClick={goNextMoment}
                aria-label="Next move"
              >
                <i className="fa-solid fa-chevron-right" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePreviewLayoutSmall;
