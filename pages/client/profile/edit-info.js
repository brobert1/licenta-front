import { checkAuth, withAuth } from '@auth';
import { Error, Loading, NoSsr } from '@components';
import { ClientAccountMenu, Layout } from '@components/Client';
import { ClientEditInfoForm } from '@components/Forms';
import { useQuery } from '@hooks';

const Page = () => {
  const { data, error, status } = useQuery('/profile');

  return (
    <Layout title="Editare profil">
      <main className="flex py-16 min-h-screen w-full flex-col bg-primary">
        <NoSsr>
          <div className="grid grid-cols-4 bg-white px-4 py-2 lg:hidden">
            <a href="/client/profile" className="flex items-center">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-chevron-left mt-0.5 text-sm"></i>
                <p>back</p>
              </div>
            </a>
            <p className="col-span-2 text-center text-lg font-semibold">Edit profile</p>
          </div>
          <div className="max flex w-full flex-col">
            {status === 'loading' && <Loading />}
            {status === 'error' && <Error message={error.message} />}
            {status === 'success' && (
              <div className="grid gap-4 lg:grid-cols-4">
                <div className="hidden flex-col gap-2 lg:flex">
                  <ClientAccountMenu />
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-5 rounded-lg text-white bg-secondary p-4 shadow lg:p-6">
                    <div className="flex items-center border-b border-grey pb-2 lg:pb-4">
                      <p className="font-semibold lg:text-lg">Edit profile</p>
                    </div>
                    <ClientEditInfoForm client={data} />
                  </div>
                </div>
              </div>
            )}
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
