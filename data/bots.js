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
        name: 'Nova',
        elo: '500',
        message: 'Same rating as Rae—different mood: fewer jokes, more slow king walks.',
      },
      {
        name: 'Sienna',
        elo: '700',
        message: "I finally guard my queen like it owes me rent—everything else is negotiable.",
      },
      {
        name: 'Jules',
        elo: '700',
        message: 'Also 700, but I nag about development before you touch the f-pawn.',
      },
      {
        name: 'Felix',
        elo: '900',
        message: "Fewer hanging pieces, more half-baked plans—perfect time for a sparring round.",
      },
      {
        name: 'Theo',
        elo: '900',
        message: 'Twin strength to Felix—I lean toward quiet positions and one good break.',
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
        name: 'Liam',
        elo: '1000',
        message: 'Same 1000 label—my games skew sharp; hope your tactics are awake.',
      },
      {
        name: 'Mira',
        elo: '1200',
        message: "Middlegame ideas over opening memorization—let's see what sticks.",
      },
      {
        name: 'Elena',
        elo: '1200',
        message: 'Also 1200: I trade down happily and argue the endgame teaches honesty.',
      },
      {
        name: 'Gideon',
        elo: '1400',
        message: "Tactics on autopilot—now I'm nagging myself about plans, not just tricks.",
      },
      {
        name: 'Viktor',
        elo: '1400',
        message: 'Matching Gideon on paper—I pick longer fights and tiny positional nudges.',
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
        name: 'Vera',
        elo: '1500',
        message: 'Same 1500 band—I push for the initiative even when the structure looks dull.',
      },
      {
        name: 'Roman',
        elo: '1700',
        message: "Endgames don't need fireworks; they need one fewer mistake than you.",
      },
      {
        name: 'Omar',
        elo: '1700',
        message: 'Roman’s twin on the sheet—I still prefer rooks on open files and cold math.',
      },
      {
        name: 'Aria',
        elo: '1900',
        message: "One lazy tempo and the eval tilts—no free passes from here on.",
      },
      {
        name: 'Quinn',
        elo: '1900',
        message: 'Also 1900: I punish drift in the opening—decide your plan by move ten.',
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
        name: 'Iris',
        elo: '2000',
        message: 'Same 2000 tag—I grind small edges until the position says someone blinks.',
      },
      {
        name: 'Soren',
        elo: '2200',
        message: "Deep prep, quiet improvements—this is the tier where patience hurts.",
      },
      {
        name: 'Niko',
        elo: '2200',
        message: 'Twin 2200 energy—more tactics in the air, same demand for precision.',
      },
      {
        name: 'Zenith',
        elo: '2400',
        message: "Every tempo carries master-level weight—treat the board like it's listening.",
        openingLine: banzeusOpening,
      },
      {
        name: 'Apex',
        elo: '2400',
        message: 'Same top rating as Zenith—different prep: I steer for imbalanced fights early.',
      },
    ],
  },
};
