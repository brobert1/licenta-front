import { Input } from '@components/Fields';
import { updateHeaders } from '@chess/functions';
import { useDebounce } from '@hooks';
import { useEffect, useState } from 'react';

const Headers = ({ moments, tree, setTree }) => {
  const originalHeaders = moments?.[0]?.headers || {};
  const [headers, setHeaders] = useState({});
  const debouncedHeaders = useDebounce(headers, 500);

  // Initialize headers from moments
  useEffect(() => {
    setHeaders(originalHeaders);
  }, [moments]);

  // Update tree when debounced headers change
  useEffect(() => {
    if (debouncedHeaders && Object.keys(debouncedHeaders).length > 0) {
      const currentHeaders = moments?.[0]?.headers || {};

      // Only update if headers actually changed
      const hasChanged = Object.keys(debouncedHeaders).some(
        (key) => debouncedHeaders[key] !== currentHeaders[key]
      );

      if (hasChanged) {
        const updatedTree = updateHeaders(tree, debouncedHeaders);
        setTree(updatedTree);
      }
    }
  }, [debouncedHeaders]);

  const isPlaceholder = (value) => {
    if (value === '?' || value === '????.??.??') return true;
    return false;
  };

  const allHeaders = Object.entries(headers).filter(([, value]) => {
    return value !== undefined && value !== null && !isPlaceholder(value);
  });

  const handleHeaderChange = (key, value) => {
    setHeaders((prev) => ({ ...prev, [key]: value }));
  };

  if (allHeaders.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      {allHeaders.map(([key, value]) => (
        <div key={key} className="flex items-center gap-4">
          <label className="text-gray-400 text-sm font-medium w-32 flex-shrink-0">{key}</label>
          <Input
            value={value || ''}
            onChange={(e) => handleHeaderChange(key, e.target.value)}
            className="flex-1 bg-tertiary text-white border border-white/10 rounded px-2 py-1 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
          />
        </div>
      ))}
    </div>
  );
};

export default Headers;
