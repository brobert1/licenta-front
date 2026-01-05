import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import EditClientForm from '@components/Forms/Admin/Clients/EditClientForm';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Layout title="Edit client">
    <EditClientForm id={id} />
  </Layout>;
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
