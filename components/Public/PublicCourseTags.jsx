import { isEmpty } from 'lodash';

const PublicCourseTags = ({ tags }) => {
  if (isEmpty(tags)) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
      <i className="fa-regular fa-tags"></i>
      <p>
        {tags.map((tag, i) => (
          <span key={i}>
            {tag}
            {i < tags.length - 1 && ', '}
          </span>
        ))}
      </p>
    </div>
  );
};

export default PublicCourseTags;
