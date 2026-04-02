'use client';

import { classnames } from '@lib';

const LoadingState = ({ className, description, title }) => {
  return (
    <div
      className={classnames(
        'flex min-h-48 w-full flex-col items-center justify-center px-4 py-10',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex w-full max-w-sm flex-col items-center rounded-xl border border-border bg-surface px-6 py-8 text-center shadow-sm">
        <div
          className="h-10 w-10 rounded-full border-2 border-border border-t-accent animate-spin"
          aria-hidden
        />
        {title ? <p className="mt-5 text-sm font-semibold text-primary">{title}</p> : null}
        {description ? (
          <p className="mt-2 text-xs leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
    </div>
  );
};

export default LoadingState;
