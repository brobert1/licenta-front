import { StarRating } from '@components';
import { ago } from '@functions';
import { classnames } from '@lib';

const ReviewCard = ({ review, awaitReview }) => {
  return (
    <div
      className={classnames(
        'rounded-lg bg-tertiary p-6 shadow-md text-white transition-opacity duration-300 border border-white/10',
        awaitReview ? 'opacity-50' : 'opacity-100'
      )}
    >
      <div className="flex items-start">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent text-white">
            {review?.user?.image?.path ? (
              <img
                src={review?.user?.image.path}
                alt={`${review?.user?.name}'s Profile`}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
                <i className="fas fa-user text-lg text-white"></i>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              {review?.user?.name}
              {awaitReview && (
                <span className="text-sm text-yellow-400 bg-yellow-800 px-2 py-1 rounded">
                  Awaiting moderation
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              <StarRating value={review?.rating} readOnly={true} />
              <span className="text-grey text-sm">{ago(review?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 font-heading font-bold text-white">{review.name}</p>
      <p className="mt-2 text-white">{review.review}</p>
    </div>
  );
};

export default ReviewCard;
