import { useCallback, useState } from 'react';

const useRerender = (initialKey) => {
  const [key, setKey] = useState(`${initialKey}${Math.random()}`);

  const rerender = useCallback(() => {
    return setKey(`${initialKey}${Math.random()}`);
  }, [initialKey]);

  return [key, rerender];
};

export default useRerender;
