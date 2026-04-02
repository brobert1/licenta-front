import { ConfirmationModal } from '@components/Modals';

const GameResignModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Resign Game"
      message="Are you sure you want to resign? This will end the game and you will lose."
    />
  );
};

export default GameResignModal;
