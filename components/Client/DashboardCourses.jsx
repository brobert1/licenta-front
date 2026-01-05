import { LoadMoreOnClick } from '@components/Buttons';
import { CoursesListSkeleton } from '@components/Course';
import { useQuery } from '@hooks';
import DashboardCoursesSuccess from './DashboardCoursesSuccess';

const DashboardCourses = () => {
  const { data, status, ...props } = useQuery('/client/enrolled-courses');

  return (
    <>
      {status === 'loading' && <CoursesListSkeleton type="loading" />}
      {status === 'error' && <CoursesListSkeleton type="error" />}
      {status === 'success' && (
        <>
          <DashboardCoursesSuccess data={data} {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default DashboardCourses;
