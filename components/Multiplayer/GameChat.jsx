import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useQuery } from '@hooks';
import { classnames } from '@lib';
import { useEffect, useRef, useState } from 'react';

const GameChat = () => {
  const {
    messages,
    sendMessage,
    activeGame,
    chatStatus,
    chatRequestedBy,
    playerColor,
    acceptChat,
    declineChat,
  } = useMultiplayerContext();

  const { data: me } = useQuery('/client/account');
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed && trimmed.length <= 200) {
      sendMessage(trimmed);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isOwnMessage = (senderId) => {
    return me?._id === senderId;
  };

  if (!activeGame) return null;

  const renderContent = () => {
    if (chatStatus === 'initial') {
      return (
        <div className="flex h-full flex-col items-center justify-center space-y-3 p-6 text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gameplay-elevated border border-black/10">
            <i className="fas fa-comments text-2xl text-secondary-muted"></i>
          </div>
          <p className="font-landing text-sm text-on-surface">Start a conversation with your opponent.</p>
          <p className="font-landing text-xs text-secondary-muted">
            They will need to accept your request to reply.
          </p>
        </div>
      );
    }

    if (chatStatus === 'pending') {
      const isMyRequest = chatRequestedBy === playerColor;

      if (isMyRequest) {
        return (
          <div className="flex h-full flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto p-3">
              {messages.map((msg, index) => (
                <div key={index} className="flex flex-col items-end opacity-90">
                  <div className="max-w-sm rounded-2xl rounded-tr-sm border border-tertiary-container/40 bg-tertiary-container/15 px-4 py-2">
                    <p className="font-landing text-sm text-on-surface">{msg.content}</p>
                  </div>
                  <span className="mt-1 mr-1 font-landing text-xs text-secondary-muted">
                    Request Pending...
                  </span>
                </div>
              ))}
              <div className="mt-8 flex flex-col items-center justify-center space-y-2">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gameplay-control border-t-tertiary-container"></div>
                <p className="font-landing text-xs font-medium text-secondary-muted">
                  Waiting for opponent to accept...
                </p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="flex h-full flex-col items-center justify-center space-y-6 p-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-gameplay-elevated">
            <i className="fas fa-comment-dots text-2xl text-tertiary-container"></i>
          </div>
          <div>
            <h3 className="font-landing text-lg font-bold text-on-surface">Chat Request</h3>
            <p className="mx-auto mt-2 max-w-xs font-landing text-sm leading-relaxed text-secondary-muted">
              Your opponent would like to start a conversation.
            </p>
          </div>
          <div className="flex w-full max-w-xs gap-3 pt-2">
            <button
              type="button"
              onClick={declineChat}
              className="flex-1 rounded-xl border border-black/10 bg-gameplay-control py-2.5 px-4 font-landing text-sm font-semibold text-on-surface transition-colors hover:bg-gameplay-elevated"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={acceptChat}
              className="flex-1 rounded-xl border border-black/10 bg-tertiary-container py-2.5 px-4 font-landing text-sm font-bold text-on-surface transition-colors hover:opacity-90"
            >
              Accept
            </button>
          </div>
        </div>
      );
    }

    if (chatStatus === 'rejected') {
      const isMyRequest = chatRequestedBy === playerColor;
      return (
        <div className="flex h-full flex-col items-center justify-center space-y-3 p-6 text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 border border-red-200">
            <i className="fas fa-comment-slash text-2xl text-red-400"></i>
          </div>
          <p className="font-landing text-sm text-secondary-muted">
            {isMyRequest ? 'Opponent declined your request.' : 'You declined the chat request.'}
          </p>
          <p className="font-landing text-xs text-secondary-muted">Chat is disabled for this game.</p>
        </div>
      );
    }

    return (
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, index) => {
          const own = isOwnMessage(msg.sender);
          return (
            <div
              key={index}
              className={classnames(
                'flex flex-col',
                own ? 'items-end' : 'items-start'
              )}
            >
              <div
                className={classnames(
                  'max-w-sm rounded-2xl px-4 py-2.5 shadow-sm border',
                  own
                    ? 'rounded-tr-sm border-tertiary-container/50 bg-tertiary-container/20 text-on-surface'
                    : 'rounded-tl-sm border-black/10 bg-gameplay-elevated text-on-surface'
                )}
              >
                {!own && (
                  <p className="mb-0.5 font-landing text-xs font-bold uppercase tracking-wide text-tertiaryGold">
                    {msg.senderName}
                  </p>
                )}
                <p className="font-landing text-sm leading-relaxed break-words">{msg.content}</p>
              </div>
              <span className="mt-1 px-1 font-landing text-xs font-medium text-secondary-muted">
                {formatTime(msg.timestamp)}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    );
  };

  const showInput =
    chatStatus !== 'rejected' && !(chatStatus === 'pending' && chatRequestedBy !== playerColor);

  return (
    <div className="flex h-full min-h-0 flex-col bg-gameplay">
      <div className="relative min-h-0 flex-1 overflow-hidden">{renderContent()}</div>

      {showInput && (
        <form
          onSubmit={handleSubmit}
          className="border-t border-black/10 bg-gameplay-control p-3"
        >
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                chatStatus === 'initial' ? 'Type to send request...' : 'Type a message...'
              }
              maxLength={200}
              className="w-full rounded-lg border border-black/10 bg-surface-container-lowest py-3 pl-4 pr-12 font-landing text-sm text-on-surface transition-colors placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-tertiary-container/40"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-tertiary-container/15 text-tertiary-container transition-all duration-200 hover:bg-tertiary-container hover:text-on-surface disabled:scale-75 disabled:opacity-0"
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between px-1">
            <span className="flex items-center gap-1 font-landing text-xs text-secondary-muted">
              {chatStatus === 'active' && (
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600"></span>
              )}
              {chatStatus === 'active' ? 'Live Chat' : 'Private'}
            </span>
            <span className="font-landing text-xs text-secondary-muted">{inputValue.length}/200</span>
          </div>
        </form>
      )}
    </div>
  );
};

export default GameChat;
