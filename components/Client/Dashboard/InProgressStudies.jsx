import { Link } from '@components';
import { useQuery } from '@hooks';

const DIFFICULTY_COLORS = {
  novice: 'text-green-400',
  beginner: 'text-green-500',
  intermediate: 'text-blue-400',
  advanced: 'text-orange-400',
  expert: 'text-red-500',
};

const InProgressStudies = () => {
  const { data: courses, status } = useQuery('/client/enrolled-courses/progress');

  const items = courses?.slice(0, 3) || [];

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-headline text-xl text-on-surface">In-Progress Courses</h2>
        <Link
          href="/client/courses"
          className="text-sm font-landing font-semibold text-tertiaryGold hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        {status === 'loading' &&
          [0, 1, 2].map((i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-2">
                <div className="h-3.5 w-48 bg-surface-container-high rounded animate-pulse" />
                <div className="h-3 w-8 bg-surface-container-high rounded animate-pulse" />
              </div>
              <div className="h-2 bg-surface-container-high rounded-full" />
            </div>
          ))}

        {status === 'success' && items.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <i className="fa-regular fa-graduation-cap text-3xl text-secondary-muted/40" />
            <p className="font-landing text-sm text-secondary-muted">No courses enrolled yet</p>
            <Link href="/client/courses" className="font-landing text-xs text-tertiaryGold hover:underline">
              Browse courses
            </Link>
          </div>
        )}

        {status === 'success' &&
          items.map((course) => (
            <Link key={course._id} href={`/client/courses/${course._id}`}>
              <div className="group cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-landing font-medium text-on-surface truncate group-hover:text-tertiaryGold transition-colors">
                      {course.name}
                    </span>
                    {course.difficulty && (
                      <span className={`font-landing text-xs capitalize flex-shrink-0 ${DIFFICULTY_COLORS[course.difficulty] || 'text-secondary-muted'}`}>
                        · {course.difficulty}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-landing font-semibold text-secondary-muted flex-shrink-0 ml-3">
                    {course.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-tertiaryGold rounded-full transition-all"
                    style={{ width: `${course.percentage}%` }}
                  />
                </div>
                <p className="font-landing text-xs text-secondary-muted mt-1">
                  {course.completedChapters} / {course.totalChapters} chapters
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default InProgressStudies;
