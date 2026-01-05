import { constants } from 'next-chessground';
class Stockfish {
  constructor(path) {
    if (typeof window === 'undefined') {
      return false;
    }

    this.type = 'wasm'; // Engine type identifier
    this.enginePath = path;
    this.worker = null;
    this.messageHandlers = [];

    // Engine settings
    this.maxDepth = 25;
    this.maxNodes = 2250000; // 2.25M nodes
    this.isAnalyzing = false;
    this.fen = constants.initialFen;
    this.hashSize = 256; // Default hash size in MB
    this.multiPV = 1; // Track MultiPV setting
    this.threads = navigator.hardwareConcurrency;
  }

  getTurnFromFen(fen) {
    return fen.split(' ')[1];
  }

  normalizeScoreValue(value) {
    const { fen } = this;
    const turn = this.getTurnFromFen(fen);
    if (turn === 'b') {
      return -1 * value;
    }
    return value;
  }

  isInfoMessage(message) {
    if (!message) {
      return false;
    }
    return message.startsWith('info');
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

          // Call all registered message handlers
          this.messageHandlers.forEach((handler) => {
            try {
              handler(message);
            } catch (err) {
              console.error('Message handler error:', err);
            }
          });
        };

        this.worker.onerror = (error) => {
          console.error('Stockfish worker error:', error);
          reject(error);
        };

        // Wait for uciok
        const uciHandler = (message) => {
          if (message === 'uciok') {
            this.messageHandlers = this.messageHandlers.filter((h) => h !== uciHandler);

            // Wait for readyok after sending isready
            const readyHandler = (message) => {
              if (message === 'readyok') {
                this.messageHandlers = this.messageHandlers.filter((h) => h !== readyHandler);

                // Configure engine
                this.set_hash(this.hashSize);
                this.set_threads(this.threads);

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
        console.error('Failed to initialize Stockfish:', error);
        reject(error);
      }
    });
  }

  getScoreFromInfo(msg) {
    if (msg.startsWith('info depth 0')) {
      const split = msg.split(' ');
      const type = split[4];
      const value = this.normalizeScoreValue(Number(split[5]));
      this.isAnalyzing = false;
      return { type, value };
    } else if (msg.startsWith('info depth ')) {
      const split = msg.split(' ');
      const scoreIndex = split.indexOf('score');
      if (scoreIndex !== -1) {
        const type = split[scoreIndex + 1];
        const value = this.normalizeScoreValue(Number(split[scoreIndex + 2]));
        return { type, value };
      }
    }
    return { type: 'cp', value: 0 };
  }

  parseData(data) {
    const parts = data.split(' ');
    const depthIndex = parts.indexOf('depth');
    const depth = depthIndex !== -1 ? parts[depthIndex + 1] : '0';

    let pv = '';
    const pvIndex = data.indexOf(' pv ');
    if (pvIndex > -1) {
      const pvSection = data.substring(pvIndex + 4);
      const bmcIndex = pvSection.indexOf(' bmc ');
      pv = bmcIndex > -1 ? pvSection.substring(0, bmcIndex) : pvSection;
    }

    let multipv = 1;
    const multipvIndex = parts.indexOf('multipv');
    if (multipvIndex !== -1) {
      multipv = parseInt(parts[multipvIndex + 1], 10);
    }

    let nodes = 0;
    const nodesIndex = parts.indexOf('nodes');
    if (nodesIndex !== -1) {
      nodes = parseInt(parts[nodesIndex + 1], 10);
    }

    // Extract additional performance metrics
    let nps = 0;
    const npsIndex = parts.indexOf('nps');
    if (npsIndex !== -1) {
      nps = parseInt(parts[npsIndex + 1], 10);
    }

    let time = 0;
    const timeIndex = parts.indexOf('time');
    if (timeIndex !== -1) {
      time = parseInt(parts[timeIndex + 1], 10); // in milliseconds
    }

    let seldepth = 0;
    const seldepthIndex = parts.indexOf('seldepth');
    if (seldepthIndex !== -1) {
      seldepth = parseInt(parts[seldepthIndex + 1], 10);
    }

    let tbhits = 0;
    const tbhitsIndex = parts.indexOf('tbhits');
    if (tbhitsIndex !== -1) {
      tbhits = parseInt(parts[tbhitsIndex + 1], 10);
    }

    let hashfull = 0;
    const hashfullIndex = parts.indexOf('hashfull');
    if (hashfullIndex !== -1) {
      hashfull = parseInt(parts[hashfullIndex + 1], 10); // permille (0-1000)
    }

    const score = this.getScoreFromInfo(data);
    return {
      depth: parseInt(depth, 10),
      seldepth,
      pv,
      score,
      multipv,
      nodes,
      nps,
      time,
      tbhits,
      hashfull,
    };
  }

  is_ready() {
    return new Promise((resolve) => {
      const handler = (message) => {
        if (message === 'readyok') {
          this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
          resolve(message);
        }
      };
      this.messageHandlers.push(handler);
      this.postMessage('isready');
    });
  }

  set_position(fen) {
    return new Promise((resolve) => {
      this.fen = fen;
      this.postMessage('position fen ' + fen);
      resolve();
    });
  }

  async new_position(fen) {
    await this.stop();
    await this.is_ready();
    this.set_position(fen);
    this.go_infinite();
  }

  set_multipv(numPv) {
    // Only send command if value actually changed
    if (this.multiPV !== numPv) {
      this.multiPV = numPv;
      this.postMessage('setoption name MultiPV value ' + numPv);
    }
  }

  set_hash(hashSize) {
    // Only send command if value actually changed (prevents hash table clear!)
    if (this.hashSize !== hashSize) {
      this.hashSize = hashSize;
      this.postMessage('setoption name Hash value ' + hashSize);
    }
  }

  set_threads(threads) {
    // Only send command if value actually changed
    if (this.threads !== threads) {
      this.threads = threads;
      this.postMessage('setoption name Threads value ' + threads);
    }
  }

  // Convenience method to configure multiple settings at once
  configure(settings = {}) {
    if (settings.hashSize !== undefined) {
      this.set_hash(settings.hashSize);
    }
    if (settings.multiPV !== undefined) {
      this.set_multipv(settings.multiPV);
    }
    if (settings.threads !== undefined) {
      this.set_threads(settings.threads);
    }
  }

  get_score(fen, depth = 15) {
    return new Promise((resolve) => {
      this.set_position(fen);

      const handler = (message) => {
        if (message.startsWith('info depth ' + depth) || message.startsWith('info depth 0')) {
          this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
          const score = this.getScoreFromInfo(message);
          resolve(score);
        }
      };

      this.messageHandlers.push(handler);
      this.postMessage('go depth ' + depth);
    });
  }

  go_infinite(callback) {
    this.isAnalyzing = true;

    const handler = (message) => {
      if (this.isInfoMessage(message) && typeof callback === 'function') {
        const msgData = this.parseData(message);
        callback(msgData);
      }
    };

    this.messageHandlers.push(handler);
    this.postMessage('go infinite');

    // Return cleanup function to remove handler
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  stop() {
    return new Promise((resolve) => {
      if (!this.isAnalyzing) {
        return resolve();
      }

      const handler = (message) => {
        if (message.startsWith('bestmove')) {
          this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
          this.isAnalyzing = false;
          resolve(message);
        }
      };

      // Register handler BEFORE sending stop command to prevent race condition
      this.messageHandlers.push(handler);
      this.postMessage('stop');
    });
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

export { Stockfish };
