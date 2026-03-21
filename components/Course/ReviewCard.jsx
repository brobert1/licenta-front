import { StarRating } from '@components';
import { ago } from '@functions';
import { classnames } from '@lib';

const ReviewCard = ({ awaitReview, review, variant = 'inline' }) => {
  const isPage = variant === 'page';

  return (
    <div
      className={classnames(
        'flex flex-col gap-4',
        awaitReview && 'opacity-60',
        isPage &&
          'rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md'
      )}
    >
      <div className={classnames('flex gap-4', isPage && 'items-start')}>
        {review?.user?.image?.path ? (
          <img
            alt={review.user.name}
            className={classnames(
              'rounded-full object-cover flex-shrink-0 ring-2 ring-outline-variant/10',
              isPage ? 'w-12 h-12' : 'w-9 h-9'
            )}
            src={review.user.image.path}
          />
        ) : (
          <div
            className={classnames(
              'rounded-full bg-tertiaryGold/10 flex items-center justify-center flex-shrink-0',
              isPage ? 'w-12 h-12' : 'w-9 h-9'
            )}
          >
            <i
              className={classnames(
                'fa-regular fa-user text-tertiaryGold',
                isPage ? 'text-base' : 'text-sm'
              )}
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 gap-y-1">
            <p className="font-landing font-semibold text-on-surface truncate">
              {review?.user?.name}
            </p>
            {awaitReview && (
              <span className="text-xs font-landing font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Awaiting moderation
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <StarRating readOnly value={review?.rating} />
            <span className="text-xs font-landing text-secondary-muted">
              {ago(review?.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {review?.name && (
        <p className={classnames('font-headline text-on-surface', isPage ? 'text-lg' : 'text-sm')}>
          {review.name}
        </p>
      )}

      <div className={classnames(isPage && 'pl-5 border-l-4 border-tertiaryGold/35')}>
        <p
          className={classnames(
            'font-landing leading-relaxed',
            isPage ? 'text-base text-on-surface/90' : 'text-sm text-secondary-muted italic'
          )}
        >
          {isPage ? review?.review : `"${review?.review}"`}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
