import { Button } from '@components';

const BottomBar = ({ children, onPrevClick, onNextClick, isOpen }) => {
  return (
    <aside
      id="bottom"
      className="fixed bottom-0 left-0 w-full bg-slate-800 shadow-md border-t
        border-slate-600 flex justify-between gap-2 py-2 px-4"
    >
      <div className="flex flex-wrap gap-1">{children}</div>
      <div className="flex items-center gap-2 ml-auto">
        <Button className="button mini tertiary text-xl" onClick={onPrevClick} disabled={isOpen}>
          <i className="fa-solid fa-chevron-left"></i>
        </Button>
        <Button className="button mini tertiary text-xl" onClick={onNextClick} disabled={isOpen}>
          <i className="fa-solid fa-chevron-right"></i>
        </Button>
      </div>
    </aside>
  );
};

export default BottomBar;
