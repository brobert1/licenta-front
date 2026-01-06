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
  const [eloChange, setEloChange] = useState(null);
  const [matchFound, setMatchFound] = useState(false);
  const socketRef = useRef(null);
  const [token, setToken] = useState(null);
  const [whiteTime, setWhiteTime] = useState(null);
  const [blackTime, setBlackTime] = useState(null);
  // Draw offer state: 'none' | 'sent' | 'received' | 'declined'
  const [drawOfferState, setDrawOfferState] = useState('none');
  const [drawCooldown, setDrawCooldown] = useState(0); // Timestamp when cooldown ends
  const [resignPending, setResignPending] = useState(false);
  // Chat state
  const [messages, setMessages] = useState([]);
  const [chatStatus, setChatStatus] = useState('initial'); // initial, pending, active, rejected
  const [chatRequestedBy, setChatRequestedBy] = useState(null);
  const [unreadChatCount, setUnreadChatCount] = useState(0);

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
    newSocket.on(
      'gameStart',
      ({
        gameId,
        color,
        opponent: opponentData,
        timeControl,
        fen,
        chatStatus,
        chatRequestedBy,
      }) => {
        setInQueue(false);
        setPlayerColor(color);
        setOpponent(opponentData);
        setMatchFound(true);

        // Initialize chat
        setChatStatus(chatStatus || 'initial');
        setChatRequestedBy(chatRequestedBy || null);

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
      }
    );

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

    newSocket.on('gameOver', ({ result, eloChange }) => {
      setActiveGame((prev) => ({
        ...prev,
        status: 'completed',
        result,
      }));
      setGameResult(result);
      setEloChange(eloChange);
    });

    newSocket.on('drawOffered', () => {
      setDrawOfferState('received');
    });

    newSocket.on('drawDeclined', () => {
      setDrawOfferState('declined');
      // Auto-clear after 3 seconds
      setTimeout(() => setDrawOfferState('none'), 3000);
    });

    // Chat events
    newSocket.on('messageReceived', (messageData) => {
      setMessages((prev) => [...prev, messageData]);
      setUnreadChatCount((prev) => prev + 1);
    });

    newSocket.on('chatRequest', ({ requestedBy }) => {
      setChatStatus('pending');
      setChatRequestedBy(requestedBy);
    });

    newSocket.on('chatActive', () => {
      setChatStatus('active');
    });

    newSocket.on('chatRejected', () => {
      setChatStatus('rejected');
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

  // Resign flow: first show confirmation, then actually resign
  const confirmResign = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('gameAction', {
        gameId: activeGame._id,
        action: 'resign',
      });
      setResignPending(false);
    }
  }, [socket, isConnected, activeGame]);

  const cancelResign = useCallback(() => {
    setResignPending(false);
  }, []);

  const offerDraw = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('gameAction', {
        gameId: activeGame._id,
        action: 'offerDraw',
      });
      setDrawOfferState('sent');
      // Set cooldown for 60 seconds
      setDrawCooldown(Date.now() + 60000);
    }
  }, [socket, isConnected, activeGame]);

  const acceptDraw = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('gameAction', {
        gameId: activeGame._id,
        action: 'acceptDraw',
      });
      setDrawOfferState('none');
    }
  }, [socket, isConnected, activeGame]);

  const declineDraw = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('gameAction', {
        gameId: activeGame._id,
        action: 'declineDraw',
      });
      setDrawOfferState('none');
    }
  }, [socket, isConnected, activeGame]);

  const reportTimeout = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('timeout', {
        gameId: activeGame._id,
      });
    }
  }, [socket, isConnected, activeGame]);

  const sendMessage = useCallback(
    (message) => {
      if (socket && isConnected && activeGame) {
        socket.emit('sendMessage', {
          gameId: activeGame._id,
          message,
        });
        // Optimistically update status if this is the first message (triggering request)
        if (chatStatus === 'initial') {
          setChatStatus('pending');
          setChatRequestedBy(playerColor);
        }
      }
    },
    [socket, isConnected, activeGame, chatStatus, playerColor]
  );

  const acceptChat = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('chatAction', {
        gameId: activeGame._id,
        action: 'accept',
      });
      setChatStatus('active');
    }
  }, [socket, isConnected, activeGame]);

  const declineChat = useCallback(() => {
    if (socket && isConnected && activeGame) {
      socket.emit('chatAction', {
        gameId: activeGame._id,
        action: 'decline',
      });
      setChatStatus('rejected');
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
    setDrawOfferState('none');
    setDrawCooldown(0);
    setResignPending(false);
    setEloChange(null);
    setMessages([]);
    setChatStatus('initial');
    setChatRequestedBy(null);
    setUnreadChatCount(0);
  }, []);

  const markChatRead = useCallback(() => {
    setUnreadChatCount(0);
  }, []);

  const value = {
    socket,
    isConnected,
    inQueue,
    activeGame,
    opponent,
    playerColor,
    gameResult,
    eloChange,
    matchFound,
    whiteTime,
    blackTime,
    joinQueue,
    leaveQueue,
    makeMove,
    offerDraw,
    acceptDraw,
    declineDraw,
    reportTimeout,
    drawOfferState,
    drawCooldown,
    resignPending,
    setResignPending,
    confirmResign,
    cancelResign,
    reset,
    // Chat
    messages,
    sendMessage,
    chatStatus,
    chatRequestedBy,
    acceptChat,
    declineChat,
    unreadChatCount,
    markChatRead,
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
