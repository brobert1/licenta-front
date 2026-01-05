import { isEmpty } from 'lodash';
import { PublicCourseCard } from '.';

const PublicCoursesSuccess = ({ data }) => {
  if (isEmpty(data.pages.flat())) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-5 text-gray-400">
        <i className="fa-thin fa-chess-queen text-7xl"></i>
        <div className="flex flex-col items-center">
          <p className="text-base">No courses found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.pages.flat().map((course, i) => (
        <PublicCourseCard key={`chess-course-${i}`} {...course} />
      ))}
    </div>
  );
};

export default PublicCoursesSuccess;
