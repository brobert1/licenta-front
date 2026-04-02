import { BotAvatar, SkillGroup } from './';
import { useBotContext } from '@contexts/BotContext';
import { bots } from '@data/bots';

const BotSelector = () => {
  const { selectBot, selectedBot } = useBotContext();

  const handleBotSelect = (bot) => {
    selectBot(bot);
  };

  const isSelectedBot = (name, elo) => {
    return selectedBot.name === name && selectedBot.elo === elo;
  };

  return (
    <div className="flex flex-col gap-2 px-4 min-h-0 flex-1 overflow-y-auto">
      {Object.entries(bots).map(([categoryKey, category]) => (
        <SkillGroup
          key={categoryKey}
          title={category.title}
          eloRange={category.eloRange}
          eloColor={category.eloColor}
        >
          {category.bots.map((bot) => (
            <BotAvatar
              key={`${bot.name}-${bot.elo}`}
              className="mx-auto w-14 max-w-full md:mx-0 md:w-full"
              elo={bot.elo}
              isSelected={isSelectedBot(bot.name, bot.elo)}
              name={bot.name}
              onClick={() => handleBotSelect(bot)}
            />
          ))}
        </SkillGroup>
      ))}
    </div>
  );
};

export default BotSelector;
