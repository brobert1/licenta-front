import { checkAuth, withAuth } from '@auth';
import { Button, Error, Loading, NoSsr } from '@components';
import { ClientAccountMenu, EnrolledCoursesList, Layout } from '@components/Client';
import { formatDate } from '@functions';
import { useQuery } from '@hooks';

const Page = () => {
  const { data, error, status } = useQuery('/profile');

  return (
    <Layout title="Profil">
      <main className="flex py-16 min-h-screen w-full flex-col bg-primary">
        <NoSsr>
          {status === 'loading' && <Loading />}
          {status === 'error' && <Error message={error.message} />}
          {status === 'success' && (
            <div className="max grid w-full items-start gap-4 lg:grid-cols-4">
              <ClientAccountMenu />
              <div className="col-span-3">
                <div className="flex flex-col gap-5 rounded-lg bg-secondary p-6 shadow">
                  <div className="flex items-center justify-between border-b border-grey pb-4">
                    <p className="text-lg text-white font-semibold">Account</p>
                    <div className="flex flex-row gap-4">
                      <Button
                        href="/client/profile/edit-info"
                        className="button full primary flex items-center gap-2 py-1 font-semibold"
                      >
                        <i className="fa-solid fa-pen"></i>
                        <span>Edit</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <img
                      src={
                        data.image?.path ||
                        '../images/placeholder.jpg'
                      }
                      alt="Profile"
                      className="aspect-square h-40 w-40 rounded-md object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline justify-start gap-2">
                        <p className="w-40 text-sm text-white">Name:</p>
                        <p className="text-md text-gray-400">{data?.name}</p>
                      </div>
                      <div className="flex items-baseline justify-start gap-2">
                        <p className="w-40 text-sm text-white">Email:</p>
                        <p className="text-md text-gray-400">{data?.email}</p>
                      </div>
                      <div className="flex items-baseline justify-start gap-2">
                        <p className="w-40 text-sm text-white">Time spent playing:</p>
                        <p className="text-md text-gray-400">0</p>
                      </div>
                      <div className="flex items-baseline justify-start gap-2">
                        <p className="w-40 text-sm text-white">Member since:</p>
                        <p className="text-md text-gray-400">
                          {formatDate(data?.createdAt, 'dd.MM.yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <EnrolledCoursesList courses={data?.enrolledCourses} />
              </div>
            </div>
          )}
        </NoSsr>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return checkAuth(context);
}

export default withAuth(Page);
