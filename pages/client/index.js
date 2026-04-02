import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { DashboardCourses } from '@components/Client';
import { FeatureCard } from '@components/Guest';
import { usePreview, useProfile } from '@hooks';
import { ClipboardPaste, GraduationCap, History, Search, Swords } from 'lucide-react';

const CLIENT_FEATURES = [
  {
    href: '/client/play',
    Icon: Swords,
    iconBg: 'bg-teal-600',
    subtitle: 'Online lobby and Maia training bots',
    title: 'Play chess',
  },
  {
    Icon: Search,
    iconBg: 'bg-interactive',
    subtitle: 'Bot games / any PGN',
    title: 'Review Your Games',
    subItems: [
      {
        href: '/client/profile',
        Icon: History,
        iconBg: 'bg-tertiary',
        title: 'Review your bot games',
        subtitle: "Check out all your games on Rook'N'Learn.",
      },
      {
        href: '/client/game-review',
        Icon: ClipboardPaste,
        iconBg: 'bg-tertiary',
        title: 'Paste a PGN',
        subtitle: 'Import any game from elsewhere.',
      },
    ],
  },
];

const Page = () => {
  const { me } = useProfile();
  const { isPreview } = usePreview();
  const firstName = me?.name?.split(' ')[0] || '';

  return (
    <Layout variant="client">
      <div className="flex flex-col gap-4 py-6">
        <div className="mb-2">
          <h1 className="mb-1 text-2xl font-semibold text-primary">Hello, {firstName}!</h1>
          <p className="text-muted">What would you like to do today?</p>
        </div>
        <div className="flex flex-col gap-3">
          {CLIENT_FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} disabled={isPreview} />
          ))}
        </div>
        <section>
          <div className="mb-3 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-interactive" strokeWidth={2} aria-hidden />
            <h2 className="text-lg font-bold text-primary">Courses</h2>
          </div>
          <DashboardCourses />
        </section>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
