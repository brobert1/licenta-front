import { asmEngineConfigs, wasmBotConfigs } from '@constants/engine-configs';
import { getEngineConfiguration } from '@chess/functions';
import { useBotEngine } from '@chess/hooks';
import { useEffect, useState } from 'react';
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
}) => {
  const engine = useBotEngine();
  const [dynamicThinkTime, setDynamicThinkTime] = useState(thinkTime);

  // Update bot strength using skill level system when ELO changes
  useEffect(() => {
    if (engine && engine.isReady && elo) {
      // Select configs based on engine type
      const configs = engine.type === 'wasm' ? wasmBotConfigs : asmEngineConfigs;
      const engineConfig = getEngineConfiguration(elo, configs, engine.type);

      if (engine.type === 'wasm') {
        // Stockfish 17.1 WASM
        const { skillLevel, maxDepth, hash } = engineConfig;
        engine.setSkillLevel(skillLevel);
        engine.setMaxDepth(maxDepth);
        engine.setHash(hash);

        // Longer think time for max strength
        if (maxDepth === null) {
          setDynamicThinkTime(2500);
        } else {
          setDynamicThinkTime(thinkTime);
        }
      } else {
        // ASM engine
        const { skillLevel, maxError, probability } = engineConfig;
        engine.updateSkillLevel(skillLevel, maxError, probability);
        setDynamicThinkTime(thinkTime);
      }
    }
  }, [engine, engine?.isReady, elo, thinkTime]);

  return (
    <ChessBoard
      fen={fen}
      orientation={orientation}
      playerColor={playerColor}
      engine={engine}
      thinkTime={dynamicThinkTime}
      onGameOver={handleGameOver}
      onMove={onMove}
      openingLine={openingLine}
      timeControl={timeControl}
      playerTime={playerTime}
      botTime={botTime}
    />
  );
};

export default GameBoard;
