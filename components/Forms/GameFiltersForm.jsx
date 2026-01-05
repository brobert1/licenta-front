import { Search } from '@components/Fields';
import { Field, Fieldset } from '@components/HookForm';

const GameFiltersForm = () => {
  return (
    <div className="space-y-6">
      <div className="hidden md:flex gap-4">
        <div className="flex-1 min-w-64">
          <Fieldset name="search">
            <Field name="search" as={Search} placeholder="Search by opponent name..." />
          </Fieldset>
        </div>
        <div className="min-w-40">
          <Fieldset name="result">
            <Field
              name="result"
              as="select"
              className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">All Results</option>
              <option value="win">Wins</option>
              <option value="loss">Losses</option>
              <option value="draw">Draws</option>
            </Field>
          </Fieldset>
        </div>
      </div>
      <div className="md:hidden space-y-3">
        <Fieldset name="search">
          <Field name="search" as={Search} placeholder="Search by opponent name..." />
        </Fieldset>
        <Fieldset name="result">
          <Field
            name="result"
            as="select"
            className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Results</option>
            <option value="win">Wins</option>
            <option value="loss">Losses</option>
            <option value="draw">Draws</option>
          </Field>
        </Fieldset>
      </div>
    </div>
  );
};

export default GameFiltersForm;
