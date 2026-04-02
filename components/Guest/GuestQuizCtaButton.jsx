import { Button } from '@components';
import { useState } from 'react';

const SHADOW = '0 5px 0 #9e3830, 0 8px 20px rgba(158,56,48,0.35)';
const SHADOW_HOVER = '0 7px 0 #9e3830, 0 12px 28px rgba(158,56,48,0.4)';
const SHADOW_ACTIVE = '0 2px 0 #9e3830, 0 4px 10px rgba(158,56,48,0.3)';

const GuestQuizCtaButton = ({ children, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const shadow = pressed ? SHADOW_ACTIVE : hovered ? SHADOW_HOVER : SHADOW;
  const translate = pressed ? 'translateY(3px)' : hovered ? 'translateY(-2px)' : 'translateY(0)';

  return (
    <Button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => {
        setPressed(false);
        setHovered(false);
      }}
      style={{ boxShadow: shadow, transform: translate }}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 font-bold text-white transition-all duration-100"
    >
      {children}
    </Button>
  );
};

export default GuestQuizCtaButton;
