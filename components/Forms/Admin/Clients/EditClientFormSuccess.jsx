import { Form, HookForm } from '@components/HookForm';
import { updateClient } from '@api/admin';
import { useMutation } from '@hooks';
import { clientInitialValues, clientValidationSchema } from '@models/admin/client';
import ClientDetailsForm from './ClientDetailsForm';

const EditClientFormSuccess = ({ data }) => {
  const initialValues = {
    ...clientInitialValues,
    ...data,
  };
  delete initialValues.password;
  delete initialValues.confirmPassword;

  const mutation = useMutation(updateClient, {
    invalidateQueries: '/admin/clients',
    redirectOnSuccess: '/admin/clients',
  });

  const handleSubmit = (values) => mutation.mutateAsync(values);

  return (
    <HookForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={clientValidationSchema.omit(['password', 'confirmPassword'])}
    >
      <Form className="admin-form flex flex-col gap-4 pb-24 font-heading">
        <ClientDetailsForm isEditing isLoading={mutation?.isLoading} />
      </Form>
    </HookForm>
  );
};

export default EditClientFormSuccess;
