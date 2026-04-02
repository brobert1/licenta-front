import { useChessContext, usePuzzleContext } from '@chess/contexts';
import { FeedbackIcon } from '@chess/components';
import { PgnTree } from '@chess/components/PgnViewer';
import { PuzzleBoard } from '@chess/components/Puzzle';
import { usePgnViewer } from '@chess/hooks';
import { NoSsr, VideoPlayer } from '@components';
import { markChapterCompleted } from '@api/user-progress';
import { useInlineVideoCollapse, useMutation, usePreview, useWindowSize } from '@hooks';
import { classnames } from '@lib';
import { extractFen } from '@chess/functions';
import { flat } from 'chess-moments';
import { useEffect, useMemo, useState } from 'react';
import InteractiveControls from './InteractiveControls';
import InteractiveDefaultView from './InteractiveDefaultView';
import InteractiveFeedback from './InteractiveFeedback';
import StudyTopBar from './StudyTopBar';
import VideoBottomSheet from './VideoBottomSheet';

const InteractiveLayoutSmall = ({
  data,
  progress,
  course,
  pgn,
  index,
  chapterId,
  onNextChapter,
  refetch,
}) => {
  const boardKey = chapterId || index;
  const { isPreview } = usePreview();
  const { initialTurn, currentFen } = useChessContext();
  const { setSolution, feedback, lastMove, isCompleted } = usePuzzleContext();
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

  const fen = useMemo(() => extractFen(pgn), [pgn]);
  const moves = useMemo(() => flat(pgn), [pgn]);

  const {
    tree,
    current: currentMoment,
    moments,
    syncLastMove,
  } = usePgnViewer(pgn, {
    resetKey: activeChapter?._id || index,
  });

  useEffect(() => setSolution(moves), [moves, setSolution]);

  useEffect(() => {
    syncLastMove(currentFen);
  }, [currentFen, syncLastMove]);

  const mutation = useMutation(markChapterCompleted, {
    successCallback: () => refetch(),
  });

  const handleComplete = async () => {
    if (isPreview) return;
    await mutation.mutateAsync(chapterId);
  };

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
            <PuzzleBoard key={boardKey} fen={fen} moves={moves} onComplete={handleComplete} />
            <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
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
            <InteractiveFeedback />
            {!isCompleted && <InteractiveDefaultView moments={moments} />}
            {isCompleted && (
              <PgnTree
                tree={tree}
                current={currentMoment}
                onMoveClick={() => {}}
                autoScroll={true}
                compact={true}
              />
            )}
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-10 rounded-t-2xl bg-gradient-to-b from-surface to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
      </div>
      <InteractiveControls onNextChapter={onNextChapter} />
    </div>
  );
};

export default InteractiveLayoutSmall;
