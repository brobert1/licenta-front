import { Form, HookForm } from '@components/HookForm';
import { createClient } from '@api/admin';
import { useMutation } from '@hooks';
import { clientInitialValues, clientValidationSchema } from '@models/admin/client';
import ClientDetailsForm from './ClientDetailsForm';

const AddClientForm = () => {
  const mutation = useMutation(createClient, {
    invalidateQueries: '/admin/clients',
    redirectOnSuccess: '/admin/clients',
  });

  const handleSubmit = (values) => mutation.mutateAsync(values);

  return (
    <HookForm
      initialValues={clientInitialValues}
      onSubmit={handleSubmit}
      validationSchema={clientValidationSchema}
    >
      <Form className="admin-form flex flex-col gap-4 pb-24 font-heading">
        <ClientDetailsForm isLoading={mutation.isLoading} />
      </Form>
    </HookForm>
  );
};

export default AddClientForm;
