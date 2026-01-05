import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { classnames } from '@lib';
import { Button } from '@components';

const DraggableStudyChapter = ({ id, chapter, isActive, onClick, onOpenEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classnames(
        'flex rounded-lg hover:bg-tertiary gap-2 p-1 justify-between items-center cursor-pointer text-white/80 hover:text-white',
        isActive && 'bg-tertiary'
      )}
      onClick={onClick}
    >
      <div className="flex p-1 flex-col flex-1 min-w-0">
        <h4 className={classnames(isActive && 'text-white', 'text-sm line-clamp-1')}>
          {chapter.index + 1}. {chapter.name}
        </h4>
      </div>
      <div className="flex items-center gap-1">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onOpenEdit?.(chapter);
          }}
          className="p-2 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          title="Chapter settings"
        >
          <i className="fa-solid fa-cog" />
        </Button>
        <div
          className="cursor-grab p-2 rounded text-white/50 hover:text-white/80"
          {...attributes}
          {...listeners}
        >
          <i className="fas fa-grip-dots-vertical"></i>
        </div>
      </div>
    </div>
  );
};

export default DraggableStudyChapter;
