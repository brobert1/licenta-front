/**
 * Stockfish WASM Bot configurations
 * Format: [maxElo, skillLevel, maxDepth, hash]
 * skillLevel: 0 to 20 (standard Stockfish range)
 * maxDepth: search depth limit (null for unlimited)
 * hash: hash table size in MB
 *
 * This uses Stockfish 17.1 with NNUE for maximum strength
 * The skill levels map approximately to these Elo ranges (via UCI_Elo):
 * - Level 0: ~800 Elo
 * - Level 10: ~1900 Elo
 * - Level 20: ~3200+ Elo (full strength)
 */
export const wasmBotConfigs = [
  [400, 0, 1, 16], // Very weak ~500 Elo - skill 0, depth 1
  [600, 0, 1, 16], // Beginner ~600 Elo - skill 0
  [800, 1, 1, 16], // Beginner+ ~700 Elo
  [1000, 2, 2, 16], // Casual ~900 Elo
  [1200, 4, 3, 16], // Club ~1100 Elo
  [1400, 6, 4, 32], // Intermediate ~1300 Elo
  [1600, 9, 6, 32], // Advanced ~1600 Elo
  [1800, 12, 8, 64], // Strong ~1900 Elo
  [2000, 15, 10, 128], // Expert ~2200 Elo
  [2200, 18, 12, 256], // Master ~2500 Elo
  [Infinity, 20, null, 512], // Full strength ~3200+ Elo
];

/**
 * Stockfish-ASM engine configurations for different play modes
 * Format: [maxElo, skillLevel, maxError, errorProbability]
 * skillLevel: 0 to 20 (no negative values supported)
 * maxError: maximum error in centipawns (null for unlimited)
 * errorProbability: probability of making an error (null for no errors)
 */
export const asmEngineConfigs = [
  [500, 0, 60000, 10],
  [700, 0, 50000, 15],
  [900, 0, 40000, 25],
  [1000, 0, 30000, 40],
  [1200, 1, 20000, 60],
  [1400, 1, 15000, 100],
  [1500, 2, 12000, 150],
  [1700, 3, 10000, 250],
  [1900, 4, 8000, 400],
  [2000, 5, 6000, 500],
  [2200, 6, 4000, 650],
  [Infinity, 20, null, null], // Unlimited
];
