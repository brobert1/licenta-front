import { AuthCard, AuthLayoutGrandmaster, LichessButton } from '@components/Visitor';
import { Link } from '@components';
import { LoginForm } from '@components/Forms';

const Page = () => (
  <AuthLayoutGrandmaster variant="split" imageOverlay="Every move is intentional.">
    <AuthCard title="Welcome Back" subtitle="Return to your study" subtitleUppercase>
      <LoginForm />
      <div className="mt-4 pt-4 border-t border-outline-variant/30">
        <p className="text-center text-xs font-landing text-secondary-muted uppercase tracking-widest mb-3">
          Social Entry
        </p>
        <LichessButton />
      </div>
      <p className="mt-4 text-center font-landing text-xs text-secondary-muted">
        Not a member?{' '}
        <Link href="/signup" className="text-tertiaryGold font-semibold hover:underline">
          Join the Club
        </Link>
      </p>
    </AuthCard>
  </AuthLayoutGrandmaster>
);

export default Page;
