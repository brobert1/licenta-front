const WelcomeSection = ({ name = 'Grandmaster Thorne', subtitle }) => (
  <div className="mb-8">
    <p className="text-xs font-landing font-bold text-secondary-muted uppercase tracking-widest mb-3">
      Executive Lounge
    </p>
    <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-2">
      Welcome back, {name}
    </h1>
    <p className="font-landing text-secondary-muted text-base">
      {subtitle || 'Your study continues. The Sicilian Defence awaits your further refinement today.'}
    </p>
  </div>
);

export default WelcomeSection;
