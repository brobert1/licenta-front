import { NoDataPlaceholder } from '@components';
import { isEmpty } from 'lodash';
import LessonCard from './LessonCard';

const PreviewList = ({ content = [], user, isPreview }) => {
  const sortedContent = [...content]
    .filter((item) => item.kind === 'study' && !isEmpty(item.chapters))
    .sort((a, b) => a.index - b.index);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5">
        {sortedContent.length === 0 && (
          <NoDataPlaceholder
            icon="fa-light fa-chess"
            message="No content available at the moment"
            extraClass="col-span-3"
          />
        )}
        {sortedContent.map((data) => (
          <LessonCard
            key={data._id}
            _id={data._id}
            name={data.name}
            chapters={data.chapters}
            completedChapters={data.completedChapters}
            user={user}
            isOwned={user.isOwned}
            active={data.active}
            isPreview={isPreview}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviewList;
