import { joinWaitlist, leaveWaitlist } from '@api/client';
import { Button, Link } from '@components';
import { calculateCoursePricing, slugify, stripTags } from '@functions';
import { usePreview } from '@hooks';
import { toaster } from '@lib';
import { useState } from 'react';

const GuestCourseCard = ({
  _id,
  name,
  preview,
  image,
  active,
  guest = false,
  isOnWaitlist: initialIsOnWaitlist = false,
  basePath = '/guest/courses',
  ...props
}) => {
  const { percentOff, endsIn } = calculateCoursePricing(props);
  const { isPreview } = usePreview();
  const isComingSoon = !active;
  const showSaleInfo = active && props?.sale?.isActive;
  const [isOnWaitlist, setIsOnWaitlist] = useState(initialIsOnWaitlist);
  const [isLoading, setIsLoading] = useState(false);

  const handleWaitlist = async () => {
    setIsLoading(true);
    try {
      if (isOnWaitlist) {
        await leaveWaitlist(_id);
        toaster.success('You have left the waitlist');
        setIsOnWaitlist(false);
      } else {
        await joinWaitlist(_id);
        toaster.success('You have joined the waitlist');
        setIsOnWaitlist(true);
      }
    } catch {
      toaster.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const actionClass =
    'inline-flex w-full sm:w-auto justify-center rounded-full px-4 py-2 text-sm font-semibold';

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-surface p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary">
          {image?.path && (
            <img src={image.path} alt={name} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="line-clamp-2 text-base font-bold text-primary">{name}</h2>
            {isComingSoon && (
              <span className="shrink-0 rounded-full border border-teal-600 px-2 py-0.5 text-xs font-semibold text-teal-600">
                Coming Soon
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted first-letter:uppercase whitespace-pre-line">
            {stripTags(preview?.description)}
          </p>
          {showSaleInfo && (
            <p className="mt-1 text-xs font-semibold text-accent">
              {percentOff}% off
              {endsIn ? ` · ends in ${endsIn}` : ''}
            </p>
          )}
        </div>
      </div>
      <div className="w-full sm:w-auto sm:shrink-0">
        {isComingSoon && !isPreview ? (
          guest ? (
            <Link
              href="/login"
              className={`${actionClass} bg-teal-600 text-white transition-colors hover:bg-teal-700`}
            >
              Join Waitlist
            </Link>
          ) : (
            <Button
              onClick={handleWaitlist}
              disabled={isLoading}
              title={isOnWaitlist ? 'Click to leave waitlist' : 'Join the waitlist'}
              className={`${actionClass} transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                isOnWaitlist
                  ? 'border border-teal-300 bg-teal-50 text-teal-700 hover:bg-teal-100'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {isLoading ? (
                isOnWaitlist ? (
                  'Updating...'
                ) : (
                  'Joining...'
                )
              ) : isOnWaitlist ? (
                <span className="inline-flex items-center gap-1.5">
                  <i className="fa-solid fa-check text-xs"></i>
                  <span>Waitlisted</span>
                </span>
              ) : (
                'Join Waitlist'
              )}
            </Button>
          )
        ) : (
          <Link
            href={`${basePath}/${slugify(name, _id)}`}
            className={`${actionClass} bg-accent text-white`}
          >
            View course
          </Link>
        )}
      </div>
    </div>
  );
};

export default GuestCourseCard;
