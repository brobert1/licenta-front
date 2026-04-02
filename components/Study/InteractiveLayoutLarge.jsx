import { useChessContext, usePuzzleContext } from '@chess/contexts';
import { FeedbackIcon } from '@chess/components';
import { PuzzleBoard } from '@chess/components/Puzzle';
import { usePgnViewer } from '@chess/hooks';
import { markChapterCompleted } from '@api/user-progress';
import { useEqualHeight, useMutation, usePreview, useVideoNavigation } from '@hooks';
import { extractFen } from '@chess/functions';
import { flat } from 'chess-moments';
import { useEffect, useMemo } from 'react';
import Chapters from './Chapters';
import InteractiveAside from './InteractiveAside';
import InteractiveControls from './InteractiveControls';
import InteractiveFeedback from './InteractiveFeedback';
import VideoPanel from './VideoPanel';

const InteractiveLayoutLarge = ({
  data,
  progress,
  pgn,
  index,
  chapterId,
  onNextChapter,
  refetch,
  prevVideoUrl,
}) => {
  const boardKey = chapterId || index;
  const { isPreview } = usePreview();
  const { sourceRef, targetRef } = useEqualHeight();
  const { videoRef, seekToTime } = useVideoNavigation();
  const { initialTurn, currentFen } = useChessContext();
  const { setSolution, feedback, lastMove } = usePuzzleContext();

  const activeChapter = data.chapters?.find((chapter) => chapter.index === index);
  const videoUrl = activeChapter?.video;
  const videoPlayerKey = activeChapter?._id ?? `${data?._id}-${index}`;

  // Extract FEN from PGN and flatten moves for puzzle
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

  // Set the solution moves for puzzle validation
  useEffect(() => setSolution(moves), [moves, setSolution]);

  useEffect(() => {
    syncLastMove(currentFen);
  }, [currentFen, syncLastMove]);

  const mutation = useMutation(markChapterCompleted, {
    successCallback: () => {
      refetch();
    },
  });

  const handleComplete = async () => {
    if (isPreview) return;
    await mutation.mutateAsync(chapterId);
  };

  return (
    <div ref={targetRef} className="grid grid-cols-4 outline-none w-full gap-3">
      <div className="col-span-1 flex flex-col rounded-md overflow-hidden min-h-0">
        <VideoPanel
          remountKey={videoPlayerKey}
          videoUrl={videoUrl}
          prevVideoUrl={prevVideoUrl}
          videoRef={videoRef}
        />
        {data.chapters && (
          <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden">
            <Chapters
              chapters={data.chapters}
              activeIndex={index}
              onChapterClick={seekToTime}
              nextLesson={data?.nextLesson}
              lessonId={data?._id}
              onNextChapter={onNextChapter}
              completedChapters={progress?.completedChapters}
            />
          </div>
        )}
      </div>
      <div className="col-span-2">
        <div ref={sourceRef}>
          <div className="relative">
            <PuzzleBoard key={boardKey} fen={fen} moves={moves} onComplete={handleComplete} />
            <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
          </div>
          <InteractiveControls onNextChapter={onNextChapter} compact />
        </div>
      </div>
      <div
        ref={targetRef}
        className="col-span-1 flex flex-col gap-3 px-3 overflow-hidden rounded-md bg-secondary"
      >
        <InteractiveFeedback />
        <div className="mt-1 flex flex-col flex-grow min-h-0 overflow-y-auto rounded-xl border border-border bg-surface">
          <InteractiveAside
            tree={tree}
            data={data}
            index={index}
            current={currentMoment}
            moments={moments}
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveLayoutLarge;
