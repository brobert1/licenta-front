import { checkAuth, withAuth } from '@auth';
import { Link } from '@components';
import { StudyPage } from '@components/Studio';
import extractIdFromSlug from '@functions/extract-id-from-slug';
import { useQuery } from '@hooks';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;
  const id = extractIdFromSlug(slug);

  // Get active chapter index from fragment URL
  const index = Number(router.asPath.split('#')[1]) || 0;

  const { data, status, refetch } = useQuery(`/studies/${id}`);

  return (
    <div className="max-w-lg md:max-w-6xl 2xl:max-w-9xl mx-auto px-0 text-xs 2xl:text-sm">
      <main className="w-full px-4 pt-6">
        <div className="w-full mb-4">
          <Link
            href={`/admin/courses/${data?.course}`}
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back</span>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full pb-6">
          <StudyPage index={index} data={data} status={status} refetch={refetch} />
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
