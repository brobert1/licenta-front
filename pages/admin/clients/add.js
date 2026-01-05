import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import AddClientForm from '@components/Forms/Admin/Clients/AddClientForm';

const Page = () => {
  return (
    <Layout title="Add Client">
      <AddClientForm />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
