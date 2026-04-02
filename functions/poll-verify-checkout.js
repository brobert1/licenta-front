import { axios } from '@lib';
import coffee from './coffee';

const pollVerifyCheckout = async (sessionId, attempts = 0) => {
  if (attempts >= 5) return null;
  const data = await axios.get(`/public/checkout/verify?session_id=${sessionId}`);
  if (data?.status === 'pending') {
    await coffee(2000);
    return pollVerifyCheckout(sessionId, attempts + 1);
  }
  return data;
};

export default pollVerifyCheckout;
