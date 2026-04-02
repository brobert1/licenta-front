import { useQuery } from '@hooks';
import EditCourseFormSkeleton from './EditCourseFormSkeleton';
import EditCourseFormError from './EditCourseFormError';
import EditCourseFormSuccess from './EditCourseFormSuccess';

const EditCourseForm = ({ id }) => {
  const { data, status } = useQuery(`/admin/courses/${id}`);

  return (
    <article>
      {status === 'error' && <EditCourseFormError />}
      {status === 'loading' && <EditCourseFormSkeleton />}
      {status === 'success' && <EditCourseFormSuccess data={data} />}
    </article>
  );
};

export default EditCourseForm;
