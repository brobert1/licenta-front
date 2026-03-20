import { StarRating } from '@components';
import { ago } from '@functions';
import { classnames } from '@lib';

const ReviewCard = ({ review, awaitReview }) => (
  <div className={classnames('flex flex-col gap-3', awaitReview && 'opacity-60')}>
    <div className="flex items-center gap-3">
      {review?.user?.image?.path ? (
        <img
          src={review.user.image.path}
          alt={review.user.name}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-tertiaryGold/15 flex items-center justify-center flex-shrink-0">
          <i className="fa-regular fa-user text-sm text-tertiaryGold" />
        </div>
      )}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-landing font-semibold text-sm text-on-surface truncate">
            {review?.user?.name}
          </p>
          {awaitReview && (
            <span className="text-[10px] font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
              Awaiting moderation
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <StarRating value={review?.rating} readOnly />
          <span className="text-xs font-landing text-secondary-muted">{ago(review?.createdAt)}</span>
        </div>
      </div>
    </div>
    {review?.name && (
      <p className="font-landing font-semibold text-sm text-on-surface">{review.name}</p>
    )}
    <p className="font-landing text-sm text-secondary-muted italic leading-relaxed">
      "{review?.review}"
    </p>
  </div>
);

export default ReviewCard;
