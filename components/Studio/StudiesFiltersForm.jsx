import { RadioGroup } from '@components/Fields';
import { Field, Fieldset } from '@components/HookForm';
import { useQuery } from '@hooks';
import { useFormContext } from 'react-hook-form';
import TagsFiltersSkeleton from './Underboard/Tags/TagsFiltersSkeleton';
import UnderlineRadio from './UnderlineRadio';

const StudiesFiltersForm = () => {
  const { data, status } = useQuery('/tags');

  const { watch } = useFormContext();
  const values = watch();

  return (
    <div className="w-full">
      <Fieldset name="tag">
        <Field id="tag" name="tag" as={RadioGroup} selectedValue={values?.tag}>
          {status === 'loading' && <TagsFiltersSkeleton type="loading" isMobile={true} />}
          {status === 'error' && <TagsFiltersSkeleton type="error" isMobile={true} />}
          {status === 'success' && (
            <div className="flex gap-1 overflow-x-auto scrollbar-none pb-2">
              <UnderlineRadio value="" className="flex-shrink-0">
                All
              </UnderlineRadio>
              {data?.map((tag) => (
                <UnderlineRadio key={tag._id} value={tag.name} className="flex-shrink-0">
                  {tag.name}
                </UnderlineRadio>
              ))}
            </div>
          )}
        </Field>
      </Fieldset>
    </div>
  );
};

export default StudiesFiltersForm;
