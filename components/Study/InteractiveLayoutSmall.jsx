import { useChessContext, usePuzzleContext } from '@chess/contexts';
import { FeedbackIcon } from '@chess/components';
import { PuzzleBoard } from '@chess/components/Puzzle';
import { usePgnViewer } from '@chess/hooks';
import { NoSsr } from '@components';
import { markChapterCompleted } from '@api/user-progress';
import { useMutation, useVideoNavigation } from '@hooks';
import { extractFen } from '@chess/functions';
import { flat } from 'chess-moments';
import { useEffect, useMemo } from 'react';
import { Tabs } from 'react-bootstrap';
import { Chapters, ChessTab, InteractiveAside, InteractiveControls, InteractiveFeedback } from '.';
import { Video } from '@components';

const InteractiveLayoutSmall = ({
  data,
  progress,
  pgn,
  index,
  chapterId,
  onNextChapter,
  refetch,
}) => {
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
    successCallback: () => refetch(),
  });

  const handleComplete = async () => {
    await mutation.mutateAsync(chapterId);
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 2xl:grid-cols-4 outline-none w-full gap-4 pb-12">
      <div className="study-layout-center md:col-span-3 2xl:col-span-2 flex flex-col gap-4">
        <div className="w-5/6 mx-auto md:w-full">
          <NoSsr>
            <div className="relative w-full">
              <PuzzleBoard fen={fen} moves={moves} onComplete={handleComplete} />
              <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
            </div>
          </NoSsr>
        </div>
      </div>
      <div className="study-layout-right flex flex-col col-span-2 2xl:hidden">
        <Tabs defaultActiveKey="interactive" className="mb-4">
          <ChessTab icon="fas fa-puzzle-piece" title="Exercise" eventKey="interactive">
            <div className="w-full h-full flex flex-col rounded-md overflow-hidden">
              <div className="bg-tertiary flex flex-col flex-grow">
                <InteractiveFeedback />
                <div className="flex-1 min-h-[200px]">
                  <InteractiveAside
                    tree={tree}
                    data={data}
                    index={index}
                    current={currentMoment}
                    moments={moments}
                  />
                </div>
              </div>
              <InteractiveControls />
            </div>
          </ChessTab>
          {videoUrl && (
            <ChessTab icon="fas fa-play" title="Video" eventKey="video">
              <div className="rounded-t-md w-full h-full flex flex-col">
                <div className="flex flex-col gap-1 p-2 flex-1 min-h-0">
                  <Video src={videoUrl} onVideoRef={videoRef} />
                </div>
              </div>
            </ChessTab>
          )}
          <ChessTab icon="fas fa-list" title="Chapters" eventKey="chapters">
            <Chapters
              chapters={data.chapters}
              activeIndex={index}
              onChapterClick={seekToTime}
              hasVideo={!!videoUrl}
              lessonId={data?._id}
              nextLesson={data?.nextLesson}
              onNextChapter={onNextChapter}
              completedChapters={progress?.completedChapters}
            />
          </ChessTab>
        </Tabs>
      </div>
    </div>
  );
};

export default InteractiveLayoutSmall;
