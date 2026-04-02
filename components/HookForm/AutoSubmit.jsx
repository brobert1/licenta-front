import { useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const AutoSubmit = ({ onSubmit }) => {
  const methods = useFormContext();
  const isMounted = useRef(false);

  // Watch all form values
  const values = useWatch();

  // Submit the form whenever values change, but skip the initial mount
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    methods.handleSubmit((data) => onSubmit({ ...data }, methods))();
  }, [values]);

  return null;
};

export default AutoSubmit;
