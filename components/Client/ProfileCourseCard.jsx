import { Link } from '@components';
import { slugify, stripTags } from '@functions';
import { classnames } from '@lib';

const ProfileCourseCard = ({ _id: uuid, name, description, image, author, tags }) => {
  return (
    <Link
      className={classnames(
        'flex flex-col w-full text-white gap-4 rounded-lg bg-tertiary p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md'
      )}
      href={`/client/courses/${slugify(name, uuid)}/lessons`}
    >
      <div className="flex items-center gap-4">
        <div className="overflow-hidden w-12 h-12 rounded-full flex-shrink-0">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <h1 className="line-clamp-2 hover:text-gray-400 font-heading font-semibold leading-tight lg:text-base">
          {name}
        </h1>
      </div>
      <div className="flex w-full flex-col gap-2 text-sm text-white">
        <p className="line-clamp-2">{stripTags(description)}</p>

        <div className="flex justify-between text-xs text-white">
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-accent text-white px-2 py-0.5 rounded">{author?.title}</span>
            <p>{author?.name}</p>
          </div>
          <div className="flex text-white items-center gap-1">
            <i className="fa-regular fa-tags"></i>
            <span>{tags.join(', ')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCourseCard;
