import { format as dateFormat } from 'date-fns';

const time = (date, format = 'd MMMM yyyy') => {
  try {
    return dateFormat(new Date(date), format);
  } catch (err) {
    return 'N/A';
  }
};

export default time;
