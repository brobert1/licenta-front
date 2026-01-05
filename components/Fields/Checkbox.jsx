import React from 'react';

const Checkbox = ({ children, ...props }) => {
  const { value, onChange, ...rest } = props;
  return (
    <div className="mt-2">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="checkbox"
          checked={!!value}
          onChange={(e) => onChange?.(e.target.checked)}
          {...rest}
        />
        <span className="ml-2 text-white">{children}</span>
      </label>
    </div>
  );
};

export default Checkbox;
