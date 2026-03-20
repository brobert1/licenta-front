import {
  CTASection,
  CoursesSection,
  Footer,
  Header,
  Hero,
  RefineSection,
  StatsSection,
} from '@components/Visitor';

const Page = () => (
  <main className="flex flex-col min-h-screen bg-surface text-on-surface">
    <Header />
    <Hero />
    <RefineSection />
    <CoursesSection />
    <StatsSection />
    <CTASection />
    <Footer />
  </main>
);

export default Page;
