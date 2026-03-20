import { checkAuth, withAuth } from '@auth';
import { Layout, Link } from '@components';
import { CoursesTable } from '@components/Professor/Courses';

const Page = () => {
  return (
    <Layout title="Courses">
      <div className="w-full flex-col gap-4 overflow-x-auto rounded-lg p-4 shadow-sm">
        <div className="mb-4 flex w-full justify-between items-center">
          <Link
            href="/client/courses?preview=true"
            className="button w-full full secondary sm:w-max justify-center px-4 flex items-center gap-2"
          >
            <i className="fa-solid fa-eye"></i>
            <p>Preview Client View</p>
          </Link>
          <Link
            href="/professor/courses/add"
            className="button w-full sm:w-max justify-center px-4 flex items-center gap-2 full accent"
          >
            <i className="fa-solid fa-plus"></i>
            <p>Add course</p>
          </Link>
        </div>
        <CoursesTable />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
