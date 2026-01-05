import { checkAuth, withAuth } from '@auth';
import { Breadcrumb } from '@components';
import { Layout } from '@components/Client';
import { CoursesList } from '@components/Course';
import { usePreview } from '@hooks';

const Page = () => {
  const { isPreview } = usePreview();
  return (
    <Layout>
      <div className="max w-full flex flex-col items-center gap-8 mt-4">
        <Breadcrumb title="All Chess Courses" page="Courses" />
        <div className="w-full">
          <CoursesList isPreview={isPreview} />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
