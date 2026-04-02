import { Form, HookForm } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/studies-filters';
import StudiesFiltersForm from './StudiesFiltersForm';

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
