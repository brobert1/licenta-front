import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import LiveGameRouteClient from '@components/Multiplayer/LiveGameRouteClient';

const Page = () => (
  <Layout variant="client">
    <LiveGameRouteClient />
  </Layout>
);

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
