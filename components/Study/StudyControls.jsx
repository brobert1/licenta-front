import { Button } from '@components';

const StudyControls = ({ onStart, onPrev, onNext, onEnd }) => {
  return (
    <div
      className="flex items-center justify-between
     p-0.5 gap-2 sticky bottom-0 z-10 w-full"
    >
      <Button className="flex-1 py-2 text-gray-400 text-xl" onClick={onStart}>
        <i className="fa-solid fa-backward-fast"></i>
      </Button>
      <Button className="flex-1 py-2 text-gray-400 text-xl" onClick={onPrev}>
        <i className="fa-solid fa-chevron-left"></i>
      </Button>
      <Button className="flex-1 py-2 text-gray-400 text-xl" onClick={onNext}>
        <i className="fa-solid fa-chevron-right"></i>
      </Button>
      <Button className="flex-1 py-2 text-gray-400 text-xl" onClick={onEnd}>
        <i className="fa-solid fa-forward-fast"></i>
      </Button>
    </div>
  );
};

export default StudyControls;
