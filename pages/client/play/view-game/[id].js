import { checkAuth, withAuth } from '@auth';
import { GamePreview } from '@components/Bot';
import { Layout } from '@components/Client';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <GamePreview id={id} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
