import { Button, NoSsr, VideoPlayer } from '@components';
import { useDrillCompletion, useInlineVideoCollapse, useWindowSize } from '@hooks';
import { usePgnViewer } from '@chess/hooks';
import { classnames } from '@lib';
import { useEffect, useState } from 'react';
import { PgnTree } from '@chess/components/PgnViewer';
import AccuracyCalculator from './AccuracyCalculator';
import ChangeHintMode from './ChangeHintMode';
import DrillChessground from './DrillChessground';
import DrillTree from './DrillTree';
import MoveArrows from './MoveArrows';
import StudyTopBar from './StudyTopBar';
import VideoBottomSheet from './VideoBottomSheet';

const DrillLayoutSmall = ({
  data,
  progress,
  course,
  pgn,
  index,
  chapterId,
  onNextChapter,
  refetch,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const { isSmallHeight } = useWindowSize();

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

  const pgnProps = usePgnViewer(pgn, {
    autoSelectMainline: true,
    resetKey: activeChapter?._id || index,
    useArrowsToMove: true,
  });

  const { goNextMoment, goPrevMoment, tree, current, goToMoment } = pgnProps;

  const { key, mode, setMode, isCompleted, handleComplete, handleRetry, resetDrill } =
    useDrillCompletion({ chapterId, pgnProps, refetch });

  useEffect(() => {
    resetDrill();
  }, [index]);

  useEffect(() => {
    pgnProps.useArrowsToMove = mode === 'text';
  }, [mode]);

  return (
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
        <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-border bg-surface relative">
          <NoSsr>
            <DrillChessground
              key={key}
              pgnProps={pgnProps}
              mode={mode}
              setMode={setMode}
              isCompleted={isCompleted}
              handleComplete={handleComplete}
              isPreview={false}
              showControls={false}
            />
          </NoSsr>
        </div>
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
      <div className="flex-1 flex flex-col min-h-0 mt-4 relative">
        <div className="flex-1 overflow-y-auto rounded-t-2xl bg-surface border border-border border-b-0 overflow-hidden">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-tertiary" />
          </div>
          <div className="px-5 pb-6 space-y-4">
            {mode === 'text' ? (
              <PgnTree tree={tree} current={current} onMoveClick={goToMoment} compact={true} />
            ) : (
              <DrillTree mode={mode} />
            )}
            {isCompleted && <AccuracyCalculator onRetryMistakes={handleRetry} />}
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-10 rounded-t-2xl bg-gradient-to-b from-surface to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
      </div>
      <div className="flex-shrink-0 w-full px-5 pb-5 pt-3">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface border border-border shadow-sm px-4 py-3 overflow-hidden">
          {isCompleted ? (
            <Button
              className="flex items-center gap-2 bg-accent text-white font-semibold text-sm rounded-xl px-5 py-3 shadow-sm hover:opacity-90 transition-opacity"
              onClick={onNextChapter}
            >
              Next chapter
              <i className="fa-solid fa-arrow-right text-xs" />
            </Button>
          ) : (
            <ChangeHintMode
              mode={mode}
              setMode={setMode}
              isCompleted={isCompleted}
              isPreview={false}
            />
          )}
          <MoveArrows
            goPrevMoment={goPrevMoment}
            goNextMoment={goNextMoment}
            disabled={mode !== 'text'}
          />
        </div>
      </div>
    </div>
  );
};

export default DrillLayoutSmall;
