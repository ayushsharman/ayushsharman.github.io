import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mountP0Sim, P0_DEMO } from '../src/lib/games/p0-sim';

let panel: HTMLElement;
const motion = (on: boolean) => { window.matchMedia = (() => ({ matches: !on })) as never; };
const $ = (s: string) => panel.querySelector(s)!;
beforeEach(() => { vi.useFakeTimers(); document.body.innerHTML = '<div id="p"></div>'; panel = document.getElementById('p')!; });
afterEach(() => vi.useRealTimers());

describe('demo data', () => {
  it('eight demo requests that sort into 2 now, 3 this sprint, 3 later', () => {
    expect(P0_DEMO.requests).toHaveLength(8);
    const n = (b: string) => P0_DEMO.requests.filter((r) => r.bucket === b).length;
    expect([n('now'), n('sprint'), n('later')]).toEqual([2, 3, 3]);
    expect(P0_DEMO.label).toMatch(/demo/);
  });
  it('uses Medoc\'s real outcome numbers from the Notion portfolio', () => {
    expect(P0_DEMO.outcome).toEqual({ ticketsBefore: '30+', ticketsAfter: '4', goLiveBefore: 30, goLiveAfter: 15 });
  });
});

describe('mountP0Sim', () => {
  it('a third of the way in, everything is stamped P0 and nothing is sorted', () => {
    motion(true);
    mountP0Sim(panel);
    vi.advanceTimersByTime(1000);
    expect(panel.querySelectorAll('[data-req].p0').length).toBeGreaterThan(0);
    expect(panel.querySelectorAll('[data-bucket] [data-req]').length).toBe(0);
  });
  it('ends sorted, with tickets at 4 and go-live at 15 days, in about three seconds', () => {
    motion(true);
    const seen: string[] = [];
    window.addEventListener('secret:unlocked', (e) => seen.push((e as CustomEvent).detail.id));
    mountP0Sim(panel);
    vi.advanceTimersByTime(3200);
    const count = (b: string) => panel.querySelectorAll(`[data-bucket="${b}"] [data-req]`).length;
    expect([count('now'), count('sprint'), count('later')]).toEqual([2, 3, 3]);
    expect($('[data-tickets]').textContent).toBe('4');
    expect($('[data-golive]').textContent).toMatch(/15 days/);
    expect(panel.textContent).toMatch(/busy is not a metric/);
    expect(seen).toContain('p0-sorted');
  });
  it('with motion off it shows the end state at once', () => {
    motion(false);
    mountP0Sim(panel);
    expect($('[data-tickets]').textContent).toBe('4');
  });
  it('stopping early never unlocks the secret', () => {
    motion(true);
    const seen: string[] = [];
    window.addEventListener('secret:unlocked', (e) => seen.push((e as CustomEvent).detail.id));
    const stop = mountP0Sim(panel);
    vi.advanceTimersByTime(800); stop(); vi.advanceTimersByTime(10000);
    expect(seen).not.toContain('p0-sorted');
  });
});
