import { CourseCard } from '@components/Course';
import { isEmpty } from 'lodash';

const CoursesListSuccess = ({ data }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {isEmpty(data.pages.flat()) && (
        <div className="col-span-full py-20 flex flex-col items-center justify-center gap-6">
          <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center">
            <i className="fa-thin fa-chess-queen text-4xl text-secondary-muted" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-headline text-xl text-on-surface">No courses found</p>
            <p className="font-landing text-sm text-secondary-muted max-w-xs">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        </div>
      )}
      {data.pages.flat().map((course, i) => (
        <CourseCard key={`chess-course-${i}`} {...course} />
      ))}
    </div>
  );
};

export default CoursesListSuccess;
