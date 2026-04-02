import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import AutoSubmit from './AutoSubmit';

const HookForm = ({ children, initialValues, validationSchema, onSubmit, autoSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  // Function to mark all fields as touched
  const markAllFieldsTouched = () => {
    const values = methods.getValues(); // Get all registered fields
    Object.keys(values).forEach((field) => {
      methods.setValue(field, values[field], { shouldTouch: true });
    });
  };

  const handleSubmit = async (data) => {
    await onSubmit(data, methods);
  };
  const handleFail = async () => {
    markAllFieldsTouched();
  };

  return (
    <FormProvider {...methods} onSubmit={(data) => onSubmit({ ...data }, methods)}>
      <form onSubmit={methods.handleSubmit(handleSubmit, handleFail)}>
        {children}
        {autoSubmit && <AutoSubmit onSubmit={onSubmit} />}
      </form>
    </FormProvider>
  );
};

export default HookForm;
