import { parseFen } from '@chess/functions';
import { isFunction } from 'lodash';
import { useEffect, useState } from 'react';

const ColorSelector = ({ onColorChange, defaultColor = 'white', selectedPosition }) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  useEffect(() => {
    if (selectedPosition?.fen) {
      const { activeColor } = parseFen(selectedPosition.fen);
      const turnColor = activeColor === 'b' ? 'black' : 'white';
      setSelectedColor(turnColor);
      if (isFunction(onColorChange)) {
        onColorChange(turnColor);
      }
    }
  }, [selectedPosition]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (isFunction(onColorChange)) {
      onColorChange(color);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-white text-sm w-24">
        Play as {selectedColor === 'white' ? 'White' : 'Black'}
      </p>
      <div className="flex items-center gap-1">
        <div
          className={`cursor-pointer w-10 h-10 items-center justify-center text-neutral-400 bg-neutral-200 text-2xl flex rounded border-3 ${
            selectedColor === 'white' ? 'border-accent' : 'border-neutral-600'
          }`}
          onClick={() => handleColorSelect('white')}
        >
          <i className="fa-light fa-chess-bishop m-1"></i>
        </div>
        <div
          className={`cursor-pointer w-10 h-10 items-center justify-center bg-tertiary text-neutral-400 text-2xl flex rounded border-3 ${
            selectedColor === 'black' ? 'border-accent' : 'border-neutral-600'
          }`}
          onClick={() => handleColorSelect('black')}
        >
          <i className="fa-light fa-chess-bishop m-1"></i>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
