import { softDeleteStudy, updateStudy } from '@api/client';
import { Button } from '@components';
import { Checkbox, Input } from '@components/Fields';
import { useMutation, useProfile } from '@hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const StudySettingsModal = ({ hide, isOpen, study, onUpdateSuccess }) => {
  const [studyName, setStudyName] = useState(study?.name || '');
  const [isActive, setIsActive] = useState(study?.active ?? true);
  const { me } = useProfile();
  const router = useRouter();

  useEffect(() => {
    setStudyName(study?.name || '');
    setIsActive(study?.active ?? true);
  }, [isOpen, study?.name, study?.active]);

  const updateMutation = useMutation(updateStudy, {
    successCallback: () => {
      onUpdateSuccess?.();
      hide();
    },
  });

  const deleteMutation = useMutation(softDeleteStudy, {
    successCallback: () => {
      const redirectUrl = study?.course
        ? `/${me?.role}/courses/${study.course}`
        : `/${me?.role}/studio`;
      router.push(redirectUrl);
    },
  });

  const handleSave = async () => {
    const hasNameChanged = studyName.trim() && studyName.trim() !== study.name;
    const hasActiveChanged = isActive !== study.active;

    if (!hasNameChanged && !hasActiveChanged) return;

    await updateMutation.mutateAsync({
      id: study._id,
      name: studyName.trim() || study.name,
      active: isActive,
    });
  };

  const handleDeleteStudy = async () => {
    await deleteMutation.mutateAsync(study._id);
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
            {study.name}
          </h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <i className="fa-solid fa-xmark text-lg text-primary"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="admin-form">
          <div>
            <label className="block text-sm font-medium text-primary">Study Name</label>
            <Input
              value={studyName}
              onChange={(e) => setStudyName(e.target.value)}
              placeholder="Enter study name"
              className="input"
            />
          </div>
          {me?.role === 'admin' && (
            <div className="mt-4 text-primary">
              <Checkbox value={isActive} onChange={setIsActive}>
                Published
              </Checkbox>
            </div>
          )}
          <div className="flex justify-between items-center gap-4 mt-4 mb-4">
            <div className="flex gap-2">
              <Button
                onClick={handleDeleteStudy}
                disabled={deleteMutation.isLoading}
                className="button full delete whitespace-nowrap"
              >
                Delete Study
              </Button>
            </div>
            <Button
              onClick={handleSave}
              disabled={updateMutation.isLoading}
              className="button full accent"
            >
              Save
            </Button>
          </div>
          <p className="text-xs text-muted mt-2">
            <i className="fa-solid fa-info-circle mr-1"></i>
            The study won't be completely deleted. It will be placed in the trash for 30 days so you
            can recover it.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StudySettingsModal;
