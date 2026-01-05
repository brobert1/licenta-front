import { StudyLayoutSmall, StudySkeleton, TrainLayout } from '@components/Study';
import { StudyLayoutProvider } from '@contexts/StudyLayoutContext';
import { useQuery } from '@hooks';

const TrainLesson = ({ id, fen }) => {
  const { data, status } = useQuery(`/client/studies/${id}`);

  return (
    <StudyLayoutProvider>
      <div className="flex md:hidden w-full">
        {status === 'loading' && <StudySkeleton type="loading" />}
        {status === 'error' && <StudySkeleton type="error" />}
        {status === 'success' && <StudyLayoutSmall data={data?.study} progress={data?.progress} />}
      </div>
      <div className="hidden md:flex w-full">
        {status === 'loading' && <StudySkeleton type="loading" />}
        {status === 'error' && <StudySkeleton type="error" />}
        {status === 'success' && <TrainLayout data={data?.study} progress={data?.progress} fen={fen} />}
      </div>
    </StudyLayoutProvider>
  );
};

export default TrainLesson;
