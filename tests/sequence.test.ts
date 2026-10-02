import { describe, it, expect, vi } from 'vitest';
import { createSequence } from '../src/lib/sequence';

const word = (w: string) => [...w];

describe('createSequence("claude")', () => {
  it('fires once the word is typed', () => {
    const hit = vi.fn(); const feed = createSequence(word('claude'), hit);
    word('claude').forEach(feed);
    expect(hit).toHaveBeenCalledTimes(1);
  });
  it('ignores case, so caps lock or Shift still count', () => {
    const hit = vi.fn(); const feed = createSequence(word('claude'), hit);
    ['Shift', 'C', 'L', 'A', 'U', 'D', 'E'].forEach(feed);
    expect(hit).toHaveBeenCalledTimes(1);
  });
  it('a false start does not lose the run ("clclaude")', () => {
    const hit = vi.fn(); const feed = createSequence(word('claude'), hit);
    word('clclaude').forEach(feed);
    expect(hit).toHaveBeenCalledTimes(1);
  });
  it('a stray letter in the middle resets it', () => {
    const hit = vi.fn(); const feed = createSequence(word('claude'), hit);
    word('claxude').forEach(feed);
    expect(hit).not.toHaveBeenCalled();
  });
  it('modifier keys never break the run', () => {
    const hit = vi.fn(); const feed = createSequence(word('claude'), hit);
    ['c', 'Shift', 'l', 'Alt', 'a', 'Meta', 'u', 'd', 'Control', 'e'].forEach(feed);
    expect(hit).toHaveBeenCalledTimes(1);
  });
});
