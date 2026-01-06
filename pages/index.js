import { Button } from '@components';
import { FancyCourses, Footer, Header } from '@components/Visitor';

const Page = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full flex flex-grow flex-col p-4 lg:p-8 gap-24">
        <div className="max-visitor grid lg:h-[70vh] w-full lg:grid-cols-2 max-w-6xl mx-auto">
          <div className="flex flex-col gap-6 lg:gap-8 justify-center pr-6">
            <div className="flex text-3xl lg:text-6xl flex-col gap-2">
              <h1 className="font-bold">One platform.</h1>
              <h1 className="font-bold"> All the features.</h1>
            </div>
            <div className="flex flex-col gap-3 lg:gap-4">
              <p className="max-w-xl lg:text-xl">
                An e-learning app for chess enthusiasts with a massive library of curated lessons
                from world-class Grandmasters and coaches.
              </p>
              <p className="max-w-xl lg:text-xl">
                Master your openings, refine your middlegame strategies, and master endgames with
                spaced repetition and engaging, bite-sized exercises tailored to your needs.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                href="/login"
                className="button full accent rounded-full font-semibold lg:text-lg"
              >
                Get Started
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden hidden lg:flex lg:flex-col">
            <span className="absolute top-0 h-20 w-full bg-gradient-to-b from-white z-20"></span>
            <div className="mx-auto">
              <FancyCourses />
            </div>
            <span className="absolute bottom-0 h-20 w-full bg-gradient-to-t from-white z-20"></span>
          </div>
        </div>
      </div>


      <Footer />
    </main>
  );
};

export default Page;
