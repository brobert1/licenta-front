import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { GameReview } from '@components/GameReview';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout variant="client">
      <GameReview id={id} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
