import { useChessContext, usePuzzleContext } from '@chess/contexts';
import { FeedbackIcon } from '@chess/components';
import { PuzzleBoard } from '@chess/components/Puzzle';
import { usePgnViewer } from '@chess/hooks';
import { Video } from '@components';
import { markChapterCompleted } from '@api/user-progress';
import { useEqualHeight, useMutation, useVideoNavigation } from '@hooks';
import { extractFen } from '@chess/functions';
import { flat } from 'chess-moments';
import { useEffect, useMemo } from 'react';
import { Chapters, InteractiveAside, InteractiveControls, InteractiveFeedback } from '.';

const InteractiveLayoutLarge = ({
  data,
  progress,
  pgn,
  index,
  chapterId,
  onNextChapter,
  refetch,
}) => {
  const { sourceRef, targetRef } = useEqualHeight();
  const { videoRef, seekToTime } = useVideoNavigation();
  const { initialTurn, currentFen } = useChessContext();
  const { setSolution, feedback, lastMove } = usePuzzleContext();

  const activeChapter = data.chapters?.find((chapter) => chapter.index === index);
  const videoUrl = activeChapter?.video;

  // Extract FEN from PGN and flatten moves for puzzle
  const fen = useMemo(() => extractFen(pgn), [pgn]);
  const moves = useMemo(() => flat(pgn), [pgn]);

  const { tree, current: currentMoment, moments, syncLastMove } = usePgnViewer(pgn);

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
    await mutation.mutateAsync(chapterId);
  };

  return (
    <div ref={targetRef} className="grid grid-cols-4 outline-none w-full gap-8">
      <div className="col-span-1 flex flex-col gap-4 rounded-md overflow-hidden">
        {videoUrl && <Video src={videoUrl} onVideoRef={videoRef} />}
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
        <div ref={sourceRef} className="relative w-full">
          <PuzzleBoard fen={fen} moves={moves} onComplete={handleComplete} />
          <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
        </div>
      </div>
      <div ref={targetRef} className="col-span-1 flex flex-col overflow-hidden rounded-md">
        <div className="relative flex flex-col flex-grow min-h-0 bg-tertiary">
          <InteractiveFeedback />
          <div className="flex flex-col flex-grow min-h-0">
            <div className="overflow-y-auto min-h-0 flex-grow">
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
        <InteractiveControls />
      </div>
    </div>
  );
};

export default InteractiveLayoutLarge;
