import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { TrashStudiesList } from '@components/Studio';

const Page = () => {
  return (
    <Layout title="Trash">
      <div className="w-full flex flex-col gap-6">
        <div className="w-full">
          <TrashStudiesList />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
