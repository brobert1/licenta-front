import { claimCourse } from '@api/client';
import { Button } from '@components';
import { useMutation } from '@hooks';
import { useRouter } from 'next/router';

const ClaimCourseButton = ({ course, isPreview, embedded }) => {
  const router = useRouter();

  const mutation = useMutation(claimCourse, {
    successCallback: () => router.reload(),
  });

  if (mutation.isLoading) {
    return (
      <div className="p-5 flex flex-col gap-4 animate-pulse">
        <div className="h-8 w-16 bg-surface-container-high rounded" />
        <div className="h-11 w-full bg-surface-container-high rounded-xl" />
      </div>
    );
  }

  const inner = (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-baseline gap-2">
        <span className="font-landing font-bold text-3xl text-on-surface tracking-tight">Free</span>
        <span className="text-xs font-landing text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
          No cost
        </span>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(course._id); }}>
        <Button
          type="submit"
          className="w-full py-3 bg-tertiaryGold text-white font-landing font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          disabled={mutation.isLoading || isPreview}
        >
          <i className="fa-solid fa-gift text-sm" />
          Get for Free
        </Button>
      </form>

      <p className="text-center text-xs font-landing text-secondary-muted">
        Instant access · No credit card required
      </p>
    </div>
  );

  if (embedded) return inner;

  return (
    <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest overflow-hidden">
      {inner}
    </div>
  );
};

export default ClaimCourseButton;
