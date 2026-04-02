import { Price } from '@components';

const AmountCell = ({ value }) => {
  if (value === 0) return <span className="font-semibold text-green-600">Free</span>;
  return <Price value={value} precision={2} />;
};

export default AmountCell;
