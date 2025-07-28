import { describe, expect, test } from 'vitest';
import { Pronounceable } from '../src/index';

const pronounceable = new Pronounceable();

describe('Utilities', () => {
  test('vowels', () => {
    expect(pronounceable.hasVowels('Smart')).toBe(true);
  });

  test('clean', () => {
    expect(pronounceable.clean('Sma-rt')).toBe('smart');
  });

  test('percent', () => {
    expect(pronounceable.percent(10, 20)).toBe(50);
  });
});

describe('Training', () => {
  test('Tuples', () => {
    const tuples = {
      a: { r: 10 },
      m: { a: 10 },
      n: { o: 10 },
      o: { n: 10, u: 10 },
      p: { r: 10 },
      r: { o: 10, t: 10 },
      s: { m: 10 },
      u: { n: 10 },
    };
    expect(pronounceable.trainTuples(['Smart', 'Pronoun'])).toStrictEqual(tuples);
  });

  test('Triples', () => {
    const triples = {
      a: { r: { t: 12.5 } },
      m: { a: { r: 12.5 } },
      n: { o: { u: 12.5 } },
      o: { n: { o: 12.5 }, u: { n: 12.5 } },
      p: { r: { o: 12.5 } },
      r: { o: { n: 12.5 } },
      s: { m: { a: 12.5 } },
    };
    expect(pronounceable.trainTriples(['Smart', 'Pronoun'])).toStrictEqual(triples);
  });
});

describe('Score', () => {
  test('with vowel', () => {
    expect(pronounceable.score('Smart')).toBe(0.038513178036421514);
  });

  test('without vowel', () => {
    expect(pronounceable.score('Phpht')).toBe(0);
  });

  test('single letter', () => {
    expect(pronounceable.score('a')).toBe(1);
  });

  test('two letters', () => {
    expect(pronounceable.score('in')).toBe(2.2900156132406293);
  });
});
