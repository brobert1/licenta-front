import { Header, Footer } from '@components/Visitor';
import { CTAContact, FAQ } from '@components/Web';

const Page = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="mx-auto w-full max-w-7xl p-4 mt-6">
        <h6 className="font-medium text-center text-md lg:text-lg text-gray-500 mb-5">
          Most asked questions
        </h6>
        <h2 className="font-bold text-center text-3xl lg:text-5xl text-gray-900 ">
          Questions & Answers
        </h2>
        <FAQ />
        <CTAContact />
      </div>
      <Footer />
    </main>
  );
};

export default Page;
