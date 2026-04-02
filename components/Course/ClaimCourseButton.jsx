import { claimCourse } from '@api/client';
import { store } from '@auth';
import { Button } from '@components';
import { useMutation } from '@hooks';
import { useRouter } from 'next/router';

const ClaimCourseButton = ({ course, isPreview }) => {
  const router = useRouter();

  const mutation = useMutation(claimCourse, {
    successCallback: () => {
      router.reload();
    },
  });

  const handleClaim = async (e) => {
    e.preventDefault();
    if (!store.getState()) {
      router.push('/signup');
      return;
    }
    await mutation.mutate(course._id);
  };

  if (mutation.isLoading) {
    return (
      <div className="flex flex-col space-y-2 animate-pulse">
        <div className="text-center">
          <div className="h-8 bg-gray-700 rounded w-16 mx-auto"></div>
        </div>
        <div className="h-10 bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-center">
        <span className="text-2xl font-bold text-primary">Free</span>
      </div>
      <form onSubmit={handleClaim}>
        <Button
          type="submit"
          className="w-full bg-accent bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors gap-2 flex items-center justify-center"
          disabled={mutation.isLoading || isPreview}
        >
          <i className="fa-solid fa-gift"></i>
          Get for Free
        </Button>
      </form>
    </div>
  );
};

export default ClaimCourseButton;
