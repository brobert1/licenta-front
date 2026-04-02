import React, { useContext } from 'react';
import RadioContext from './RadioContext';

const Radio = ({ value, disabled, children }) => {
  const { name, selectedValue, onChange } = useContext(RadioContext);

  const handleChange = () => {
    onChange(value);
  };

  return (
    <div className="mt-2">
      <label className="inline-flex items-center">
        <input
          type="radio"
          role="radio"
          className="radio"
          name={name}
          value={value}
          checked={selectedValue === value}
          onChange={handleChange}
          disabled={disabled}
        />
        <span className="ml-2 text-white">{children}</span>
      </label>
    </div>
  );
};

export default Radio;
