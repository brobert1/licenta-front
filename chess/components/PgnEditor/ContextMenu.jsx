import { contextMenuItems } from '@chess/constants/context-menu-items';
import { parseFen } from '@chess/functions';
import { Button } from '@components';
import { useContextMenu, useOnClickOutside } from '@hooks';
import { useEffect } from 'react';

const ContextMenu = ({ isVisible, position, onClose, moment, onAction }) => {
  const { elementRef } = useContextMenu(isVisible, position);

  useOnClickOutside(elementRef, () => {
    if (isVisible) {
      onClose();
    }
  });

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  const handleAction = (actionId, moment) => {
    onAction(actionId, moment);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={elementRef}
      id="context-menu"
      className="fixed z-50 min-w-48 overflow-hidden rounded-md border border-border bg-surface shadow-xl"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {moment && (
        <div className="border-b border-border bg-secondary px-3 py-2">
          <div className="text-center font-chess font-semibold text-primary">
            {parseFen(moment.fen)?.fullmoveNumber || ''}. {moment.move}
          </div>
        </div>
      )}
      {contextMenuItems.map((item) => (
        <Button
          key={item.id}
          className="flex w-full items-center px-3 py-2 text-left text-sm text-primary hover:bg-secondary"
          onClick={() => handleAction(item.id, moment)}
        >
          <i className={`${item.icon} w-4 mr-3`}></i>
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default ContextMenu;
