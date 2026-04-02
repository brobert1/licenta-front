'use client';

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

  const isOwnMessage = (senderId) => me?._id === senderId;

  if (!activeGame) return null;

  const renderContent = () => {
    if (chatStatus === 'initial') {
      return (
        <div className="flex min-h-0 flex-1 flex-col p-3">
          <div className="rounded-lg border border-border bg-secondary p-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface border border-border">
                <i className="fas fa-comments text-lg text-muted"></i>
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-semibold text-primary">Game chat</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Send a message to request a conversation. Your opponent must accept before you can keep chatting.
                </p>
              </div>
            </div>
          </div>
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
                  <div className="max-w-sm rounded-2xl rounded-tr-sm border border-accent/40 bg-accent/10 px-4 py-2">
                    <p className="text-sm text-primary">{msg.content}</p>
                  </div>
                  <span className="mt-1 mr-1 text-xs text-muted">Request pending…</span>
                </div>
              ))}
              <div className="mt-8 flex flex-col items-center justify-center space-y-2">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent"></div>
                <p className="text-xs font-medium text-muted">Waiting for opponent to accept…</p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="flex min-h-0 flex-1 flex-col p-3">
          <div className="rounded-lg border border-accent/25 bg-accent/5 p-4 shadow-sm">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                <i className="fas fa-comment-dots text-lg text-accent"></i>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-semibold text-primary">Chat request</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Your opponent would like to start a conversation.
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={declineChat}
                className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border bg-surface py-2 px-3 text-sm font-semibold text-primary transition-colors hover:bg-tertiary"
              >
                <i className="fas fa-times text-xs opacity-70"></i>
                Decline
              </button>
              <button
                type="button"
                onClick={acceptChat}
                className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-transparent bg-accent py-2 px-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                <i className="fas fa-check text-xs"></i>
                Accept
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (chatStatus === 'rejected') {
      const isMyRequest = chatRequestedBy === playerColor;
      return (
        <div className="flex min-h-0 flex-1 flex-col p-3">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
                <i className="fas fa-comment-slash text-lg text-red-500"></i>
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-semibold text-red-900">Chat unavailable</p>
                <p className="mt-1 text-xs leading-relaxed text-red-800">
                  {isMyRequest ? 'Your opponent declined the chat request.' : 'You declined the chat request.'}{' '}
                  Chat stays off for this game.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, index) => {
          const own = isOwnMessage(msg.sender);
          return (
            <div key={index} className={classnames('flex flex-col', own ? 'items-end' : 'items-start')}>
              <div
                className={classnames(
                  'max-w-sm rounded-2xl border px-4 py-2.5 shadow-sm',
                  own
                    ? 'rounded-tr-sm border-accent/50 bg-accent/15 text-primary'
                    : 'rounded-tl-sm border-border bg-secondary text-primary'
                )}
              >
                {!own && (
                  <p className="mb-0.5 text-xs font-bold uppercase tracking-wide text-accent">
                    {msg.senderName}
                  </p>
                )}
                <p className="break-words text-sm leading-relaxed">{msg.content}</p>
              </div>
              <span className="mt-1 px-1 text-xs font-medium text-muted">{formatTime(msg.timestamp)}</span>
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
    <div className="flex h-full min-h-0 flex-col bg-surface">
      <div className="relative min-h-0 flex-1 overflow-hidden">{renderContent()}</div>

      {showInput && (
        <form onSubmit={handleSubmit} className="border-t border-border bg-secondary p-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={chatStatus === 'initial' ? 'Type to send request…' : 'Type a message…'}
              maxLength={200}
              className="w-full rounded-lg border border-border bg-surface py-3 pl-4 pr-12 text-sm text-primary transition-colors placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-accent/15 text-accent transition-all duration-200 hover:bg-accent hover:text-white disabled:scale-75 disabled:opacity-0"
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between px-1">
            <span className="flex items-center gap-1 text-xs text-muted">
              {chatStatus === 'active' && (
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600"></span>
              )}
              {chatStatus === 'active' ? 'Live chat' : 'Private'}
            </span>
            <span className="text-xs text-muted">{inputValue.length}/200</span>
          </div>
        </form>
      )}
    </div>
  );
};

export default GameChat;
