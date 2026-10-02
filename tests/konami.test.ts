import { describe, it, expect, vi } from 'vitest';
import { createKonami } from '../src/lib/konami';

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

describe('createKonami', () => {
  it('fires once the full code is typed', () => {
    const hit = vi.fn(); const feed = createKonami(hit);
    CODE.forEach(feed);
    expect(hit).toHaveBeenCalledTimes(1);
  });
  it('accepts capital B and A', () => {
    const hit = vi.fn(); const feed = createKonami(hit);
    [...CODE.slice(0, 8), 'B', 'A'].forEach(feed);
    expect(hit).toHaveBeenCalledTimes(1);
  });
  it('a stray key resets it', () => {
    const hit = vi.fn(); const feed = createKonami(hit);
    [...CODE.slice(0, 5), 'x', ...CODE.slice(5)].forEach(feed);
    expect(hit).not.toHaveBeenCalled();
  });
  it('a repeated first key does not lose the run (up up up down down ...)', () => {
    const hit = vi.fn(); const feed = createKonami(hit);
    ['ArrowUp', ...CODE].forEach(feed);
    expect(hit).toHaveBeenCalledTimes(1);
  });
});
