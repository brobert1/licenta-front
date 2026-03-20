import { signup } from '@api/identity';
import { Checkbox, Email, Input, Password, Recaptcha } from '@components/Fields';
import { Field, Fieldset, Form, HookForm, Submit } from '@components/HookForm';
import { NoSsr } from '@components';
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
        <Fieldset name="name" label="Full Name">
          <Field id="name" name="name" as={Input} autoFocus />
        </Fieldset>

        <Fieldset name="email" label="Email Address">
          <Field id="email" name="email" as={Email} />
        </Fieldset>

        <Fieldset name="password" label="Password">
          <Field id="password" name="password" as={Password} />
        </Fieldset>

        {process.env.SHOW_NEWSLETTER === 'yes' && (
          <Field id="isNewsletter" name="isNewsletter" as={Checkbox}>
            <span className="text-sm font-landing">
              Receive occasional updates about new courses and announcements. No spam, guaranteed.
            </span>
          </Field>
        )}

        <Submit className="w-full px-6 py-4 bg-black text-on-primary rounded-xl font-bold font-landing hover:opacity-90 transition-all uppercase tracking-wider">
          Join the Club
        </Submit>
        <NoSsr>
          <div className="hidden">
            <Recaptcha ref={ref} />
          </div>
        </NoSsr>
      </Form>
    </HookForm>
  );
};

export default SignupForm;
