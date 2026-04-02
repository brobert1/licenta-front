import { classnames } from '@lib';

const GamePreviewChatTranscript = ({ messages, viewerId }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isOwnMessage = (senderId) => String(viewerId) === String(senderId);

  if (!messages?.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <i className="fas fa-comments text-2xl text-muted" aria-hidden />
        <p className="text-sm text-muted">No messages were exchanged in this game.</p>
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
    </div>
  );
};

export default GamePreviewChatTranscript;
