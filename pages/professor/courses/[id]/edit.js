import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import EditCourseForm from '@components/Forms/Professor/Courses/EditCourseForm';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="Edit course">
      <EditCourseForm id={id} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
