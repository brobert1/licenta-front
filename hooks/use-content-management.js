import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

const useContentManagement = () => {
  const { control, watch, getValues } = useFormContext();
  const { fields, move, append, replace } = useFieldArray({
    control,
    name: 'content',
  });
  const [activeContent, setActiveContent] = useState(0);

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        move(oldIndex, newIndex);

        const currentContentOrder = getValues('content');
        const reIndexedContent = currentContentOrder.map((item, idx) => ({
          ...item,
          index: idx,
        }));
        replace(reIndexedContent);
      }
    }
  };

  const handleAddContent = (item) => {
    append({ ...item, index: fields.length });
  };

  return {
    fields,
    activeContent,
    setActiveContent,
    handleDragEnd,
    handleAddContent,
    watch,
  };
};

export default useContentManagement;
