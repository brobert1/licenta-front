import { Link } from '@components';
import { Compass } from 'lucide-react';

const QuizCard = () => {
  return (
    <article className="rounded-xl bg-surface p-6 shadow-sm text-center">
      <div className="mb-4 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
          <Compass className="h-7 w-7 text-accent" strokeWidth={2} aria-hidden />
        </div>
      </div>
      <h2 className="mb-1 font-bold text-primary text-xl">Find your level in 3 minutes</h2>
      <p className="mb-4 text-muted text-sm">5 questions. Instant score.</p>
      <Link
        href="/guest/quiz"
        className="block rounded-lg bg-accent py-3 text-center font-medium text-white"
      >
        Take the Quiz
      </Link>
    </article>
  );
};

export default QuizCard;
