import { checkAuth, withAuth } from '@auth';
import {
  InProgressStudies,
  Layout,
  PopularStudies,
  PuzzleOfTheDay,
  RecentGames,
  StatsCards,
  WelcomeSection,
} from '@components/Client';

const Page = () => (
  <Layout>
    <div>
      <WelcomeSection />
      <StatsCards />
      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 space-y-0">
          <InProgressStudies />
          <RecentGames />
        </div>
        <div>
          <PuzzleOfTheDay />
        </div>
      </div>
      <PopularStudies />
    </div>
  </Layout>
);

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
