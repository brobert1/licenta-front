import { Link } from '@components';
import { slugify } from '@functions';
import { usePreview } from '@hooks';

const DashboardCardButtons = ({ _id: uuid, name, isPaid, active, isOwned }) => {
  const { isPreview } = usePreview();
  const href = `/client/courses/${slugify(name, uuid)}`;

  // In preview mode, ignore active status and show as if user doesn't own the course
  const shouldShowButtons = isPreview || active;
  const showAsNotOwned = isPreview || !isOwned;

  return (
    <div className="flex gap-2">
      {shouldShowButtons && !isPaid && showAsNotOwned && (
        <Link href={href} className="button full accent py-1.5">
          Get for free
        </Link>
      )}
      {shouldShowButtons && isPaid && showAsNotOwned && (
        <>
          <Link href={href} className="button full accent py-1.5">
            Buy
          </Link>
          <Link href={href} className="button full primary py-1.5">
            Details
          </Link>
        </>
      )}
      {active && isOwned && !isPreview && (
        <Link href={href} className="button full accent py-1.5">
          Continue
        </Link>
      )}
    </div>
  );
};

export default DashboardCardButtons;
