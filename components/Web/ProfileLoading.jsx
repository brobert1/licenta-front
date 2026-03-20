const ProfileLoading = ({ variant = 'dark' }) => {
  const bgClass = variant === 'light' ? 'bg-surface-container-high' : 'bg-tertiary';
  return (
    <div className="flex flex-col gap-2">
      <h4 className={`animate-pulse h-5 w-20 rounded-full ${bgClass}`}></h4>
      <p className={`animate-pulse h-4 w-40 rounded-full ${bgClass}`}></p>
    </div>
  );
};

export default ProfileLoading;
