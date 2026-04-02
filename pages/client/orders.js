import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import OrdersList from '@components/Client/OrdersList';

const Page = () => {
  return (
    <Layout variant="client">
      <div className="flex flex-col gap-4 py-6">
        <div className="mb-2">
          <h1 className="mb-1 text-2xl font-semibold text-primary">My Orders</h1>
          <p className="text-muted">Purchase history</p>
        </div>
        <OrdersList />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
