import { login } from '@api/identity';
import { Email, Password, Recaptcha } from '@components/Fields';
import { Field, Fieldset, HookForm, Submit } from '@components/HookForm';
import { NoSsr } from '@components';
import { Link } from '@components';
import { initialValues, validationSchema } from '@models/login';
import { useRef } from 'react';

const LoginForm = () => {
  const ref = useRef(null);
  const handleSubmit = async (values) => {
    await login(ref, values);
  };

  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <div className="space-y-5">
        <Fieldset name="email" label="Email Address">
          <Field
            id="email"
            name="email"
            as={Email}
            autoFocus
            placeholder="grandmaster@club.com"
          />
        </Fieldset>

        <div className="space-y-1.5">
          <Fieldset name="password" label="Password">
            <Field id="password" name="password" as={Password} />
          </Fieldset>
          <div className="flex justify-end">
            <Link
              href="/forgot"
              className="text-sm font-landing text-tertiaryGold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <Submit className="w-full px-6 py-4 bg-black text-on-primary rounded-xl font-bold font-landing hover:opacity-90 transition-all uppercase tracking-wider">
          Sign In
        </Submit>
        <NoSsr>
          <Recaptcha ref={ref} />
        </NoSsr>
      </div>
    </HookForm>
  );
};

export default LoginForm;
