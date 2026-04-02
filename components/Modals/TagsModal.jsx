import { updateStudy } from '@api/client';
import { Button } from '@components';
import { TagManagement } from '@components/Studio/Underboard/Tags';
import { useStudyContext } from '@contexts/StudyContext';
import { useMutation } from '@hooks';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';

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
    <Modal
      show={isOpen}
      onHide={hide}
      backdrop="static"
      keyboard={false}
      centered
      contentClassName="modal-theme-light"
    >
      <Modal.Header className="flex items-center w-full justify-between border-b border-border">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase font-semibold text-primary">
            Manage Tags
          </h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <i className="fa-solid fa-xmark text-lg text-primary"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="admin-form space-y-4">
          <p className="text-primary">Select tags for this study.</p>
          <TagManagement selectedTags={selectedTags} onTagsChange={handleTagsChange} />
        </div>
      </Modal.Body>
      <Modal.Footer className="flex w-full gap-4 border-t border-border">
        <Button className="button full accent" onClick={handleSave} disabled={mutation.isLoading}>
          Save Tags ({selectedTags.length})
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TagsModal;
