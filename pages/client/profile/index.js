import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { Account } from '@components/UserSettings';

const Page = () => {
  return (
    <Layout variant="client">
      <div className="flex w-full flex-col items-center gap-8">
        <Account />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
