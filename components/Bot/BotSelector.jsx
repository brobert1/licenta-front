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
    <div className="flex flex-col px-4 gap-2 flex-1 min-h-0 overflow-y-auto">
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
              name={bot.name}
              elo={bot.elo}
              onClick={() => handleBotSelect(bot)}
              isSelected={isSelectedBot(bot.name, bot.elo)}
            />
          ))}
        </SkillGroup>
      ))}
    </div>
  );
};

export default BotSelector;
