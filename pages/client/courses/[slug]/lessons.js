import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components/Client';
import { CourseLessons } from '@components/Course';
import extractIdFromSlug from '@functions/extract-id';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;
  const id = extractIdFromSlug(slug);

  return (
    <Layout>
      <CourseLessons id={id} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
