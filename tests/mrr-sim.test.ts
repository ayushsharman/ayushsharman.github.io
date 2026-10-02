import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mountMrrSim, MRR_DEMO } from '../src/lib/games/mrr-sim';
import { secrets } from '../src/lib/secrets';

let panel: HTMLElement;
const motion = (on: boolean) => { window.matchMedia = (() => ({ matches: !on })) as never; };
const $ = (s: string) => panel.querySelector(s)!;
const lit = () => panel.querySelectorAll('[data-dot].on').length;
beforeEach(() => { vi.useFakeTimers(); document.body.innerHTML = '<div id="p"></div>'; panel = document.getElementById('p')!; });
afterEach(() => vi.useRealTimers());

// Every figure the scene may show, straight from the Notion page. Years are allowed separately.
const ALLOWED = ['₹0', '₹1L', '₹1L+', '₹10L+', '5', '50', '2', '100-bed', '12', '10+', '20+', '1,000+'];
const figures = (text: string) => (text.match(/₹?\d[\d,]*(?:L\+?|\+)?(?:-bed)?/g) ?? []).filter((t) => !/^20(2[2-6])$/.test(t));

describe('data', () => {
  it('five stages, 2022 to 2026, with the owner\'s own titles', () => {
    expect(MRR_DEMO.stages.map((s) => s.year)).toEqual(['2022', '2023', '2024', '2025', '2026']);
    expect(MRR_DEMO.stages.slice(0, 4).map((s) => s.role)).toEqual(['founding member', 'product head, DocAssist', 'CTO', 'director, technical operations']);
  });
  it('shows no number that is not on the Notion page', () => {
    const all = JSON.stringify(MRR_DEMO);
    for (const f of figures(all)) expect(ALLOWED).toContain(f);
  });
});

describe('mountMrrSim', () => {
  it('opens at 2022: ₹0, no hospitals, 5 people', () => {
    motion(true);
    mountMrrSim(panel);
    vi.advanceTimersByTime(300);
    expect($('[data-year]').textContent).toBe('2022');
    expect($('[data-mrr]').textContent).toBe('₹0');
    expect(lit()).toBe(0);
    expect($('[data-team]').textContent).toBe('5');
  });
  it('takes about five seconds: still running at three, finished by five', () => {
    motion(true);
    mountMrrSim(panel);
    vi.advanceTimersByTime(3200);
    expect(panel.querySelector('[data-replay-sim]')).toBeNull();
    vi.advanceTimersByTime(2000);
    expect(panel.querySelector('[data-replay-sim]')).not.toBeNull();
  });
  it('ends at ₹10L+, 20+ hospitals lit, 50 people, and unlocks the secret', () => {
    motion(true);
    mountMrrSim(panel);
    vi.advanceTimersByTime(5200);
    expect($('[data-mrr]').textContent).toBe('₹10L+');
    expect(lit()).toBeGreaterThanOrEqual(20);
    expect($('[data-team]').textContent).toBe('50');
    expect(panel.textContent).toMatch(/it compounded/);
    expect(secrets().isFound('mrr-watched')).toBe(true);
  });
  it('everything visible during the run uses only Notion figures', () => {
    motion(true);
    mountMrrSim(panel);
    for (let t = 0; t < 5300; t += 100) {
      vi.advanceTimersByTime(100);
      for (const f of figures(panel.querySelector('.game')!.textContent!)) expect(ALLOWED).toContain(f);
    }
  });
  it('with motion off it shows the end state at once', () => {
    motion(false);
    mountMrrSim(panel);
    expect($('[data-mrr]').textContent).toBe('₹10L+');
  });
  it('stopping early freezes the scene', () => {
    motion(true);
    const stop = mountMrrSim(panel);
    vi.advanceTimersByTime(1000); stop();
    const frozen = panel.innerHTML;
    vi.advanceTimersByTime(10000);
    expect(panel.innerHTML).toBe(frozen);
  });
  it('replay keeps keyboard focus inside the scene', () => {
    motion(false);
    mountMrrSim(panel);
    panel.querySelector<HTMLButtonElement>('[data-replay-sim]')!.click();
    expect(panel.contains(document.activeElement)).toBe(true);
  });
  it('dates every figure: team only at the start and end, ₹1L first in 2024, ₹10L+ and 20+ only in 2026', () => {
    motion(true);
    mountMrrSim(panel);
    const at: Record<string, { team: string; mrr: string; log: string }> = {};
    for (let t = 0; t < 5300; t += 50) {
      vi.advanceTimersByTime(50);
      const year = $('[data-year]').textContent!;
      at[year] = { team: $('[data-team]').textContent!, mrr: $('[data-mrr]').textContent!, log: panel.querySelector('[data-log] li:last-child')?.textContent ?? '' };
    }
    expect(at['2022'].team).toBe('5');
    for (const y of ['2023', '2024', '2025']) expect(at[y].team).toBe('');
    expect(at['2026'].team).toBe('50');
    expect([at['2022'].mrr, at['2023'].mrr, at['2024'].mrr, at['2025'].mrr, at['2026'].mrr]).toEqual(['₹0', '₹0', '₹1L', '₹1L+', '₹10L+']);
    for (const y of ['2022', '2023', '2024', '2025']) expect(at[y].log).not.toMatch(/₹10L\+|20\+/);
  });
});
