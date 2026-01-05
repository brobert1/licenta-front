import { PGN_HEADERS } from '@constants/pgn-headers';
import { updateHeaders } from '@chess/functions';

const AddHeader = ({ moments, tree, setTree }) => {
  const headers = moments?.[0]?.headers || {};

  const existingHeaders = Object.keys(headers).filter((key) => {
    const value = headers[key];
    return value !== undefined && value !== null && value !== '?' && value !== '????.??.??';
  });

  const availableHeaders = PGN_HEADERS.filter((header) => !existingHeaders.includes(header));

  const handleAddHeader = (headerKey) => {
    if (!headerKey) return;

    const updatedHeaders = {
      ...headers,
      [headerKey]: '',
    };
    const updatedTree = updateHeaders(tree, updatedHeaders);
    setTree(updatedTree);
  };

  if (availableHeaders.length === 0) return null;

  return (
    <div className="mt-2">
      <select
        className="w-48 bg-tertiary text-white border border-white/10 rounded px-2 py-1 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
        onChange={(e) => {
          handleAddHeader(e.target.value);
          e.target.value = '';
        }}
        value=""
      >
        <option value="" disabled>
          New header
        </option>
        {availableHeaders.map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddHeader;
