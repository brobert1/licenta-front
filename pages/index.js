import { checkGuest } from '@auth';
import { Layout } from '@components';
import { CoursesSection, FeatureCard, ProgressCta, QuizCard } from '@components/Guest';
import { Bot, ClipboardPaste, LogIn, Search } from 'lucide-react';

const FEATURES = [
  {
    href: '/guest/play',
    Icon: Bot,
    iconBg: 'bg-teal-600',
    subtitle: 'Select your level',
    title: 'Play Against Bots',
  },
  {
    Icon: Search,
    iconBg: 'bg-interactive',
    subtitle: 'Bot games / any PGN',
    title: 'Review Your Games',
    subItems: [
      {
        href: '/login',
        Icon: LogIn,
        iconBg: 'bg-tertiary',
        title: 'Review your bot games',
        subtitle: 'You need to have an active account.',
      },
      {
        href: '/guest/game-review',
        Icon: ClipboardPaste,
        iconBg: 'bg-tertiary',
        title: 'Paste a PGN',
        subtitle: 'Import any game from elsewhere.',
      },
    ],
  },
];

const Page = () => {
  return (
    <Layout variant="guest">
      <div className="flex flex-col gap-4 py-6">
        <QuizCard />
        <div className="flex flex-col gap-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} href={feature.href} {...feature} />
          ))}
        </div>
        <CoursesSection />
        <ProgressCta />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkGuest(context);
}

export default Page;
