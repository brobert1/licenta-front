import { coffee } from '@functions';

/**
 * Stockfish WASM Bot Wrapper
 * Uses Stockfish 17.1 with NNUE for maximum strength
 * Supports skill levels 0-20
 */
class StockfishWASM {
  constructor(path) {
    if (typeof window === 'undefined') {
      return false;
    }

    this.type = 'wasm';

    this.enginePath = path || '/lib/stockfish/stockfish-17.1-8e4d048.js';
    this.worker = null;
    this.messageHandlers = [];

    // Bot settings
    this.skillLevel = 20; // 0 to 20 (0 = weakest, 20 = strongest)
    this.maxDepth = null; // null = unlimited, otherwise max search depth
    this.threads = Math.max(1, Math.floor(navigator.hardwareConcurrency / 2));
    this.hash = 16;
    this.isReady = false;
    this.currentGameId = null;
  }

  postMessage(command) {
    if (this.worker) {
      this.worker.postMessage(command);
    }
  }

  async init() {
    return new Promise((resolve, reject) => {
      try {
        this.worker = new Worker(this.enginePath);

        this.worker.onmessage = (e) => {
          const message = e.data;
          this.messageHandlers.forEach((handler) => {
            try {
              handler(message);
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error('Message handler error:', err);
            }
          });
        };

        this.worker.onerror = (error) => {
          // eslint-disable-next-line no-console
          console.error('Stockfish worker error:', error);
          reject(error);
        };

        // Initialize UCI
        const uciHandler = (message) => {
          if (message === 'uciok') {
            this.messageHandlers = this.messageHandlers.filter((h) => h !== uciHandler);

            // Set engine options
            this.postMessage('setoption name UCI_AnalyseMode value false');
            this.postMessage('setoption name UCI_Chess960 value true');

            const readyHandler = (message) => {
              if (message === 'readyok') {
                this.messageHandlers = this.messageHandlers.filter((h) => h !== readyHandler);

                // Configure for bot play
                this.postMessage(`setoption name Threads value ${this.threads}`);
                this.setHash(this.hash);
                this.setSkillLevel(this.skillLevel);

                // Initialize new game
                this.postMessage('ucinewgame');

                this.isReady = true;
                resolve();
              }
            };

            this.messageHandlers.push(readyHandler);
            this.postMessage('isready');
          }
        };

        this.messageHandlers.push(uciHandler);
        this.postMessage('uci');
      } catch (error) {
        reject(error);
      }
    });
  }

  // Start a new game - clears hash tables
  newGame(gameId = null) {
    if (this.currentGameId !== gameId) {
      this.currentGameId = gameId;
      this.postMessage('ucinewgame');
      this.postMessage('isready');
    }
  }

  /**
   * Set skill level (0-20)
   * Also sets UCI_LimitStrength and UCI_Elo for more accurate Elo simulation
   */
  setSkillLevel(level) {
    this.skillLevel = Math.max(0, Math.min(20, level));
    this.postMessage(`setoption name Skill Level value ${this.skillLevel}`);

    // For levels below 20, also enable Elo limiting for better accuracy
    if (this.skillLevel < 20) {
      this.postMessage('setoption name UCI_LimitStrength value true');
      // Map skill level 0-20 to approximate Elo 800-2850
      const estimatedElo = Math.round(800 + (this.skillLevel / 20) * 2050);
      this.postMessage(`setoption name UCI_Elo value ${estimatedElo}`);
    } else {
      this.postMessage('setoption name UCI_LimitStrength value false');
    }
  }

  // Set hash table size in MB
  setHash(hash) {
    this.hash = hash;
    this.postMessage(`setoption name Hash value ${this.hash}`);
  }

  // Set maximum search depth (null for unlimited)
  setMaxDepth(depth) {
    this.maxDepth = depth;
  }

  // Set position using FEN
  set_position(fen) {
    this.postMessage(`position fen ${fen}`);
  }

  // Go with time limit (returns full bestmove message)
  async go_time(timeMs = 1000) {
    const startTime = Date.now();

    return new Promise((resolve) => {
      let resolved = false;

      const handler = async (message) => {
        if (message.startsWith('bestmove')) {
          this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);

          // Calculate elapsed time and remaining delay
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, timeMs - elapsedTime);

          // Wait for the minimum time before resolving
          await coffee(remainingTime);
          if (!resolved) {
            resolved = true;
            resolve(message);
          }
        }
      };

      this.messageHandlers.push(handler);

      // Build search command - use depth + time for consistent strength
      if (this.maxDepth !== null && this.skillLevel === 20) {
        // Max strength with depth limit
        this.postMessage(`go depth ${this.maxDepth}`);
      } else if (this.maxDepth !== null) {
        // Depth-limited search with time cap
        this.postMessage(`go depth ${this.maxDepth} movetime ${timeMs * 2}`);
      } else if (this.skillLevel === 20) {
        // Max strength unlimited - longer thinking time
        this.postMessage(`go movetime ${Math.max(timeMs, 2000)}`);
      } else {
        // Lower skill levels - use time limit
        this.postMessage(`go movetime ${timeMs}`);
      }
    });
  }

  // Flexible go command
  async go(options = {}) {
    const { depth, movetime, nodes, wtime, btime, winc, binc } = options;

    return new Promise((resolve) => {
      let resolved = false;

      const handler = async (message) => {
        if (message.startsWith('bestmove')) {
          this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
          if (!resolved) {
            resolved = true;
            resolve(message);
          }
        }
      };

      this.messageHandlers.push(handler);

      let command = 'go';
      if (depth) command += ` depth ${depth}`;
      if (movetime) command += ` movetime ${movetime}`;
      if (nodes) command += ` nodes ${nodes}`;
      if (wtime !== undefined) command += ` wtime ${wtime} btime ${btime}`;
      if (winc !== undefined) command += ` winc ${winc} binc ${binc}`;

      this.postMessage(command);
    });
  }

  // Stop current search
  stop() {
    this.postMessage('stop');
  }

  // Toggle turn (for compatibility)
  toggleTurn() {
    // No-op for compatibility
  }

  // Check if engine should move first
  shouldMoveFirst(fen, playerColor) {
    const parts = fen.split(' ');
    const turn = parts[1];
    return (turn === 'w' && playerColor === 'black') || (turn === 'b' && playerColor === 'white');
  }

  quit() {
    this.messageHandlers = [];
    if (this.worker) {
      this.postMessage('quit');
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export { StockfishWASM };
