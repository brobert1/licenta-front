import { useLayoutEffect, useRef, useState } from 'react';

const useElementWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const sync = () => {
      const next = node.getBoundingClientRect().width;
      setWidth((prev) => (Math.round(prev) === Math.round(next) ? prev : next));
    };

    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
};

export default useElementWidth;
