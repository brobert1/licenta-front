import Dropdown from '@components/Fields/Dropdown';
import Input from '@components/Fields/Input';
import { Field, Fieldset } from '@components/HookForm';
import { difficulties } from '@data';

const CourseDetails = () => {
  return (
    <div className="col-span-2 flex w-full flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Fieldset label="Course name" name="name">
          <Field
            as={Input}
            autoComplete="off"
            autoFocus
            name="name"
            placeholder="Chess Techniques"
          />
        </Fieldset>
        <Fieldset label="Difficulty" name="difficulty">
          <Field as={Dropdown} name="difficulty" placeholder="Choose difficulty">
            {difficulties.map((difficulty) => (
              <option key={difficulty.type} value={difficulty.type}>
                {difficulty.label}
              </option>
            ))}
          </Field>
        </Fieldset>
      </div>
    </div>
  );
};

export default CourseDetails;
