import { AuthLayout, Link } from '@components';
import { LoginForm } from '@components/Forms';

const Page = () => {
  return (
    <AuthLayout className="cover flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="auth-card bg-gray-900">
        <h2 className="mb-4 text-2xl font-bold text-white">Login</h2>
        <LoginForm />
        <div className="mt-4">
          <Link href="/forgot" className="text-white/70 hover:underline hover:text-white">
            Forgot password?
          </Link>
          <div className="flex">
            <p className="mr-1 text-white/70">No account yet?</p>
            <Link href="/signup" className="hover:underline text-white font-medium">
              Signup now
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Page;
