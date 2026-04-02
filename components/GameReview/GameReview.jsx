import { StudySkeleton } from '@components/Study';
import { useQuery } from '@hooks';
import GameReviewLayout from './GameReviewLayout';

const GameReview = ({ id }) => {
  const { data: game, status } = useQuery(`/client/play/game/${id}`);

  return (
    <>
      {status === 'loading' && <StudySkeleton type="loading" />}
      {status === 'error' && <StudySkeleton type="error" />}
      {status === 'success' && <GameReviewLayout game={game} />}
    </>
  );
};

export default GameReview;
