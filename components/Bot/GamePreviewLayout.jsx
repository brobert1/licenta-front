import { PgnTree } from '@chess/components/PgnViewer';
import { useEngineSettings, useEqualHeight, usePgnViewer } from '@chess/hooks';
import { Button, Link, Toggle } from '@components';
import { ChessTab } from '@components/Study';
import { NextChessground } from 'next-chessground';
import { Tabs } from 'react-bootstrap';
import { GameHistory } from '.';

const GamePreviewLayout = ({ games, index }) => {
  const activeGame = games[index];
  const { _id: id, pgn, createdAt, moves } = activeGame || {};

  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const { memory, numLines, setMemory, setNumLines } = useEngineSettings();

  const { tree, current, lastMove, goToMoment, goNextMoment, goPrevMoment, onUserMove } =
    usePgnViewer(pgn);

  const { sourceRef, targetRef } = useEqualHeight();

  return (
    <div className="grid grid-cols-5 outline-none w-full gap-6">
      <div className="col-span-3 max-w-chess-board">
        <div ref={sourceRef}>
          <div>
            <NextChessground fen={current.fen} lastMove={lastMove} onMove={onUserMove} />
            <div className="flex flex-wrap justify-between gap-2 mt-2.5">
              <Link
                className="button mini bg-accent text-white flex items-center gap-2 border-3 border-accent"
                href={`/client/game-review/${id}`}
              >
                <i className="fa-solid fa-chess"></i>
                <span className="font-semibold">Computer Analysis</span>
              </Link>
              <div className="flex flex-wrap gap-1">
                <Button className="button mini tertiary text-xl" onClick={goPrevMoment}>
                  <i className="fa-solid fa-chevron-left"></i>
                </Button>
                <Button className="button mini tertiary text-xl" onClick={goNextMoment}>
                  <i className="fa-solid fa-chevron-right"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={targetRef} className="col-span-2 flex flex-col overflow-hidden">
        <Tabs defaultActiveKey="moves" id="game-preview-tabs" className="justify-end mb-1">
          <ChessTab icon="fas fa-chess" title="Moves" eventKey="moves">
            <div className="flex flex-col h-full overflow-hidden rounded-md bg-secondary relative">
              <div className="bg-tertiary text-white flex items-center justify-between px-3 py-2 border-b border-white/10">
                <span className="text-white font-semibold">Game Analysis</span>
              </div>
              <div className="relative flex flex-col flex-grow min-h-0">
                <div className="flex flex-col flex-grow min-h-0">
                  <div className="overflow-y-auto min-h-0 flex-grow">
                    <PgnTree tree={tree} current={current} onMoveClick={goToMoment} />
                  </div>
                </div>
              </div>
            </div>
          </ChessTab>
          <ChessTab icon="fas fa-files" title="Games" eventKey="games">
            <div className="relative flex flex-col flex-grow bg-secondary rounded-md h-full">
              <GameHistory index={index} games={games} />
            </div>
          </ChessTab>
        </Tabs>
      </div>
    </div>
  );
};

export default GamePreviewLayout;
