import { Button } from '@components';
import { classnames } from '@lib';
import { useEffect, useState } from 'react';

const TrainButton = ({ fen, goNextMoment, isOpen, toggle, isMobile = false }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    setButtonClicked(true);

    // If black is to move, go to the next move
    if (fen && fen.split(' ')[1] === 'b') {
      const onlyMainLine = true; // Set to true to only go to the main line
      goNextMoment(onlyMainLine);
    }
  };

  // goNextMoment changes the fen, so we need to wait for the re-render
  useEffect(() => {
    if (buttonClicked) {
      // After re-render (fen has changed), toggle with the new fen
      toggle(fen);
      setButtonClicked(false); // Reset the flag
    }
  }, [fen, buttonClicked, toggle]);

  return (
    <Button
      className={classnames('button mini tertiary', isOpen ? 'bg-gray-600' : 'bg-tertiary')}
      onClick={handleClick}
    >
      {!isMobile && <span className="text-xs lg:text-sm font-semibold mr-2">Train</span>}
      <i className="fa-solid fa-traffic-cone"></i>
    </Button>
  );
};

export default TrainButton;
