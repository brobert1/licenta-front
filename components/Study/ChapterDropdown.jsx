import { Button } from '@components';
import { useDisclosure, useFavouriteChapters, useOnClickOutside } from '@hooks';
import { classnames } from '@lib';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const ChapterDropdown = ({ chapters, activeIndex, completedChapters = [], studyId }) => {
  const router = useRouter();
  const { isOpen, toggle, hide } = useDisclosure();
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, hide);

  const { favourites, isFavourite, toggleFavourite } = useFavouriteChapters(studyId);

  const activeChapter = chapters?.find((ch) => ch.index === activeIndex);
  const totalChapters = chapters?.length ?? 0;
  const completedCount = completedChapters?.length ?? 0;
  const progressPercent = totalChapters ? (completedCount / totalChapters) * 100 : 0;

  const handleChapterSelect = (chapterIndex) => {
    router.push(`${router.asPath.split('#')[0]}#${chapterIndex}`);
    hide();
  };

  const handleStarClick = (e, chapterId) => {
    e.stopPropagation();
    toggleFavourite(chapterId);
  };

  const favouriteChapters = chapters?.filter((ch) => favourites.includes(ch._id)) || [];

  const renderChapterRow = (chapter) => {
    const isCompleted = completedChapters.includes(chapter._id);
    const isActive = chapter.index === activeIndex;
    const starred = isFavourite(chapter._id);

    return (
      <Button
        key={chapter._id}
        className={classnames(
          'flex items-center gap-3 w-full px-4 py-3 text-left transition-colors',
          isActive ? 'bg-accent/10 text-primary' : 'hover:bg-secondary text-muted',
          isActive && 'font-semibold'
        )}
        onClick={() => handleChapterSelect(chapter.index)}
      >
        <span
          className={classnames(
            'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
            isCompleted ? 'bg-accent text-white' : 'bg-tertiary text-muted'
          )}
        >
          {isCompleted ? <i className="fa-solid fa-check text-xs"></i> : chapter.index + 1}
        </span>
        <span className="truncate text-sm flex-1">{chapter.name}</span>
        <Button
          className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-tertiary transition-colors flex-shrink-0"
          onClick={(e) => handleStarClick(e, chapter._id)}
          aria-label={starred ? 'Remove from favourites' : 'Add to favourites'}
        >
          <i
            className={classnames(
              'text-xs',
              starred ? 'fa-solid fa-star text-yellow-400' : 'fa-regular fa-star text-grey'
            )}
          ></i>
        </Button>
      </Button>
    );
  };

  return (
    <div ref={dropdownRef} className="relative flex-1 min-w-0 flex justify-center">
      <Button
        className={classnames(
          'flex items-center gap-2 rounded-full px-4 py-2.5 bg-secondary border border-border',
          'text-primary font-semibold text-sm hover:bg-tertiary transition-colors',
          'shadow-sm'
        )}
        onClick={toggle}
      >
        <span className="text-accent font-bold tabular-nums">
          {activeIndex + 1}/{totalChapters}
        </span>
        <span className="hidden sm:inline text-muted">·</span>
        <span className="truncate max-w-32 sm:max-w-40">{activeChapter?.name || 'Chapter'}</span>
        <i
          className={classnames(
            'fa-solid fa-chevron-down text-xs text-grey transition-transform flex-shrink-0',
            isOpen && 'rotate-180'
          )}
        ></i>
      </Button>
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[min(20rem,100vw-2rem)] max-h-80 overflow-hidden bg-surface rounded-2xl shadow-xl ring-1 ring-border z-30">
          <div className="px-4 pt-4 pb-2 border-b border-border">
            <div className="flex justify-between text-xs text-muted mb-1.5">
              <span>Progress</span>
              <span className="font-medium tabular-nums">
                {completedCount}/{totalChapters} done
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-tertiary overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto">
            {favouriteChapters.length > 0 && (
              <>
                <div className="px-4 pt-3 pb-1">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                    Favourites
                  </p>
                </div>
                {favouriteChapters.map(renderChapterRow)}
                <div className="mx-4 border-b border-border" />
              </>
            )}
            <div className="py-2">{chapters?.map(renderChapterRow)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterDropdown;
