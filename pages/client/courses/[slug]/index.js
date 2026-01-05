import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components/Client';
import { CourseDetails } from '@components/Course';
import extractIdFromSlug from '@functions/extract-id';
import { usePreview } from '@hooks';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { isPreview } = usePreview();
  const { slug, success } = router.query;
  const id = extractIdFromSlug(slug);

  return (
    <Layout>
      <CourseDetails id={id} success={success} isPreview={isPreview} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
