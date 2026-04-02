import { Stockfish } from '@chess/stockfish/stockfish-wrapper-wasm';
import { Stockfish as StockfishASM } from '@chess/stockfish/stockfish-wrapper-asm';
import { getEngineType } from '@chess/stockfish/get-engine-type';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const AnalysisEngineContext = createContext(null);

export const AnalysisEngineProvider = ({ children }) => {
  const engineRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const initPromiseRef = useRef(null);

  useEffect(() => {
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

  /**
   * Lazy initialization - only loads engine when explicitly called
   * Returns a promise that resolves to the engine instance
   */
  const initializeEngine = async () => {
    // If already initialized, return existing engine
    if (engineRef.current) {
      return engineRef.current;
    }

    // If initialization is in progress, wait for it
    if (initPromiseRef.current) {
      return initPromiseRef.current;
    }

    // Start initialization
    initPromiseRef.current = (async () => {
      try {
        const engineConfig = {
          asm: {
            Engine: StockfishASM,
            path: '/lib/stockfish/stockfish.asm.js',
          },
          wasm: {
            Engine: Stockfish,
            path: '/lib/stockfish/stockfish-17.1-8e4d048.js',
          },
        };

        const { Engine, path } = engineConfig[getEngineType()];
        const stockfish = new Engine(path);

        await stockfish.init();
        stockfish.isReady = true;

        engineRef.current = stockfish;
        setIsReady(true);
        setError(null);

        return stockfish;
      } catch (err) {
        console.error('Failed to initialize analysis engine:', err);
        setError(err);
        setIsReady(false);
        initPromiseRef.current = null;
        throw err;
      }
    })();

    return initPromiseRef.current;
  };

  const value = {
    engine: engineRef.current,
    isReady,
    error,
    initializeEngine,
  };

  return <AnalysisEngineContext.Provider value={value}>{children}</AnalysisEngineContext.Provider>;
};

export const useAnalysisEngine = () => {
  const context = useContext(AnalysisEngineContext);

  if (context === undefined) {
    throw new Error('useAnalysisEngine must be used within an AnalysisEngineProvider');
  }

  return context;
};
