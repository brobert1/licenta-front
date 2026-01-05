import { Form, HookForm } from '@components/HookForm';
import { StudiesFiltersForm } from '.';
import { initialValues, validationSchema } from '@models/studies-filters';

const StudiesListFilters = ({ setOptions }) => {
  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={setOptions}
      autoSubmit={true}
    >
      <Form>
        <StudiesFiltersForm />
      </Form>
    </HookForm>
  );
};

export default StudiesListFilters;
