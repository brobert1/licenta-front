import { Header, Footer } from '@components/Visitor';
import { TestimonialsCards, AboutRightSide, AboutLeftSide } from '@components/Web';

const Page = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="mx-auto w-full max-w-7xl p-4 mt-6">
        <div className="grid w-full grid-cols-1 items-center justify-start gap-10 lg:grid-cols-2 xl:gap-12">
          <AboutLeftSide />
          <AboutRightSide />
        </div>
        <div className="mt-10 py-16">
          <h2 className="text-center text-4xl font-bold text-gray-900">What Our Students Say</h2>
          <p className="text-center text-lg font-normal text-gray-500 pt-6">
            Real feedback from players who have leveled up their chess skills with us.
          </p>
        </div>
        <TestimonialsCards />
      </div>
      <Footer />
    </main>
  );
};

export default Page;
