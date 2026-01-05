import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { CoursePage } from '@components/Admin/Courses';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="Course Details">
      <CoursePage id={id} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
