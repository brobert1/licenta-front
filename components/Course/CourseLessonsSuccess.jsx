import { NoDataPlaceholder } from '@components';
import StudyCard from '@components/StudyCard';
import { isEmpty } from 'lodash';

const CourseLessonsSuccess = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {isEmpty(data.pages.flat()) && (
        <NoDataPlaceholder
          icon="fa-light fa-chess"
          message="No studies associated with this course yet."
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.pages.flat().map((study, i) => (
          <StudyCard key={`course-study-${i}`} {...study} />
        ))}
      </div>
    </div>
  );
};

export default CourseLessonsSuccess;
