import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useBotContext } from '@contexts/BotContext';
import { classnames } from '@lib';

const SelectedBot = ({ showInfo = true, message, chrome = 'default' }) => {
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

  const isGameplayChrome = chrome === 'gameplay';
  const rootClass = isGameplayChrome
    ? 'flex flex-col gap-3'
    : 'flex flex-col gap-4 justify-center p-4';
  const bubbleClass = isGameplayChrome
    ? 'p-3 rounded-xl bg-gameplay-elevated border border-black/10 rounded-tl-none w-full max-h-32 overflow-y-auto animate-message-in'
    : 'p-3 rounded-xl bg-tertiary rounded-tl-none shadow-lg w-full max-h-32 overflow-y-auto animate-message-in';

  const avatarClass = isGameplayChrome
    ? 'w-14 h-14 rounded-xl flex-shrink-0'
    : 'w-16 h-16 rounded-md flex-shrink-0';

  return (
    <div className={rootClass}>
      <div className={classnames('flex items-center', isGameplayChrome ? 'gap-3' : 'gap-4')}>
        <img src={generatedAvatarSrc} className={avatarClass} alt="Avatar" />
        <div key={displayMessage} className={bubbleClass}>
          <p className="font-landing text-sm text-on-surface leading-relaxed">{displayMessage}</p>
        </div>
      </div>
      {showInfo && (
        <div className="flex gap-2 items-center">
          <p className="font-landing font-semibold text-base text-on-surface">{selectedBot.name}</p>
          <p className="font-landing text-sm text-grey">{selectedBot.elo}</p>
        </div>
      )}
    </div>
  );
};

export default SelectedBot;
