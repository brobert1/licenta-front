import { useEffect, useRef, useState } from 'react';

const useEngineAnalysis = (engine, fen, numLines, memory, isActive = true) => {
  const [lines, setLines] = useState([]);
  const [sharedNodes, setSharedNodes] = useState(0);

  // Determine if we're using ASM engine (simpler handling)
  const isASM = engine?.type === 'asm';

  // Analysis state - tracks current and pending analysis
  const analysisStateRef = useRef({
    currentFen: null,
    currentSettings: { numLines: 0, memory: 0 },
    pendingAnalysis: null,
  });

  // Control state - tracks lifecycle and cleanup
  const controlStateRef = useRef({
    isMounted: true,
    isAnalyzing: false,
    debounceTimer: null,
    cleanupHandler: null,
  });

  const startAnalysis = async (targetFen, targetNumLines, targetMemory) => {
    if (
      !controlStateRef.current.isMounted ||
      !targetFen ||
      !isActive ||
      !engine ||
      !engine.isReady
    ) {
      return;
    }

    // Cancel any pending debounced analysis
    if (controlStateRef.current.debounceTimer) {
      clearTimeout(controlStateRef.current.debounceTimer);
      controlStateRef.current.debounceTimer = null;
    }

    // If this is a new position, clear lines immediately for smooth UX
    if (analysisStateRef.current.currentFen !== targetFen) {
      setLines([]);
      setSharedNodes(0);
      analysisStateRef.current.currentFen = targetFen;
    }

    // If numLines decreased, trim the lines array immediately
    const numLinesDecreased =
      analysisStateRef.current.currentSettings.numLines > targetNumLines &&
      analysisStateRef.current.currentFen === targetFen;

    if (numLinesDecreased) {
      setLines((prevLines) => prevLines.slice(0, targetNumLines));
    }

    try {
      // Clean up previous handler if exists
      if (controlStateRef.current.cleanupHandler) {
        controlStateRef.current.cleanupHandler();
        controlStateRef.current.cleanupHandler = null;
      }

      // Stop current analysis if running
      if (controlStateRef.current.isAnalyzing) {
        await engine.stop();
        controlStateRef.current.isAnalyzing = false;
      }

      await engine.is_ready();

      // Update settings if they changed (only sends UCI commands if values differ)
      const settingsChanged =
        analysisStateRef.current.currentSettings.numLines !== targetNumLines ||
        analysisStateRef.current.currentSettings.memory !== targetMemory;

      if (settingsChanged) {
        if (isASM) {
          // ASM version: simpler direct configuration
          engine.set_hash(targetMemory);
          engine.set_multipv(targetNumLines);
        } else {
          // WASM version: use configure method
          engine.configure({
            hashSize: targetMemory,
            multiPV: targetNumLines,
          });
        }
        analysisStateRef.current.currentSettings = {
          numLines: targetNumLines,
          memory: targetMemory,
        };
      }

      // Set position
      engine.set_position(targetFen);

      // Start infinite analysis and store cleanup function
      controlStateRef.current.isAnalyzing = true;

      if (isASM) {
        // ASM version: simpler callback without cleanup function return
        engine.go_infinite((info) => {
          // Verify we're still mounted and analyzing the correct position
          if (
            !controlStateRef.current.isMounted ||
            analysisStateRef.current.currentFen !== targetFen
          ) {
            return;
          }

          if (info.nodes) {
            setSharedNodes(info.nodes);
          }

          if (info.multipv) {
            setLines((prevLines) => {
              const newLines = [...prevLines];
              const lineIndex = info.multipv - 1;
              newLines[lineIndex] = info;
              return newLines;
            });
          }
        });
        controlStateRef.current.cleanupHandler = null;
      } else {
        // WASM version: advanced handling with cleanup function
        controlStateRef.current.cleanupHandler = engine.go_infinite((info) => {
          // Verify we're still mounted and analyzing the correct position
          if (
            !controlStateRef.current.isMounted ||
            analysisStateRef.current.currentFen !== targetFen
          ) {
            return;
          }

          if (info.nodes) {
            setSharedNodes((prevNodes) => Math.max(prevNodes, info.nodes));
          }

          // Only update lines if we have a PV (principal variation)
          // This prevents showing incomplete data at higher depths
          if (info.multipv && info.pv && info.pv.length > 0) {
            setLines((prevLines) => {
              const newLines = [...prevLines];
              const lineIndex = info.multipv - 1;
              newLines[lineIndex] = info;
              return newLines;
            });
          }
        });
      }
    } catch (error) {
      console.error('Engine analysis error:', error);
      controlStateRef.current.isAnalyzing = false;
      if (controlStateRef.current.cleanupHandler) {
        controlStateRef.current.cleanupHandler();
        controlStateRef.current.cleanupHandler = null;
      }
    }
  };

  // Handle FEN changes with debouncing
  useEffect(() => {
    if (!isActive || !fen) return;

    // Clear any pending debounced analysis
    if (controlStateRef.current.debounceTimer) {
      clearTimeout(controlStateRef.current.debounceTimer);
    }

    // Store the pending analysis parameters
    analysisStateRef.current.pendingAnalysis = { fen, numLines, memory };

    // ASM engine: no debounce for more responsive UI
    const debounceTime = isASM ? 0 : 20;

    controlStateRef.current.debounceTimer = setTimeout(() => {
      const pending = analysisStateRef.current.pendingAnalysis;
      if (pending && controlStateRef.current.isMounted) {
        startAnalysis(pending.fen, pending.numLines, pending.memory);
      }
    }, debounceTime);

    return () => {
      if (controlStateRef.current.debounceTimer) {
        clearTimeout(controlStateRef.current.debounceTimer);
      }
    };
  }, [fen, isActive]);

  useEffect(() => {
    if (!isActive || !engine || !engine.isReady || !analysisStateRef.current.currentFen) return;

    // Only restart if settings actually changed
    const settingsChanged =
      analysisStateRef.current.currentSettings.numLines !== numLines ||
      analysisStateRef.current.currentSettings.memory !== memory;

    if (settingsChanged && controlStateRef.current.isAnalyzing) {
      // Immediately restart analysis with new settings
      startAnalysis(analysisStateRef.current.currentFen, numLines, memory);
    }
  }, [numLines, memory, engine, isActive]);

  // Handle active state changes
  useEffect(() => {
    const handleActiveChange = async () => {
      if (!engine || !engine.isReady) return;

      if (!isActive) {
        // Stop analysis and clear state
        if (controlStateRef.current.debounceTimer) {
          clearTimeout(controlStateRef.current.debounceTimer);
          controlStateRef.current.debounceTimer = null;
        }

        if (controlStateRef.current.isAnalyzing) {
          await engine.stop();
          controlStateRef.current.isAnalyzing = false;
        }

        setLines([]);
        setSharedNodes(0);
        analysisStateRef.current.currentFen = null;
      } else if (fen) {
        // Reactivated - start analysis
        startAnalysis(fen, numLines, memory);
      }
    };

    handleActiveChange();
  }, [isActive, engine]);

  // Cleanup on unmount
  useEffect(() => {
    controlStateRef.current.isMounted = true;

    return () => {
      controlStateRef.current.isMounted = false;

      if (controlStateRef.current.debounceTimer) {
        clearTimeout(controlStateRef.current.debounceTimer);
      }

      // Clean up handler
      if (controlStateRef.current.cleanupHandler) {
        controlStateRef.current.cleanupHandler();
        controlStateRef.current.cleanupHandler = null;
      }

      if (controlStateRef.current.isAnalyzing && engine) {
        engine.stop().catch(() => {});
        controlStateRef.current.isAnalyzing = false;
      }
    };
  }, [engine]);

  return { lines, sharedNodes };
};

export default useEngineAnalysis;
