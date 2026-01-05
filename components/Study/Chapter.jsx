import { markChapterCompleted, unmarkChapterCompleted } from '@api/user-progress';
import { Button } from '@components';
import { useMutation, usePreview } from '@hooks';
import { classnames } from '@lib';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Chapter = ({
  _id,
  index,
  name,
  timestamp,
  isCompleted: initialIsCompleted,
  isActive,
  onChapterClick,
  lessonId,
}) => {
  const router = useRouter();
  const { isPreview } = usePreview();
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);

  // Mutations for marking/unmarking chapters as completed
  const markChapterCompletedMutation = useMutation(markChapterCompleted, {
    invalidateQueries: [`/client/studies/${lessonId}`],
    successCallback: () => setIsCompleted(true),
  });

  const unmarkChapterCompletedMutation = useMutation(unmarkChapterCompleted, {
    invalidateQueries: [`/client/studies/${lessonId}`],
    successCallback: () => setIsCompleted(false),
  });

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent the chapter row click event from firing

    if (isPreview) return; // Disable functionality in preview mode

    if (isCompleted) {
      unmarkChapterCompletedMutation.mutateAsync(_id);
    } else {
      markChapterCompletedMutation.mutateAsync(_id);
    }
  };

  const handleChapterClick = () => {
    // Navigate to chapter using URL fragment
    router.push(`${router.asPath.split('#')[0]}#${index}`);

    // Keep existing functionality for video seeking
    if (onChapterClick && timestamp) {
      onChapterClick(timestamp);
    }
  };

  return (
    <div
      className={classnames(
        'flex rounded-lg hover:bg-tertiary gap-4 p-1 justify-between items-center cursor-pointer text-white/80 hover:text-white',
        isActive && 'bg-tertiary'
      )}
      onClick={handleChapterClick}
    >
      <div className="flex flex-col">
        <h4 className={classnames(isActive && 'text-white', 'text-sm')}>{name}</h4>
      </div>
      <Button
        onClick={handleClick}
        disabled={isPreview}
        className={classnames(
          isCompleted && 'bg-green-500',
          'border flex justify-center items-center rounded-full w-4 h-4 border-white/10 text-white p-3'
        )}
      >
        <i className="fa-solid fa-check text-sm text-white"></i>
      </Button>
    </div>
  );
};

export default Chapter;
