import { describe, it, expect } from 'vitest';
import { quipFor, PRIVATE_QUIPS, ASK_NICELY } from '../src/lib/quips';

const seq = (...vals: number[]) => { let i = 0; return () => vals[i++ % vals.length]; };

describe('quipFor', () => {
  it('a pool of nine random lines, plus ask nicely kept apart', () => {
    expect(PRIVATE_QUIPS.length).toBe(9);
    expect(new Set(PRIVATE_QUIPS).size).toBe(9);
    expect(PRIVATE_QUIPS).not.toContain(ASK_NICELY);
  });
  it('clicks one and two are random lines from the pool', () => {
    expect(quipFor(1, null, seq(0))).toBe(PRIVATE_QUIPS[0]);
    expect(quipFor(2, PRIVATE_QUIPS[0], seq(0.99))).toBe(PRIVATE_QUIPS[8]);
    expect(PRIVATE_QUIPS).toContain(quipFor(1, null));
  });
  it('click two never repeats click one', () => {
    const first = quipFor(1, null, seq(0.5));
    expect(quipFor(2, first, seq(0.5))).not.toBe(first);
  });
  it('click three is always ask me nicely', () => {
    for (let i = 0; i < 20; i++) expect(quipFor(3, 'anything')).toBe(ASK_NICELY);
  });
  it('over many visits, every pool line turns up', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 400; i++) { const a = quipFor(1, null); seen.add(a); seen.add(quipFor(2, a)); }
    expect(seen.size).toBe(9);
  });
  it('no line carries a dash or an emoji', () => {
    for (const q of [...PRIVATE_QUIPS, ASK_NICELY]) expect(/[–—]|[\u{1F300}-\u{1FAFF}]/u.test(q)).toBe(false);
  });
});
