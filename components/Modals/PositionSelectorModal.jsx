import ChessBoardPreview from '@chess/components/ChessboardPreview';
import startingPositions from '@constants/starting-positions';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

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
      centered
      keyboard={false}
      size="lg"
    >
      <Modal.Header className="flex w-full items-start justify-between gap-3">
        <Modal.Title as="div" className="min-w-0 flex-1">
          <h3 className="font-headline text-xl font-semibold text-on-surface first-letter:uppercase">
            Select Position
          </h3>
        </Modal.Title>
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiaryGold"
          onClick={handleCancel}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <p className="font-landing text-sm text-secondary-muted">
            Choose a thematic opening position to start your game:
          </p>
          <div className="grid max-h-96 gap-2 overflow-y-auto pr-1">
            {startingPositions.map((position) => {
              const isSelected = selectedPosition?.fen === position.fen;
              return (
                <button
                  key={position.fen}
                  type="button"
                  onClick={() => handlePositionSelect(position)}
                  className={`w-full rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiaryGold ${
                    isSelected
                      ? 'border-tertiaryGold bg-tertiaryGold/10 shadow-sm'
                      : 'border-outline-variant/20 bg-surface-container/50 hover:border-outline-variant/40 hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 overflow-hidden rounded-lg border border-outline-variant/20">
                      <ChessBoardPreview fen={position.fen} size={110} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <h4 className="font-landing text-sm font-semibold text-on-surface">
                        {position.name}
                      </h4>
                      <p className="font-landing text-xs text-secondary-muted">{position.description}</p>
                    </div>
                    {isSelected && (
                      <i className="fa-solid fa-circle-check shrink-0 text-lg text-tertiaryGold" aria-hidden />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="position-selector-fen"
              className="font-landing text-sm font-medium text-on-surface"
            >
              Or enter a custom FEN position:
            </label>
            <input
              id="position-selector-fen"
              type="text"
              value={customFen}
              onChange={(e) => {
                setCustomFen(e.target.value);
                if (e.target.value.trim()) {
                  setSelectedPosition(null);
                }
              }}
              placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
              className="w-full rounded-lg border-0 bg-surface-container px-3 py-2.5 font-landing text-sm text-on-surface placeholder:text-secondary-muted focus:ring-2 focus:ring-tertiaryGold/40 focus:outline-none"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={handleCancel}
          className="w-full rounded-xl border border-outline-variant/30 bg-surface-container py-3 font-landing text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiaryGold sm:col-span-1"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedPosition && !customFen.trim()}
          className="w-full rounded-xl bg-tertiary-container py-3 font-landing text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiaryGold focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2"
        >
          Select Position
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PositionSelectorModal;
