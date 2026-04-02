import { sovereignOpeningWhite, sovereignOpeningBlack } from './openings/bot-openings';

export const DEFAULT_BOT = {
  name: 'Nora',
  elo: 1200,
  skillLevel: 11,
  message: 'I spot tactics like a magpie spots shiny things. Half the time I am right.',
};

export const DEFAULT_GAME_SETTINGS = {
  timeControl: {
    mode: 'unlimited',
    minutes: 10,
    increment: 0,
  },
  selectedPosition: null,
  playerColor: 'white',
};

export const bots = {
  beginner: {
    title: 'Beginner',
    eloRange: '500-900 ELO',
    eloColor: 'text-green-500',
    bots: [
      {
        name: 'Leo',
        elo: '500',
        message: 'Still learning which diagonal belongs to which bishop.',
      },
      {
        name: 'Mia',
        elo: '700',
        message: "I've studied every fish-hook trap. Landing them is step two.",
      },
      {
        name: 'Sam',
        elo: '900',
        message: "Fresh rating, old excuses—let's play.",
      },
    ],
  },
  intermediate: {
    title: 'Intermediate',
    eloRange: '1000-1400 ELO',
    eloColor: 'text-yellow-500',
    bots: [
      {
        name: 'James',
        elo: '1000',
        message: 'Four-digit club member—please keep your Queen off the highlight reel today.',
      },
      {
        name: 'Nora',
        elo: '1200',
        message: 'I spot tactics like a magpie spots shiny things. Half the time I am right.',
      },
      {
        name: 'Elena',
        elo: '1400',
        message: "Twelve moves of theory loaded—and an opinion on each one.",
      },
    ],
  },
  advanced: {
    title: 'Advanced',
    eloRange: '1500-1900 ELO',
    eloColor: 'text-red-500',
    bots: [
      {
        name: 'Isaac',
        elo: '1500',
        message: 'Smooth builds and quiet pressure—until the tactic party starts.',
      },
      {
        name: 'Maya',
        elo: '1700',
        message: "I play the reply that annoys you—not always the engine's favorite.",
      },
      {
        name: 'Theo',
        elo: '1900',
        message: "Sixty-four squares, endless shades of 'why did I do that?'",
      },
    ],
  },
  master: {
    title: 'Master',
    eloRange: '2000-2400 ELO',
    eloColor: 'text-blue-500',
    bots: [
      {
        name: 'Adrian',
        elo: '2000',
        message: 'Serious chess, serious chin-scratching. Good luck out there.',
      },
      {
        name: 'Clara',
        elo: '2200',
        message: 'Deep files, deeper second thoughts—still coming for your king.',
      },
      {
        name: 'Viktor',
        elo: '2400',
        message: 'Top-tier sparring—hydrate, stretch, and bring your best clock manners.',
        openings: {
          white: sovereignOpeningWhite,
          black: sovereignOpeningBlack,
        },
      },
    ],
  },
};

/**
 * Looks up a bot by name across all skill tiers.
 * Returns the full bot data object (including openings) or `null` if not found.
 */
export const findBotByName = (name) => {
  for (const tier of Object.values(bots)) {
    const found = tier.bots.find((b) => b.name === name);
    if (found) return found;
  }
  return null;
};
