import { useQuery } from '@hooks';
import CoursePageSkeleton from './CoursePageSkeleton';
import CoursePageError from './CoursePageError';
import CoursePageContent from './CoursePageContent';

const CoursePage = ({ id }) => {
  const { data, status } = useQuery(`/professor/courses/${id}`);

  if (!id) {
    return <CoursePageSkeleton />;
  }

  return (
    <article>
      {status === 'error' && <CoursePageError />}
      {status === 'loading' && <CoursePageSkeleton />}
      {status === 'success' && <CoursePageContent data={data} />}
    </article>
  );
};

export default CoursePage;
