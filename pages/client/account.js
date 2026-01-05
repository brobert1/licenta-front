import { checkAuth, withAuth } from '@auth';
import { Error, Loading } from '@components';
import { Layout } from '@components/Client';
import { Account } from '@components/UserSettings';
import { useQuery } from '@hooks';

const Page = () => {
  const { data, error, status, refetch } = useQuery('/client/account');
  return (
    <Layout>
      <div className="max w-full flex flex-col items-center gap-8">
        {status === 'loading' && <Loading />}
        {status === 'error' && <Error message={error.message} />}
        {status === 'success' && <Account data={data} refetch={refetch} />}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
