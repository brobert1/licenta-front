const getEngineConfiguration = (elo, configs, engineType) => {
  const eloNum = parseInt(elo);
  const config = configs.find(([maxElo]) => eloNum <= maxElo);

  if (engineType === 'wasm') {
    return {
      skillLevel: config[1],
      maxDepth: config[2],
      hash: config[3],
    };
  }

  // For ASM engine (stockfish-asm-wrapper)
  return {
    skillLevel: config[1],
    maxError: config[2],
    probability: config[3],
  };
};

export default getEngineConfiguration;


