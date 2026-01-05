import { CourseCard } from '@components/Course';
import { isEmpty } from 'lodash';

const CoursesListSuccess = ({ data }) => {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 w-full">
      {isEmpty(data.pages.flat()) && (
        <div className="mt-8 flex flex-col items-center justify-center gap-5 text-gray-400">
          <i className="fa-thin fa-chess-queen text-7xl"></i>
          <div className="flex flex-col items-center">
            <p className="text-base">No courses found</p>
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
