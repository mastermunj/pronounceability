import _tuples from './data/tuples.json';
import _triples from './data/triples.json';

type Tuple = {
  [K: string]: {
    [K: string]: number;
  };
};

type Triple = {
  [K: string]: {
    [K: string]: {
      [K: string]: number;
    };
  };
};

const tuples = _tuples as Tuple;
const triples = _triples as Triple;

export class Pronounceable {
  public hasVowels(word: string): boolean {
    return word.search(/[aeiouy]/) >= 0;
  }

  public clean(word: string): string {
    return word.replace(/[^a-zA-Z]/g, '').toLowerCase();
  }

  public percent(score: number, count: number) {
    return (score / count) * 100;
  }

  public trainTuples(words: string[]): Tuple {
    const probability: Tuple = {};
    let count = 0;

    for (let word of words) {
      word = this.clean(word);
      for (let i = 0; i < word.length - 1; i++) {
        const cc = word[i];
        const nc = word[i + 1];
        if (!probability[cc]) {
          probability[cc] = {};
        }
        if (!probability[cc][nc]) {
          probability[cc][nc] = 1;
        } else {
          probability[cc][nc]++;
        }
        count++;
      }
    }

    for (const first of Object.keys(probability)) {
      for (const second of Object.keys(probability[first])) {
        probability[first][second] = this.percent(probability[first][second], count);
      }
    }

    return probability;
  }

  public trainTriples(words: string[]): Triple {
    const probability: Triple = {};
    let count = 0;

    for (let word of words) {
      word = this.clean(word);
      for (let i = 0; i < word.length - 2; i++) {
        const cc = word[i];
        const nc = word[i + 1];
        const nnc = word[i + 2];
        if (!probability[cc]) {
          probability[cc] = {};
        }
        if (!probability[cc][nc]) {
          probability[cc][nc] = {};
        }
        if (!probability[cc][nc][nnc]) {
          probability[cc][nc][nnc] = 1;
        } else {
          probability[cc][nc][nnc]++;
        }
        count++;
      }
    }

    for (const first of Object.keys(probability)) {
      for (const second of Object.keys(probability[first])) {
        for (const third of Object.keys(probability[first][second])) {
          probability[first][second][third] = this.percent(probability[first][second][third], count);
        }
      }
    }

    return probability;
  }

  public score(word: string): number {
    word = this.clean(word);
    let score = 0;

    if (!this.hasVowels(word)) {
      return 0;
    }

    switch (word.length) {
      case 1:
        return 1;

      case 2:
        for (let i = 0; i < word.length - 1; i++) {
          const cc = word[i];
          const nc = word[i + 1];
          if (tuples[cc] && tuples[cc][nc]) {
            score += tuples[cc][nc];
          } else {
            score -= 1;
          }
        }
        break;

      default:
        for (let i = 0; i < word.length - 2; i++) {
          const cc = word[i];
          const nc = word[i + 1];
          const nnc = word[i + 2];
          if (triples[cc] && triples[cc][nc] && triples[cc][nc][nnc]) {
            score += triples[cc][nc][nnc];
          } else {
            score -= 1;
          }
        }
    }

    if (word.length > 3) {
      score /= word.length;
    }

    return score;
  }
}
