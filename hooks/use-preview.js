import { useRouter } from 'next/router';

const usePreview = () => {
  const router = useRouter();
  const isPreview = router.query.preview === 'true';

  const exitPreview = () => {
    router.push('/admin');
  };

  return { isPreview, exitPreview };
};

export default usePreview;
