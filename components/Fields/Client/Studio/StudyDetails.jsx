import { Dropdown, Input } from '@components/Fields';
import { Field, Fieldset } from '@components/HookForm';
import { useProfile } from '@hooks';

const StudyDetails = () => {
  const { me } = useProfile();

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex gap-4">
        <div className="w-1/2">
          <Fieldset name="variant" label="Variant">
            <Field id="variant" name="variant" as={Input} readOnly />
          </Fieldset>
        </div>
        <div className="w-1/2">
          <Fieldset name="orientation" label="Orientation">
            <Field as={Dropdown} name="orientation" id="orientation">
              <option value="white">White</option>
              <option value="black">Black</option>
            </Field>
          </Fieldset>
        </div>
      </div>
      <Fieldset name="analysis" label="Analysis Mode">
        <Field as={Dropdown} name="analysis" id="analysis">
          <option value="normal">Normal Analysis</option>
          <option value="interactive">Interactive Lesson</option>
          {me?.role === 'admin' && <option value="drill">Drill</option>}
        </Field>
      </Fieldset>
    </div>
  );
};

export default StudyDetails;
