import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components/Client';
import { CourseDetails } from '@components/Course';
import extractIdFromSlug from '@functions/extract-id';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;
  const id = extractIdFromSlug(slug);

  return (
    <Layout>
      <CourseDetails id={id} showAllReviews={true} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
