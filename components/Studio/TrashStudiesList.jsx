import { useQuery } from '@hooks';
import StudiesListSkeleton from './StudiesListSkeleton';
import TrashStudiesListSuccess from './TrashStudiesListSuccess';

const TrashStudiesList = ({ options }) => {
  const { data, status, refetch } = useQuery('/studies/trash', options);

  return (
    <>
      {status === 'loading' && <StudiesListSkeleton type="loading" />}
      {status === 'error' && <StudiesListSkeleton type="error" />}
      {status === 'success' && <TrashStudiesListSuccess data={data} refetch={refetch} />}
    </>
  );
};

export default TrashStudiesList;
