import { NoDataPlaceholder } from '@components';
import { useProfile } from '@hooks';
import { classnames } from '@lib';
import { isEmpty } from 'lodash';
import { TrashStudyCard } from '.';

const TrashStudiesListSuccess = ({ data, refetch }) => {
  const { me } = useProfile();
  const studies = data?.data || [];

  return (
    <div className="col-span-3 flex flex-col gap-4">
      {isEmpty(studies) && (
        <NoDataPlaceholder
          icon="fa-light fa-trash"
          message="No deleted studies found."
          extraClass="col-span-2"
        />
      )}
      <div className={classnames(
        'grid grid-cols-1 sm:grid-cols-2 gap-6',
        (me?.role === 'admin' || me?.role === 'professor') && 'lg:grid-cols-3'
      )}>
        {studies.map((study, i) => (
          <TrashStudyCard key={`trash-study-${i}`} refetch={refetch} {...study} />
        ))}
      </div>
    </div>
  );
};

export default TrashStudiesListSuccess;
