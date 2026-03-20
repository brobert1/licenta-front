const LichessButton = () => {
  const href = process.env.API_BASE_URL ? `${process.env.API_BASE_URL}/lichess` : '#';

  return (
    <a
      href={href}
      className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-surface-container-high text-on-surface rounded-xl font-bold font-landing hover:bg-surface-container-highest transition-all border border-outline-variant/30"
    >
      <img src="/images/lichess.png" alt="" className="h-6 w-6 object-contain" />
      Login with Lichess
    </a>
  );
};

export default LichessButton;
