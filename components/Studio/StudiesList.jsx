import { LoadMoreOnClick } from '@components/Buttons';
import { useInfiniteQuery } from '@hooks';
import StudiesListSkeleton from './StudiesListSkeleton';
import StudiesListSuccess from './StudiesListSuccess';

const StudiesList = ({ options }) => {
  const { data, status, ...props } = useInfiniteQuery('/studies', options);

  return (
    <>
      {status === 'loading' && <StudiesListSkeleton type="loading" />}
      {status === 'error' && <StudiesListSkeleton type="error" />}
      {status === 'success' && (
        <>
          <StudiesListSuccess data={data} {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default StudiesList;
