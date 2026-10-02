import { describe, it, expect } from 'vitest';
import { findViolations } from '../scripts/check-content.mjs';

describe('content gate', () => {
  it('flags em-dash, en-dash and emoji', () => {
    const v = findViolations('a.md', 'one \u2014 two \u2013 three \u{1F680}');
    expect(v.map((x) => x.rule).sort()).toEqual(['em-dash', 'emoji', 'en-dash']);
  });
  it('flags banned strings case-insensitively', () => {
    const v = findViolations('a.md', 'We worked with TRIDENT on it');
    expect(v[0].rule).toBe('banned');
  });
  it('passes clean text', () => {
    expect(findViolations('a.md', 'I build agents - they do the rest.')).toEqual([]);
  });
});
