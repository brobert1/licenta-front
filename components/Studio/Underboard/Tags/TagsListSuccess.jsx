import { Button } from '@components';
import { isEmpty } from 'lodash';

const TagsListSuccess = ({ tags, selectedTags = [], onRemoveTag, onTagsChange }) => {
  const handleTagSelection = (tag) => {
    const isSelected = selectedTags.some((selectedTag) => selectedTag._id === tag._id);
    let newSelectedTags;

    if (isSelected) {
      newSelectedTags = selectedTags.filter((selectedTag) => selectedTag._id !== tag._id);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }

    if (onTagsChange) {
      onTagsChange(newSelectedTags);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {!isEmpty(tags) ? (
        tags.map((tag) => {
          const isSelected = selectedTags.some((selectedTag) => selectedTag._id === tag._id);
          return (
            <div
              key={tag._id}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-accent text-white shadow-sm border-2 border-accent'
                  : 'bg-secondary text-primary hover:bg-tertiary border-2 border-transparent'
              }`}
              onClick={() => handleTagSelection(tag)}
            >
              <span className="select-none">{tag.name}</span>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveTag(tag._id);
                }}
                className="hover:bg-red-500 hover:text-white rounded p-0.5 transition-colors duration-150 flex items-center justify-center w-4 h-4"
                type="button"
              >
                <i className="fa fa-times text-xs"></i>
              </Button>
            </div>
          );
        })
      ) : (
        <div className="text-center py-4 w-full">
          <i className="fas fa-tags text-2xl text-muted mb-2"></i>
          <p className="text-muted">No tags yet. Add one above!</p>
        </div>
      )}
    </div>
  );
};

export default TagsListSuccess;
