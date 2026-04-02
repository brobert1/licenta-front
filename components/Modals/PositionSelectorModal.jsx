import { Button } from '@components';
import startingPositions from '@constants/starting-positions';
import ChessBoardPreview from '@chess/components/ChessboardPreview';
import { validateFen } from '@functions';
import { classnames } from '@lib';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const PositionSelectorModal = ({ hide, initialPosition = null, isOpen, onPositionSelect }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [customFen, setCustomFen] = useState('');
  const [fenError, setFenError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    if (!initialPosition?.fen) {
      setCustomFen('');
      setFenError('');
      setSelectedPosition(null);
      return;
    }

    const matchedPosition = startingPositions.find(
      (position) => position.fen === initialPosition.fen
    );
    setCustomFen(matchedPosition ? '' : initialPosition.fen);
    setFenError('');
    setSelectedPosition(matchedPosition || null);
  }, [initialPosition, isOpen]);

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
    setCustomFen('');
    setFenError('');
  };

  const handleConfirm = () => {
    if (customFen.trim()) {
      const validationError = validateFen(customFen);
      if (validationError) {
        setFenError(validationError);
        return;
      }

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
    setFenError('');
    hide();
  };

  const handleCustomFenChange = (event) => {
    const nextFen = event.target.value;
    setCustomFen(nextFen);
    setFenError(validateFen(nextFen));

    if (nextFen.trim()) {
      setSelectedPosition(null);
    }
  };

  // Determine if confirm button should be active
  const isConfirmDisabled =
    (!selectedPosition && !customFen.trim()) || Boolean(customFen.trim() && fenError);

  return (
    <Modal
      id="position-selector-modal"
      show={isOpen}
      onHide={handleCancel}
      backdrop="static"
      keyboard={false}
      centered
      contentClassName="border-0 rounded-xl overflow-hidden shadow-2xl"
    >
      <Modal.Header className="flex items-center w-full justify-between bg-surface border-b border-border p-4">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase text-lg font-semibold text-primary m-0">
            Select Position
          </h3>
        </Modal.Title>
        <Button
          className="flex h-8 w-8 items-center p-2 hover:bg-secondary rounded-lg justify-center transition-colors text-muted hover:text-primary"
          onClick={handleCancel}
        >
          <i className="fa-solid fa-close text-lg"></i>
        </Button>
      </Modal.Header>
      <Modal.Body className="bg-surface p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100 flex items-start gap-2">
            <i className="fa-solid fa-info-circle mt-0.5"></i>
            Choose a thematic opening position to start your game or practice from a specific setup.
          </p>
          <div className="grid gap-2 max-h-[45vh] pr-2 overflow-y-auto custom-scrollbar scroll-touch">
            {startingPositions.map((position, index) => (
              <div
                key={index}
                className={classnames(
                  'p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 group',
                  selectedPosition?.fen === position.fen
                    ? 'border-accent bg-accent/5 shadow-sm'
                    : 'border-border bg-secondary hover:border-accent/50 hover:bg-secondary/80'
                )}
                onClick={() => handlePositionSelect(position)}
              >
                <div className="flex gap-3 items-center">
                  <div className="flex-shrink-0 rounded overflow-hidden shadow-sm border border-black/10">
                    <ChessBoardPreview fen={position.fen} size={72} />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h4
                      className={classnames(
                        'font-semibold text-base truncate',
                        selectedPosition?.fen === position.fen
                          ? 'text-accent'
                          : 'text-primary group-hover:text-primary'
                      )}
                    >
                      {position.name}
                    </h4>
                    <p className="text-sm text-muted line-clamp-2">{position.description}</p>
                    {position.moves && (
                      <span className="text-xs bg-black/5 text-muted px-2 py-0.5 rounded-full w-fit mt-1 font-mono truncate max-w-full">
                        {position.moves}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface px-2 text-sm text-muted uppercase tracking-wider font-semibold">
                Or
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-primary text-sm font-medium">Enter a custom FEN position:</label>
            <input
              type="text"
              value={customFen}
              onChange={handleCustomFenChange}
              placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
              className={classnames(
                'w-full p-3 rounded-lg border bg-secondary text-primary placeholder-muted focus:ring-1 focus:outline-none transition-colors font-mono text-sm',
                fenError
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                  : 'border-border focus:border-accent focus:ring-accent'
              )}
            />
            {fenError && <p className="text-xs text-red-600">{fenError}</p>}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-3 rounded-b-xl">
        <Button className="button secondary px-5 py-2" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          className={classnames(
            'button bg-accent text-white px-6 py-2 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5',
            isConfirmDisabled && 'opacity-50 cursor-not-allowed shadow-none transform-none'
          )}
          disabled={isConfirmDisabled}
          onClick={handleConfirm}
        >
          Start Game
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PositionSelectorModal;
