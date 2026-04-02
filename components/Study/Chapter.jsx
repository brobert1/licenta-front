import { markChapterCompleted, unmarkChapterCompleted } from '@api/user-progress';
import { Button } from '@components';
import { useMutation, usePreview } from '@hooks';
import { classnames } from '@lib';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

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
  const rowRef = useRef(null);

  // Scroll this chapter into view whenever it becomes active
  useEffect(() => {
    if (isActive && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isActive]);

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
    // Navigate to chapter using URL fragment (shallow to skip full navigation cycle)
    router.replace(`${router.asPath.split('#')[0]}#${index}`, undefined, {
      shallow: true,
      scroll: false,
    });

    // Keep existing functionality for video seeking
    if (onChapterClick && timestamp) {
      onChapterClick(timestamp);
    }
  };

  return (
    <div
      ref={rowRef}
      className={classnames(
        'relative flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors gap-3',
        isActive ? 'bg-secondary' : 'hover:bg-secondary'
      )}
      onClick={handleChapterClick}
    >
      <span
        className={classnames(
          'absolute left-0 top-0 h-full w-0.5 transition-opacity',
          isActive ? 'bg-accent opacity-100' : 'opacity-0'
        )}
      />
      <h4
        className={classnames(
          'text-sm truncate flex-1 min-w-0',
          isActive ? 'text-primary font-medium' : 'text-muted'
        )}
        title={name}
      >
        {name}
      </h4>
      <Button
        onClick={handleClick}
        disabled={isPreview}
        className={classnames(
          'flex shrink-0 justify-center items-center rounded-full w-5 h-5 transition-colors',
          isCompleted
            ? 'bg-green-500 border-green-500'
            : 'border border-border bg-transparent hover:border-grey'
        )}
      >
        <i
          className={classnames(
            'fa-solid fa-check text-[10px]',
            isCompleted ? 'text-white' : 'text-border'
          )}
        ></i>
      </Button>
    </div>
  );
};

export default Chapter;
