import { fontAwesomeIcons } from '@data';
import { useDisclosure, useOnClickOutside } from '@hooks';
import { classnames } from '@lib';
import { useEffect, useRef, useState } from 'react';

const IconPicker = ({ onChange, value }) => {
  const [selectedIcon, setSelectedIcon] = useState(value || null);
  const { isOpen, hide, toggle } = useDisclosure();
  const pickerRef = useRef(null);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    if (onChange) {
      onChange(icon);
    }
    hide();
  };

  const handleInputClick = () => {
    toggle();
  };

  useOnClickOutside(pickerRef, hide);

  useEffect(() => {
    setSelectedIcon(value || null);
  }, [value]);

  return (
    <div className="relative w-full" ref={pickerRef}>
      <div
        onClick={handleInputClick}
        className="dropdown icon-picker-trigger cursor-pointer px-4 py-1.5"
      >
        <div className="flex items-center gap-2 mr-4 flex-1">
          {selectedIcon ? (
            <i className={`${selectedIcon} text-lg w-4`} aria-hidden="true"></i>
          ) : (
            <span className="text-lg w-4">&nbsp;</span>
          )}
        </div>
        <div className="flex items-center mr-0">
          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-muted text-xs`}></i>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-x-4 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-96">
          <div className="flex flex-wrap gap-1 p-4 h-80 overflow-y-auto transition-all duration-300 icon-picker-scrollable">
            {fontAwesomeIcons.map((icon) => (
              <button
                key={icon}
                onClick={() => handleIconSelect(icon)}
                className={classnames(
                  'p-2 rounded-lg border-2 transition-all duration-200 hover:shadow-md flex items-center justify-center',
                  selectedIcon === icon && 'border-accent bg-accent/10 text-accent',
                  selectedIcon !== icon &&
                    'border-border hover:border-accent/40 text-primary hover:bg-secondary'
                )}
                title={icon}
                type="button"
              >
                <i className={`${icon} text-lg w-6 h-6`} aria-hidden="true"></i>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
