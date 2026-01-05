import { AuthLayout, Link } from '@components';
import { SignupForm } from '@components/Forms';

const Page = () => {
  return (
    <AuthLayout className="cover flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="auth-card bg-gray-900">
        <Link href="/login" className="text-slate-50 hover:underline">
          ← back to login
        </Link>
        <h2 className="text-2xl font-bold text-white mb-4">Create a new account</h2>
        <SignupForm />
        <div className="text-white text-sm mt-4">
          <p>By continuing, you agree to Alex Banzea's </p>
          <div className="inline-flex gap-1.5">
            <Link className="underline text-white" href="/terms-of-use">
              Terms of Use
            </Link>
            <p>and </p>
            <Link className="underline text-white" href="/privacy-policy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Page;
