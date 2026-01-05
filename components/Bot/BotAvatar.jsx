import { useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { classnames } from '@lib';

const BotAvatar = ({ alt = 'Bot Avatar', name = 'Bot', elo, onClick, isSelected = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Generate memoji-style avatar using DiceBear
  const generateMemojiAvatar = (name) => {
    const avatar = createAvatar(avataaars, {
      seed: name,
      size: 64,
      backgroundColor: ['404040'],
    });

    return avatar.toDataUri();
  };

  const avatarSrc = generateMemojiAvatar(name);

  return (
    <div className="relative">
      <div
        className={classnames(
          'flex items-center justify-center aspect-square rounded-md cursor-pointer border-2 transition-all duration-200 overflow-hidden',
          isSelected && 'border-blue-500',
          !isSelected && 'border-transparent hover:border-accent'
        )}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <img src={avatarSrc} className="w-full h-full object-cover" alt={alt} />
      </div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 mb-2 z-50 animate-tooltip-appear">
          <div className="bg-primary flex gap-1 items-center text-white px-3 py-2 rounded-md shadow-lg text-xs whitespace-nowrap">
            <div className="font-semibold">{name}</div>
            {elo && <div className="text-gray-300">({elo})</div>}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-2 h-2 bg-primary rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotAvatar;
