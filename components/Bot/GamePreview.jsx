import { useQuery, useWindowSize } from '@hooks';
import {
  GamePreviewLayout,
  GamePreviewLayoutLarge,
  GamePreviewLayoutSmall,
  GamePreviewSkeleton,
} from '.';

const GamePreview = ({ id }) => {
  const { data, status } = useQuery(`/client/play/game/${id}`);
  const { isMobile, isMd, is2xl } = useWindowSize();

  if (status === 'loading') return <GamePreviewSkeleton type="loading" />;
  if (status === 'error') return <GamePreviewSkeleton type="error" />;

  return (
    <>
      {isMobile && <GamePreviewLayoutSmall game={data} />}
      {isMd && <GamePreviewLayout game={data} />}
      {is2xl && <GamePreviewLayoutLarge game={data} />}
    </>
  );
};

export default GamePreview;
