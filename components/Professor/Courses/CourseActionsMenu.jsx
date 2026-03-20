import { Button } from '@components';
import { useOnClickOutside } from '@hooks';
import { useRef } from 'react';

const CourseActionsMenu = ({ onEdit, onDelete, hide }) => {
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <div
      ref={ref}
      className="absolute transition-all top-12 right-0 w-48 z-50 rounded-lg
        bg-secondary shadow-2xl flex flex-col divide-y divide-tertiary"
    >
      <div className="p-2">
        <Button onClick={onEdit} className="menu-button justify-start">
          <i className="fa-regular fa-pen"></i>
          <p>Edit Course</p>
        </Button>
        <Button onClick={onDelete} className="menu-button justify-start text-red-400">
          <i className="fa-regular fa-ban"></i>
          <p>Delete Course</p>
        </Button>
      </div>
    </div>
  );
};

export default CourseActionsMenu;
