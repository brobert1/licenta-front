import { useChessContext, usePuzzleContext } from '@chess/contexts';
import { FeedbackIcon } from '@chess/components';
import { PuzzleBoard } from '@chess/components/Puzzle';
import { usePgnViewer } from '@chess/hooks';
import { NoSsr, VideoPlayer } from '@components';
import { markChapterCompleted } from '@api/user-progress';
import { useEqualHeight, useMutation, usePreview, useVideoNavigation } from '@hooks';
import { extractFen } from '@chess/functions';
import { flat } from 'chess-moments';
import { useEffect, useMemo } from 'react';
import { Tabs } from 'react-bootstrap';
import Chapters from './Chapters';
import ChessTab from './ChessTab';
import InteractiveAside from './InteractiveAside';
import InteractiveControls from './InteractiveControls';
import InteractiveFeedback from './InteractiveFeedback';

const InteractiveLayout = ({ data, progress, pgn, index, chapterId, onNextChapter, refetch }) => {
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

  // Completion mutation
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
    <div className="grid grid-cols-5 outline-none w-full gap-6">
      <div className="col-span-3 max-w-chess-board">
        <div ref={sourceRef}>
          <h2 className="text-primary first-letter:uppercase text-xl font-semibold mb-2">
            {data.name}
          </h2>
          <div className="relative w-full">
            <PuzzleBoard key={boardKey} fen={fen} moves={moves} onComplete={handleComplete} />
            <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
          </div>
          <InteractiveControls onNextChapter={onNextChapter} compact />
        </div>
      </div>
      <div
        ref={targetRef}
        className="study-layout-panel col-span-2 flex flex-col overflow-hidden min-h-0"
      >
        <Tabs
          defaultActiveKey="interactive"
          id="interactive-layout-tabs"
          className="justify-end mb-1 study-layout-tabs"
        >
          <ChessTab icon="fas fa-puzzle-piece" title="Exercise" eventKey="interactive">
            <div className="flex flex-col pt-2 gap-3 overflow-hidden rounded-md bg-secondary h-full">
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
          </ChessTab>
          <ChessTab icon="fas fa-book" title="Chapters" eventKey="chapters">
            <div className="relative rounded-md flex flex-col gap-4 h-full">
              {videoUrl && (
                <NoSsr>
                  <VideoPlayer key={videoPlayerKey} src={videoUrl} onVideoRef={videoRef} />
                </NoSsr>
              )}
              <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden">
                <Chapters
                  chapters={data.chapters}
                  activeIndex={index}
                  onChapterClick={seekToTime}
                  hasVideo={!!videoUrl}
                  nextLesson={data?.nextLesson}
                  lessonId={data?._id}
                  onNextChapter={onNextChapter}
                  completedChapters={progress?.completedChapters}
                />
              </div>
            </div>
          </ChessTab>
        </Tabs>
      </div>
    </div>
  );
};

export default InteractiveLayout;
