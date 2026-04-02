import { Error } from '@components';
import { useQuery } from '@hooks';
import { isEmpty } from 'lodash';
import { GraduationCap } from 'lucide-react';
import GuestCourseCard from './GuestCourseCard';

const CoursesSection = () => {
  const { data, status } = useQuery('/courses');

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-interactive" strokeWidth={2} aria-hidden />
        <h2 className="text-lg font-bold text-primary">Courses</h2>
      </div>
      {status === 'loading' && (
        <div className="flex flex-col gap-3">
          <div className="h-24 animate-pulse rounded-2xl bg-tertiary" />
          <div className="h-24 animate-pulse rounded-2xl bg-tertiary" />
          <div className="h-24 animate-pulse rounded-2xl bg-tertiary" />
        </div>
      )}
      {status === 'error' && <Error message="Courses could not be loaded" />}
      {status === 'success' && (
        <div className="flex flex-col gap-4">
          {isEmpty(data?.pages?.flat()) ? (
            <div className="rounded-2xl bg-secondary p-6 text-center text-muted">
              <p className="text-sm">No courses available yet.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {data.pages.flat().map((course) => (
                <li key={course._id}>
                  <GuestCourseCard basePath="/guest/courses" {...course} guest />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default CoursesSection;
