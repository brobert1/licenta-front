import { banzeusOpening } from './openings/bot-openings';

export const DEFAULT_BOT = {
  name: 'Charlotte',
  elo: 1200,
  skillLevel: 11,
  message: "I'm getting into intermediate territory, let's battle!",
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
        name: 'Noah',
        elo: '500',
        message: "I'll do my best and try not to make too many mistakes!",
      },
      {
        name: 'Sophia',
        elo: '700',
        message: "I'm getting better at chess, this should be a good game!",
      },
      {
        name: 'Vaynh',
        elo: '900',
        message: "I've been practicing a lot lately, let's see how I do!",
      },
    ],
  },
  intermediate: {
    title: 'Intermediate',
    eloRange: '1000-1400 ELO',
    eloColor: 'text-white',
    bots: [
      {
        name: 'Ethan',
        elo: '1000',
        message: "I'm comfortable with basic tactics, this should be fun!",
      },
      {
        name: 'Charlotte',
        elo: '1200',
        message: "I'm getting into intermediate territory, let's battle!",
      },
      {
        name: 'Mason',
        elo: '1400',
        message: 'I can spot most tactical patterns now!',
      },
    ],
  },
  advanced: {
    title: 'Advanced',
    eloRange: '1500-1900 ELO',
    eloColor: 'text-red-400',
    bots: [
      {
        name: 'Benjamin',
        elo: '1500',
        message: 'I have a solid understanding of chess strategy!',
      },
      {
        name: 'Luna',
        elo: '1700',
        message: 'My endgame technique is quite strong, be prepared!',
      },
      {
        name: 'Sebastian',
        elo: '1900',
        message: "I'm approaching expert level, you'll need to play well!",
      },
    ],
  },
  master: {
    title: 'Master',
    eloRange: '2000-2400 ELO',
    eloColor: 'text-blue-400',
    bots: [
      {
        name: 'Vicky',
        elo: '2000',
        message: 'I play at expert level - expect a serious challenge!',
      },
      {
        name: 'Pose',
        elo: '2200',
        message: 'My chess knowledge is deep and comprehensive!',
      },
      {
        name: 'Banzeus',
        elo: '2400',
        message: "I'm at near-master strength, this will be intense!",
        openingLine: banzeusOpening,
      },
    ],
  },
};
