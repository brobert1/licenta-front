import { checkGuest } from '@auth';
import { Button, Link } from '@components';
import { SignupForm } from '@components/Forms';

const Page = () => {
  return (
    <main className="flex bg-neutral-100 min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="p-1.5 rounded-2xl max-w-6xl w-full grid sm:grid-cols-2 bg-white">
        <div className="flex bg-[url('/images/auth-bg.webp')] bg-cover bg-center bg-no-repeat rounded-t-xl sm:rounded-xl flex-col p-4 lg:p-8 min-h-[200px] sm:min-h-0 relative overflow-hidden justify-end sm:justify-start">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:hidden"></div>
          <div className="relative z-10 text-white sm:text-black drop-shadow-md sm:drop-shadow-none">
            <p className="font-semibold text-xl">Create a new account!</p>
            <p className="text-sm">Sign up and make your next move.</p>
          </div>
        </div>
        <div className="relative sm:min-h-[705px] auth-card flex flex-col justify-center gap-4 p-4 sm:p-8 md:p-12 lg:p-24">
          <h2 className="mt-4 text-2xl font-semibold text-black">Sign Up</h2>
          <SignupForm />
          <div className="text-black text-sm mt-4">
            <p>By continuing, you agree to Rook&apos;N&apos;Learn&apos;s </p>
            <div className="inline-flex gap-1.5">
              <Link className="underline" href="/terms-of-use">
                Terms of Use
              </Link>
              <p>and </p>
              <Link className="underline" href="/privacy-policy">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:absolute sm:w-full sm:left-0 sm:bottom-4">
            <div className="flex items-center justify-center">
              <Button
                href="/"
                className="button text-sm flex gap-2 text-black/80 hover:text-black items-center px-4 py-1 hover:bg-neutral-100"
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back to Website</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps(context) {
  return await checkGuest(context);
}

export default Page;
