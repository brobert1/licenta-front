import { Link, Plural } from '@components';
import { slugify, stripTags } from '@functions';
import { size } from 'lodash';

const DashboardCourseCard = ({ _id: uuid, name, image, preview, author, content }) => {
  const lessons = content?.filter((i) => i.kind === 'study');

  return (
    <div className="relative flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md lg:flex-row">
      <div className="hidden aspect-square w-40 flex-shrink-0 overflow-hidden rounded-xl lg:block">
        <img alt={name} className="h-full w-full object-cover" src={image?.path} />
      </div>
      <div className="flex w-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="aspect-square w-16 flex-shrink-0 overflow-hidden rounded-lg lg:hidden">
              <img alt={name} className="h-full w-full object-cover" src={image?.path} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-primary lg:text-xl">{name}</h2>
              <div className="flex items-center gap-2 lg:hidden">
                <span className="rounded-sm bg-accent px-1 py-0.5 text-xs font-bold text-white">
                  {author?.title}
                </span>
                <p className="text-sm font-semibold text-primary">{author?.name}</p>
              </div>
            </div>
          </div>
          <div className="line-clamp-3 overflow-hidden">
            <p className="text-sm font-medium text-muted first-letter:uppercase whitespace-pre-line">
              {stripTags(preview?.description)}
            </p>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <span className="rounded-sm bg-accent px-1 py-0.5 text-xs font-bold text-white">
              {author?.title}
            </span>
            <p className="text-sm font-semibold text-primary">{author?.name}</p>
            <span className="text-tertiary">|</span>
            <div className="flex items-center gap-1 text-sm text-muted">
              <i className="fa-regular fa-graduation-cap" />
              <p className="capitalize">
                <Plural count={size(lessons)} many="lessons" one="lesson" />
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/client/courses/${slugify(name, uuid)}`}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCourseCard;
