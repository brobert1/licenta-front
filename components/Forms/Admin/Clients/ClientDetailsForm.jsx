import { Checkbox, Email, Input, Password } from '@components/Fields';
import { Field, Fieldset, Submit } from '@components/HookForm';
import { useFormContext } from 'react-hook-form';

const ClientDetailsForm = ({ isEditing, isLoading }) => {
  const { watch } = useFormContext();
  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg bg-secondary p-6">
        <div className="flex flex-col gap-4 pb-4">
          <h2 className="border-b pb-2 text-lg text-white font-semibold">Client Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Fieldset id="name" label="Client Name" name="name">
                  <Field as={Input} id="name" name="name" placeholder="Andrew Felix" />
                </Fieldset>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Fieldset id="email" label="Email Address" name="email">
                  <Field as={Email} id="email" name="email" placeholder="andrew.felix@gmail.com" />
                </Fieldset>
              </div>
            </div>
            {!isEditing && (
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Fieldset id="password" label="Password" name="password">
                    <Field as={Password} id="password" name="password" placeholder="********" />
                  </Fieldset>
                </div>
                <div className="flex-1">
                  <Fieldset id="confirmPassword" label="Confirm Password" name="confirmPassword">
                    <Field
                      as={Password}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="********"
                    />
                  </Fieldset>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col mt-4">
            <Fieldset name="active">
              <Field
                as={Checkbox}
                id="active"
                name="active"
                type="checkbox"
                checked={watch('active')}
              >
                <span className="cursor-pointer text-sm text-white">Active</span>
              </Field>
            </Fieldset>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Submit className="button full secondary" isLoading={isLoading}>
          {isEditing ? 'Update client' : 'Add client'}
        </Submit>
      </div>
    </>
  );
};

export default ClientDetailsForm;
