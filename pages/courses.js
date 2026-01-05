import { PublicCourses } from '@components/Public';
import { Footer, Header } from '@components/Visitor';

const Page = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full flex flex-grow flex-col mt-10 gap-24">
        <div className="max-visitor grid w-full max-w-6xl mx-auto">
          <PublicCourses />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
