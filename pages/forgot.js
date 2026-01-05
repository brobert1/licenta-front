import { AuthLayout, Link } from '@components';
import { ForgotForm } from '@components/Forms';

const Page = () => {
  return (
    <AuthLayout className="cover flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="auth-card bg-gray-900">
        <Link href="/login" className="text-slate-50 hover:underline">
          ← back to login
        </Link>
        <h2 className="mb-4 text-2xl font-bold text-white">Password recovery</h2>
        <ForgotForm />
      </div>
    </AuthLayout>
  );
};

export default Page;
