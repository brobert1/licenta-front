import { BotSelector, SelectedBot } from '@components/Bot';

const GameBot = () => {
  return (
    <div className="flex-1 flex min-h-0 flex-col gap-3 py-3 h-full">
      <h3 className="text-white text-lg pt-2 px-3 font-semibold text-center">
        Play Chess Against a Bot
      </h3>
      <SelectedBot />
      <BotSelector />
    </div>
  );
};

export default GameBot;
