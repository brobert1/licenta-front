import { useBotEngineContext } from '@chess/contexts';
import { useEffect, useRef, useState } from 'react';
import { ChessBoard } from '.';

const GameBoard = ({
  handleGameOver,
  elo,
  fen,
  playerColor = 'white',
  thinkTime = 1000,
  orientation = 'white',
  onMove,
  openingLine,
  timeControl = null,
  playerTime = 0,
  botTime = 0,
  boardRef,
  viewOnly = false,
  resumeHistory = null,
}) => {
  const { engine, isReady, initialize } = useBotEngineContext();
  const [isConfigured, setIsConfigured] = useState(false);
  const turnRef = useRef(true);
  const [, forceRender] = useState(0);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!engine || !isReady || !elo) return;

    if (engine.newGame) engine.newGame();
    engine.configureStrength(elo);
    engine.configureModelType(timeControl?.minutes);
    setIsConfigured(true);

    return () => setIsConfigured(false);
  }, [engine, isReady, elo, timeControl]);

  if (engine) {
    engine.isReady = isConfigured;
    engine.turn = turnRef.current;
    engine.toggleTurn = () => {
      turnRef.current = !turnRef.current;
      forceRender((n) => n + 1);
    };
  }

  return (
    <ChessBoard
      fen={fen}
      orientation={orientation}
      playerColor={playerColor}
      engine={engine}
      thinkTime={thinkTime}
      onGameOver={handleGameOver}
      onMove={onMove}
      openingLine={openingLine}
      timeControl={timeControl}
      playerTime={playerTime}
      botTime={botTime}
      boardRef={boardRef}
      viewOnly={viewOnly}
      resumeHistory={resumeHistory}
    />
  );
};

export default GameBoard;
