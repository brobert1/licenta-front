import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import PlayOnlineClient from '@components/Multiplayer/PlayOnlineClient';

const Page = () => (
  <Layout variant="client" wide>
    <PlayOnlineClient />
  </Layout>
);

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
