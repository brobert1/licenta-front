const ProfileSuccess = ({ name, email, variant = 'dark' }) => {
  const textClass = variant === 'light' ? 'text-on-surface' : 'text-white';
  const subtextClass = variant === 'light' ? 'text-secondary-muted' : 'text-grey';
  return (
    <div className="flex flex-col text-right">
      <p className={`font-semibold ${textClass}`}>{name}</p>
      <p className={`text-sm ${subtextClass}`}>{email}</p>
    </div>
  );
};

export default ProfileSuccess;
