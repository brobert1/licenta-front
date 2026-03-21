import { Link } from '@components';
import { slugify } from '@functions';
import ReviewCard from './ReviewCard';

const Reviews = ({ name, review, reviews, showAllReviews, uuid }) => {
  if (reviews.length <= 0) {
    return (
      <div
        className={
          showAllReviews
            ? 'rounded-2xl border border-dashed border-outline-variant/30 bg-surface-container-low/50 py-16 px-6 text-center'
            : ''
        }
      >
        <div className={showAllReviews ? 'max-w-md mx-auto' : ''}>
          {showAllReviews && (
            <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4">
              <i className="fa-regular fa-comments text-2xl text-secondary-muted" />
            </div>
          )}
          <p
            className={
              showAllReviews
                ? 'font-landing text-secondary-muted text-sm'
                : 'text-center text-gray-500'
            }
          >
            {review ? 'No other reviews have been posted yet.' : 'No reviews have been posted yet.'}
          </p>
        </div>
      </div>
    );
  }

  if (showAllReviews) {
    return (
      <ul className="flex flex-col gap-5 list-none p-0 m-0">
        {reviews.map((r) => (
          <li key={r._id}>
            <ReviewCard review={r} variant="page" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div>
        <div className="space-y-6">
          {reviews.slice(0, 2).map((r) => (
            <ReviewCard key={r._id} review={r} />
          ))}
        </div>
      </div>
      {reviews.length > 1 && (
        <Link
          className="button full mx-auto accent text-xs"
          href={`/client/course-reviews/${slugify(name, uuid)}`}
        >
          See more
        </Link>
      )}
    </>
  );
};

export default Reviews;
