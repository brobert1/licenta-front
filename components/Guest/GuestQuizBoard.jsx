import { NoSsr } from '@components';
import { NextChessground } from 'next-chessground';

const GuestQuizBoard = ({ fen, autoShapes = [] }) => {
  return (
    <div className="pointer-events-none w-full overflow-hidden rounded-xl border border-border">
      <NoSsr>
        <NextChessground
          fen={fen}
          orientation="white"
          coordinates
          movable={{ free: false, color: undefined }}
          draggable={{ enabled: false }}
          premovable={{ enabled: false }}
          drawable={{ enabled: false, visible: true, autoShapes }}
        />
      </NoSsr>
    </div>
  );
};

export default GuestQuizBoard;
