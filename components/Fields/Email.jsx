import React from 'react';

const Email = (props) => {
  return (
    <input
      type="email"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="off"
      inputMode="email"
      className="input"
      {...props}
    />
  );
};

export default Email;
