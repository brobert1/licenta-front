import { reorderStudyChapters } from '@api/client';
import { Button } from '@components';
import { EditStudyChapterModal, StudySettingsModal } from '@components/Modals';
import { useMutation, useDisclosure } from '@hooks';
import { classnames } from '@lib';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useState, useEffect } from 'react';
import { arrayMove } from '@functions';
import DraggableStudyChapter from './DraggableStudyChapter';

const StudyChapters = ({
  chapters,
  activeIndex,
  onChangeActiveIndex,
  onAddChapter,
  study,
  onStudyUpdate,
}) => {
  const [localChapters, setLocalChapters] = useState(chapters || []);
  const { hide, isOpen, show } = useDisclosure();
  const { hide: hideEdit, isOpen: isEditOpen, show: showEdit } = useDisclosure();
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    setLocalChapters(chapters || []);
  }, [chapters]);

  const reorderMutation = useMutation(reorderStudyChapters, {
    invalidateQueries: `/studies/${study._id}`,
    onError: () => {
      setLocalChapters(chapters || []);
    },
  });

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localChapters.findIndex((chapter) => chapter._id === active.id);
    const newIndex = localChapters.findIndex((chapter) => chapter._id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedChapters = arrayMove(localChapters, oldIndex, newIndex);
    const updatedChapters = reorderedChapters.map((chapter, index) => ({
      ...chapter,
      index,
    }));

    setLocalChapters(updatedChapters);

    await reorderMutation.mutateAsync({
      studyId: study._id,
      chapters: updatedChapters.map((chapter) => ({
        id: chapter._id,
        index: chapter.index,
      })),
    });
  };

  const handleChapterClick = (chapter) => {
    onChangeActiveIndex?.(chapter.index);
  };

  const handleOpenEdit = (chapter) => {
    setSelectedChapter(chapter);
    showEdit();
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement]}
    >
      <div className={classnames('bg-secondary rounded-t-md w-full h-full flex flex-col')}>
        <div className="bg-tertiary text-white rounded-t-md">
          <div className="flex justify-between items-center text-white font-semibold border-b p-2.5 border-white/10">
            <div className="flex gap-2 items-center">
              <span>🚀</span>
              <p>Chapters</p>
            </div>
            <Button
              className="text-white/70 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/10"
              title="Study Settings"
              onClick={show}
            >
              <i className="fa-solid fa-cog" />
            </Button>
          </div>
        </div>
        <div
          className={classnames(
            'flex flex-col gap-1 p-2 text-gray-300 overflow-y-auto flex-1 min-h-0'
          )}
        >
          <SortableContext
            items={localChapters.map((chapter) => chapter._id)}
            strategy={verticalListSortingStrategy}
          >
            {localChapters?.map((chapter) => {
              const isActive = activeIndex === chapter.index;
              return (
                <DraggableStudyChapter
                  key={chapter._id}
                  id={chapter._id}
                  chapter={chapter}
                  isActive={isActive}
                  onClick={() => handleChapterClick(chapter)}
                  onOpenEdit={handleOpenEdit}
                />
              );
            })}
          </SortableContext>
        </div>
        <Button
          className="flex gap-2 items-center w-full text-white justify-center cursor-pointer bg-accent p-2 rounded-b-md"
          onClick={onAddChapter}
        >
          Add new chapter(s)
        </Button>
      </div>
      <StudySettingsModal
        hide={hide}
        isOpen={isOpen}
        study={study}
        onUpdateSuccess={onStudyUpdate}
      />
      <EditStudyChapterModal
        isOpen={isEditOpen}
        hide={hideEdit}
        chapter={selectedChapter}
        refetch={onStudyUpdate}
      />
    </DndContext>
  );
};

export default StudyChapters;
