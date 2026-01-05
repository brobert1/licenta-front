import { checkAuth, withAuth } from '@auth';
import { Breadcrumb } from '@components';
import { Layout } from '@components/Client';
import OrdersList from '@components/Client/OrdersList';

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 mb-10 w-full">
        <div className="col-span-4">
          <Breadcrumb title="Orders" page="Orders" />
        </div>
        <div className="col-span-3 flex flex-col gap-4 w-full">
          <OrdersList />
        </div>
        <div className="hidden lg:flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/images/alex-banzea-fundamentals-free.jpg"
              alt="course thumbnail"
              className="rounded-lg lg:w-auto w-56"
            />
            <img
              src="/images/alex-banzea-fundamentals-full.jpg"
              alt="course thumbnail"
              className="rounded-lg lg:w-auto w-56"
            />
            <img
              src="/images/alex-banzea-jobava-london-1.jpg"
              alt="course thumbnail"
              className="rounded-lg lg:w-auto w-56"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
