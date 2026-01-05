import { Link } from '@components';
import { useQuery } from '@hooks';

const SaleBanner = () => {
  const { data, status } = useQuery('/public/check-sale');

  if (status !== 'success' || !data?.hasSale) {
    return null;
  }

  return (
    <div className="w-full bg-accent text-white py-4 px-4 text-center relative">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
        <i className="fa-solid fa-bolt text-yellow-300" />
        <p className="font-semibold text-sm lg:text-base">
          <span className="text-yellow-300">Flash Sale!</span> Master chess with exclusive discounts
          — Level up your game today!
        </p>
        <Link
          href="/courses"
          className="hidden lg:inline-flex ml-2 underline hover:text-yellow-300 font-semibold transition-colors"
        >
          Shop Now →
        </Link>
      </div>
    </div>
  );
};

export default SaleBanner;
