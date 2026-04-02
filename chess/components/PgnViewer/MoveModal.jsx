import { getMoveSuffix } from '@chess/functions';
import { Button } from '@components';
import { classnames } from '@lib';
import { isFunction } from 'lodash';
import { useEffect, useRef, useState } from 'react';

const MoveModal = ({
  variations = [],
  onChoice = () => {},
  onCancel = () => {},
  onFocusChange = () => {},
}) => {
  const ref = useRef(null);
  const [focus, setFocus] = useState(0);

  // Set focus on the container when mounted
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  // Notify parent component when focus changes so it can update the arrow
  useEffect(() => {
    if (isFunction(onFocusChange)) {
      onFocusChange(focus);
    }
  }, [focus, onFocusChange]);

  // Handle keyboard events to change focus or choose a variation
  const onKeyDown = (event) => {
    event.preventDefault();

    if (event.key === 'ArrowDown') {
      setFocus((prev) => (prev + 1) % variations.length);
    }
    if (event.key === 'ArrowUp') {
      setFocus((prev) => (prev - 1 + variations.length) % variations.length);
    }
    if (event.key === 'ArrowLeft') {
      onCancel();
    }
    if (event.key === 'ArrowRight') {
      if (isFunction(onChoice)) {
        onChoice(variations[focus].index);
      }
    }
  };

  const handleCancel = () => {
    if (isFunction(onCancel)) {
      onCancel();
    }
  };

  // Render each variation button with hover support to update focus
  const showVariations = (variation, index) => {
    const isFocused = focus === index;

    return (
      <Button
        key={variation.index}
        className={classnames(
          'flex w-full rounded-lg gap-4 py-1.5 px-3 items-center cursor-pointer transition-colors',
          isFocused ? 'bg-accent text-white' : 'text-primary hover:bg-accent hover:text-white'
        )}
        onClick={() => onChoice(variation.index)}
        onMouseEnter={() => setFocus(index)}
      >
        <span className="text-inherit">{getMoveSuffix(variation.fen)}</span>
        <p className="flex items-center">
          <span className="font-chess">{variation.move}</span>
        </p>
      </Button>
    );
  };

  return (
    <div
      id="move-modal"
      className="bg-surface border border-border w-full max-h-[80%] rounded-xl flex flex-col overflow-hidden"
    >
      <div className="flex gap-2 text-primary items-center justify-between font-semibold border-b p-2.5 border-border outline-none">
        <div className="flex items-center gap-2">
          <p>Choose variation</p>
        </div>
        <Button
          className="text-muted bg-secondary h-6 w-6 border border-border cursor-pointer rounded aspect-square flex items-center justify-center hover:bg-tertiary hover:text-primary"
          onClick={handleCancel}
        >
          <i className="fas fa-times text-sm" />
        </Button>
      </div>
      <div
        ref={ref}
        onKeyDown={onKeyDown}
        tabIndex={0}
        className="flex flex-col gap-1 p-2 outline-none overflow-y-auto flex-shrink"
      >
        {variations.map(showVariations)}
      </div>
    </div>
  );
};

export default MoveModal;
