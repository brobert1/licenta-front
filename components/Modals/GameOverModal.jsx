import { Link } from '@components';
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
    <Modal
      id="game-over-modal"
      show={isOpen}
      onHide={hide}
      backdrop="static"
      centered
      keyboard={false}
    >
      <Modal.Header className="flex items-center justify-end border-0 px-5 py-3">
        <button
          type="button"
          onClick={hide}
          title="Close"
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container"
        >
          <i className="fa-solid fa-xmark text-xl" />
        </button>
      </Modal.Header>
      <Modal.Body className="px-5 pb-6 pt-0">
        <div className="flex flex-col gap-6">
          <p className="text-center font-headline text-2xl text-on-surface">
            {gameWinner === 'Draw' ? 'Draw!' : `${gameWinner} won!`}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container p-0.5">
                {me?.image?.path ? (
                  <img src={me?.image?.path} className="h-16 w-16 rounded-lg object-cover" alt="" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-surface-container-high">
                    <i className="fa-solid fa-user text-2xl text-secondary-muted" />
                  </div>
                )}
              </div>
              <span className="font-landing text-sm font-semibold text-on-surface">{me?.name}</span>
            </div>
            <div className="font-headline text-lg text-secondary-muted">vs</div>
            <div className="flex flex-col items-center gap-2">
              <div className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container p-0.5">
                <img
                  src={botAvatarSrc}
                  className="h-16 w-16 rounded-lg object-cover"
                  alt={selectedBot.name}
                />
              </div>
              <span className="font-landing text-sm font-semibold text-on-surface">
                {selectedBot.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href={savedGameId ? `/client/game-review/${savedGameId}` : '#'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-tertiary-container py-3 font-landing text-lg font-bold text-white transition-opacity hover:opacity-90"
            >
              Game Review
            </Link>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onRematch}
                className="flex-1 rounded-xl border border-outline-variant/30 bg-surface-container py-3 font-landing text-lg font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
              >
                Rematch
              </button>
              <button
                type="button"
                onClick={hide}
                className="flex-1 rounded-xl border border-outline-variant/30 bg-surface-container py-3 font-landing text-lg font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
              >
                New bot
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GameOverModal;
