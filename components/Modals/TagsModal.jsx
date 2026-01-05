import { Button } from '@components';
import TagManagement from '@components/Studio/Underboard/Tags/TagManagement';
import { useMutation } from '@hooks';
import { useStudyContext } from '@contexts/StudyContext';
import { updateStudy } from '@api/client';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const TagsModal = ({ hide, isOpen, initialSelectedTags = [] }) => {
  const { study } = useStudyContext();
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags);

  // Reset selected tags when initialSelectedTags change
  useEffect(() => {
    setSelectedTags(initialSelectedTags);
  }, [initialSelectedTags]);

  const mutation = useMutation(updateStudy, {
    invalidateQueries: `/studies/${study?._id}`,
    successCallback: () => {
      hide();
    },
  });

  const handleTagsChange = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  const handleSave = async () => {
    await mutation.mutateAsync({
      id: study._id,
      tags: selectedTags,
    });
  };

  return (
    <Modal show={isOpen} onHide={hide} backdrop="static" keyboard={false} centered>
      <Modal.Header className="flex items-center w-full justify-between">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase font-semibold">Manage Tags</h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <i className="fa-solid fa-xmark text-lg text-white"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <p className="text-white">Select tags for this study.</p>
          <TagManagement selectedTags={selectedTags} onTagsChange={handleTagsChange} />
        </div>
      </Modal.Body>
      <Modal.Footer className="flex w-full gap-4">
        <Button className="button full accent" onClick={handleSave} disabled={mutation.isLoading}>
          Save Tags ({selectedTags.length})
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TagsModal;
