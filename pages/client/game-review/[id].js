import { checkAuth, withAuth } from '@auth';
import { GameReview } from '@components/Bot';
import { Layout } from '@components/Client';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout type="small">
      <GameReview id={id} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
