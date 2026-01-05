import { Field, Fieldset } from '@components/HookForm';
import Checkbox from '@components/Fields/Checkbox';

const CourseSettings = () => {
  return (
    <div className="bg-secondary w-full p-4 lg:rounded-lg lg:p-6">
      <h2 className="border-b pb-2 text-white text-lg font-semibold">Settings</h2>
      <div className="mt-4 flex flex-col gap-2">
        <Fieldset name="active">
          <Field as={Checkbox} name="active">
            Published
          </Field>
        </Fieldset>
        <Fieldset name="hasMoveTrainer">
          <Field as={Checkbox} name="hasMoveTrainer">
            Has move trainer
          </Field>
        </Fieldset>
      </div>
    </div>
  );
};

export default CourseSettings;
