import { checkGuest } from '@auth';
import { Layout } from '@components';
import { GuestCourseDetails } from '@components/Guest';
import { extractIdFromSlug } from '@functions';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;
  const id = extractIdFromSlug(slug);

  return (
    <Layout variant="guest">
      <GuestCourseDetails id={id} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkGuest(context);
}

export default Page;
