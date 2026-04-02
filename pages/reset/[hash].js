import { Logo, withRouter } from '@components';
import { ResetForm } from '@components/Forms';
import axios from 'axios';

const Page = ({ hash }) => {
  return (
    <main className="flex bg-neutral-100 min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="p-1.5 rounded-2xl max-w-6xl w-full grid sm:grid-cols-2 bg-white">
        <div className="flex bg-[url('/images/auth-bg.webp')] bg-cover bg-center bg-no-repeat rounded-t-xl sm:rounded-xl flex-col p-4 lg:p-8 min-h-[200px] sm:min-h-0 relative overflow-hidden justify-end sm:justify-start">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:hidden"></div>
          <div className="relative z-10 text-white sm:text-black drop-shadow-md sm:drop-shadow-none">
            <p className="font-semibold text-xl">Choose a new password</p>
            <p className="text-sm">Set a secure password to protect your account</p>
          </div>
        </div>
        <div className="relative sm:min-h-[705px] auth-card flex flex-col justify-center gap-4 p-4 sm:p-8 md:p-12 lg:p-24">
          <Logo />
          <h2 className="mt-4 text-2xl font-semibold text-black">Reset your password</h2>
          <ResetForm hash={hash} />
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps(context) {
  const { hash } = context.params;
  try {
    await axios.get(`${process.env.API_BASE_URL}/reset/${hash}`);
    return { props: {} };
  } catch {
    return { notFound: true };
  }
}

export default withRouter(Page);
