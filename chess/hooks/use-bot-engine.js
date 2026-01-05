import { Stockfish as StockfishASM } from '@chess/stockfish/stockfish-wrapper-asm';
import { StockfishWASM } from '@chess/stockfish/stockfish-bot-wrapper';
import { getBotEngineType } from '@chess/stockfish/get-engine-type';
import { useEffect, useRef, useState } from 'react';

/**
 * Hook that creates a bot engine instance on mount
 * Uses Stockfish 17.1 WASM for desktop
 * Uses ASM Stockfish for Safari/mobile
 * and automatically cleans it up on unmount.
 */
const useBotEngine = () => {
  const engineRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const initPromiseRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const initializeEngine = async () => {
      try {
        if (!engineRef.current) {
          const engineConfig = {
            asm: {
              Engine: StockfishASM,
              path: '/lib/stockfish/stockfish.asm.js',
            },
            wasm: {
              Engine: StockfishWASM,
              path: '/lib/stockfish/stockfish-17.1-8e4d048.js',
            },
          };

          const { Engine, path } = engineConfig[getBotEngineType()];
          engineRef.current = new Engine(path);

          if (!initPromiseRef.current) {
            initPromiseRef.current = engineRef.current.init();
          }

          await initPromiseRef.current;
          setIsReady(true);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize bot engine:', err);
        setError(err);
        setIsReady(false);
      }
    };

    initializeEngine();

    // Cleanup on unmount
    return () => {
      if (engineRef.current) {
        engineRef.current.quit();
        engineRef.current = null;
        initPromiseRef.current = null;
        setIsReady(false);
      }
    };
  }, []);

  // Add engine turn logic
  const [engineTurn, setEngineTurn] = useState(true);
  const toggleEngineTurn = () => {
    setEngineTurn(!engineTurn);
  };

  if (!engineRef.current) {
    return null;
  }

  const engine = engineRef.current;
  engine.turn = engineTurn;
  engine.toggleTurn = toggleEngineTurn;
  engine.isReady = isReady;
  engine.error = error;

  return engine;
};

export default useBotEngine;
