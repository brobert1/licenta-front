import { useState } from 'react';
import { generateStripeCheckout } from '@functions';
import { toaster } from '@lib';
import { useRouter } from 'next/router';

const useStripe = (course) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const checkoutUrl = await generateStripeCheckout({
        courseId: course._id,
        courseName: course.name,
      });

      router.push(checkoutUrl);
    } catch (error) {
      toaster.error(error?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePurchase, isLoading };
};
export default useStripe;

