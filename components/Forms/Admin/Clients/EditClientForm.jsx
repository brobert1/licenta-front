import { useQuery } from '@hooks';
import EditClientFormSuccess from './EditClientFormSuccess';
import EditClientFormSkeleton from './EditClientFormSkeleton';
import EditClientFormError from './EditClientFormError';

const EditClientForm = ({ id }) => {
  const { data, status } = useQuery(`/admin/clients/${id}`);

  return (
    <article>
      {status === 'error' && <EditClientFormError />}
      {status === 'loading' && <EditClientFormSkeleton />}
      {status === 'success' && <EditClientFormSuccess data={data} />}
    </article>
  );
};

export default EditClientForm;
