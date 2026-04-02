import { Button } from '@components';
import { useFormContext } from 'react-hook-form';

const Submit = ({ children, isLoading, ...props }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  const disabled = isLoading || isSubmitting;
  // Override the disabled prop when passed
  props.disabled = disabled;

  return (
    <div className="inline-flex items-center w-full relative">
      <Button type="submit" className="button full secondary" {...props}>
        <div className="flex justify-center items-center w-full">
          {!disabled ? (
            children
          ) : (
            <img src="/icons/loading.gif" alt="loading" className="w-6 h-6" />
          )}
        </div>
      </Button>
    </div>
  );
};

export default Submit;
