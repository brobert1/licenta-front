import { PgnTree } from '@chess/components/PgnViewer';
import { useMoveTrainer } from '@chess/hooks';
import { Button, NoSsr, VideoPlayer } from '@components';
import { useEqualHeight } from '@hooks';
import Chapters from './Chapters';
import Controls from './Controls';
import MoveHistory from './MoveHistory';
import Puzzle from './Puzzle';

const TrainLayoutLarge = ({ data, progress, fen, isOpen, toggle, pgn, index, name }) => {
  const trainChapter = data?.chapters?.find((c) => c.index === index);
  const trainVideoUrl = trainChapter?.video;
  const videoPlayerKey = trainChapter?._id ?? `${data?._id}-${index}`;

  const {
    tree, //
    solution,
    current,
    history,
    setHistory,
  } = useMoveTrainer({ pgn, fen });

  // Equal height for all three columns
  const { sourceRef, targetRef } = useEqualHeight();

  if (!pgn) {
    return null; // Safety check
  }

  return (
    <div className="p-6">
      <div ref={targetRef} className="grid grid-cols-4 outline-none w-full mt-4 gap-8">
        <div className="col-span-1 flex flex-col overflow-hidden rounded-md opacity-50 pointer-events-none">
          {trainVideoUrl && (
            <NoSsr>
              <VideoPlayer key={videoPlayerKey} src={trainVideoUrl} />
            </NoSsr>
          )}
          {data.chapters && (
            <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden">
              <Chapters
                chapters={data.chapters}
                activeIndex={index}
                onChapterClick={() => {}}
                nextLesson={data?.nextLesson}
                lessonId={data?._id}
                completedChapters={progress?.completedChapters}
              />
            </div>
          )}
        </div>
        <div className="col-span-2">
          <div ref={sourceRef}>
            <Puzzle fen={fen} moves={solution} setHistory={setHistory} />
            <Controls isOpen={isOpen} toggle={toggle} />
          </div>
        </div>
        <div
          ref={targetRef}
          className="col-span-1 flex flex-col overflow-hidden rounded-md bg-secondary"
        >
          <div className="bg-tertiary text-white">
            <p className="text-white font-semibold border-b p-2.5 border-white/10">{name}</p>
          </div>
          <div className="relative flex flex-col flex-grow min-h-0">
            <MoveHistory moves={history} current={current} />
            <div className="flex flex-col flex-grow min-h-0">
              <div className="overflow-y-auto min-h-0 flex-grow">
                <PgnTree tree={tree} onMoveClick={() => {}} current={current} />
              </div>
              <Button
                className="flex gap-2 items-center w-full text-white justify-center cursor-pointer bg-accent p-2 rounded-b-md"
                onClick={toggle}
              >
                Stop Training
                <i className="fa-solid fa-pause mt-1"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainLayoutLarge;
