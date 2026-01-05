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
import { Tabs } from 'react-bootstrap';
import { Chapters, ChessTab, InteractiveAside, InteractiveControls, InteractiveFeedback } from '.';

const InteractiveLayout = ({ data, progress, pgn, index, chapterId, onNextChapter, refetch }) => {
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

  // Completion mutation
  const mutation = useMutation(markChapterCompleted, {
    successCallback: () => {
      refetch();
    },
  });

  const handleComplete = async () => {
    await mutation.mutateAsync(chapterId);
  };

  return (
    <div className="grid grid-cols-5 outline-none w-full gap-6">
      <div className="col-span-3 max-w-chess-board">
        <div ref={sourceRef}>
          <h2 className="text-white text-xl font-semibold mb-2">{data.name}</h2>
          <div className="relative w-full">
            <PuzzleBoard fen={fen} moves={moves} onComplete={handleComplete} />
            <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
          </div>
        </div>
      </div>
      <div ref={targetRef} className="col-span-2 flex flex-col overflow-hidden">
        <Tabs
          defaultActiveKey="interactive"
          id="interactive-layout-tabs"
          className="justify-end mb-1"
        >
          <ChessTab icon="fas fa-puzzle-piece" title="Exercise" eventKey="interactive">
            <div className="flex flex-col h-full overflow-hidden rounded-md">
              <div className="bg-tertiary relative flex flex-col flex-grow min-h-0">
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
          </ChessTab>
          <ChessTab icon="fas fa-book" title="Chapters" eventKey="chapters">
            <div className="relative rounded-md flex flex-col gap-4 h-full">
              {videoUrl && <Video src={videoUrl} onVideoRef={videoRef} />}
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
