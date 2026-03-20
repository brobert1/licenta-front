import { useId, useState } from 'react';

const useRerender = (initialKey = '') => {
  const id = useId();
  const [key, setKey] = useState(`${initialKey}-${id}`);

  const rerender = () => {
    return setKey(`${initialKey}${Math.random()}`);
  };

  return [key, rerender];
};

export default useRerender;
