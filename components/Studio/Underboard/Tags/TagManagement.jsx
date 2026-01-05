import { Button } from '@components';
import { Input } from '@components/Fields';
import { useMutation, useQuery } from '@hooks';
import { createTag, removeTag } from '@api/client';
import { useState, useEffect } from 'react';
import { TagsListSkeleton, TagsListSuccess } from '.';

const TagManagement = ({ selectedTags = [], onTagsChange }) => {
  const { data, status } = useQuery('/tags');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (data && status === 'success') {
      setTags(data || []);
    }
  }, [data, status]);

  const createMutation = useMutation(createTag, {
    invalidateQueries: '/tags',
    successCallback: async () => {
      setNewTag('');
    },
  });

  const removeMutation = useMutation(removeTag, {
    invalidateQueries: '/tags',
  });

  const handleAddTag = async () => {
    if (newTag.trim() !== '' && !tags.some((tag) => tag.name === newTag.trim())) {
      await createMutation.mutateAsync({ name: newTag.trim() });
    }
  };

  const handleRemoveTag = async (tagId) => {
    await removeMutation.mutateAsync(tagId);
    const updatedSelectedTags = selectedTags.filter((selectedTag) => selectedTag._id !== tagId);
    if (updatedSelectedTags.length !== selectedTags.length && onTagsChange) {
      onTagsChange(updatedSelectedTags);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTag();
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex w-full max-w-xl flex-col gap-4 lg:flex-row">
        <Input
          className="input"
          name="value"
          placeholder="Enter new tag name"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          type="button"
          onClick={handleAddTag}
          className="text-white w-full lg:w-auto"
          disabled={createMutation.isLoading}
        >
          {createMutation.isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
        </Button>
      </div>
      <div className="mt-4">
        {status === 'loading' && <TagsListSkeleton type="loading" />}
        {status === 'error' && <TagsListSkeleton type="error" />}
        {status === 'success' && (
          <TagsListSuccess
            tags={tags}
            selectedTags={selectedTags}
            onRemoveTag={handleRemoveTag}
            onTagsChange={onTagsChange}
          />
        )}
      </div>
    </div>
  );
};

export default TagManagement;
