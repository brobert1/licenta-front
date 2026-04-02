import { Plural } from '@components';
import { stripTags } from '@functions';
import { useProfile } from '@hooks';
import { useFormContext } from 'react-hook-form';

const CourseDynamicPreviewCard = () => {
  const { me: author } = useProfile();
  const { watch } = useFormContext();

  const { name, description, image, lessons = [] } = watch();
  const lessonsCount = lessons.length;

  // Determine the preview URL
  const preview = (() => {
    try {
      if (image instanceof File) {
        return URL.createObjectURL(image);
      } else if (image?.path && typeof image?.path === 'string') {
        return image.path;
      }

      return null;
    } catch {
      return null;
    }
  })();

  return (
    <div className="flex lg:flex-row flex-col bg-secondary hover:bg-tertiary cursor-pointer p-3.5 lg:p-5 rounded-xl gap-4 shadow-sm ring-1 ring-border transition-colors">
      <div className="lg:block hidden overflow-hidden w-40 aspect-square object-cover rounded-lg flex-shrink-0">
        {preview ? (
          <img src={preview} alt={name || 'Placeholder'} className="w-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i className="fa-regular fa-image text-4xl text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center">
            <div className="lg:hidden overflow-hidden w-16 aspect-square object-cover rounded-lg">
              {preview ? (
                <img src={preview} alt={name || 'Placeholder'} className="w-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="fa-regular fa-image text-2xl text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-primary text-lg lg:text-xl font-semibold">
                {name || 'Course Title'}
              </h2>
              <div className="flex lg:hidden items-center gap-2">
                <p className="text-primary font-semibold text-sm">{author?.name}</p>
              </div>
            </div>
          </div>

          <div className="line-clamp-2 overflow-hidden">
            <p className="text-grey font-medium text-sm whitespace-pre-line">
              {stripTags(description) || 'Course description goes here'}
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <p className="text-primary font-semibold text-sm">{author?.name}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 text-muted text-sm">
            <i className="fa-regular fa-graduation-cap"></i>
            <p className="capitalize">
              <Plural count={lessonsCount} one="lesson" many="lessons" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDynamicPreviewCard;
