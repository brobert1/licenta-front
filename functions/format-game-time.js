import { format } from 'date-fns';

const formatGameTime = (seconds) => {
  return format(new Date(Math.max(seconds ?? 0, 0) * 1000), 'mm:ss');
};

export default formatGameTime;
