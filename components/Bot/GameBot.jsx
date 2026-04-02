import { BotSelector, SelectedBot } from '@components/Bot';

const GameBot = () => {
  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 py-3">
      <h3 className="text-primary text-lg pt-2 px-3 font-semibold text-center">
        Play Chess Against a Bot
      </h3>
      <div className="hidden md:block">
        <SelectedBot />
      </div>
      <BotSelector />
    </div>
  );
};

export default GameBot;
