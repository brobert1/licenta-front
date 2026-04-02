import { createStudy } from '@api/client';
import { IconPicker, Input } from '@components/Fields';
import { Field, Fieldset, Form, HookForm, Submit } from '@components/HookForm';
import { slugify } from '@functions';
import { useMutation, useProfile } from '@hooks';
import { initialValues, validationSchema, validationSchemaAdmin } from '@models/client/add-study';
import { useRouter } from 'next/router';

const AddStudyForm = ({ courseId, courseName, hide }) => {
  const { me } = useProfile();
  const router = useRouter();

  const mutation = useMutation(createStudy, {
    successCallback: () => {
      hide();
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await mutation.mutateAsync({ ...values });
      const { _id: uuid, name } = response.data;
      router.push(`/${me?.role}/studio/${slugify(name, uuid)}#new`);
    } catch (error) {
      console.error('Failed to create study:', error);
    }
  };

  const mergedInitialValues = courseId ? { ...initialValues, course: courseId } : initialValues;

  return (
    <HookForm
      validationSchema={me?.role === 'admin' ? validationSchemaAdmin : validationSchema}
      initialValues={mergedInitialValues}
      onSubmit={handleSubmit}
    >
      <Form className="admin-form">
        <div className="w-full flex gap-4">
          <div className="w-30">
            <Fieldset name="icon" label="Icon">
              <Field id="icon" name="icon" as={IconPicker} />
            </Fieldset>
          </div>
          <div className="flex-1">
            <Fieldset name="name" label="Study name">
              <Field id="name" name="name" as={Input} placeholder={`${me.name}'s Study`} />
            </Fieldset>
          </div>
        </div>
        {me?.role === 'admin' && courseId && (
          <div className="w-full mt-4">
            <Fieldset name="course" label="Course">
              <Input value={courseName} disabled />
              <Field id="course" name="course" as="input" type="hidden" />
            </Fieldset>
          </div>
        )}
        <div className="flex gap-2 mt-6 rounded text-muted">
          <i className="fas fa-info-circle"></i>
          <p className="text-xs">
            After adding it, you will be redirected to the study's page. There you can start adding
            your data.
          </p>
        </div>
        <div className="col-span-2 mt-4 flex justify-end">
          <Submit className="button full accent font-semibold text-base">Add Study</Submit>
        </div>
      </Form>
    </HookForm>
  );
};

export default AddStudyForm;
