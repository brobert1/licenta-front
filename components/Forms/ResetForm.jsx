import { reset } from '@api/identity';
import { Password, Recaptcha } from '@components/Fields';
import { Field, Fieldset, Form, HookForm, Submit } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/reset';
import { useRef } from 'react';

const ResetForm = ({ hash }) => {
  const ref = useRef(null);
  const handleSubmit = async (values) => {
    await reset(ref, hash, values);
  };

  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <Fieldset name="password" label="Your new password">
          <Field id="password" name="password" as={Password} autoFocus={true} />
        </Fieldset>

        <Submit className="button full accent rounded-full w-full font-semibold text-base">
          Reset password
        </Submit>
        <div className="hidden">
          <Recaptcha ref={ref} />
        </div>
      </Form>
    </HookForm>
  );
};

export default ResetForm;
