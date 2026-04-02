import { store } from '@auth';
import { generateGuestCheckout, generateStripeCheckout } from '@functions';
import { toaster } from '@lib';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useStripe = (course) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isAuthenticated = !!store.getState();

      const checkoutUrl = isAuthenticated
        ? await generateStripeCheckout({ courseId: course._id, courseName: course.name })
        : await generateGuestCheckout({
            courseId: course._id,
            courseName: course.name,
            cancelUrl: window.location.href,
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
