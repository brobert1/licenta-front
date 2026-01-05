import { useState } from 'react';

const Tooltip = ({ icon = 'fas fa-question-circle', children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center text-base text-white"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <i className={icon}></i>
      </div>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 z-10 mb-2 flex -translate-x-1/2 transform flex-col items-center">
          <div className="rounded bg-primary px-3 py-2 text-sm text-white shadow-md">
            {children}
          </div>
          <div className="relative -mt-2 h-3 w-3">
            <div className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 transform bg-primary"></div>
            <div className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rotate-45 scale-110 transform bg-primary"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
