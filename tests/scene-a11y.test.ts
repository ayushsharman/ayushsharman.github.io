import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mountReconcileSim } from '../src/lib/games/reconcile-sim';
import { mountLoopSim } from '../src/lib/games/loop-sim';
import { mountP0Sim } from '../src/lib/games/p0-sim';
import { mountMrrSim } from '../src/lib/games/mrr-sim';

let panel: HTMLElement;
const motion = (on: boolean) => { window.matchMedia = (() => ({ matches: !on })) as never; };
beforeEach(() => { vi.useFakeTimers(); document.body.innerHTML = '<div id="p"></div>'; panel = document.getElementById('p')!; });
afterEach(() => vi.useRealTimers());

const scenes = [
  ['reconcile', mountReconcileSim, /6 of 6/],
  ['loop', mountLoopSim, /a loop gets smaller/],
  ['p0', mountP0Sim, /busy is not a metric/],
  ['mrr', mountMrrSim, /it compounded/],
] as const;

describe.each(scenes)('%s: one announcement, at the end', (_n, mount, summary) => {
  it('the visible status is not a live region (it changes too fast to be read out)', () => {
    motion(true); mount(panel);
    expect(panel.querySelector('[data-status]')!.hasAttribute('aria-live')).toBe(false);
  });
  it('a polite live region gets the summary once the scene ends', () => {
    motion(true); mount(panel);
    const live = panel.querySelector('[data-live]')!;
    expect(live.getAttribute('aria-live')).toBe('polite');
    vi.advanceTimersByTime(1000);
    expect(live.textContent).toBe('');
    vi.advanceTimersByTime(6000);
    expect(live.textContent).toMatch(summary);
  });
  it('with motion off, the summary is announced a moment after the region exists', () => {
    motion(false); mount(panel);
    const live = panel.querySelector('[data-live]')!;
    expect(live.textContent).toBe('');
    vi.advanceTimersByTime(200);
    expect(live.textContent).toMatch(summary);
  });
});

describe('scene details', () => {
  it('reconcile: the scan highlight is actually on screen at some point', () => {
    motion(true); mountReconcileSim(panel);
    let seen = false;
    for (let t = 0; t < 3300 && !seen; t += 20) { vi.advanceTimersByTime(20); seen = !!panel.querySelector('[data-col="books"] .line.on'); }
    expect(seen).toBe(true);
  });
  it('loop: the bars carry day labels', () => {
    motion(false); mountLoopSim(panel);
    expect(panel.querySelector('[data-bars]')!.textContent).toMatch(/day 1.*day 2.*day 3/);
  });
  it('p0: urgent cards use their own class, not the scene root class', () => {
    motion(true); mountP0Sim(panel);
    vi.advanceTimersByTime(800);
    expect(panel.querySelectorAll('[data-req].urgent').length).toBeGreaterThan(0);
    expect(panel.querySelectorAll('[data-req].p0').length).toBe(0);
  });
  it('mrr: the dots label is hidden along with the dots', () => {
    motion(false); mountMrrSim(panel);
    expect(panel.querySelector('[data-dots-label]')!.getAttribute('aria-hidden')).toBe('true');
  });
});
