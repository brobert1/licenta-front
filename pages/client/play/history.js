import { checkAuth, withAuth } from '@auth';
import { GamePreview } from '@components/Bot';
import { Layout } from '@components/Client';
import { useRouter } from 'next/router';

const Page = () => {
  // Get active diagram index from URL
  // Example URL: /client/drill-starter#3
  const router = useRouter();
  const index = Number(router.asPath.split('#')[1]) || 0;

  return (
    <Layout type="large">
      <GamePreview index={index} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
