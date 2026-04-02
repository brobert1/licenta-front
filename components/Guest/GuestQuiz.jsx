import { useQuery } from '@hooks';
import GuestQuizSkeleton from './GuestQuizSkeleton';
import GuestQuizSuccess from './GuestQuizSuccess';

const GuestQuiz = () => {
  const { data, status } = useQuery('/public/guest-quiz');

  if (status === 'loading') return null;
  if (status === 'error') return <GuestQuizSkeleton type="error" />;

  return (
    <GuestQuizSuccess
      tutorialQuestion={data.tutorialQuestion}
      questions={data.questions}
      course={data.course}
    />
  );
};

export default GuestQuiz;
