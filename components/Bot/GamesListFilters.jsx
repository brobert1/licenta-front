import { GameFiltersForm } from '@components/Forms';
import { Form, HookForm } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/game-filters';

const GamesListFilters = ({ setOptions }) => {
  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={setOptions}
      autoSubmit={true}
    >
      <Form>
        <GameFiltersForm />
      </Form>
    </HookForm>
  );
};

export default GamesListFilters;
