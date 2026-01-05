import { Button } from '@components';

const NextChapter = ({ onClick }) => {
  return (
    <div className="sticky bottom-0 bg-secondary">
      <Button
        className="flex gap-2 items-center w-full text-white justify-center cursor-pointer bg-accent p-2 rounded-b-md"
        onClick={onClick}
      >
        Next chapter
        <i className="fa-solid fa-forward mt-1"></i>
      </Button>
    </div>
  );
};

export default NextChapter;
