import { PgnTree } from '@chess/components/PgnViewer';
import { useMoveTrainer } from '@chess/hooks';
import { Button } from '@components';
import { useEqualHeight } from '@hooks';
import { Tabs } from 'react-bootstrap';
import ChessTab from './ChessTab';
import Controls from './Controls';
import MoveHistory from './MoveHistory';
import Puzzle from './Puzzle';

const TrainLayout = ({ data, fen, isOpen, toggle, pgn, name }) => {
  // Move trainer
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
    <div className="grid grid-cols-5 outline-none w-full gap-6">
      <div className="col-span-3 max-w-chess-board">
        <div ref={sourceRef}>
          <h2 className="text-white text-xl font-semibold mb-2">{data.name}</h2>
          <div>
            <Puzzle fen={fen} moves={solution} setHistory={setHistory} />
            <Controls isOpen={isOpen} toggle={toggle} />
          </div>
        </div>
      </div>
      <div ref={targetRef} className="study-layout-panel col-span-2 flex flex-col overflow-hidden">
        <Tabs defaultActiveKey="train" id="study-layout-tabs" className="justify-end mb-1">
          <ChessTab icon="fa-solid fa-traffic-cone" title="Train" eventKey="train">
            <div className="flex flex-col h-full overflow-hidden rounded-md bg-secondary">
              <div className="bg-tertiary text-white">
                <p className="text-white font-semibold border-b p-2.5 border-white/10">{name}</p>
              </div>
              <div className="relative flex flex-col flex-grow min-h-0">
                <MoveHistory moves={history} current={current} />
                <div className="flex flex-col flex-grow min-h-0">
                  <div className="overflow-y-auto min-h-0 flex-grow">
                    <PgnTree tree={tree} onMoveClick={() => {}} current={current} />
                  </div>
                </div>
                <div className="bg-secondary pt-4">
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
          </ChessTab>
          <ChessTab icon="fas fa-chess" title="PGN" eventKey="pgn" disabled />
          <ChessTab icon="fas fa-video" title="Chapters" eventKey="video" disabled />
        </Tabs>
      </div>
    </div>
  );
};

export default TrainLayout;
