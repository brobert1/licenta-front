import { PgnTree } from '@chess/components/PgnViewer';
import { useMoveTrainer } from '@chess/hooks';
import { Button, NoSsr, VideoPlayer } from '@components';
import { Tabs } from 'react-bootstrap';
import BottomBar from './BottomBar';
import Chapters from './Chapters';
import ChessTab from './ChessTab';
import MoveHistory from './MoveHistory';
import Puzzle from './Puzzle';

const TrainLayoutSmall = ({ data, progress, fen, isOpen, toggle, pgn, index }) => {
  const trainChapter = data?.chapters?.find((c) => c.index === index);
  const trainVideoUrl = trainChapter?.video;
  const videoPlayerKey = trainChapter?._id ?? `${data?._id}-${index}`;

  // Use the move trainer hook for training logic
  const {
    tree, //
    solution,
    current,
    history,
    setHistory,
  } = useMoveTrainer({ pgn, fen });

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 2xl:grid-cols-4 outline-none w-full gap-4 pb-12">
      <div className="study-layout-center md:col-span-3 2xl:col-span-2 flex flex-col gap-4">
        <div className="w-5/6 mx-auto md:w-full">
          <NoSsr>
            <Puzzle fen={fen} moves={solution} setHistory={setHistory} />
          </NoSsr>
        </div>
      </div>
      <div className="hidden 2xl:col-span-1 2xl:flex 2xl:flex-col overflow-hidden rounded-md">
        <div className="bg-secondary rounded-md h-full p-4">
          <h2 className="text-white text-base font-semibold mb-2">{data?.name}</h2>
          <MoveHistory moves={history} current={current} />
          <div className="flex flex-col h-full relative">
            <PgnTree tree={tree} onMoveClick={() => {}} current={current} />
            <Button
              className="flex gap-2 items-center w-full text-white justify-center cursor-pointer bg-accent p-2 rounded-md"
              onClick={toggle}
            >
              Stop Training
              <i className="fa-solid fa-pause mt-1"></i>
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden 2xl:col-span-1 2xl:flex 2xl:flex-col overflow-hidden rounded-md">
        <div className="bg-secondary rounded-md h-full">
          <Chapters
            chapters={data.chapters}
            activeIndex={index}
            onChapterClick={() => {}}
            hasVideo={!!trainVideoUrl}
            completedChapters={progress?.completedChapters}
          />
        </div>
      </div>
      <div className="study-layout-right flex flex-col col-span-2 2xl:hidden">
        <Tabs defaultActiveKey="moves" className="mb-4">
          <ChessTab icon="fas fa-chess" title="Moves" eventKey="moves">
            <div className="bg-secondary rounded-t-md w-full h-full flex flex-col">
              <div className="bg-tertiary text-white rounded-t-md">
                <div className="flex gap-2 text-white font-semibold border-b p-2.5 border-white/10">
                  <p>{data?.name}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 p-2 text-gray-300 overflow-y-auto flex-1 min-h-0">
                <MoveHistory moves={history} current={current} />
                <PgnTree tree={tree} current={current} onMoveClick={() => {}} />
              </div>
              <Button
                className="flex gap-2 items-center w-full text-white justify-center cursor-pointer bg-accent p-2 rounded-b-md"
                onClick={toggle}
              >
                Stop Training
                <i className="fa-solid fa-pause mt-1"></i>
              </Button>
            </div>
          </ChessTab>
          {trainVideoUrl && (
            <ChessTab icon="fas fa-play" title="Video" eventKey="video">
              <div className="rounded-t-md w-full h-full flex flex-col">
                <div className="flex flex-col gap-1 p-2 flex-1 min-h-0">
                  <NoSsr>
                    <VideoPlayer key={videoPlayerKey} src={trainVideoUrl} />
                  </NoSsr>
                </div>
              </div>
            </ChessTab>
          )}
          <ChessTab icon="fas fa-list" title="Chapters" eventKey="chapters">
            <Chapters
              chapters={data.chapters}
              activeIndex={index}
              onChapterClick={() => {}}
              hasVideo={!!trainVideoUrl}
              completedChapters={progress?.completedChapters}
            />
          </ChessTab>
        </Tabs>
      </div>
      <BottomBar data={data} fen={current.fen} toggle={toggle} isOpen={isOpen} />
    </div>
  );
};

export default TrainLayoutSmall;
