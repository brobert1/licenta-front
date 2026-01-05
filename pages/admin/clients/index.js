import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import ClientsTable from '@components/Admin/Clients/ClientsTable';

const Page = () => {
  return (
    <Layout title="Clients">
      <div className="w-full flex-col gap-4 overflow-x-auto rounded-lg p-4 shadow-sm">
        <ClientsTable />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
