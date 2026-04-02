import MaiaEngine from '@chess/maia/maia-engine';
import { createContext, useCallback, useContext, useRef, useState } from 'react';

const BotEngineContext = createContext(null);

export const BotEngineProvider = ({ children }) => {
  const engineRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const initPromiseRef = useRef(null);

  const initialize = useCallback(async () => {
    if (engineRef.current?.isReady) return;
    if (initPromiseRef.current) return initPromiseRef.current;

    const promise = (async () => {
      try {
        setIsReady(false);
        setError(null);
        if (!engineRef.current) {
          engineRef.current = new MaiaEngine();
        }
        await engineRef.current.init();
        if (engineRef.current.isReady) {
          setIsReady(true);
        } else {
          setError(new Error('Maia API is not available'));
        }
      } catch (err) {
        console.error('Failed to initialize bot engine:', err);
        setError(err);
      } finally {
        initPromiseRef.current = null;
      }
    })();

    initPromiseRef.current = promise;
    return promise;
  }, []);

  const value = { engine: engineRef.current, isReady, error, initialize };

  return <BotEngineContext.Provider value={value}>{children}</BotEngineContext.Provider>;
};

export const useBotEngineContext = () => {
  const context = useContext(BotEngineContext);

  if (!context) {
    throw new Error('useBotEngineContext must be used within a BotEngineProvider');
  }

  return context;
};
