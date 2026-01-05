import { checkAuth, withAuth } from '@auth';
import { Breadcrumb } from '@components';
import { DashboardCourses, Layout } from '@components/Client';

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 mt-4 w-full">
        <div className="col-span-4">
          <Breadcrumb title="Dashboard" page="Dashboard" />
        </div>
        <div className="col-span-3 flex flex-col gap-4 w-full">
          <DashboardCourses />
        </div>
        <div className="hidden lg:flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/images/alex-banzea-jobava-london-1.jpg"
              alt="course thumbnail"
              className="rounded-lg lg:w-auto w-56"
            />
            <img
              src="/images/alex-banzea-fundamentals-full.jpg"
              alt="course thumbnail"
              className="rounded-lg lg:w-auto w-56"
            />
            <img
              src="/images/alex-banzea-fundamentals-free.jpg"
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
