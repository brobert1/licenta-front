import { Button } from '@components';
import { Checkbox, Dropdown } from '@components/Fields';
import { NextEditor } from 'next-chessground';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const PositionSetup = () => {
  const { setValue, watch } = useFormContext();
  const fen = watch('fen') || '';
  const side = watch('side') || 'w';
  const clear = '8/8/8/8/8/8/8/8 w - - 0 1';
  const start = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const [castling, setCastling] = useState({
    K: false, // White kingside
    Q: false, // White queenside
    k: false, // Black kingside
    q: false, // Black queenside
  });

  useEffect(() => {
    const fenParts = fen.split(' ');
    if (fenParts.length > 2) {
      const castlingPart = fenParts[2];
      setCastling({
        K: castlingPart.includes('K'),
        Q: castlingPart.includes('Q'),
        k: castlingPart.includes('k'),
        q: castlingPart.includes('q'),
      });
    }
  }, []);

  useEffect(() => {
    const fenObject = fen.split(' ');
    fenObject[1] = side;

    let castlingStr = '';
    if (castling.K) castlingStr += 'K';
    if (castling.Q) castlingStr += 'Q';
    if (castling.k) castlingStr += 'k';
    if (castling.q) castlingStr += 'q';
    if (castlingStr === '') castlingStr = '-';

    fenObject[2] = castlingStr;

    setValue('fen', fenObject.join(' '));
  }, [side, castling, setValue, fen]);

  const getPosition = (fen) => {
    setValue('fen', fen);
  };

  const ref = useRef();
  const handleSelect = (fen) => {
    getPosition(fen);
  };

  const clearBoard = () => {
    getPosition(clear);
  };

  const setInitialPosition = () => {
    getPosition(start);
  };

  const handleSideChange = (value) => {
    setValue('side', value);
  };

  const handleCastlingChange = (key) => (nextValue) => {
    const checked =
      typeof nextValue === 'boolean' ? nextValue : Boolean(nextValue?.target?.checked);

    setCastling((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  return (
    <div className="position-setup flex flex-col text-primary gap-4">
      <div className="flex gap-4">
        <div className="w-80 flex-col items-center">
          <NextEditor ref={ref} fen={fen} onSelect={handleSelect} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="mb-2">
            <Dropdown value={side} onChange={handleSideChange} placeholder="Select side to play">
              <option value="w">White to play</option>
              <option value="b">Black to play</option>
            </Dropdown>
          </div>
          <div className="mb-2">
            <p className="text-primary mb-1">Castling</p>
            <div className="flex flex-col">
              <Checkbox id="white-kingside" value={castling.K} onChange={handleCastlingChange('K')}>
                White O-O
              </Checkbox>
              <Checkbox
                id="white-queenside"
                value={castling.Q}
                onChange={handleCastlingChange('Q')}
              >
                White O-O-O
              </Checkbox>
              <Checkbox id="black-kingside" value={castling.k} onChange={handleCastlingChange('k')}>
                Black O-O
              </Checkbox>
              <Checkbox
                id="black-queenside"
                value={castling.q}
                onChange={handleCastlingChange('q')}
              >
                Black O-O-O
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <Button
          className="px-4 py-2 bg-secondary hover:bg-tertiary text-primary rounded flex-1"
          onClick={clearBoard}
        >
          Clear board
        </Button>
        <Button
          className="px-4 py-2 bg-secondary hover:bg-tertiary text-primary rounded flex-1"
          onClick={setInitialPosition}
        >
          Initial position
        </Button>
      </div>
    </div>
  );
};

export default PositionSetup;
