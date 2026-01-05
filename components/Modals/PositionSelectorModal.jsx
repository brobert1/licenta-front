import { Button } from '@components';
import startingPositions from '@constants/starting-positions';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import ChessBoardPreview from '@chess/components/ChessboardPreview';

const PositionSelectorModal = ({ hide, isOpen, onPositionSelect }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [customFen, setCustomFen] = useState('');

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
    setCustomFen('');
  };

  const handleConfirm = () => {
    if (customFen.trim()) {
      const customPosition = {
        name: 'Custom Position',
        fen: customFen.trim(),
        description: 'Custom FEN position',
      };
      if (onPositionSelect) {
        onPositionSelect(customPosition);
      }
    } else if (selectedPosition && onPositionSelect) {
      onPositionSelect(selectedPosition);
    }
    hide();
  };

  const handleCancel = () => {
    setSelectedPosition(null);
    setCustomFen('');
    hide();
  };

  return (
    <Modal
      id="position-selector-modal"
      show={isOpen}
      onHide={handleCancel}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="flex items-center w-full justify-between">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase text-lg font-semibold">
            Select Position
          </h3>
        </Modal.Title>
        <Button
          className="-mr-2 flex h-8 w-8 items-center p-2 hover:bg-tertiary rounded justify-center"
          onClick={handleCancel}
        >
          <i className="fa-solid fa-close text-xl text-white"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-3">
          <p className="text-white text-sm">
            Choose a thematic opening position to start your game:
          </p>
          <div className="grid gap-2 max-h-96 px-1 overflow-y-auto">
            {startingPositions.map((position, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedPosition?.fen === position.fen
                    ? 'border-accent bg-accent/10 text-white'
                    : 'border-white/10 bg-tertiary text-gray-300 hover:border-accent hover:bg-accent/5'
                }`}
                onClick={() => handlePositionSelect(position)}
              >
                <div className="flex gap-3 items-center">
                  <ChessBoardPreview fen={position.fen} size={110} />
                  <div className="flex flex-col gap-1 flex-1">
                    <h4 className="font-semibold text-white">{position.name}</h4>
                    <p className="text-xs text-gray-400">{position.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">
              Or enter a custom FEN position:
            </label>
            <input
              type="text"
              value={customFen}
              onChange={(e) => {
                setCustomFen(e.target.value);
                if (e.target.value.trim()) {
                  setSelectedPosition(null);
                }
              }}
              placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
              className="w-full p-3 rounded-lg border border-white/10 bg-tertiary text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="grid w-full grid-cols-3 gap-4">
        <Button
          className="button full w-full border border-tertiary bg-tertiary text-white hover:border-white/10"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="button full w-full col-span-2 accent"
          onClick={handleConfirm}
          disabled={!selectedPosition && !customFen.trim()}
        >
          Select Position
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PositionSelectorModal;
