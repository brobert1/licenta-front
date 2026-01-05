import { LoadMoreOnClick } from '@components/Buttons';
import { useInfiniteQuery } from '@hooks';
import { CoursesListSkeleton, CoursesListSuccess } from '.';

const CoursesList = ({ isPreview }) => {
  const endpoint = isPreview ? '/admin/courses' : '/client/courses';
  const { data, status, ...props } = useInfiniteQuery(endpoint);

  return (
    <>
      {status === 'loading' && <CoursesListSkeleton type="loading" />}
      {status === 'error' && <CoursesListSkeleton type="error" />}
      {status === 'success' && (
        <>
          <CoursesListSuccess data={data} {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default CoursesList;
