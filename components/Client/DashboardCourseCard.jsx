import { Link } from '@components';
import { slugify, stripTags } from '@functions';

const DashboardCourseCard = ({ _id: uuid, name, preview, author }) => {
  return (
    <div className="flex lg:flex-row flex-col bg-secondary p-3.5 lg:p-5 rounded-xl gap-4">
      <div className="lg:block hidden overflow-hidden w-40 aspect-square object-cover rounded-lg flex-shrink-0">
        <img src={preview?.image?.path} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between gap-4 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center">
            <div className="lg:hidden overflow-hidden w-16 aspect-square object-cover rounded-lg">
              <img src={preview?.image?.path} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-lg lg:text-xl font-semibold">{name}</h2>
              <div className="flex lg:hidden items-center gap-2">
                <span className="bg-accent text-white text-xs font-bold py-0.5 px-1 rounded-sm">
                  {author?.title}
                </span>
                <p className="text-white font-semibold text-sm">{author?.name}</p>
              </div>
            </div>
          </div>

          <div className="line-clamp-3 overflow-hidden">
            <p className="text-grey font-medium text-sm">{stripTags(preview?.description)}</p>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <span className="bg-accent text-white text-xs font-bold py-0.5 px-1 rounded-sm">
              {author?.title}
            </span>
            <p className="text-white font-semibold text-sm">{author?.name}</p>
          </div>
        </div>
        <Link href={`/client/courses/${slugify(name, uuid)}`} className="button full accent py-1.5">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default DashboardCourseCard;
