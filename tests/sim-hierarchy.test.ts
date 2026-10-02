import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mountReconcileSim } from '../src/lib/games/reconcile-sim';
import { mountLoopSim } from '../src/lib/games/loop-sim';
import { mountP0Sim } from '../src/lib/games/p0-sim';
import { mountMrrSim } from '../src/lib/games/mrr-sim';

let panel: HTMLElement;
const motion = (on: boolean) => { window.matchMedia = (() => ({ matches: !on })) as never; };
beforeEach(() => { vi.useFakeTimers(); document.body.innerHTML = '<div id="p"></div>'; panel = document.getElementById('p')!; });
afterEach(() => vi.useRealTimers());
const q = (s: string) => panel.querySelector(s)!;

describe.each([
  ['reconcile', mountReconcileSim, "What's left is yours"],
  ['loop', mountLoopSim, 'Smaller every day'],
  ['p0', mountP0Sim, 'Busy is not a metric'],
  ['mrr', mountMrrSim, 'the result'],
] as const)('%s follows the frame', (_n, mount, finalTitle) => {
  it('ends on its final act, with the scoreboard filled and the stage dimmed', () => {
    motion(false); mount(panel);
    expect(q('[data-act]').textContent).toBe(finalTitle);
    expect(q('[data-score-right] [data-v]').textContent).not.toBe('-');
    expect(q('.game').classList.contains('end')).toBe(true);
  });
  it('starts on act one with the right side of the scoreboard still empty', () => {
    motion(true); mount(panel);
    vi.advanceTimersByTime(200);
    expect(q('[data-score-right]').classList.contains('empty')).toBe(true);
  });
});

describe('one focal point at a time', () => {
  it('reconcile: during act one, at most one line per column is in the spotlight', () => {
    motion(true); mountReconcileSim(panel);
    for (let t = 0; t < 1600; t += 20) {
      vi.advanceTimersByTime(20);
      expect(panel.querySelectorAll('[data-col="statement"] .line.on').length).toBeLessThanOrEqual(1);
      expect(panel.querySelectorAll('[data-col="books"] .line.on').length).toBeLessThanOrEqual(1);
    }
  });
  it('reconcile: the decisions are in the ask box at the end', () => {
    motion(false); mountReconcileSim(panel);
    expect(q('[data-ask]').querySelectorAll('[data-decision]')).toHaveLength(2);
  });
  it('loop: the agent question sits in the ask box', () => {
    motion(false); mountLoopSim(panel);
    expect(q('[data-ask]').textContent).toMatch(/rule saved/);
  });
});
