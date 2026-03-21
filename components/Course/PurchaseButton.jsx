import { Button, Price } from '@components';
import { calculateCoursePricing } from '@functions';
import { useStripe } from '@hooks';
import SaleCountdown from './SaleCountdown';

const PurchaseButton = ({ course, isPreview, embedded }) => {
  const { handlePurchase, isLoading } = useStripe(course);
  const { displayPrice, percentOff } = calculateCoursePricing(course);

  const inner = (
    <>
      {course?.sale?.isActive ? (
        <div className="bg-tertiaryGold px-5 py-2.5">
          <p className="text-white text-[10px] font-bold uppercase tracking-widest">
            Limited Time Offer
          </p>
        </div>
      ) : null}

      <div className="p-5 flex flex-col gap-4">
        {/* Pricing */}
        <div className="flex items-baseline gap-3">
          <span className="font-landing font-bold text-3xl text-on-surface tracking-tight">
            {course?.currency?.toUpperCase()} <Price value={displayPrice} precision={2} />
          </span>
          {course?.sale?.isActive && (
            <>
              <span className="font-landing text-base text-secondary-muted line-through">
                <Price value={course?.price} precision={2} />
              </span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                -{percentOff}%
              </span>
            </>
          )}
        </div>

        {/* Countdown */}
        {course?.sale?.isActive && course?.sale?.endsAt && (
          <SaleCountdown endAt={course.sale.endsAt} />
        )}

        {/* CTA */}
        <form onSubmit={handlePurchase}>
          <Button
            type="submit"
            className="w-full py-3 bg-tertiaryGold text-white font-landing font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            disabled={isLoading || isPreview}
          >
            <i className="fa-solid fa-lock-open text-sm" />
            {isLoading ? 'Processing...' : 'Unlock Full Course'}
          </Button>
        </form>

        <p className="text-center text-xs font-landing text-secondary-muted">
          30-day money-back guarantee
        </p>
      </div>
    </>
  );

  if (embedded) return <div>{inner}</div>;

  return (
    <div className="rounded-2xl border border-tertiaryGold/40 bg-tertiaryGold/5 overflow-hidden">
      {inner}
    </div>
  );
};

export default PurchaseButton;
