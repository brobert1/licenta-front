import { claimCourse } from '@api/client';
import { Button, Price } from '@components';
import { useMutation, useStripe } from '@hooks';
import { useRouter } from 'next/router';

const CourseBottomBar = ({ course, user, isPreview }) => {
  const router = useRouter();
  const { handlePurchase, isLoading: isStripeLoading } = useStripe(course);

  const claimMutation = useMutation(claimCourse, {
    successCallback: () => {
      router.reload();
    },
  });

  const handleClaim = async () => {
    await claimMutation.mutate(course._id);
  };

  // Don't show the bar if user already owns the course
  if (user?.isOwned) {
    return null;
  }

  const isFree = !course?.isPaid;
  const isLoading = claimMutation.isLoading || isStripeLoading;

  return (
    <aside
      className="fixed bottom-0 left-0 w-full bg-slate-800 shadow-md border-t
        border-slate-600 flex justify-between items-center gap-4 py-4 px-4 lg:hidden"
    >
      <div className="flex items-center">
        {isFree ? (
          <span className="text-xl font-bold text-white">Free</span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">
              {course.currency}
              <Price
                value={course?.sale?.isActive ? course.sale.price : course.price}
                precision={2}
              />
            </span>
            {course?.sale?.isActive && (
              <span className="line-through text-gray-400">
                {course.currency} <Price value={course.price} precision={2} />
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center">
        {isFree ? (
          <Button
            onClick={handleClaim}
            className="w-full bg-accent bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors gap-2 flex items-center justify-center"
            disabled={isLoading || isPreview}
          >
            <i className="fa-solid fa-gift"></i>
            {isLoading ? 'Claiming...' : 'Get for Free'}
          </Button>
        ) : (
          <Button
            onClick={handlePurchase}
            className="w-full bg-accent bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors gap-2 flex items-center justify-center"
            disabled={isLoading || isPreview}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {isLoading ? 'Processing...' : 'Buy now'}
          </Button>
        )}
      </div>
    </aside>
  );
};

export default CourseBottomBar;
