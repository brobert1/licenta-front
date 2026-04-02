import { Email, Input, Recaptcha, Textarea } from '@components/Fields';
import { Field, Fieldset, HookForm, Submit } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/contact';
import { useRef } from 'react';

const ContactForm = () => {
  const ref = useRef(null);

  return (
    <HookForm validationSchema={validationSchema} initialValues={initialValues}>
      <div className="flex flex-col gap-6 text-black">
        <Fieldset name="name" label="Your name">
          <Field
            id="name"
            name="name"
            as={Input}
            className="border-gray-300 rounded-xl border-2 py-2 px-2"
          />
        </Fieldset>

        <Fieldset name="email" label="Your email">
          <Field
            id="email"
            name="email"
            as={Email}
            autoFocus={true}
            className="border-gray-300 rounded-xl border-2 py-2 px-2"
          />
        </Fieldset>

        <Fieldset name="message" label="Your message">
          <Field
            id="message"
            name="message"
            as={Textarea}
            className="border-gray-300 rounded-xl border-2 py-2 px-2"
          />
        </Fieldset>

        <Submit className="w-full text-center text-base font-semibold text-white rounded-xl bg-blue-700 px-5 py-2.5 transition-all duration-700 ease-in-out hover:bg-blue-500">
          Send
        </Submit>
        <div className="hidden">
          <Recaptcha ref={ref} />
        </div>
      </div>
    </HookForm>
  );
};

export default ContactForm;
