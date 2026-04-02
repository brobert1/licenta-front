import { NoDataPlaceholder } from '@components';
import StudyCard from '@components/StudyCard';
import { isEmpty } from 'lodash';

const StudiesListSuccess = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {isEmpty(data.pages.flat()) && (
        <NoDataPlaceholder
          icon="fa-light fa-chess"
          message="You haven't created any studies yet."
          extraClass="col-span-2"
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.pages.flat().map((study, i) => (
          <StudyCard key={`chess-study-${i}`} {...study} />
        ))}
      </div>
    </div>
  );
};

export default StudiesListSuccess;
