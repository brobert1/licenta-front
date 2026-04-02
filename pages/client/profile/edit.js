import { checkAuth, withAuth } from '@auth';
import { Error, Layout } from '@components';
import { AccountSkeleton, EditAccount } from '@components/UserSettings';
import { useQuery } from '@hooks';

const Page = () => {
  const { data, error, status, refetch } = useQuery('/client/account');

  return (
    <Layout variant="client">
      <div className="flex w-full flex-col items-center gap-8">
        {status === 'loading' && <AccountSkeleton />}
        {status === 'error' && <Error message={error.message} />}
        {status === 'success' && <EditAccount data={data} refetch={refetch} />}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
