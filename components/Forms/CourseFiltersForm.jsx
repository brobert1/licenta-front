import { RadioGroup } from '@components/Fields';
import { Radio } from '@components/Fields/Courses';
import { Field, Fieldset } from '@components/HookForm';
import { useFormContext } from 'react-hook-form';

const CourseFiltersForm = () => {
  const { watch } = useFormContext();

  // Watch all form values
  const values = watch();

  return (
    <div className="hidden lg:flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <Fieldset name="popularFilters" label="POPULAR FILTERS">
          <Field
            id="popularFilters"
            name="popularFilters"
            as={RadioGroup}
            selectedValue={values?.popularFilters}
          >
            <Radio value="">All</Radio>
            <Radio value="popular">Popular now</Radio>
            <Radio value="bestseller">Best Seller</Radio>
            <Radio value="strategy">Strategy</Radio>
          </Field>
        </Fieldset>
      </div>
      <div className="flex flex-col gap-1.5">
        <Fieldset name="gameAspect" label="GAME ASPECT">
          <Field
            id="gameAspect"
            name="gameAspect"
            as={RadioGroup}
            selectedValue={values?.gameAspect}
          >
            <Radio value="">All</Radio>
            <Radio value="openings">Openings</Radio>
            <Radio value="endgames">Endgames</Radio>
            <Radio value="strategy">Strategy</Radio>
            <Radio value="tactics">Tactics</Radio>
            <Radio value="masterclass">Masterclass</Radio>
          </Field>
        </Fieldset>
      </div>
      <div className="flex flex-col gap-1.5">
        <Fieldset name="difficulty" label="DIFFICULTY">
          <Field
            id="difficulty"
            name="difficulty"
            as={RadioGroup}
            selectedValue={values?.difficulty}
          >
            <Radio value="">All</Radio>
            <Radio value="novice">
              <span className="h-2 w-2 bg-sky-300 rounded-full"></span>Novice
            </Radio>
            <Radio value="beginner">
              <span className="h-2 w-2 bg-green-400 rounded-full"></span>Beginner
            </Radio>
            <Radio value="intermediate">
              <span className="h-2 w-2 bg-orange-300 rounded-full"></span>Intermediate
            </Radio>
            <Radio value="advanced">
              <span className="h-2 w-2 bg-red-400 rounded-full"></span>Advanced
            </Radio>
            <Radio value="expert">
              <span className="h-2 w-2 bg-purple-400 rounded-full"></span>Expert
            </Radio>
          </Field>
        </Fieldset>
      </div>
    </div>
  );
};

export default CourseFiltersForm;
