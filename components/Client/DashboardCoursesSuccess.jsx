import { isEmpty } from 'lodash';
import DashboardCourseCard from './DashboardCourseCard';

const DashboardCoursesSuccess = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {isEmpty(data.pages.flat()) && (
        <div className="mt-8 flex flex-col items-center justify-center gap-5 text-gray-400 w-full">
          <i className="fa-thin fa-chess-queen text-7xl"></i>
          <div className="flex flex-col items-center">
            <p className="text-base">You haven't purchased any courses</p>
          </div>
        </div>
      )}
      {data.pages.flat().map((course, i) => {
        return <DashboardCourseCard key={`chess-course-${i}`} {...course} />;
      })}
    </div>
  );
};

export default DashboardCoursesSuccess;
