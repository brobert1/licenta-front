import { parseFen } from '@chess/functions';
import { classnames } from '@lib';
import { isFunction } from 'lodash';
import { useEffect, useState } from 'react';

const ColorSelector = ({ onColorChange, defaultColor = 'white', selectedPosition }) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  useEffect(() => {
    if (selectedPosition?.fen) return;
    setSelectedColor(defaultColor);
  }, [defaultColor, selectedPosition?.fen]);

  useEffect(() => {
    if (selectedPosition?.fen) {
      const fenData = parseFen(selectedPosition.fen);
      const activeColor = fenData?.activeColor;
      const turnColor = activeColor === 'b' ? 'black' : 'white';

      setSelectedColor(turnColor);
      if (isFunction(onColorChange)) {
        onColorChange(turnColor);
      }
    }
  }, [selectedPosition, onColorChange]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (isFunction(onColorChange)) {
      onColorChange(color);
    }
  };

  return (
    <div className="flex gap-3 shrink-0">
      <div
        onClick={() => handleColorSelect('white')}
        className={classnames(
          'w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer border-4 box-border transition-all bg-secondary text-muted',
          selectedColor === 'white' ? 'border-accent' : 'border-border'
        )}
      >
        <i className="fa-regular fa-chess-queen text-xl"></i>
      </div>
      <div
        onClick={() => handleColorSelect('random')}
        aria-label="Random side"
        role="button"
        className={classnames(
          'w-10 h-10 rounded-lg relative isolate overflow-hidden flex items-center justify-center cursor-pointer border-4 box-border transition-all',
          selectedColor === 'random' ? 'border-accent' : 'border-border'
        )}
      >
        <span className="absolute inset-0 flex pointer-events-none" aria-hidden>
          <span className="w-1/2 h-full bg-secondary" />
          <span className="w-1/2 h-full bg-black" />
        </span>
      </div>
      <div
        onClick={() => handleColorSelect('black')}
        className={classnames(
          'w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer border-4 box-border transition-all bg-primary/80 text-white/50',
          selectedColor === 'black' ? 'border-accent' : 'border-border'
        )}
      >
        <i className="fa-regular fa-chess-king text-xl"></i>
      </div>
    </div>
  );
};

export default ColorSelector;
