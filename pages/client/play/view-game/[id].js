import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { GamePreview } from '@components/Bot';
import { useWindowSize } from '@hooks';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { isMobile } = useWindowSize();
  const { id } = router.query;

  return (
    <Layout variant={isMobile ? 'immersive' : 'client'}>
      <GamePreview id={id} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
