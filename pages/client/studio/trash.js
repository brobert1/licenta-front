import { checkAuth, withAuth } from '@auth';
import Breadcrumb from '@components/Breadcrumb';
import { Layout } from '@components/Client';
import { TrashStudiesList } from '@components/Studio';

const Page = () => {
  return (
    <Layout>
      <div className="max w-full flex flex-col items-center gap-8 px-4">
        <Breadcrumb title="Trash" page="Studies"></Breadcrumb>
        <div className="w-full grid lg:grid-cols-3 gap-4">
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
