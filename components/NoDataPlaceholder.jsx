import { Link } from '@components';
import { classnames } from '@lib';

const NoDataPlaceholder = ({
  icon = 'fa-light fa-file',
  message = 'No data found',
  buttonText,
  href,
  extraClass,
}) => {
  return (
    <div
      className={classnames(
        'mt-8 flex flex-col items-center justify-center gap-5 text-gray-400',
        extraClass
      )}
    >
      <i className={`fa-thin ${icon} text-7xl`}></i>
      <div className="flex flex-col items-center">
        <p className="text-base">{message}</p>
      </div>
      {buttonText && href && (
        <Link href={href} className="button full primary">
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default NoDataPlaceholder;
