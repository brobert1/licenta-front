import { toaster } from '@lib';

const handlePaymentSuccess = ({ success, router, toastShownRef }) => {
  if (success === 'true' && !toastShownRef.current) {
    // Show success toast
    toaster.success('Purchase successful!');
    toastShownRef.current = true;

    // Remove the success parameter from the URL
    const { pathname, query } = router;
    const params = { ...query };
    delete params.success;

    // Update the URL without triggering a page reload
    router.replace(
      {
        pathname,
        query: params,
      },
      undefined,
      { shallow: true }
    );
  }
};

export default handlePaymentSuccess;
