import { Link } from '@components';
import { usePreview } from '@hooks';
import { classnames } from '@lib';

const Logo = () => {
  const { isPreview } = usePreview();

  return (
    <Link
      href="/client"
      className={classnames(
        'flex cursor-pointer items-center text-white text-2xl',
        isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
    >
      <img src="/images/logo.png" className="w-14 h-14 mb-4" alt="MyChessPlace" />
      <p className="font-semibold text-lg md:text-2xl">MyChessPlace</p>
    </Link>
  );
};

export default Logo;
