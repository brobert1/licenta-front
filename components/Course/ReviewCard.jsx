import { StarRating } from '@components';
import { ago } from '@functions';
import { classnames } from '@lib';

const ReviewCard = ({ review, awaitReview }) => {
  return (
    <div
      className={classnames(
        'rounded-xl border border-tertiary bg-secondary p-4 sm:p-6 text-primary shadow-md transition-opacity duration-300',
        awaitReview ? 'opacity-50' : 'opacity-100'
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          {review?.user?.image?.path ? (
            <img
              alt={`${review?.user?.name}'s Profile`}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover"
              src={review?.user?.image.path}
            />
          ) : (
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/20">
              <i className="fas fa-user text-base sm:text-lg text-white" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="flex flex-wrap items-center gap-2 text-lg font-semibold text-primary leading-tight">
            <span className="break-words">{review?.user?.name}</span>
            {awaitReview && (
              <span className="rounded bg-yellow-100 px-2 py-1 text-xs sm:text-sm text-yellow-600">
                Awaiting moderation
              </span>
            )}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <StarRating readOnly={true} value={review?.rating} />
            <span className="text-xs sm:text-sm text-muted">{ago(review?.createdAt)}</span>
          </div>
        </div>
      </div>
      <p className="mt-3 sm:mt-4 font-bold text-primary leading-snug break-words">{review.name}</p>
      <p className="mt-1.5 sm:mt-2 text-muted leading-relaxed break-words">{review.review}</p>
    </div>
  );
};

export default ReviewCard;
