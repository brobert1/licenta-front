import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components/Client';
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
    <Layout type="large">
      <StudyPage id={id} index={index} data={data} status={status} refetch={refetch} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
