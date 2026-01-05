import { addStudyChapter, updateStudyChapter } from '@api/client';
import { Input } from '@components/Fields';
import { PgnStudyField, PositionSetup, StudyDetails } from '@components/Fields/Client/Studio';
import { Field, Fieldset, Form, HookForm, Submit } from '@components/HookForm';
import { useMutation } from '@hooks';
import { initialValues, validationSchema } from '@models/client/add-study-chapter';
import { Tab, Tabs } from 'react-bootstrap';

const AddStudyChapterForm = ({ hide, chapter, isJustCreated, refetch }) => {
  // Add chapter values when chapter is just created
  const values = isJustCreated ? { ...initialValues, ...chapter } : initialValues;

  const mutation = useMutation(isJustCreated ? updateStudyChapter : addStudyChapter, {
    successCallback: () => {
      refetch();
      hide();
    },
  });

  const handleSubmit = async (values) => {
    try {
      const payload = isJustCreated
        ? { ...values, id: chapter._id }
        : { ...values, study: chapter.study };
      await mutation.mutateAsync(payload);
    } catch (error) {
      console.error('Failed to create study:', error);
    }
  };

  return (
    <HookForm validationSchema={validationSchema} initialValues={values} onSubmit={handleSubmit}>
      <Form>
        <div className="w-full flex gap-4">
          <div className="flex-1 mb-4">
            <Fieldset name="name" label="Name">
              <Field id="name" name="name" as={Input} />
            </Fieldset>
          </div>
        </div>
        <div className="w-full mt-4">
          <Tabs defaultActiveKey="empty" id="study-content-tabs" className="mb-3">
            <Tab eventKey="empty" title="Empty">
              <div className="mb-10 mt-6">
                <StudyDetails />
              </div>
            </Tab>
            <Tab eventKey="editor" title="Editor">
              <div className="mb-10 mt-6">
                <PositionSetup />
              </div>
            </Tab>
            <Tab eventKey="fen" title="FEN">
              <div className="mb-10 mt-6">
                <div className="mb-6">
                  <Fieldset name="fen">
                    <Field id="fen" name="fen" as={Input} />
                  </Fieldset>
                </div>
                <StudyDetails />
              </div>
            </Tab>
            <Tab eventKey="pgn" title="PGN">
              <div className="mb-10 mt-6">
                <Fieldset name="pgn">
                  <Field id="pgn" name="pgn" as={PgnStudyField} />
                </Fieldset>
                <div className="flex gap-2 mt-6 rounded text-neutral-400">
                  <i className="fas fa-info-circle"></i>
                  <p className="text-xs">
                    For each PGN in the uploaded file, a new chapter will be created.
                  </p>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="col-span-2 flex justify-end">
          <Submit className="button full primary font-semibold text-base">Create Chapter</Submit>
        </div>
      </Form>
    </HookForm>
  );
};

export default AddStudyChapterForm;
