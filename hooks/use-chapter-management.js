import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const useChapterManagement = () => {
  const { control, watch, setValue, getValues } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'chapters',
  });

  const [activeChapter, setActiveChapter] = useState(0);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      move(oldIndex, newIndex);

      fields.forEach((field, idx) => {
        setValue(`chapters.${idx}.index`, idx);
      });
    }
  };

  const handleAddChapter = () => {
    append({ index: fields.length, name: '', videoUrl: '', pgn: '' });
    setActiveChapter(fields.length);
  };

  const handleRemoveChapter = (index) => {
    remove(index);

    const updatedChapters = getValues('chapters');

    // Re-index the remaining chapters
    updatedChapters.forEach((_, idx) => {
      setValue(`chapters.${idx}.index`, idx);
    });

    if (activeChapter >= updatedChapters.length) {
      setActiveChapter(Math.max(updatedChapters.length - 1, 0));
    }
  };

  return {
    fields,
    activeChapter,
    setActiveChapter,
    handleDragEnd,
    handleAddChapter,
    handleRemoveChapter,
    watch,
  };
};

export default useChapterManagement;
