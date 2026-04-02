import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { GameReviewFromPgn } from '@components/GameReview';

const Page = () => {
  return (
    <Layout variant="client">
      <GameReviewFromPgn />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
