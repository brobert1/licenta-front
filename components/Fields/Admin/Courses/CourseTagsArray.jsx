import { Button, Pill } from '@components';
import { Input } from '@components/Fields';
import { classnames } from '@lib';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

const CourseTagsArray = ({ placeholder, charactersLimit, elementLimit, ...props }) => {
  const { setValue, watch } = useFormContext();
  const [newValue, setNewValue] = useState('');
  const [error, setError] = useState('');

  const values = watch('tags') || [];

  const handleChange = (value) => {
    if (elementLimit && values.length >= elementLimit) {
      setError(`You can add up to ${elementLimit} tags.`);
    } else if (values.includes(value)) {
      setError('Tag already exists.');
    } else if (value.trim() !== '' && !error) {
      setValue('tags', [...values, value]);
      setNewValue('');
      setError('');
    }
  };

  const handleValueChange = (value) => {
    setNewValue(value);
    setError('');
    if (charactersLimit && value.length > charactersLimit) {
      setError(`Character limit exceeded (${charactersLimit} max).`);
    }
  };

  const handlePillClick = (index) => {
    setValue(
      'tags',
      values.filter((_, i) => i !== index)
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleChange(newValue);
      e.preventDefault();
    }
  };

  return (
    <div {...props}>
      <div
        className={classnames(
          'flex w-full max-w-xl flex-col gap-4 lg:flex-row',
          error && 'has-error'
        )}
      >
        <Input
          className={classnames('input', error && 'text-red-500')}
          name="value"
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          value={newValue}
        />
        <Button
          type="button"
          onClick={() => handleChange(newValue)}
          className="text-white w-full lg:w-auto"
        >
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      {charactersLimit && (
        <p className="ml-1 mt-1 text-xs text-white">{`${newValue.length}/${charactersLimit} characters`}</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="mt-3 flex w-full gap-2 overflow-x-auto flex-nowrap scrollbar-none">
        {values.map((value, index) => (
          <Pill
            key={index}
            className="bg-white/10 text-white hover:cursor-pointer hover:border-gray-500 flex-shrink-0"
            onClick={() => handlePillClick(index)}
          >
            {value}
            <i className="fa fa-times ml-2"></i>
          </Pill>
        ))}
      </div>
    </div>
  );
};

export default CourseTagsArray;
