import { describe, it, expect } from 'vitest';
import { privateQuip, PRIVATE_QUIPS } from '../src/lib/quips';

describe('privateQuip', () => {
  it('escalates one line per click', () => {
    expect(privateQuip(1)).toBe(PRIVATE_QUIPS[0]);
    expect(privateQuip(2)).toBe(PRIVATE_QUIPS[1]);
  });
  it('stays on the last line, which points to contact, however many times it is clicked', () => {
    expect(privateQuip(PRIVATE_QUIPS.length)).toMatch(/ask me/);
    expect(privateQuip(99)).toBe(PRIVATE_QUIPS.at(-1));
  });
  it('treats zero or negative clicks as the first', () => expect(privateQuip(0)).toBe(PRIVATE_QUIPS[0]));
});
