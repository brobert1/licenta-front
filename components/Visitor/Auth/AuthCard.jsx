const AuthCard = ({ title, subtitle, subtitleUppercase = false, children }) => (
  <div className="w-full auth-card-grandmaster bg-white rounded-2xl p-6 shadow-lg border border-outline-variant/20">
    <h1 className="font-headline text-3xl md:text-4xl text-black mb-1">{title}</h1>
    <p
      className={`font-landing text-secondary-muted mb-6 ${
        subtitleUppercase ? 'text-xs uppercase tracking-widest' : 'text-sm'
      }`}
    >
      {subtitle}
    </p>
    {children}
  </div>
);

export default AuthCard;
