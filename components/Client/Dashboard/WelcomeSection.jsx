import { useQuery } from '@hooks';

const WelcomeSection = () => {
  const { data: me, status } = useQuery('/client/account');

  return (
    <div className="mb-8">
      <p className="text-xs font-landing font-bold text-secondary-muted uppercase tracking-widest mb-3">
        Executive Lounge
      </p>
      {status === 'loading' ? (
        <div className="h-12 w-72 bg-surface-container-high rounded-lg animate-pulse mb-2" />
      ) : (
        <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-2">
          Welcome back, {me?.name}
        </h1>
      )}
      <p className="font-landing text-secondary-muted text-base">
        Your study continues. Keep improving your game today.
      </p>
    </div>
  );
};

export default WelcomeSection;
