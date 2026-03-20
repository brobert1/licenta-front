import { Link } from '@components';

const CourseCard = ({ name, preview, author, difficulty }) => (
  <Link href="/courses" className="group block cursor-pointer">
    <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative">
      <img
        src={preview?.image?.path || '/images/1234861669219094.png'}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <span className="absolute top-4 right-4 px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full uppercase tracking-widest font-landing">
        {difficulty || 'Beginner'}
      </span>
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
          <i className="fa-solid fa-play text-lg" />
        </div>
      </div>
    </div>
    <h4 className="text-xl font-headline italic text-black mb-2 group-hover:text-tertiaryGold transition-colors">
      {name}
    </h4>
    <div className="flex items-center gap-4 text-xs text-secondary-muted font-medium font-landing">
      <span className="flex items-center gap-1">
        <i className="fa-regular fa-clock text-sm" />
        12 hours
      </span>
      <span className="flex items-center gap-1">
        <i className="fa-regular fa-user text-sm" />
        {author?.name || 'GM'}
      </span>
    </div>
  </Link>
);

export default CourseCard;
