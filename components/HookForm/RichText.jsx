import { RichText as RichTextField } from '@components/Fields';
import { sanitizeHtml } from '@functions';
import { useFormContext } from 'react-hook-form';

const RichText = ({ name, onChange, ...props }) => {
  const { getValues, setValue } = useFormContext();
  const values = getValues();

  const handleChange = (value) => {
    try {
      setValue(name, sanitizeHtml(value));
    } catch (err) {
      setValue(name, '');
    }
  };

  return <RichTextField name={name} value={values[name]} onChange={handleChange} {...props} />;
};

export default RichText;
