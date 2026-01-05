import { Button } from '@components';
import toast from 'react-hot-toast';

export const success = (message) => {
  if (/<\/?[a-z][\s\S]*>/i.test(message)) {
    return false;
  }
  return toast.success((t) => <Button onClick={() => toast.dismiss(t.id)}>{message}</Button>, {
    className: 'max-h-24 overflow-y-auto whitespace-normal break-words text-left',
  });
};

export const error = (message) => {
  if (/<\/?[a-z][\s\S]*>/i.test(message)) {
    message = 'Oops! An unknown error has occurred';
  }
  return toast.error((t) => <Button onClick={() => toast.dismiss(t.id)}>{message}</Button>, {
    className: 'max-h-24 overflow-y-auto whitespace-normal break-words text-left',
  });
};

const toaster = {
  ...toast,
  success,
  error,
};

export default toaster;
