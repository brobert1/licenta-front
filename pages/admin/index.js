import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { Bar, Line } from '@components/Charts';
import PaymentsTable from '@components/Admin/PaymentsTable';

const Page = () => {
  return (
    <Layout title="Dashboard" variant="admin">
      <div className="max-w-full">
        <div className="flex flex-row gap-4 mb-8">
          <div className="w-1/2">
            <div className="bg-surface border border-border px-6 py-1 rounded-lg shadow-sm mb-6 w-full h-96">
              <h3 className="text-lg text-primary font-semibold mb-6 mt-6">Orders per month</h3>
              <Line />
            </div>
          </div>
          <div className="w-1/2">
            <div className="bg-surface border border-border px-6 py-1 rounded-lg shadow-sm mb-6 w-full h-96">
              <h3 className="text-lg text-primary font-semibold mb-6 mt-6">New users per month</h3>
              <Bar />
            </div>
          </div>
        </div>
        <h3 className="text-lg text-primary font-semibold mb-6">All orders</h3>
        <div className="w-full flex-col gap-4 overflow-x-auto rounded-lg">
          <PaymentsTable />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
