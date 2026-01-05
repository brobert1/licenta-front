import { ActionModal, Button } from '@components';
import { Input } from '@components/Fields';
import { Field, Fieldset, Form, HookForm, Submit } from '@components/HookForm';
import { StudyDetails } from '@components/Fields/Client/Studio';
import { deleteStudyChapter, updateStudyChapter } from '@api/client';
import { useDisclosure, useMutation } from '@hooks';
import { Modal } from 'react-bootstrap';
import {
  initialValues as editInitialValues,
  validationSchema,
} from '@models/client/edit-study-chapter';

const EditStudyChapterModal = ({ isOpen, hide, chapter, refetch }) => {
  const { isOpen: isConfirmOpen, show: showConfirm, hide: hideConfirm } = useDisclosure();

  const mergedInitialValues = {
    ...editInitialValues,
    ...chapter,
  };

  const updateMutation = useMutation(updateStudyChapter, {
    invalidateQueries: `/studies/${chapter?.study?._id}`,
    successCallback: () => {
      refetch?.();
      hide();
    },
  });

  const deleteMutation = useMutation(deleteStudyChapter, {
    invalidateQueries: `/studies/${chapter?.study?._id}`,
    successCallback: () => {
      hideConfirm();
      refetch?.();
      hide();
    },
  });

  const handleSubmit = async (values) => {
    const payload = {
      id: chapter._id,
      name: values.name,
      orientation: values.orientation,
      analysis: values.analysis,
    };
    await updateMutation.mutateAsync(payload);
  };

  const handleDelete = async () => {
    hideConfirm();
    await deleteMutation.mutateAsync(chapter._id);
  };

  return (
    <>
      <Modal show={isOpen} onHide={hide} backdrop="static" keyboard={false} centered>
        <Modal.Header className="flex items-center w-full justify-between">
          <Modal.Title>
            <h3 className="font-heading first-letter:uppercase font-semibold">Edit chapter</h3>
          </Modal.Title>
          <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
            <i className="fa-solid fa-xmark text-lg text-white"></i>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <HookForm
            initialValues={mergedInitialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="w-full flex gap-4">
                <div className="flex-1 mb-4">
                  <Fieldset name="name" label="Name">
                    <Field id="name" name="name" as={Input} />
                  </Fieldset>
                </div>
              </div>
              <div className="w-full mt-2">
                <StudyDetails />
              </div>
              <div className="mt-6 flex w-full items-center justify-between gap-4">
                <Button
                  type="button"
                  className="button full text-white border-red-500 bg-red-500"
                  onClick={showConfirm}
                  disabled={deleteMutation.isLoading}
                  title="Delete chapter"
                >
                  Delete Chapter
                </Button>
                <div className="flex justify-end">
                  <Submit
                    className="button full primary font-semibold text-base"
                    disabled={updateMutation.isLoading}
                  >
                    Save Chapter
                  </Submit>
                </div>
              </div>
            </Form>
          </HookForm>
        </Modal.Body>
      </Modal>
      {isConfirmOpen && (
        <ActionModal
          cancelText="Back"
          confirmText="Delete"
          hide={hideConfirm}
          isLoading={deleteMutation.isLoading}
          isOpen={isConfirmOpen}
          onConfirm={handleDelete}
          title="Delete confirmation"
          variant="danger"
        >
          <p className="text-white">Are you sure you want to delete this chapter?</p>
        </ActionModal>
      )}
    </>
  );
};

export default EditStudyChapterModal;
