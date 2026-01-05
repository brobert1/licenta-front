import { AuthBackground, Logo } from '@components';

const AuthLayout = ({ children }) => {
  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-primary">
      <AuthBackground />
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
