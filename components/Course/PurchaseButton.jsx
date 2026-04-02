import { Button, Price } from '@components';
import { calculateCoursePricing } from '@functions';
import { useStripe } from '@hooks';
import SaleCountdown from './SaleCountdown';

const PurchaseButton = ({ course, isPreview }) => {
  const { handlePurchase, isLoading } = useStripe(course);
  const { displayPrice, percentOff } = calculateCoursePricing(course);
  const showSaleInfo = course?.active && course?.sale?.isActive;

  return (
    <div className="flex flex-col space-y-2">
      {course?.isPaid && (
        <div className="flex flex-col items-center gap-2">
          {!showSaleInfo && (
            <span className="text-primary text-2xl font-bold">
              {course?.currency} <Price value={course?.price} precision={2} />
            </span>
          )}
          {showSaleInfo && (
            <>
              <span className="text-primary text-2xl font-bold">
                {course?.currency} <Price value={displayPrice} precision={2} />
              </span>
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-400">
                  {course?.currency} <Price value={course?.price} precision={2} />
                </span>
                <span className="text-xs rounded-full bg-red-600/20 text-red-400 border border-red-600/40 px-2 py-1">
                  Save {percentOff}%
                </span>
              </div>
            </>
          )}
        </div>
      )}
      {showSaleInfo && course?.sale?.endsAt && <SaleCountdown endAt={course?.sale?.endsAt} />}
      <form onSubmit={handlePurchase}>
        <Button
          type="submit"
          className="w-full bg-accent bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors gap-2 flex items-center justify-center"
          disabled={isLoading || isPreview}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          {isLoading ? 'Processing...' : 'Buy now'}
        </Button>
      </form>
    </div>
  );
};

export default PurchaseButton;
