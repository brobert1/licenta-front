import { checkAuth, withAuth } from '@auth';
import { Link, NoSsr } from '@components';
import { ClientAccountMenu, Layout } from '@components/Client';
import { ClientChangePasswordForm } from '@components/Forms';

const Page = () => {
  return (
    <Layout>
      <main className="flex py-16 min-h-screen w-full flex-col bg-primary">
        <NoSsr>
          <div className="grid grid-cols-4 bg-secondary px-4 py-2 lg:hidden">
            <Link href="/client/profile" className="flex items-center">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-chevron-left mt-0.5 text-sm"></i>
                <p>back</p>
              </div>
            </Link>
            <p className="col-span-2 text-center text-lg font-semibold">Password</p>
          </div>
          <div className="max grid w-full items-start gap-4 lg:grid-cols-4">
            <ClientAccountMenu />
            <div className="col-span-3">
              <div className="flex flex-col gap-5 rounded-lg bg-secondary text-white p-4 shadow lg:p-6">
                <div className="flex items-center border-b border-grey pb-2 lg:pb-4">
                  <p className="font-semibold lg:text-lg">Password</p>
                </div>
                <ClientChangePasswordForm />
              </div>
            </div>
          </div>
        </NoSsr>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return checkAuth(context);
}

export default withAuth(Page);
