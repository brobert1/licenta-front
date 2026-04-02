import { Button } from '@components';
import { Search } from '@components/Fields';
import { Field, Fieldset, Form, HookForm } from '@components/HookForm';
import { useDisclosure, useWindowSize } from '@hooks';
import { initialValues, validationSchema } from '@models/game-filters';

const GameFiltersForm = ({ setOptions }) => {
  const { isOpen: showMore, toggle } = useDisclosure();
  const { width } = useWindowSize();
  const isDesktop = width === null ? true : width >= 1024;

  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={setOptions}
      autoSubmit={true}
    >
      <Form className="mb-6">
        {isDesktop ? (
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-muted mb-1">Opponent</label>
              <Fieldset name="opponent">
                <Field name="opponent" as={Search} placeholder="Search opponent" />
              </Fieldset>
            </div>
            <div className="min-w-40">
              <label className="block text-xs font-medium text-muted mb-1">Result</label>
              <Fieldset name="result">
                <Field
                  name="result"
                  as="select"
                  className="rounded border border-border bg-surface px-3 py-2 text-sm text-primary w-full focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">All results</option>
                  <option value="win">Win</option>
                  <option value="loss">Loss</option>
                  <option value="draw">Draw</option>
                </Field>
              </Fieldset>
            </div>
            <div className="min-w-40">
              <label className="block text-xs font-medium text-muted mb-1">Period</label>
              <Fieldset name="period">
                <Field
                  name="period"
                  as="select"
                  className="rounded border border-border bg-surface px-3 py-2 text-sm text-primary w-full focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">All time</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </Field>
              </Fieldset>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Opponent</label>
              <Fieldset name="opponent">
                <Field name="opponent" as={Search} placeholder="Search opponent" />
              </Fieldset>
            </div>
            <Button
              type="button"
              onClick={toggle}
              className="flex items-center gap-1.5 text-sm text-primary self-center"
            >
              {showMore ? 'Hide filters' : 'See more filters'}
              <i className={`fa-solid fa-chevron-${showMore ? 'up' : 'down'} text-xs`} />
            </Button>
            {showMore && (
              <div className="flex flex-col gap-3 overflow-hidden animate-post-game-expand">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Result</label>
                  <Fieldset name="result">
                    <Field
                      name="result"
                      as="select"
                      className="rounded border border-border bg-surface px-3 py-2 text-sm text-primary w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">All results</option>
                      <option value="win">Win</option>
                      <option value="loss">Loss</option>
                      <option value="draw">Draw</option>
                    </Field>
                  </Fieldset>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Period</label>
                  <Fieldset name="period">
                    <Field
                      name="period"
                      as="select"
                      className="rounded border border-border bg-surface px-3 py-2 text-sm text-primary w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">All time</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                    </Field>
                  </Fieldset>
                </div>
              </div>
            )}
          </div>
        )}
      </Form>
    </HookForm>
  );
};

export default GameFiltersForm;
