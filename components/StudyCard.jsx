import { Link, Plural } from '@components';
import { useProfile } from '@hooks';
import { ago, slugify } from '@functions';

const StudyCard = ({ _id: uuid, icon, color, name, chapters = [], createdAt }) => {
  const { me } = useProfile();

  return (
    <Link
      href={`/${me?.role}/studio/${slugify(name, uuid)}`}
      className="flex flex-col cursor-pointer gap-4 bg-surface border border-border p-3 lg:p-4 hover:bg-secondary transition-all duration-150 rounded-lg lg:rounded-xl overflow-hidden shadow-sm"
    >
      <div className="flex items-center gap-4">
        <div
          className="
            w-10
            h-10
            rounded-full
            overflow-hidden
            shadow-md
            flex items-center justify-center
          "
          style={{
            background: color,
          }}
        >
          <div className="text-xl text-white">
            <i className={`fas ${icon}`} aria-hidden="true"></i>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <p className="lg:text-xl truncate font-medium text-primary">{name}</p>
          <div className="flex items-center gap-1 text-xs mt-1 text-muted">
            <p>{ago(createdAt)}</p>
            <span>|</span>
            <Plural count={chapters.length} one="chapter" many="chapters" />
          </div>
        </div>
      </div>
      <ul className="list-disc list-inside text-xs lg:text-sm text-muted">
        {chapters.slice(0, 3).map((chapter) => (
          <li key={chapter._id} className="truncate">
            {chapter.name}
          </li>
        ))}
      </ul>
    </Link>
  );
};

export default StudyCard;
