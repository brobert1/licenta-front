import { Layout } from '@components';
import { GameViewer } from '@components/Game';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout variant="guest">
      <GameViewer id={id} />
    </Layout>
  );
};

export default Page;
