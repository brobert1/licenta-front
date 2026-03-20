import { Link } from '@components';
import { useQuery } from '@hooks';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  const { data, status } = useQuery('/courses', { perPage: 6 });
  const courses = status === 'success' && data?.pages ? data.pages.flat() : [];

  return (
    <section className="py-24 px-4 lg:px-24 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-headline text-black mb-2">Grandmaster Courses</h2>
            <p className="text-secondary-muted max-w-md font-landing">
              Learn from the legends. Our courses are produced with cinematic quality and
              pedagogical rigor.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-sm font-bold uppercase tracking-widest text-tertiaryGold flex items-center gap-2 group font-landing shrink-0"
          >
            Browse Full Catalog
            <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {status === 'loading' && (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-surface-container-high animate-pulse aspect-video"
              />
            ))}
          </div>
        )}
        {status === 'success' && courses.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course._id} {...course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
