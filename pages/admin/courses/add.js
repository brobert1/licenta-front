import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import AddCourseForm from '@components/Forms/Admin/Courses/AddCoursesForm';

const Page = () => {
  return (
    <Layout title="Add Course" variant="admin">
      <AddCourseForm />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
