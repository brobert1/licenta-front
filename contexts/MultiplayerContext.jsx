'use client';

import { store } from '@auth';
import { useQuery } from '@hooks';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const senderIdString = (sender) => {
  if (sender == null) return '';
  if (typeof sender === 'object' && sender._id != null) return String(sender._id);
  return String(sender);
};

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
  const [drawOfferState, setDrawOfferState] = useState('none');
  const [drawCooldown, setDrawCooldown] = useState(0);
  const [resignPending, setResignPending] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatStatus, setChatStatus] = useState('initial');
  const [chatRequestedBy, setChatRequestedBy] = useState(null);
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const chatTabActiveRef = useRef(false);
  const [opponentDisconnected, setOpponentDisconnected] = useState(false);
  const [opponentDisconnectTime, setOpponentDisconnectTime] = useState(null);
  const [playersOnline, setPlayersOnline] = useState(0);

  useEffect(() => {
    const currentToken = store.getState();
    if (currentToken) {
      setToken(currentToken);
    }

    const unsubscribe = store.subscribe(() => {
      setToken(store.getState());
    });

    return () => unsubscribe();
  }, []);

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
      newSocket.emit('rejoinGame');
    });

    newSocket.on('connect_error', () => {
      setIsConnected(false);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('queueJoined', () => {
      setInQueue(true);
    });

    newSocket.on('queueLeft', () => {
      setInQueue(false);
    });

    newSocket.on('queueError', () => {
      setInQueue(false);
    });

    newSocket.on(
      'gameStart',
      ({
        gameId,
        publicId,
        color,
        opponent: opponentData,
        timeControl,
        fen,
        chatStatus: startChatStatus,
        chatRequestedBy: startChatRequestedBy,
      }) => {
        setInQueue(false);
        setPlayerColor(color);
        setOpponent(opponentData);
        setMatchFound(true);
        setOpponentDisconnected(false);

        setChatStatus(startChatStatus || 'initial');
        setChatRequestedBy(startChatRequestedBy || null);

        setWhiteTime(timeControl.initial * 1000);
        setBlackTime(timeControl.initial * 1000);

        setTimeout(() => {
          setMatchFound(false);
          setMessages([]);
          setUnreadChatCount(0);
          setActiveGame({
            _id: gameId,
            publicId: publicId || undefined,
            timeControl,
            fen,
            status: 'active',
          });
        }, 3000);
      }
    );

    newSocket.on('moveMade', ({ fen, pgn, whiteTime: wt, blackTime: bt, gameOver, result, lastMove }) => {
      if (wt !== undefined) setWhiteTime(wt);
      if (bt !== undefined) setBlackTime(bt);

      setActiveGame((prev) => ({
        ...prev,
        fen,
        pgn,
        whiteTime: wt,
        blackTime: bt,
        gameOver,
        result,
        lastMove,
      }));

      if (gameOver) {
        setGameResult(result);
      }
    });

    newSocket.on('gameOver', ({ result, eloChange: ec }) => {
      setActiveGame((prev) => ({
        ...prev,
        status: 'completed',
        result,
      }));
      setGameResult(result);
      setEloChange(ec);
    });

    newSocket.on('drawOffered', () => {
      setDrawOfferState('received');
    });

    newSocket.on('drawDeclined', () => {
      setDrawOfferState('declined');
      setTimeout(() => setDrawOfferState('none'), 3000);
    });

    newSocket.on(
      'gameRejoined',
      ({
        gameId,
        publicId,
        color,
        opponent: opponentData,
        timeControl,
        fen,
        pgn,
        whiteTime: wt,
        blackTime: bt,
        lastMove,
        chatStatus: gameChatStatus,
        chatRequestedBy: gameChatRequestedBy,
      }) => {
        setInQueue(false);
        setMatchFound(false);
        setPlayerColor(color);
        setOpponent(opponentData);
        setOpponentDisconnected(false);

        setChatStatus(gameChatStatus || 'initial');
        setChatRequestedBy(gameChatRequestedBy || null);

        setWhiteTime(wt);
        setBlackTime(bt);

        setMessages([]);
        setUnreadChatCount(0);

        setActiveGame({
          _id: gameId,
          publicId: publicId || undefined,
          timeControl,
          fen,
          pgn,
          status: 'active',
          lastMove,
        });
      }
    );

    newSocket.on('noActiveGame', () => {
      setMatchFound(false);
      setActiveGame(null);
      setOpponent(null);
      setPlayerColor(null);
      setGameResult(null);
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
      chatTabActiveRef.current = false;
      setOpponentDisconnected(false);
      setOpponentDisconnectTime(null);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('multiplayer-no-active-game'));
      }
    });

    newSocket.on('playersOnline', (count) => {
      setPlayersOnline(count);
    });

    newSocket.on('opponentDisconnected', ({ gracePeriod }) => {
      setOpponentDisconnected(true);
      setOpponentDisconnectTime(Date.now() + gracePeriod);
    });

    newSocket.on('opponentReconnected', () => {
      setOpponentDisconnected(false);
      setOpponentDisconnectTime(null);
    });

    newSocket.on('messageReceived', (messageData) => {
      setMessages((prev) => [...prev, messageData]);
      if (messageData.replay) return;
      if (!me?._id) return;
      const fromOpponent = senderIdString(messageData.sender) !== String(me._id);
      if (!fromOpponent || chatTabActiveRef.current) return;
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
    chatTabActiveRef.current = false;
    setOpponentDisconnected(false);
    setOpponentDisconnectTime(null);
  }, []);

  const markChatRead = useCallback(() => {
    setUnreadChatCount(0);
  }, []);

  const setChatTabActive = useCallback((active) => {
    chatTabActiveRef.current = active;
  }, []);

  const value = {
    socket,
    isConnected,
    playersOnline,
    inQueue,
    activeGame,
    opponent,
    playerColor,
    gameResult,
    eloChange,
    matchFound,
    whiteTime,
    blackTime,
    opponentDisconnected,
    opponentDisconnectTime,
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
    setChatTabActive,
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
