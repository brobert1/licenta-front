import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useQuery } from '@hooks';
import { useEffect, useRef, useState } from 'react';
import { classnames } from '@lib';

const GameChat = () => {
  const {
    messages,
    sendMessage,
    activeGame,
    chatStatus, // 'initial', 'pending', 'active', 'rejected'
    chatRequestedBy, // 'white' or 'black'
    playerColor, // 'white' or 'black'
    acceptChat,
    declineChat,
  } = useMultiplayerContext();

  const { data: me } = useQuery('/client/account');
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll logic
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatStatus]); // Also scroll when status changes (e.g., chat becomes active showing history)

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed && trimmed.length <= 200) {
      sendMessage(trimmed);
      setInputValue('');
      // If status was initial, it will switch to pending, handled by context update
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

  // Render content based on chatStatus
  const renderContent = () => {
    // 1. Initial State: Empty state encouraging to start chat
    if (chatStatus === 'initial') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3 opacity-60">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
            <i className="fas fa-comments text-2xl text-white/50"></i>
          </div>
          <p className="text-sm text-neutral-300">Start a conversation with your opponent.</p>
          <p className="text-xs text-neutral-500">
            They will need to accept your request to reply.
          </p>
        </div>
      );
    }

    // 2. Pending State
    if (chatStatus === 'pending') {
      const isMyRequest = chatRequestedBy === playerColor;

      if (isMyRequest) {
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="flex flex-col items-end opacity-70">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-2 bg-white/10 text-white backdrop-blur-md border border-white/5">
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-1 mr-1">Request Pending...</span>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center mt-8 space-y-2 animate-pulse">
                <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
                <p className="text-xs text-primary/80 font-medium">
                  Waiting for opponent to accept...
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-6 animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse-slow"></div>
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center border border-white/10">
                <i className="fas fa-comment-dots text-2xl text-white"></i>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg tracking-wide">Chat Request</h3>
              <p className="text-sm text-neutral-400 mt-2 max-w-[200px] mx-auto leading-relaxed">
                Your opponent would like to start a conversation.
              </p>
            </div>
            <div className="flex gap-3 w-full max-w-xs pt-2">
              <button
                onClick={declineChat}
                className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white text-sm font-semibold transition-all border border-neutral-700/50 hover:border-neutral-600"
              >
                Decline
              </button>
              <button
                onClick={acceptChat}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-bold transition-all hover:scale-[1.02] border border-white/10"
              >
                Accept
              </button>
            </div>
          </div>
        );
      }
    }
    if (chatStatus === 'rejected') {
      const isMyRequest = chatRequestedBy === playerColor;
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
            <i className="fas fa-comment-slash text-2xl text-red-400/50"></i>
          </div>
          <p className="text-sm text-neutral-400">
            {isMyRequest ? 'Opponent declined your request.' : 'You declined the chat request.'}
          </p>
          <p className="text-xs text-neutral-600">Chat is disabled for this game.</p>
        </div>
      );
    }
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg, index) => {
          const own = isOwnMessage(msg.sender);
          return (
            <div
              key={index}
              className={`flex flex-col ${own ? 'items-end' : 'items-start'} animate-fade-in-up`}
            >
              <div
                className={classnames(
                  'max-w-[85%] px-4 py-2.5 shadow-sm backdrop-blur-sm',
                  own
                    ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl rounded-tr-sm'
                    : 'bg-neutral-800/80 border border-white/5 text-neutral-100 rounded-2xl rounded-tl-sm'
                )}
              >
                {!own && (
                  <p className="text-[10px] text-primary-light/80 font-bold mb-0.5 tracking-wide uppercase">
                    {msg.senderName}
                  </p>
                )}
                <p className="text-sm leading-relaxed break-words">{msg.content}</p>
              </div>
              <span className="text-[10px] text-neutral-500 mt-1 px-1 font-medium">
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
    <div className="flex flex-col h-full bg-secondary">
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/img/noise.png')] pointer-events-none"></div>
        {renderContent()}
      </div>

      {showInput && (
        <form onSubmit={handleSubmit} className="p-3 bg-secondary border-t border-neutral-700">
          <div className="relative group">
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
              className="w-full bg-neutral-800 text-white text-sm rounded-lg pl-4 pr-12 py-3 focus:outline-none transition-colors placeholder-neutral-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white disabled:opacity-0 disabled:scale-75 transition-all duration-200"
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 px-1">
            <span className="text-[10px] text-neutral-500 flex items-center gap-1">
              {chatStatus === 'active' && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              )}
              {chatStatus === 'active' ? 'Live Chat' : 'Encrypted • Private'}
            </span>
            <span className="text-[10px] text-neutral-600">{inputValue.length}/200</span>
          </div>
        </form>
      )}
    </div>
  );
};

export default GameChat;
