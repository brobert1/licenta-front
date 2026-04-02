import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { OrderPage } from '@components/Admin/Orders';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="Order Details" variant="admin">
      <OrderPage id={id} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
