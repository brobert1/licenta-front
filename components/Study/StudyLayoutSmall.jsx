import { PgnTree } from '@chess/components/PgnViewer';
import { usePgnViewer, useShapes, useThreat } from '@chess/hooks';
import { markChapterCompleted } from '@api/user-progress';
import { NoSsr, VideoPlayer } from '@components';
import { MobileEngineAnalysis } from '@chess/components/Engine';
import { classnames } from '@lib';
import { useStudyLayout } from '@contexts/StudyLayoutContext';
import { useInlineVideoCollapse, useMutation, usePreview, useWindowSize } from '@hooks';
import { NextChessground } from 'next-chessground';
import { useCallback, useEffect, useRef, useState } from 'react';
import StockfishMobileToggle from './StockfishMobileToggle';
import StudyBottomBar from './StudyBottomBar';
import StudyTopBar from './StudyTopBar';
import VideoBottomSheet from './VideoBottomSheet';

const StudyLayoutSmall = ({
  data,
  progress,
  course,
  pgn,
  index,
  chapterId,
  onNextChapter,
  refetch,
}) => {
  const { isAnalysisOpen, updateContext } = useStudyLayout();
  const { isPreview } = usePreview();
  const { isSmallHeight } = useWindowSize();
  const [showVideo, setShowVideo] = useState(false);
  const activeChapter = data.chapters?.find((chapter) => chapter.index === index);
  const videoUrl = activeChapter?.video;
  const videoPlayerKey = activeChapter?._id ?? chapterId ?? `${data?._id}-${index}`;
  const { keepPlayerMounted, videoRef } = useInlineVideoCollapse(
    showVideo,
    videoUrl,
    !isSmallHeight
  );
  const { keepPlayerMounted: keepDrawerMounted, videoRef: drawerVideoRef } = useInlineVideoCollapse(
    showVideo,
    videoUrl,
    isSmallHeight
  );

  const { tree, current, lastMove, goToMoment, goNextMoment, goPrevMoment, onUserMove } =
    usePgnViewer(pgn, {
      autoSelectMainline: true,
      resetKey: activeChapter?._id || index,
    });

  const scrollRef = useRef(null);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const isChapterCompleted = progress?.completedChapters?.includes(chapterId);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const threshold = 20;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
    setHasScrolledToEnd(atBottom);
  }, []);

  const mutation = useMutation(markChapterCompleted, {
    successCallback: () => refetch?.(),
  });

  const handleMarkCompleted = async () => {
    if (isPreview) return;
    await mutation.mutateAsync(chapterId);
  };

  const { threatShape, setThreatFen } = useThreat(current?.fen);

  useEffect(() => {
    setThreatFen(current.fen);
  }, [current.fen, setThreatFen]);

  const { shapes } = useShapes({ current, threatShape });

  return (
    <>
      <StockfishMobileToggle
        isActive={isAnalysisOpen}
        onToggle={(val) => updateContext({ isAnalysisOpen: val })}
      />
      <div className="flex flex-col h-screen bg-secondary overflow-hidden">
        <StudyTopBar
          chapters={data.chapters}
          activeIndex={index}
          completedChapters={progress?.completedChapters}
          course={course}
          studyId={data._id}
          videoUrl={videoUrl}
          showVideo={showVideo}
          onToggleVideo={() => setShowVideo(!showVideo)}
        />
        <div className="w-full px-12 pt-4 flex-shrink-0 flex justify-center">
          <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-border bg-surface">
            <NoSsr>
              <NextChessground
                fen={current.fen}
                shapes={shapes}
                lastMove={lastMove}
                onMove={onUserMove}
              />
            </NoSsr>
          </div>
        </div>
        <div
          className={classnames(
            'flex-shrink-0 w-full px-4 flex justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
            isAnalysisOpen
              ? 'max-h-24 mt-4 opacity-100 translate-y-0'
              : 'max-h-0 mt-0 opacity-0 -translate-y-2'
          )}
          aria-hidden={!isAnalysisOpen}
        >
          <MobileEngineAnalysis fen={current?.fen} isActive={isAnalysisOpen} />
        </div>
        {isSmallHeight ? (
          keepDrawerMounted &&
          videoUrl && (
            <VideoBottomSheet
              isOpen={showVideo}
              onClose={() => setShowVideo(false)}
              onVideoRef={drawerVideoRef}
              remountKey={videoPlayerKey}
              videoUrl={videoUrl}
            />
          )
        ) : (
          <div
            className={classnames(
              'flex-shrink-0 w-full px-4 flex justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
              showVideo
                ? 'max-h-60 mt-4 opacity-100 translate-y-0'
                : 'max-h-0 mt-0 opacity-0 -translate-y-2'
            )}
            aria-hidden={!showVideo}
          >
            <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg border border-border/50 bg-black">
              {videoUrl && keepPlayerMounted && (
                <NoSsr>
                  <VideoPlayer key={videoPlayerKey} src={videoUrl} onVideoRef={videoRef} />
                </NoSsr>
              )}
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col min-h-0 mt-4 relative transition-all duration-300">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto rounded-t-2xl bg-surface border border-border border-b-0 overflow-hidden"
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-tertiary" />
            </div>
            <div className="px-5 pb-6">
              <PgnTree
                tree={tree}
                current={current}
                onMoveClick={goToMoment}
                autoScroll={true}
                compact={true}
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-10 rounded-t-2xl bg-gradient-to-b from-surface to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
        </div>
        <StudyBottomBar
          onNextChapter={onNextChapter}
          onPrev={goPrevMoment}
          onNext={goNextMoment}
          isAtEnd={hasScrolledToEnd}
          isCompleted={isChapterCompleted}
          onMarkCompleted={handleMarkCompleted}
        />
      </div>
    </>
  );
};

export default StudyLayoutSmall;
