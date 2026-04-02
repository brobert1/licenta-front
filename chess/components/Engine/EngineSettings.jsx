import { Button } from '@components';
import { useDisclosure, useOnClickOutside } from '@hooks';
import { classnames } from '@lib';
import { useRef } from 'react';
import { MemorySlider, RangeSlider } from '.';
import { ENGINE_MAX_LINES, ENGINE_MEMORY_VALUES } from '@chess/constants/engine';

const EngineSettings = ({ memory, numLines, onMemoryChange, onNumLinesChange, disabled }) => {
  const { hide, isOpen, toggle } = useDisclosure(false);
  const containerRef = useRef(null);

  useOnClickOutside(containerRef, hide);

  const handleToggle = () => {
    if (!disabled) {
      toggle();
    }
  };

  return (
    <div ref={containerRef} className="static">
      <Button
        id="engine-settings-button"
        onClick={handleToggle}
        className={classnames(
          'p-1 hover:bg-black/20 rounded transition-colors',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        aria-label="Engine Settings"
        disabled={disabled}
      >
        <i className="fas fa-cog text-gray-700"></i>
      </Button>
      {isOpen && (
        <div
          id="engine-settings-menu"
          className="absolute left-0 right-0 top-[40px] bg-gray-100 border-t border-gray-300 shadow-xl z-50 p-4"
        >
          <div className="space-y-4">
            <RangeSlider
              label="Multiple lines"
              value={numLines}
              max={ENGINE_MAX_LINES}
              unit={ENGINE_MAX_LINES}
              onChange={onNumLinesChange}
            />
            <MemorySlider
              label="Memory"
              value={memory}
              values={ENGINE_MEMORY_VALUES}
              onChange={onMemoryChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineSettings;
