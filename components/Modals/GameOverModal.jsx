import { Button, Link } from '@components';
import { useBotContext } from '@contexts/BotContext';
import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useQuery } from '@hooks';
import { Modal } from 'react-bootstrap';

const GameOverModal = ({ isOpen, hide, onRematch }) => {
  const { selectedBot, gameWinner, savedGameId } = useBotContext();
  const { data: me } = useQuery('/client/account');

  const generateBotAvatar = (name) => {
    const avatar = createAvatar(avataaars, {
      seed: name,
      size: 64,
      backgroundColor: ['404040'],
    });
    return avatar.toDataUri();
  };

  const botAvatarSrc = generateBotAvatar(selectedBot.name);
  return (
    <Modal show={isOpen} onHide={hide} backdrop="static" keyboard={false} centered>
      <Modal.Header className="flex items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <Button
            className="-mr-2 flex h-8 w-8 items-center justify-center p-2"
            onClick={hide}
            title="Close"
          >
            <i className="fa-solid fa-close text-2xl text-white"></i>
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-6">
          <p className="text-2xl font-semibold text-white text-center">
            {gameWinner === 'Draw' ? 'Draw!' : `${gameWinner} won!`}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-tertiary border-2 rounded">
                {me?.image?.path ? (
                  <img src={me?.image?.path} className="w-16 h-16 object-cover rounded" alt="You" />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded">
                    <i className="fas fa-user text-2xl text-white"></i>
                  </div>
                )}
              </div>
              <span className="text-white text-sm font-medium">{me?.name}</span>
            </div>
            <div className="text-white text-lg font-bold">VS</div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-tertiary border-2 rounded">
                <img
                  src={botAvatarSrc}
                  className="w-16 h-16 object-cover rounded"
                  alt={selectedBot.name}
                />
              </div>
              <span className="text-white text-sm font-medium">{selectedBot.name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              className="button full text-center accent text-lg w-full py-3"
              href={savedGameId ? `/client/game-review/${savedGameId}` : '#'}
            >
              Game Review
            </Link>
            <div className="flex gap-3">
              <Button
                className="button full tertiary border-neutral-700 hover:bg-neutral-700 text-lg flex-1 py-3"
                onClick={onRematch}
              >
                Rematch
              </Button>
              <Button
                className="button full tertiary border-neutral-700 hover:bg-neutral-700 text-lg flex-1 py-3"
                onClick={hide}
              >
                New bot
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GameOverModal;
