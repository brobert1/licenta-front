import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const MobileActionBar = ({ ariaLabel, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden rounded-t-2xl border-t border-border bg-surface/95 shadow-lg backdrop-blur-sm"
      role="toolbar"
      aria-label={ariaLabel}
    >
      <div className="mobile-action-bar-safe-bottom mx-auto flex w-full max-w-chess-board items-center gap-1 px-2 pt-2">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default MobileActionBar;
