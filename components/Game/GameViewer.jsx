import { useQuery } from '@hooks';
import { GameViewerBoard, GameViewerSkeleton } from '.';

const GameViewer = ({ id }) => {
  const { data: game, status } = useQuery(`/public/play/game/${id}`);

  return (
    <>
      {status === 'loading' && <GameViewerSkeleton type="loading" />}
      {status === 'error' && <GameViewerSkeleton type="error" />}
      {status === 'success' && <GameViewerBoard game={game} />}
    </>
  );
};

export default GameViewer;
