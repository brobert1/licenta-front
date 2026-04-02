import { Link } from '@components';
import { usePreview } from '@hooks';
import { classnames } from '@lib';

const Logo = (props) => {
  const { isPreview } = usePreview();

  return (
    <Link
      href="/"
      className={classnames(
        'z-20 inline-flex text-primary',
        isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
      {...props}
    >
      <span className="flex cursor-pointer items-center gap-1 font-bold text-md hover:text-primary">
        <img
          src="/favicon.png"
          className="-ml-3 -mr-2 h-12 w-12 shrink-0 object-contain object-left"
          alt=""
        />
        <span className="hidden font-semibold text-lg tracking-tight sm:inline md:text-xl">
          Rook&apos;N&apos;Learn
        </span>
      </span>
    </Link>
  );
};

export default Logo;
