import { StudySkeleton } from '@components/Study';
import { useQuery, useWindowSize } from '@hooks';
import { isEmpty } from 'lodash';
import { GamePreviewLayout, GamePreviewLayoutLarge, GamePreviewLayoutSmall } from '.';
import { NoDataPlaceholder } from '@components';

const GamePreview = ({ index }) => {
  const { data, status } = useQuery('/client/play/history');
  const { isMobile, isMd, is2xl } = useWindowSize();

  return (
    <>
      <div className="flex md:hidden w-full">
        {status === 'loading' && <StudySkeleton type="loading" />}
        {status === 'error' && <StudySkeleton type="error" />}
        {status === 'success' &&
          isMobile &&
          (isEmpty(data) ? (
            <NoDataPlaceholder
              icon="fa-chess-board"
              message="No games yet"
              extraClass="min-h-[calc(100vh-200px)]"
            />
          ) : (
            <GamePreviewLayoutSmall games={data} index={index} />
          ))}
      </div>
      <div className="hidden md:block 2xl:hidden w-full">
        {status === 'loading' && <StudySkeleton type="loading" />}
        {status === 'error' && <StudySkeleton type="error" />}
        {status === 'success' &&
          isMd &&
          (isEmpty(data) ? (
            <NoDataPlaceholder
              icon="fa-chess-board"
              message="No games yet"
              extraClass="min-h-[calc(100vh-200px)]"
            />
          ) : (
            <GamePreviewLayout games={data} index={index} />
          ))}
      </div>
      <div className="hidden 2xl:block w-full">
        {status === 'loading' && <StudySkeleton type="loading" />}
        {status === 'error' && <StudySkeleton type="error" />}
        {status === 'success' &&
          is2xl &&
          (isEmpty(data) ? (
            <NoDataPlaceholder
              icon="fa-chess-board"
              message="No games yet"
              extraClass="min-h-[calc(100vh-200px)]"
            />
          ) : (
            <GamePreviewLayoutLarge games={data} index={index} />
          ))}
      </div>
    </>
  );
};

export default GamePreview;
