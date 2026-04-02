import { NoSsr } from '@components';
import { NextChessground } from 'next-chessground';

const SettingsTab = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="flex flex-col">
        <h3 className="text-primary text-2xl font-bold">Board & Pieces</h3>
        <p className="text-muted text-sm">Customize the look and feel of your chess set.</p>
      </div>
      <div id="chess-settings" className="w-full max-w-lg">
        <NoSsr>
          <NextChessground />
        </NoSsr>
      </div>
    </div>
  );
};

export default SettingsTab;
