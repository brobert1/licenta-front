import { Button } from '@components';
import { slugify } from '@functions';
import { classnames } from '@lib';
import { useRouter } from 'next/router';
import ChapterDropdown from './ChapterDropdown';

const StudyTopBar = ({
  chapters,
  activeIndex,
  completedChapters = [],
  course,
  studyId,
  videoUrl,
  showVideo,
  onToggleVideo,
}) => {
  const router = useRouter();

  const backHref = course ? `/client/courses/${slugify(course.name, course._id)}` : null;

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex-shrink-0 z-20 bg-surface/95 backdrop-blur-sm shadow-sm">
      <div className="h-1 w-full bg-accent" />
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <Button
          className="flex items-center justify-center w-10 h-10 rounded-full text-primary bg-secondary hover:bg-tertiary transition-colors"
          onClick={handleBack}
        >
          <i className="fa-solid fa-chevron-left text-lg"></i>
        </Button>
        <ChapterDropdown
          chapters={chapters}
          activeIndex={activeIndex}
          completedChapters={completedChapters}
          studyId={studyId}
        />
        {videoUrl ? (
          <Button
            className={classnames(
              'flex items-center justify-center w-10 h-10 rounded-md transition-colors',
              showVideo ? 'bg-accent text-white' : 'bg-gray-100 text-primary'
            )}
            onClick={onToggleVideo}
          >
            <i className="fa-solid fa-video text-sm"></i>
          </Button>
        ) : (
          <div className="w-10" />
        )}
      </div>
    </div>
  );
};

export default StudyTopBar;
