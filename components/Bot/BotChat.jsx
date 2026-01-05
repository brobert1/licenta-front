import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

const BotChat = ({ 
  message = "I'll try to make this a fun game for both of us!",
  botName = "Jaguaru",
  botRating = "1200"
}) => {
  
  const generateMemojiAvatar = (name) => {
    const avatar = createAvatar(avataaars, {
      seed: name, 
      size: 64,
      backgroundColor: ['404040'], 
    });
    
    return avatar.toDataUri(); // Return as data URI for immediate use
  };

  const avatarSrc = generateMemojiAvatar(botName);

  return (
    <div className="flex flex-col gap-4 justify-center rounded-md">
      <div className="flex gap-4 items-center justify-center">
        <img
          src={avatarSrc}
          className="w-16 h-16 rounded-md"
          alt="Avatar"
        />
        <div className="p-3 rounded-xl bg-tertiary rounded-tl-none shadow-lg">
          <p className="text-white text-sm">
            {message}
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-white font-semibold text-base">{botName}</p>
        <p className="text-gray-300">{botRating}</p>
      </div>
    </div>
  );
};

export default BotChat;
