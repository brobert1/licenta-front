import { AuthCard, AuthLayoutGrandmaster } from '@components/Visitor';
import { Link } from '@components';
import { ForgotForm } from '@components/Forms';

const Page = () => (
  <AuthLayoutGrandmaster variant="split" imageOverlay="Every move is intentional.">
    <AuthCard
      title="Password Recovery"
      subtitle="Enter your email and we'll send you a reset link."
    >
      <ForgotForm />
      <p className="mt-4 text-center font-landing text-xs text-secondary-muted">
        Remember your password?{' '}
        <Link href="/login" className="text-tertiaryGold font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </AuthCard>
  </AuthLayoutGrandmaster>
);

export default Page;
