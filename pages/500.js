import { Link } from '@components';

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex flex-grow items-center justify-center px-4 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-3xl bg-white px-6 py-10 shadow-xl ring-1 ring-slate-200 sm:flex-row sm:px-10 sm:py-12">
          <div className="relative h-52 w-52 flex-shrink-0 sm:h-64 sm:w-64">
            <img
              src="/images/capybara-404.png"
              alt="Worried capybara noticing an error"
              className="object-contain"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="mb-2 text-sm font-semibold tracking-[0.25em] text-accent">OOPS</p>
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Something went wrong on our side
            </h1>
            <p className="mb-6 max-w-md text-sm text-slate-600 sm:text-base">
              Cappy ran into an unexpected error while loading this page. Please try again in a
              moment, or head back to the homepage.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              <span>Back to homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
