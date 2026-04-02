import { formatNumber } from 'accounting';

const Price = ({ value, precision = 0 }) => {
  return (
    <span data-type="number">
      {formatNumber(value, { decimal: ',', thousand: '.', precision }) || 'N/A'}
    </span>
  );
};

export default Price;
