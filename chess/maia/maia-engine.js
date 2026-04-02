const MIN_ELO = 100;
const MAX_ELO = 3000;

class MaiaEngine {
  constructor(apiUrl) {
    this.type = 'maia';
    this.apiUrl = apiUrl || process.env.BOTS_API_URL;
    this.apiKey = process.env.BOTS_API_KEY || '';
    this.currentFen = null;
    this.elo = 1200;
    this.modelType = 'rapid';
    this.isReady = false;
    this.turn = false;
    this.abortController = null;
  }

  async init() {
    try {
      const res = await fetch(`${this.apiUrl}/health`);
      if (!res.ok) {
        console.warn('Maia API health check returned', res.status);
        return;
      }
      this.isReady = true;
    } catch (err) {
      console.warn('Maia API unreachable:', err.message);
    }
  }

  newGame() {}

  configureStrength(elo) {
    const numElo = parseInt(elo, 10);
    this.elo = Math.max(MIN_ELO, Math.min(MAX_ELO, numElo));
  }

  configureModelType(minutes) {
    this.modelType = minutes != null && minutes < 10 ? 'blitz' : 'rapid';
  }

  set_position(fen) {
    this.currentFen = fen;
  }

  async go_time() {
    return this._getMove();
  }

  async go() {
    return this._getMove();
  }

  async _getMove() {
    this.abortController = new AbortController();

    const body = {
      fen: this.currentFen,
      elo: this.elo,
      model_type: this.modelType,
    };

    try {
      const res = await fetch(`${this.apiUrl}/get-move`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
        body: JSON.stringify(body),
        signal: this.abortController.signal,
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        console.error('Maia API error:', res.status, error);
        return null;
      }

      const data = await res.json();
      return `bestmove ${data.move}`;
    } catch (err) {
      if (err.name === 'AbortError') return null;
      console.error('Maia engine error:', err);
      return null;
    } finally {
      this.abortController = null;
    }
  }

  stop() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  shouldMoveFirst(fen, playerColor) {
    const turn = fen.split(' ')[1];
    return (turn === 'w' && playerColor === 'black') || (turn === 'b' && playerColor === 'white');
  }

  quit() {
    this.stop();
  }
}

export default MaiaEngine;
