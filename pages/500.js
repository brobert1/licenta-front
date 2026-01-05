import { Header, Footer } from '@components/Visitor';
import { Link } from '@components';

const Page = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow text-center mt-6">
        <h1 className="mb-4 text-2xl sm:text-5xl font-extrabold text-primary">500</h1>
        <h2 className="mb-6 text-xl sm:text-2xl font-semibold text-primary">
          Something went wrong 😢
        </h2>
        <Link href="/" className="button full accent rounded-full font-semibold text-base">
          <p>Go Home</p>
        </Link>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
