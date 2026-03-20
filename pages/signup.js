import { AuthCard, AuthLayoutGrandmaster, LichessButton } from '@components/Visitor';
import { Link } from '@components';
import { SignupForm } from '@components/Forms';

const Page = () => (
  <AuthLayoutGrandmaster variant="split" imageOverlay="Every move is intentional.">
    <AuthCard
      title="Every move is intentional."
      subtitle="Create your account to access the curriculum."
    >
      <SignupForm />
      <div className="mt-4 pt-4 border-t border-outline-variant/30">
        <p className="text-center text-xs font-landing text-secondary-muted uppercase tracking-widest mb-3">
          Social Entry
        </p>
        <LichessButton />
      </div>
      <p className="mt-4 text-center font-landing text-xs text-secondary-muted">
        By continuing, you agree to{' '}
        <Link href="/terms-of-use" className="text-tertiaryGold hover:underline">
          Terms of Use
        </Link>
        {' '}and{' '}
        <Link href="/privacy-policy" className="text-tertiaryGold hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
      <p className="mt-3 text-center font-landing text-xs text-secondary-muted">
        Already have an account?{' '}
        <Link href="/login" className="text-tertiaryGold font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </AuthCard>
  </AuthLayoutGrandmaster>
);

export default Page;
