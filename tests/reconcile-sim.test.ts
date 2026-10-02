import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mountReconcileSim } from '../src/lib/games/reconcile-sim';
import { DEMO } from '../src/lib/games/reconcile';

let panel: HTMLElement;
const motion = (on: boolean) => { window.matchMedia = (() => ({ matches: !on })) as never; };
beforeEach(() => {
  vi.useFakeTimers();
  document.body.innerHTML = '<div id="p"></div>';
  panel = document.getElementById('p')!;
});
afterEach(() => vi.useRealTimers());

const ok = () => panel.querySelectorAll('[data-line].ok').length;

describe('mountReconcileSim', () => {
  it('renders both columns, labelled as demo data, and starts on its own', () => {
    motion(true);
    mountReconcileSim(panel);
    expect(panel.querySelectorAll('[data-line]')).toHaveLength(14);
    expect(panel.textContent).toMatch(/demo data/);
    vi.advanceTimersByTime(1000);
    expect(ok()).toBeGreaterThan(0); // the by-hand scene is already ticking lines
  });
  it('by hand is slow: well into the run, only a few pairs are matched and the clock reads in hours', () => {
    motion(true);
    mountReconcileSim(panel);
    vi.advanceTimersByTime(750); // a quarter of the run
    expect(ok()).toBeLessThanOrEqual(6); // at most 3 pairs
    expect(panel.querySelector('[data-clock]')!.textContent).toMatch(/h/);
  });
  it('the agent closes every pair, explains both leftovers, surfaces the two decisions and unlocks the secret', () => {
    motion(true);
    const seen: string[] = [];
    window.addEventListener('secret:unlocked', (e) => seen.push((e as CustomEvent).detail.id));
    mountReconcileSim(panel);
    vi.advanceTimersByTime(30000);
    expect(ok()).toBe(12);
    for (const l of DEMO.leftovers) expect(panel.textContent).toContain(l.reason);
    expect(panel.querySelectorAll('[data-decision]')).toHaveLength(2);
    expect(panel.textContent).toMatch(/by hand: .* 3 of 6/);
    expect(panel.textContent).toMatch(/agent: .* 6 of 6/);
    expect(seen).toContain('reconcile-done');
  });
  it('with motion off it shows the finished state at once', () => {
    motion(false);
    mountReconcileSim(panel);
    expect(ok()).toBe(12);
    expect(panel.textContent).toMatch(/agent: .* 6 of 6/);
  });
  it('remounting cancels the old run, so two simulations never fight over one panel', () => {
    motion(true);
    mountReconcileSim(panel);
    vi.advanceTimersByTime(3000);
    mountReconcileSim(panel);
    expect(panel.querySelectorAll('.game')).toHaveLength(1);
    expect(ok()).toBe(0);
  });
  it('replay starts the scene again from the beginning', () => {
    motion(true);
    mountReconcileSim(panel);
    vi.advanceTimersByTime(30000);
    panel.querySelector<HTMLButtonElement>('[data-replay-sim]')!.click();
    expect(ok()).toBe(0);
  });
});

describe('pacing', () => {
  it('the whole scene finishes in about three seconds', () => {
    motion(true);
    mountReconcileSim(panel);
    vi.advanceTimersByTime(3200);
    expect(ok()).toBe(12);
    expect(panel.querySelector('[data-replay-sim]')).not.toBeNull();
  });
});

describe('review fixes', () => {
  const statuses = (stepMs = 50, total = 30000) => {
    const seen = new Set<string>();
    for (let t = 0; t < total; t += stepMs) { vi.advanceTimersByTime(stepMs); seen.add(panel.querySelector('[data-status]')!.textContent ?? ''); }
    return [...seen];
  };
  it('the wrong guess actually plays: a line shakes and the status says so', () => {
    motion(true);
    mountReconcileSim(panel);
    expect(statuses().some((s) => /wrong line/.test(s))).toBe(true);
  });
  it('by-hand hours are the same with motion on or off', () => {
    motion(true);
    mountReconcileSim(panel);
    vi.advanceTimersByTime(30000);
    const withMotion = panel.querySelector('[data-status]')!.textContent!.match(/by hand: (\d+)h/)![1];
    motion(false);
    mountReconcileSim(panel);
    const without = panel.querySelector('[data-status]')!.textContent!.match(/by hand: (\d+)h/)![1];
    expect(without).toBe(withMotion);
  });
  it('stopping mid-run freezes the scene and never unlocks the secret', () => {
    motion(true);
    const seen: string[] = [];
    window.addEventListener('secret:unlocked', (e) => seen.push((e as CustomEvent).detail.id));
    const stop = mountReconcileSim(panel);
    vi.advanceTimersByTime(1500);
    stop();
    const before = ok();
    vi.advanceTimersByTime(30000);
    expect(ok()).toBe(before);
    expect(seen).not.toContain('reconcile-done');
  });
  it('the agent time shown comes from the schedule, so it is the same with motion off', () => {
    motion(false);
    mountReconcileSim(panel);
    expect(panel.querySelector('[data-clock]')!.textContent).not.toBe('0.1s');
  });
  it('replay keeps keyboard focus inside the scene', () => {
    motion(false);
    mountReconcileSim(panel);
    panel.querySelector<HTMLButtonElement>('[data-replay-sim]')!.click();
    expect(panel.contains(document.activeElement)).toBe(true);
  });
});
