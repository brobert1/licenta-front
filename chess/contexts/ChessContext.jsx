import { constants } from 'next-chessground';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { parseFen } from '../functions';

const ChessContext = createContext();

export const ChessProvider = ({ children, fen, resetKey }) => {
  const defaultFen = fen || constants.initialFen;
  const defaultTurn = parseFen(defaultFen)?.activeColor || 'w';

  const [initialFen, setInitialFen] = useState(defaultFen);
  const [currentFen, setCurrentFen] = useState(defaultFen);
  const [initialTurn, setInitialTurn] = useState(defaultTurn);
  const [currentTurn, setCurrentTurn] = useState(defaultTurn);
  const [isUserTurn, setIsUserTurn] = useState(true);

  // Declared here so resetGameState can reference their setters below.
  const [history, setHistory] = useState([]);
  const [pgn, setPgn] = useState('');

  const resetGameState = useCallback((nextFen = constants.initialFen) => {
    const resolvedFen = nextFen || constants.initialFen;
    const resolvedTurn = parseFen(resolvedFen)?.activeColor || 'w';

    setInitialFen(resolvedFen);
    setCurrentFen(resolvedFen);
    setInitialTurn(resolvedTurn);
    setCurrentTurn(resolvedTurn);
    setHistory([]);
    setPgn('');
  }, []);

  // Sync context when a provider-level starting FEN is supplied
  useEffect(() => {
    if (!fen) return;

    const nextTurn = parseFen(fen)?.activeColor || 'w';
    setInitialFen(fen);
    setCurrentFen(fen);
    setInitialTurn(nextTurn);
    setCurrentTurn(nextTurn);
  }, [fen]);

  // Check if it's the user's turn
  useEffect(() => {
    setIsUserTurn(() => currentTurn === initialTurn);
  }, [currentTurn, initialTurn]);

  // Reset all state when chapter changes (resetKey), skipping the initial mount
  const isFirstResetRef = useRef(true);
  useEffect(() => {
    if (isFirstResetRef.current) {
      isFirstResetRef.current = false;
      return;
    }
    resetGameState(fen || constants.initialFen);
  }, [resetKey]);

  // Add a move to history and update PGN
  const saveHistory = (chess) => {
    setCurrentFen(chess.fen());
    setCurrentTurn(chess.turn());
    setHistory(chess.history({ verbose: true }));
    setPgn(chess.pgn());
  };

  const value = {
    initialFen,
    initialTurn,
    currentFen,
    isUserTurn,
    history,
    pgn,
    resetGameState,
    setHistory,
    setPgn,
    saveHistory,
  };

  return <ChessContext.Provider value={value}>{children}</ChessContext.Provider>;
};

export const useChessContext = () => {
  const context = useContext(ChessContext);
  if (!context) {
    throw new Error('useChessContext must be used within a ChessProvider');
  }
  return context;
};
