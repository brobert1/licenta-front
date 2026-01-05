import { LoadMoreOnClick } from '@components/Buttons';
import { useQuery } from '@hooks';
import { PublicCoursesSuccess } from '.';
import { Error, Loading } from '@components';

const PublicCourses = () => {
  const { data, status, ...props } = useQuery('/courses');

  return (
    <>
      {status === 'loading' && <Loading />}
      {status === 'error' && <Error message="Courses could not be loaded" />}
      {status === 'success' && (
        <>
          <PublicCoursesSuccess data={data} {...props} />
          <div>
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default PublicCourses;
