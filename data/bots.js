import { banzeusOpening } from './openings/bot-openings';

export const DEFAULT_BOT = {
  name: 'Mira',
  elo: 1200,
  skillLevel: 11,
  message: "Middlegame ideas over opening memorization—let's see what sticks.",
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
    eloColor: 'text-green-400',
    bots: [
      {
        name: 'Rae',
        elo: '500',
        message: "Rule one: don't get Scholar's Mated. Rule two: still working on rule one.",
      },
      {
        name: 'Sienna',
        elo: '700',
        message: "I finally guard my queen like it owes me rent—everything else is negotiable.",
      },
      {
        name: 'Felix',
        elo: '900',
        message: "Fewer hanging pieces, more half-baked plans—perfect time for a sparring round.",
      },
    ],
  },
  intermediate: {
    title: 'Intermediate',
    eloRange: '1000-1400 ELO',
    eloColor: 'text-white',
    bots: [
      {
        name: 'Dante',
        elo: '1000',
        message: "Openings from muscle memory; middlegames from stubbornness.",
      },
      {
        name: 'Mira',
        elo: '1200',
        message: "Middlegame ideas over opening memorization—let's see what sticks.",
      },
      {
        name: 'Gideon',
        elo: '1400',
        message: "Tactics on autopilot—now I'm nagging myself about plans, not just tricks.",
      },
    ],
  },
  advanced: {
    title: 'Advanced',
    eloRange: '1500-1900 ELO',
    eloColor: 'text-red-400',
    bots: [
      {
        name: 'Elise',
        elo: '1500',
        message: "Love a tidy structure—until the position begs for chaos. Then we adapt.",
      },
      {
        name: 'Roman',
        elo: '1700',
        message: "Endgames don't need fireworks; they need one fewer mistake than you.",
      },
      {
        name: 'Aria',
        elo: '1900',
        message: "One lazy tempo and the eval tilts—no free passes from here on.",
      },
    ],
  },
  master: {
    title: 'Master',
    eloRange: '2000-2400 ELO',
    eloColor: 'text-blue-400',
    bots: [
      {
        name: 'Kade',
        elo: '2000',
        message: "Serious chess, zero theatrics—bring your best clock discipline.",
      },
      {
        name: 'Soren',
        elo: '2200',
        message: "Deep prep, quiet improvements—this is the tier where patience hurts.",
      },
      {
        name: 'Zenith',
        elo: '2400',
        message: "Every tempo carries master-level weight—treat the board like it's listening.",
        openingLine: banzeusOpening,
      },
    ],
  },
};
