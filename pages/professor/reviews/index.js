import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import ReviewsTable from '@components/Professor/Reviews/ReviewsTable';

const Page = () => {
  return (
    <Layout title="Reviews">
      <div className="w-full flex-col gap-4 overflow-x-auto rounded-lg p-4 shadow-sm">
        <ReviewsTable />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
