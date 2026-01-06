import { useQuery } from '@hooks';
import { createContext, useCallback, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { store } from '@auth';

const MultiplayerContext = createContext();

export const MultiplayerProvider = ({ children }) => {
  const { data: me } = useQuery('/client/account');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [inQueue, setInQueue] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [playerColor, setPlayerColor] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [matchFound, setMatchFound] = useState(false);
  const socketRef = useRef(null);
  const [token, setToken] = useState(null);
  const [whiteTime, setWhiteTime] = useState(null);
  const [blackTime, setBlackTime] = useState(null);

  // Subscribe to store changes to get token when it becomes available
  useEffect(() => {
    const currentToken = store.getState();
    if (currentToken) {
      setToken(currentToken);
    }

    const unsubscribe = store.subscribe(() => {
      const newToken = store.getState();
      setToken(newToken);
    });

    return () => unsubscribe();
  }, []);

  // Initialize socket connection
  useEffect(() => {
    if (!me || !token) return;

    const socketUrl = process.env.API_BASE_URL || 'http://localhost:9000';
    const newSocket = io(socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      withCredentials: true,
      path: '/socket.io',
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('connect_error', () => {
      setIsConnected(false);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Queue events
    newSocket.on('queueJoined', () => {
      setInQueue(true);
    });

    newSocket.on('queueLeft', () => {
      setInQueue(false);
    });

    newSocket.on('queueError', () => {
      setInQueue(false);
    });

    // Game events
    newSocket.on('gameStart', ({ gameId, color, opponent: opponentData, timeControl, fen }) => {
      setInQueue(false);
      setPlayerColor(color);
      setOpponent(opponentData);
      setMatchFound(true);

      // Initialize time from time control (initial is in seconds, store as milliseconds)
      setWhiteTime(timeControl.initial * 1000);
      setBlackTime(timeControl.initial * 1000);

      // Play animation for 3 seconds before showing the game board
      setTimeout(() => {
        setMatchFound(false);
        setActiveGame({
          _id: gameId,
          timeControl,
          fen,
          status: 'active',
        });
      }, 3000);
    });

    newSocket.on('moveMade', ({ fen, pgn, whiteTime, blackTime, gameOver, result, lastMove }) => {
      // Update time from server
      if (whiteTime !== undefined) setWhiteTime(whiteTime);
      if (blackTime !== undefined) setBlackTime(blackTime);

      setActiveGame((prev) => ({
        ...prev,
        fen,
        pgn,
        whiteTime,
        blackTime,
        gameOver,
        result,
        lastMove,
      }));

      if (gameOver) {
        setGameResult(result);
      }
    });

    newSocket.on('gameOver', ({ result }) => {
      setActiveGame((prev) => ({
        ...prev,
        status: 'completed',
        result,
      }));
      setGameResult(result);
    });

    newSocket.on('drawOffered', () => {
      // Will be handled by UI component
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [me, token]);

  const joinQueue = useCallback(
    (timeControl) => {
      if (socket && isConnected) {
        socket.emit('joinQueue', { timeControl });
      }
    },
    [socket, isConnected]
  );

  const leaveQueue = useCallback(() => {
    if (socket && isConnected) {
      socket.emit('leaveQueue');
      setInQueue(false);
    }
  }, [socket, isConnected]);

  const makeMove = useCallback(
    (move) => {
      if (socket && isConnected && activeGame) {
        // Convert move to simple serializable format (chess.js moves may contain BigInt)
        const simpleMove = {
          from: move.from,
          to: move.to,
          promotion: move.promotion,
        };
        socket.emit('makeMove', {
          gameId: activeGame._id,
          move: simpleMove,
        });
      }
    },
    [socket, isConnected, activeGame]
  );

  const resign = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('gameAction', {
        gameId: activeGame._id,
        action: 'resign',
      });
    }
  }, [socket, isConnected, activeGame]);

  const offerDraw = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('gameAction', {
        gameId: activeGame._id,
        action: 'offerDraw',
      });
    }
  }, [socket, isConnected, activeGame]);

  const acceptDraw = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('gameAction', {
        gameId: activeGame._id,
        action: 'acceptDraw',
      });
    }
  }, [socket, isConnected, activeGame]);

  const reportTimeout = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('timeout', {
        gameId: activeGame._id,
      });
    }
  }, [socket, isConnected, activeGame]);

  const reset = useCallback(() => {
    setActiveGame(null);
    setOpponent(null);
    setPlayerColor(null);
    setGameResult(null);
    setInQueue(false);
    setMatchFound(false);
    setWhiteTime(null);
    setBlackTime(null);
  }, []);

  const value = {
    socket,
    isConnected,
    inQueue,
    activeGame,
    opponent,
    playerColor,
    gameResult,
    matchFound,
    whiteTime,
    blackTime,
    joinQueue,
    leaveQueue,
    makeMove,
    resign,
    offerDraw,
    acceptDraw,
    reportTimeout,
    reset,
  };

  return <MultiplayerContext.Provider value={value}>{children}</MultiplayerContext.Provider>;
};

export const useMultiplayerContext = () => {
  const context = useContext(MultiplayerContext);
  if (!context) {
    throw new Error('useMultiplayerContext must be used within a MultiplayerProvider');
  }
  return context;
};
