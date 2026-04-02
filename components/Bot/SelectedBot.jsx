import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useBotContext } from '@contexts/BotContext';

const SelectedBot = ({ showInfo = true, message }) => {
  const { selectedBot } = useBotContext();

  const generateMemojiAvatar = (name) => {
    const avatar = createAvatar(avataaars, {
      seed: name,
      size: 64,
      backgroundColor: ['404040'],
    });

    return avatar.toDataUri();
  };

  const generatedAvatarSrc = generateMemojiAvatar(selectedBot.name);
  const displayMessage = message || selectedBot.message;

  return (
    <div className="flex flex-col gap-4 justify-center p-4">
      <div className="flex gap-4 items-center">
        <img src={generatedAvatarSrc} className="w-16 h-16 rounded-md flex-shrink-0" alt="Avatar" />
        <div
          key={displayMessage}
          className="p-3 rounded-xl bg-secondary rounded-tl-none shadow-sm w-full max-h-32 overflow-y-auto animate-message-in"
        >
          <p className="text-primary text-sm font-medium">{displayMessage}</p>
        </div>
      </div>
      {showInfo && (
        <div className="flex gap-2 items-center">
          <p className="text-primary font-semibold text-base">{selectedBot.name}</p>
          <p className="text-muted">{selectedBot.elo}</p>
        </div>
      )}
    </div>
  );
};

export default SelectedBot;
