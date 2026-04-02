import { Button } from '@components';
import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Modal } from 'react-bootstrap';

const ResumeGameModal = ({ isOpen, savedGame, onResume, onNewGame }) => {
  if (!savedGame) return null;

  const { botName } = savedGame;

  const botAvatarSrc = createAvatar(avataaars, {
    seed: botName,
    size: 64,
    backgroundColor: ['404040'],
  }).toDataUri();

  return (
    <Modal
      show={isOpen}
      onHide={onNewGame}
      backdrop="static"
      keyboard={false}
      centered
      contentClassName="bg-surface"
    >
      <Modal.Body className="bg-surface">
        <div className="flex flex-col items-center gap-6 py-2">
          <img src={botAvatarSrc} className="w-16 h-16 rounded-md" alt={botName} />
          <div className="text-center">
            <h3 className="text-primary font-semibold text-lg">Resume your game?</h3>
            <p className="text-muted text-sm mt-1">You have an unfinished game vs {botName}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              className="w-full py-2.5 bg-secondary text-primary hover:bg-tertiary rounded font-medium transition-colors border border-border"
              onClick={onNewGame}
            >
              New Game
            </Button>
            <Button
              className="w-full py-2.5 bg-accent hover:bg-accent/90 text-white rounded font-medium transition-colors"
              onClick={onResume}
            >
              Resume
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ResumeGameModal;
