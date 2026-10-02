import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTimeline } from '../src/lib/games/timeline';

const motion = (on: boolean) => { window.matchMedia = (() => ({ matches: !on })) as never; };
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('createTimeline', () => {
  it('scales the whole scene to the target duration, keeping the order', () => {
    motion(true);
    const owner = {}; const log: string[] = [];
    const tl = createTimeline(owner);
    tl.step(1000, () => log.push('a'));
    tl.step(3000, () => log.push('b')); // 4000ms of base time
    tl.play(2000);
    vi.advanceTimersByTime(499); expect(log).toEqual([]);
    vi.advanceTimersByTime(2); expect(log).toEqual(['a']);
    vi.advanceTimersByTime(1500); expect(log).toEqual(['a', 'b']);
  });
  it('real() converts base time into scaled time', () => {
    motion(true);
    const tl = createTimeline({});
    tl.step(4000, () => {});
    tl.play(2000);
    expect(tl.real(1000)).toBe(500);
  });
  it('with motion off every step runs at once, in order', () => {
    motion(false);
    const log: number[] = [];
    const tl = createTimeline({});
    tl.step(500, () => log.push(1)); tl.step(500, () => log.push(2));
    tl.play(3000);
    expect(log).toEqual([1, 2]);
  });
  it('a new timeline on the same owner cancels the old one, and stop() stops whichever run is current', () => {
    motion(true);
    const owner = {}; const log: string[] = [];
    const a = createTimeline(owner); a.step(100, () => log.push('old')); a.play();
    const b = createTimeline(owner); b.step(200, () => log.push('new'));
    const stop = b.play();
    vi.advanceTimersByTime(150); expect(log).toEqual([]);
    const c = createTimeline(owner); c.step(100, () => log.push('replay')); c.play();
    stop(); // a stop handed out for an earlier run still stops the current one
    vi.advanceTimersByTime(1000);
    expect(log).toEqual([]);
  });
});
