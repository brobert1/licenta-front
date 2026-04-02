import { Link } from '@components';
import { TrendingUp } from 'lucide-react';

const ProgressCta = () => {
  return (
    <section className="rounded-xl bg-surface p-6 shadow-sm text-center">
      <div className="mb-3 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <TrendingUp className="h-6 w-6 text-accent" strokeWidth={2} aria-hidden />
        </div>
      </div>
      <p className="mb-4 text-muted text-sm">Track your progress</p>
      <Link
        href="/signup"
        className="inline-block rounded-lg border border-border bg-surface px-6 py-3 font-medium text-primary text-sm"
      >
        Create an account
      </Link>
    </section>
  );
};

export default ProgressCta;
