import { Link } from '@components';
import { usePreview } from '@hooks';
import { classnames } from '@lib';

const Logo = () => {
  const { isPreview } = usePreview();

  return (
    <Link
      href="/client"
      className={classnames(
        'flex cursor-pointer items-center gap-1 text-white',
        isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
    >
      <img
        src="/favicon.png"
        className="-ml-2 -mr-2 h-14 w-14 shrink-0 object-contain object-left"
        alt=""
      />
      <p className="font-semibold text-lg md:text-2xl">Rook&apos;N&apos;Learn</p>
    </Link>
  );
};

export default Logo;
