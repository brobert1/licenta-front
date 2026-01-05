import { normalizeThreatMessage, reverseFenColor } from '@chess/functions';
import { useAnalysisEngine } from '@contexts';
import { useDisclosure } from '@hooks';
import { useEffect, useRef, useState } from 'react';

const useThreat = (initialFen) => {
  const { isOpen: isActive, show, hide, toggle } = useDisclosure();
  const handleToggle = () => {
    setThreatShape(null);
    setThreatAnalysis(null);
    toggle();
  };
  const handleShow = () => {
    setThreatShape(null);
    setThreatAnalysis(null);
    show();
  };
  const handleHide = () => {
    setThreatShape(null);
    setThreatAnalysis(null);
    hide();
  };

  const { engine, initializeEngine } = useAnalysisEngine();
  const [fen, setFen] = useState(initialFen);
  const [threatShape, setThreatShape] = useState(null);
  const [threatAnalysis, setThreatAnalysis] = useState(null);
  const isMountedRef = useRef(true);
  const cleanupHandlerRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      // Clean up handler on unmount
      if (cleanupHandlerRef.current) {
        cleanupHandlerRef.current();
        cleanupHandlerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isActive && engine && engine.isReady) {
      sendPositionToEngine(fen);
    } else if (isActive && !engine) {
      // Initialize engine if threat is activated but engine not loaded
      initializeEngine();
    } else {
      // Clean up handler when deactivating
      if (cleanupHandlerRef.current) {
        cleanupHandlerRef.current();
        cleanupHandlerRef.current = null;
      }
    }

    return () => {
      // Clean up handler when effect re-runs or unmounts
      if (cleanupHandlerRef.current) {
        cleanupHandlerRef.current();
        cleanupHandlerRef.current = null;
      }
    };
  }, [isActive, fen, engine]);

  const sendPositionToEngine = async (fen) => {
    if (!isMountedRef.current || !engine || !engine.isReady) return;

    // Determine engine type
    const isASM = engine.type === 'asm';

    // Clean up previous handler if exists
    if (cleanupHandlerRef.current) {
      cleanupHandlerRef.current();
      cleanupHandlerRef.current = null;
    }

    setThreatShape(null);
    setThreatAnalysis(null);

    try {
      await engine.stop();
      await engine.is_ready();

      const reversedFen = reverseFenColor(fen);

      return new Promise((resolve) => {
        engine.set_position(reversedFen);

        let latestInfo = null;

        if (isASM) {
          // ASM version: use window.chessEngineWorker.onmessage
          const previousHandler = window.chessEngineWorker.onmessage;

          const threatCallback = (messageEvent) => {
            const message = messageEvent.data;

            // Capture info messages with PV data
            if (message.startsWith('info') && message.includes('pv')) {
              const info = {};
              const parts = message.split(' ');

              for (let i = 0; i < parts.length; i++) {
                if (parts[i] === 'depth' && parts[i + 1]) {
                  info.depth = parseInt(parts[i + 1]);
                }
                if (parts[i] === 'score') {
                  if (parts[i + 1] === 'cp' && parts[i + 2]) {
                    info.score = { type: 'cp', value: parseInt(parts[i + 2]) };
                  } else if (parts[i + 1] === 'mate' && parts[i + 2]) {
                    info.score = { type: 'mate', value: parseInt(parts[i + 2]) };
                  }
                }
                if (parts[i] === 'pv') {
                  info.pv = parts.slice(i + 1).join(' ');
                  info.move = parts[i + 1]; // First move in PV
                  break;
                }
              }

              if (info.pv && isMountedRef.current) {
                latestInfo = info;
                setThreatAnalysis(info);
              }
            }

            if (message.startsWith('bestmove')) {
              // Only update state if still mounted
              if (isMountedRef.current) {
                const shape = normalizeThreatMessage(message);
                setThreatShape(shape);

                // If we have analysis data, add the move from shape
                if (latestInfo && shape) {
                  setThreatAnalysis({ ...latestInfo, move: shape.orig + shape.dest });
                }
              }
              // Restore previous handler
              window.chessEngineWorker.onmessage = previousHandler;
              cleanupHandlerRef.current = null;
              resolve();
            }
          };

          // Store cleanup function
          cleanupHandlerRef.current = () => {
            window.chessEngineWorker.onmessage = previousHandler;
          };

          window.chessEngineWorker.onmessage = threatCallback;
          window.chessEngineWorker.postMessage('go depth 15');
        } else {
          // WASM version: use messageHandlers array
          const threatCallback = (message) => {
            // Capture info messages with PV data
            if (message.startsWith('info') && message.includes('pv')) {
              const info = {};
              const parts = message.split(' ');

              for (let i = 0; i < parts.length; i++) {
                if (parts[i] === 'depth' && parts[i + 1]) {
                  info.depth = parseInt(parts[i + 1]);
                }
                if (parts[i] === 'score') {
                  if (parts[i + 1] === 'cp' && parts[i + 2]) {
                    info.score = { type: 'cp', value: parseInt(parts[i + 2]) };
                  } else if (parts[i + 1] === 'mate' && parts[i + 2]) {
                    info.score = { type: 'mate', value: parseInt(parts[i + 2]) };
                  }
                }
                if (parts[i] === 'pv') {
                  info.pv = parts.slice(i + 1).join(' ');
                  info.move = parts[i + 1]; // First move in PV
                  break;
                }
              }

              if (info.pv && isMountedRef.current) {
                latestInfo = info;
                setThreatAnalysis(info);
              }
            }

            if (message.startsWith('bestmove')) {
              // Only update state if still mounted
              if (isMountedRef.current) {
                const shape = normalizeThreatMessage(message);
                setThreatShape(shape);

                // If we have analysis data, add the move from shape
                if (latestInfo && shape) {
                  setThreatAnalysis({ ...latestInfo, move: shape.orig + shape.dest });
                }
              }
              // Clean up this handler
              engine.messageHandlers = engine.messageHandlers.filter((h) => h !== threatCallback);
              cleanupHandlerRef.current = null;
              resolve();
            }
          };

          // Store cleanup function
          cleanupHandlerRef.current = () => {
            engine.messageHandlers = engine.messageHandlers.filter((h) => h !== threatCallback);
          };

          engine.messageHandlers.push(threatCallback);
          engine.postMessage('go depth 15');
        }
      });
    } catch (error) {
      console.error('Threat analysis error:', error);
      if (cleanupHandlerRef.current) {
        cleanupHandlerRef.current();
        cleanupHandlerRef.current = null;
      }
    }
  };

  return {
    threatShape,
    threatAnalysis,
    isThreatActive: isActive,
    showThreat: handleShow,
    hideThreat: handleHide,
    toggleThreat: handleToggle,
    setThreatFen: setFen,
  };
};

export default useThreat;
