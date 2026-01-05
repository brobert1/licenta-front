import { PgnTree } from '@chess/components/PgnViewer';
import { useEngineSettings, usePgnViewer } from '@chess/hooks';
import { Button, Link, Toggle } from '@components';
import { ChessTab } from '@components/Study';
import { NextChessground } from 'next-chessground';
import { Tabs } from 'react-bootstrap';
import { GameHistory } from '.';

const GamePreviewLayoutSmall = ({ games, index }) => {
  const activeGame = games[index];
  const { _id: id, pgn, createdAt, moves } = activeGame || {};

  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const { memory, numLines, setMemory, setNumLines } = useEngineSettings();

  const { tree, current, lastMove, goToMoment, goNextMoment, goPrevMoment, onUserMove } =
    usePgnViewer(pgn);

  return (
    <div className="outline-none w-full flex flex-col gap-2 h-full min-h-0">
      <div className="w-full">
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
      <Tabs
        defaultActiveKey="moves"
        id="game-preview-small-tabs"
        className="justify-start mt-4 flex-1 min-h-0"
      >
        <ChessTab icon="fas fa-chess" title="Moves" eventKey="moves">
          <div className="w-full bg-tertiary mb-4 flex flex-col h-full relative">
            <div className="bg-tertiary text-white flex items-center justify-between px-3 py-2 border-b border-white/10">
              <span className="text-white font-semibold">Game Analysis</span>
            </div>
            <div className="flex flex-col gap-1 text-gray-300 overflow-y-auto flex-1 min-h-0">
              <PgnTree tree={tree} current={current} onMoveClick={goToMoment} />
            </div>
          </div>
        </ChessTab>
        <ChessTab icon="fas fa-files" title="Games" eventKey="games">
          <div className="w-full bg-tertiary mb-4 flex flex-col h-full">
            <div className="flex flex-col gap-1 text-gray-300 overflow-y-auto flex-1 min-h-0">
              <GameHistory index={index} games={games} />
            </div>
          </div>
        </ChessTab>
      </Tabs>
    </div>
  );
};

export default GamePreviewLayoutSmall;
