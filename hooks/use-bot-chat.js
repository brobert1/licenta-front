import { getMessage } from '@constants/bot-messages';
import { useThinkingTimer } from '@hooks';
import { useEffect, useRef, useState } from 'react';

const useBotChat = ({ history, playerColor, gameWinner, isUserTurn }) => {
  const [currentMessage, setCurrentMessage] = useState(null);
  const prevHistoryLengthRef = useRef(0);
  const usedMessagesRef = useRef(new Set());

  const triggerMessage = (triggerType) => {
    const message = getMessage(triggerType, usedMessagesRef.current);
    if (message) {
      usedMessagesRef.current.add(message);
      setCurrentMessage(message);
    }
  };

  useThinkingTimer({
    isActive: !gameWinner && isUserTurn,
    onThinkingShort: () => triggerMessage('THINKING_15S'),
    onThinkingLong: () => triggerMessage('THINKING_61S'),
  });

  useEffect(() => {
    const currentLength = history.length;
    const prevLength = prevHistoryLengthRef.current;

    // Trigger game start message on first move
    if (currentLength === 1 && prevLength === 0) {
      triggerMessage('GAME_START');
    }

    // Process move-related messages when a new move is added
    if (currentLength > prevLength && currentLength > 0) {
      const lastMove = history[currentLength - 1];
      // Determine if the move was made by the bot by comparing move color with player color
      const playerColorCode = playerColor === 'white' ? 'w' : 'b';
      const wasMoveByBot = lastMove.color !== playerColorCode;

      if (wasMoveByBot && lastMove.captured) {
        triggerMessage('BOT_CAPTURES');
      }

      if (lastMove.flags.includes('k') || lastMove.flags.includes('q')) {
        triggerMessage('CASTLING');
      }

      if (wasMoveByBot && lastMove.piece === 'p') {
        const threatRank = playerColor === 'white' ? '2' : '7';
        if (lastMove.to[1] === threatRank) {
          triggerMessage('PAWN_THREAT');
        }
      }

      if (wasMoveByBot && lastMove.san?.includes('+')) {
        triggerMessage('BOT_CHECKS');
      }
    }

    prevHistoryLengthRef.current = currentLength;
  }, [history, playerColor]);

  useEffect(() => {
    if (!gameWinner) return;

    switch (gameWinner) {
      case 'You':
        triggerMessage('USER_WINS');
        break;
      case 'Draw':
        triggerMessage('DRAW');
        break;
      default:
        triggerMessage('USER_LOSES');
    }
  }, [gameWinner]);

  return { currentMessage };
};

export default useBotChat;
