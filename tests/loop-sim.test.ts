import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { secrets } from '../src/lib/secrets';
import { mountLoopSim, LOOP_DEMO } from '../src/lib/games/loop-sim';

let panel: HTMLElement;
const motion = (on: boolean) => { window.matchMedia = (() => ({ matches: !on })) as never; };
const rows = () => panel.querySelectorAll('[data-item]:not(.gone)').length;
beforeEach(() => { vi.useFakeTimers(); document.body.innerHTML = '<div id="p"></div>'; panel = document.getElementById('p')!; });
afterEach(() => vi.useRealTimers());

describe('demo data', () => {
  it('twelve items: three risky, three for the quarter-end vendor, two that close on day two', () => {
    expect(LOOP_DEMO.items).toHaveLength(12);
    expect(LOOP_DEMO.items.filter((i) => i.risk)).toHaveLength(3);
    expect(LOOP_DEMO.items.filter((i) => i.rule)).toHaveLength(3);
    expect(LOOP_DEMO.items.filter((i) => i.closes === 2)).toHaveLength(2);
    expect(LOOP_DEMO.items.filter((i) => i.closes === 3)).toHaveLength(3);
    expect(LOOP_DEMO.label).toMatch(/demo data/);
  });
});

describe('mountLoopSim', () => {
  it('opens on the flat report: all twelve rows, unsorted', () => {
    motion(true);
    mountLoopSim(panel);
    expect(rows()).toBe(12);
    expect(panel.textContent).toMatch(/demo data/);
  });
  it('mid-run the report repeats itself with all twelve rows', () => {
    motion(true);
    mountLoopSim(panel);
    vi.advanceTimersByTime(1200);
    expect(rows()).toBe(12);
  });
  it('takes about five seconds: still running at three, finished by five', () => {
    motion(true);
    mountLoopSim(panel);
    vi.advanceTimersByTime(3200);
    expect(panel.querySelector('[data-replay-sim]')).toBeNull();
    vi.advanceTimersByTime(2000);
    expect(panel.querySelector('[data-replay-sim]')).not.toBeNull();
  });
  it('ends with the list at four, the risky items first, the question answered and the bars drawn', () => {
    motion(true);
    const seen: string[] = [];
    window.addEventListener('secret:unlocked', (e) => seen.push((e as CustomEvent).detail.id));
    mountLoopSim(panel);
    vi.advanceTimersByTime(5200);
    expect(rows()).toBe(4);
    expect(panel.querySelector('[data-item]:not(.gone)')!.classList.contains('risk')).toBe(true);
    expect(panel.textContent).toMatch(/rule saved/);
    expect([...panel.querySelectorAll('[data-bar]')].map((b) => b.getAttribute('data-bar'))).toEqual(['12', '12', '12', '12', '7', '4']);
    expect(panel.textContent).toMatch(/a loop gets smaller/);
    expect(secrets().isFound('loop-watched')).toBe(true); // the store, not the event: an earlier test may have unlocked it
  });
  it('with motion off it shows the end state at once', () => {
    motion(false);
    mountLoopSim(panel);
    expect(rows()).toBe(4);
  });
  it('stopping early never unlocks the secret', () => {
    motion(true);
    const seen: string[] = [];
    window.addEventListener('secret:unlocked', (e) => seen.push((e as CustomEvent).detail.id));
    const stop = mountLoopSim(panel);
    vi.advanceTimersByTime(800); stop();
    const frozen = panel.innerHTML;
    vi.advanceTimersByTime(10000);
    expect(panel.innerHTML).toBe(frozen); // the scene froze, whatever the shared secrets store already holds
    expect(seen).not.toContain('loop-watched');
  });
  it('replay keeps keyboard focus inside the scene', () => {
    motion(false);
    mountLoopSim(panel);
    panel.querySelector<HTMLButtonElement>('[data-replay-sim]')!.click();
    expect(panel.contains(document.activeElement)).toBe(true);
  });
});
