import { Link } from '@components';
import { slugify } from '@functions';
import { handlePaymentSuccess } from '@functions';
import { useStripe } from '@hooks';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AddReviewForm } from '@components/Forms';
import ClaimCourseButton from './ClaimCourseButton';
import CourseBottomBar from './CourseBottomBar';
import CourseInfo from './CourseInfo';
import PreviewList from './PreviewList';
import PurchaseButton from './PurchaseButton';
import ReviewCard from './ReviewCard';
import Reviews from './Reviews';
import VimeoPlayer from './VimeoPlayer';

const getVimeoId = (value) => {
  if (!value || typeof value !== 'string') return null;
  if (/^\d+$/.test(value.trim())) return value.trim();

  const patterns = [
    /vimeo\.com\/(?:video\/)?(\d+)/i,
    /player\.vimeo\.com\/video\/(\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
};

const COURSE_INCLUDES = [
  { icon: 'fa-file-lines', text: 'Downloadable PGN files for all analyzed games' },
  { icon: 'fa-robot', text: 'Interactive engine analysis during video sessions' },
  { icon: 'fa-users', text: 'Private community forum access for students' },
  { icon: 'fa-certificate', text: 'Certificate of Completion' },
];

const SidebarPanel = ({ course, user, isPreview, hideReviewsCard }) => {
  const previewReviews = course.reviews?.slice(0, 2) ?? [];
  const items = course?.hasMoveTrainer
    ? [...COURSE_INCLUDES, { icon: 'fa-chess-knight', text: 'Move Trainer exercises' }]
    : COURSE_INCLUDES;

  return (
    <div className="flex flex-col gap-4">
      {/* Course Includes */}
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6">
        <div className="flex items-center gap-2 mb-4">
          <i className="fa-regular fa-circle-check text-tertiaryGold" />
          <h3 className="font-headline text-base text-on-surface">Course Includes</h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <i className={`fa-regular ${item.icon} text-sm text-tertiaryGold mt-0.5 w-4 flex-shrink-0`} />
              <span className="font-landing text-sm text-secondary-muted">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* User Reviews (hidden on full reviews page — see main column there) */}
      {!hideReviewsCard && (
        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6">
          <h3 className="font-headline text-base text-on-surface mb-4">User Reviews</h3>
          {user?.isReviewer ? (
            <ReviewCard review={user.review} awaitReview={!user.review?.approved} />
          ) : user?.isOwned ? (
            <AddReviewForm course={course} />
          ) : previewReviews.length === 0 ? (
            <p className="text-sm font-landing text-secondary-muted italic">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            <>
              <div className="flex flex-col divide-y divide-outline-variant/20">
                {previewReviews.map((review) => (
                  <div key={review._id} className="py-4 first:pt-0 last:pb-0">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
              {course.reviews?.length > 2 && (
                <Link
                  href={`/client/course-reviews/${slugify(course.name, course._id)}`}
                  className="mt-5 flex items-center justify-center text-xs font-landing font-semibold text-secondary-muted hover:text-tertiaryGold uppercase tracking-widest transition-colors"
                >
                  Read All Reviews
                </Link>
              )}
            </>
          )}
        </div>
      )}

      {/* Purchase / Claim section */}
      {!user?.isOwned && (
        course.isPaid ? (
          <PurchaseButton course={course} isPreview={isPreview} />
        ) : (
          <ClaimCourseButton course={course} isPreview={isPreview} />
        )
      )}
    </div>
  );
};

const AuthorCard = ({ author }) => (
  <div className="relative bg-black rounded-2xl overflow-hidden p-8">
    {/* Subtle background texture */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,140,60,0.08)_0%,_transparent_60%)] pointer-events-none" />

    <div className="relative flex gap-8 items-start">
      {/* Left: text content */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-landing font-extrabold text-tertiaryGold uppercase tracking-[0.2em] mb-4">
          Meet the Grandmaster
        </p>
        <h3 className="font-headline text-3xl text-white leading-tight mb-1">
          {author?.title} {author?.name}
        </h3>
        <div className="w-10 h-0.5 bg-tertiaryGold mb-5" />
        <p className="font-landing text-white/60 text-sm leading-relaxed mb-8">
          A world-class chess educator with decades of experience coaching players at every level.
          Known for a deeply analytical approach and ability to simplify complex positions.
        </p>

        {/* Stats row */}
        <div className="flex items-end gap-8">
          <div>
            <p className="font-headline text-2xl text-white leading-none">2700+</p>
            <p className="text-[10px] font-landing font-bold text-tertiaryGold uppercase tracking-widest mt-1">Peak ELO</p>
          </div>
          <div>
            <p className="font-headline text-2xl text-white leading-none">10+</p>
            <p className="text-[10px] font-landing font-bold text-tertiaryGold uppercase tracking-widest mt-1">Titles</p>
          </div>
          <div>
            <p className="font-headline text-2xl text-white leading-none">5k+</p>
            <p className="text-[10px] font-landing font-bold text-tertiaryGold uppercase tracking-widest mt-1">Students</p>
          </div>
        </div>
      </div>

      {/* Right: photo */}
      {author?.image && (
        <div className="flex-shrink-0 w-36 h-36 rounded-xl overflow-hidden ring-2 ring-tertiaryGold/60 shadow-[0_0_24px_rgba(180,140,60,0.25)]">
          <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  </div>
);

const CourseDetailsSuccess = ({ data, showAllReviews, success, isPreview }) => {
  const { course, user } = data;
  const router = useRouter();
  const toastShown = useRef(false);
  const { handlePurchase, isLoading } = useStripe(course);
  const [isPreviewVideoPlaying, setIsPreviewVideoPlaying] = useState(false);

  const firstChapterVideo = course?.content
    ?.find((item) => item?.kind === 'study' && item?.chapters?.length)
    ?.chapters?.find((chapter) => chapter?.video)
    ?.video;

  const previewVideoCandidate =
    course?.preview?.video
    || course?.preview?.videoUrl
    || course?.preview?.vimeo
    || course?.previewVideo
    || course?.trailer
    || firstChapterVideo
    || '';

  const vimeoId = getVimeoId(previewVideoCandidate);
  const [vimeoThumbnail, setVimeoThumbnail] = useState(null);

  const openPreviewVideo = () => {
    if (vimeoId) setIsPreviewVideoPlaying(true);
  };

  useEffect(() => {
    handlePaymentSuccess({ success, router, toastShownRef: toastShown });
  }, [success, router]);

  useEffect(() => {
    if (!vimeoId) return;
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}&width=1280`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.thumbnail_url) setVimeoThumbnail(data.thumbnail_url);
      })
      .catch(() => {});
  }, [vimeoId]);

  const lessonsCount = course?.content?.filter((i) => i.kind === 'study').length;

  return (
    <>
      <div className="w-full mb-20">
        {/* ── HERO ── */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14 items-stretch">
          {/* Left: info + CTAs */}
          <div className="flex flex-col gap-7 h-full justify-between">
            <CourseInfo
              name={course.name}
              description={course.description}
              rating={course.rating}
              difficulty={course.difficulty}
              lessonsCount={lessonsCount}
              sale={course.sale}
              isOwned={user?.isOwned}
            />

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              {user?.isOwned ? (
                <Link
                  href={`/client/courses/${slugify(course.name, course._id)}/lessons`}
                  className="px-6 py-3 bg-tertiaryGold text-white font-landing font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <i className="fa-regular fa-play" />
                  Continue Learning
                </Link>
              ) : course.isPaid ? (
                <form onSubmit={handlePurchase}>
                  <button
                    type="submit"
                    disabled={isLoading || isPreview}
                    className="px-6 py-3 bg-on-surface text-surface font-landing font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <i className="fa-regular fa-lock-open" />
                    {isLoading ? 'Processing...' : 'Enroll Now'}
                  </button>
                </form>
              ) : (
                <button
                  className="px-6 py-3 bg-on-surface text-surface font-landing font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <i className="fa-regular fa-gift" />
                  Enroll Now
                </button>
              )}
              <button
                type="button"
                onClick={openPreviewVideo}
                disabled={!vimeoId}
                className="px-6 py-3 border border-outline-variant/40 text-on-surface font-landing font-semibold text-sm rounded-xl hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Preview Lessons
              </button>
            </div>
          </div>

          {/* Right: course preview media */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-surface-container-high shadow-lg">
            {isPreviewVideoPlaying && vimeoId ? (
              <VimeoPlayer vimeoId={vimeoId} title={course?.name} autoplay />
            ) : (
              <button
                type="button"
                onClick={openPreviewVideo}
                disabled={!vimeoId}
                className="group relative w-full h-full text-left disabled:cursor-not-allowed"
              >
                {(() => {
                  const src = vimeoId
                    ? vimeoThumbnail
                    : (course.preview?.image?.path ?? course.image?.path);
                  return src ? (
                    <img src={src} alt={course.name} className="w-full h-full object-cover" />
                  ) : null;
                })()}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-transform group-hover:scale-105">
                    <i className="fa-solid fa-play text-xl text-on-surface pl-1" />
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column: curriculum + author */}
          <div className="lg:col-span-2 space-y-10">
            {showAllReviews ? (
              <div className="space-y-8">
                <div className="space-y-4">
                  <Link
                    href={`/client/courses/${slugify(course.name, course._id)}`}
                    className="inline-flex items-center gap-2 text-sm font-landing font-semibold text-secondary-muted hover:text-tertiaryGold transition-colors"
                  >
                    <i className="fa-regular fa-arrow-left text-xs" />
                    Back to course
                  </Link>
                  <h2 className="font-headline text-2xl sm:text-3xl text-on-surface">
                    Reviews for {course.name}
                  </h2>
                  <p className="font-landing text-sm text-secondary-muted">
                    {(course.reviews?.length ?? 0) === 0
                      ? 'No published reviews yet.'
                      : `${course.reviews.length} review${course.reviews.length === 1 ? '' : 's'} · average rating ${course.rating ?? '—'} / 5`}
                  </p>
                </div>

                {user?.isOwned && !user?.isReviewer && (
                  <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6 sm:p-8">
                    <h3 className="font-headline text-lg text-on-surface mb-4">Write a review</h3>
                    <AddReviewForm course={course} />
                  </div>
                )}

                {user?.isReviewer && user?.review && (
                  <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6 sm:p-8">
                    <h3 className="font-headline text-lg text-on-surface mb-4">Your review</h3>
                    <ReviewCard review={user.review} awaitReview={!user.review?.approved} />
                  </div>
                )}

                <Reviews reviews={course.reviews} showAllReviews />
              </div>
            ) : (
              <>
                <PreviewList content={course.content} user={user} isPreview={isPreview} />
                <AuthorCard author={course.author} />
              </>
            )}
          </div>

          {/* Right sidebar */}
          <div>
            <SidebarPanel
              course={course}
              hideReviewsCard={showAllReviews}
              isPreview={isPreview}
              user={user}
            />
          </div>
        </div>
      </div>

      <CourseBottomBar course={course} user={user} isPreview={isPreview} />
    </>
  );
};

export default CourseDetailsSuccess;
