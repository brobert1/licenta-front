import { LoadMoreOnClick } from '@components/Buttons';
import { useInfiniteQuery } from '@hooks';
import CourseLessonsSkeleton from './CourseLessonsSkeleton';
import CourseLessonsSuccess from './CourseLessonsSuccess';

const CourseLessons = ({ id }) => {
  const { data, status, ...props } = useInfiniteQuery('/studies', { course: id });

  return (
    <>
      {status === 'loading' && <CourseLessonsSkeleton type="loading" />}
      {status === 'error' && <CourseLessonsSkeleton type="error" />}
      {status === 'success' && (
        <>
          <CourseLessonsSuccess data={data} {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default CourseLessons;
