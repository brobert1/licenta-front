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
              src="/images/1234861669219094.png"
              alt="course thumbnail"
              className="rounded-lg lg:w-auto w-56"
            />
            <img
              src="/images/136631734951157.png"
              alt="course thumbnail"
              className="rounded-lg lg:w-auto w-56"
            />
            <img
              src="/images/1475801681203296.png"
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
