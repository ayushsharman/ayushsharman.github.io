import { describe, it, expect, vi, beforeEach } from 'vitest';
import { safeStorage, easeInOutCubic, prefersReducedMotion } from '../src/lib/motion';

describe('safeStorage', () => {
  beforeEach(() => localStorage.clear());
  it('round-trips a value', () => {
    safeStorage.set('k', 'v');
    expect(safeStorage.get('k')).toBe('v');
  });
  it('returns null and does not throw when storage throws', () => {
    // Safari private mode and blocked cookies throw on access to window.localStorage itself.
    const spy = vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => { throw new Error('blocked'); });
    expect(() => safeStorage.set('k', 'v')).not.toThrow();
    expect(safeStorage.get('k')).toBeNull();
    spy.mockRestore();
  });
});

describe('easeInOutCubic', () => {
  it('is pinned at 0, 0.5 and 1', () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(0.5)).toBeCloseTo(0.5);
    expect(easeInOutCubic(1)).toBe(1);
  });
});

describe('prefersReducedMotion', () => {
  it('reads the media query', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as never;
    expect(prefersReducedMotion()).toBe(true);
  });
});
