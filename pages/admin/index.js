import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';

const Page = () => {
  return (
    <Layout title="Admin">
      <div className="flex flex-col gap-4">
        <p className="text-white">Admin dashboard – coming soon.</p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
