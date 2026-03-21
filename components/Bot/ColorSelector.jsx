import { parseFen } from '@chess/functions';
import { isFunction } from 'lodash';
import { useEffect, useState } from 'react';

const ColorSelector = ({ onColorChange, defaultColor = 'white', selectedPosition }) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  useEffect(() => {
    setSelectedColor(defaultColor);
  }, [defaultColor]);

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

  const playAsLabel =
    selectedColor === 'random'
      ? 'Random (revealed when you play)'
      : selectedColor === 'white'
        ? 'White'
        : 'Black';

  return (
    <div className="flex flex-col gap-2">
      <p className="w-full max-w-xs text-sm text-white">Play as {playAsLabel}</p>
      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          title="Play as White"
          onClick={() => handleColorSelect('white')}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded border-3 border-neutral-600 bg-neutral-200 text-2xl text-neutral-400 ${
            selectedColor === 'white' ? 'border-accent' : ''
          }`}
        >
          <i className="fa-solid fa-chess-bishop m-1" />
        </button>
        <button
          type="button"
          title="Play as Black"
          onClick={() => handleColorSelect('black')}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded border-3 border-neutral-600 bg-tertiary text-2xl text-neutral-400 ${
            selectedColor === 'black' ? 'border-accent' : ''
          }`}
        >
          <i className="fa-solid fa-chess-bishop m-1" />
        </button>
        <button
          type="button"
          title="Random side — color is revealed when the game starts"
          onClick={() => handleColorSelect('random')}
          className={`flex h-10 items-center gap-1 rounded border px-2 text-xs font-semibold ${
            selectedColor === 'random'
              ? 'border-accent bg-neutral-700 text-white'
              : 'border-neutral-600 bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          <i className="fa-solid fa-shuffle text-sm" />
          <span className="hidden sm:inline">Random</span>
        </button>
      </div>
    </div>
  );
};

export default ColorSelector;
