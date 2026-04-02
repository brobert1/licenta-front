import { signup } from '@api/identity';
import { Checkbox, Email, Input, Password, Recaptcha } from '@components/Fields';
import { Field, Fieldset, Form, HookForm, Submit } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/signup';
import { useRef } from 'react';

const SignupForm = () => {
  const ref = useRef(null);
  const handleSubmit = async (values) => {
    await signup(ref, values);
  };

  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <Fieldset name="name" label="Your name">
          <Field id="name" name="name" as={Input} autoFocus={true} />
        </Fieldset>

        <Fieldset name="email" label="Your email">
          <Field id="email" name="email" as={Email} />
        </Fieldset>

        <Fieldset name="password" label="Your password">
          <Field id="password" name="password" as={Password} />
        </Fieldset>

        {process.env.SHOW_NEWSLETTER === 'yes' && (
          <Field id="isNewsletter" name="isNewsletter" as={Checkbox}>
            <span className="text-white text-sm">
              Receive occasional updates about new courses and announcements. No spam, guaranteed.
            </span>
          </Field>
        )}

        <Submit className="button full accent rounded-full w-full font-semibold text-base">
          Create account
        </Submit>
        <div className="hidden">
          <Recaptcha ref={ref} />
        </div>
      </Form>
    </HookForm>
  );
};

export default SignupForm;
