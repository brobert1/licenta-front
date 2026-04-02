import { Button, Link } from '@components';
import { slugify } from '@functions';
import { useQuery } from '@hooks';
import { useState } from 'react';

const STORAGE_KEY = 'sale-banner-dismissed-id';

const SaleBanner = ({ variant }) => {
  const { data, status } = useQuery('/public/check-sale');

  const [dismissedId, setDismissedId] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEY) || null;
  });

  const handleDismiss = () => {
    if (data?.courseId) {
      localStorage.setItem(STORAGE_KEY, data.courseId);
      setDismissedId(data.courseId);
    }
  };

  if (status !== 'success' || !data?.hasSale || dismissedId === data?.courseId) {
    return null;
  }

  const courseHref = `/${variant}/courses/${slugify(data.courseName, data.courseId)}`;

  return (
    <div className="w-full bg-accent text-white py-4 px-4 text-center relative">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
        <i className="fa-solid fa-bolt text-yellow-300" />
        <p className="font-semibold text-sm lg:text-base">
          <span className="text-yellow-300">Flash Sale!</span> Master chess with exclusive discounts
          — Level up your game today!
        </p>
        <Link
          href={courseHref}
          className="hidden lg:inline-flex ml-2 underline hover:text-yellow-300 font-semibold transition-colors"
        >
          Shop Now →
        </Link>
      </div>
      <Button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Dismiss sale banner"
      >
        <i className="fa-solid fa-xmark" />
      </Button>
    </div>
  );
};

export default SaleBanner;
