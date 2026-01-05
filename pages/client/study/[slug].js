import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components/Client';
import { StudyLesson } from '@components/Course';
import extractIdFromSlug from '@functions/extract-id';
import { usePreview } from '@hooks';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { isPreview } = usePreview();
  const { slug } = router.query;
  const id = extractIdFromSlug(slug);

  // Get active chapter index from URL fragment
  // Example URL: /client/study/lesson-name-123#2
  const chapterIndex = Number(router.asPath.split('#')[1]) || 0;

  return (
    <Layout type="large">
      <div className="w-full flex flex-col items-center gap-8">
        <StudyLesson id={id} chapterIndex={chapterIndex} isPreview={isPreview} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
