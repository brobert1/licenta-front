const GuestQuizSkeleton = ({ type }) => {
  const isError = type === 'error';

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <i className="fa-solid fa-triangle-exclamation mb-4 text-4xl text-red-400"></i>
        <p className="text-base font-semibold text-primary">Failed to load quiz</p>
        <p className="mt-1 text-sm text-muted">Please refresh the page and try again.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="mx-auto max-w-sm animate-pulse">
        <div className="mb-4 h-10 w-full rounded-xl bg-tertiary" />
        <div className="mb-2 mx-auto h-4 w-40 rounded bg-tertiary" />
        <div className="mb-3 aspect-square w-full rounded-xl bg-tertiary" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-14 w-full rounded-xl bg-tertiary" />
          ))}
        </div>
        <div className="mt-3 h-14 w-full rounded-xl bg-tertiary" />
      </div>
    </div>
  );
};

export default GuestQuizSkeleton;
