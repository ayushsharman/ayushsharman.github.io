import { describe, it, expect } from 'vitest';
import { createFrame } from '../src/lib/games/frame';

const make = () => createFrame({ cls: 'x', label: 'demo data', steps: 3, left: { k: 'by hand', v: '0h', s: 'waiting' }, right: { k: 'agent', v: '-', s: 'waiting' } });

describe('createFrame', () => {
  it('reads top to bottom: act, scoreboard, ask, stage, cue', () => {
    const f = make();
    const order = [...f.root.children].map((c) => c.className.split(' ')[0]);
    expect(order.slice(0, 5)).toEqual(['sc-top', 'sc-score', 'sc-ask', 'sc-stage', 'sc-cue']);
  });
  it('act() sets the step pill and the title', () => {
    const f = make();
    f.act(2, 'Agent on');
    expect(f.root.querySelector('[data-step]')!.textContent).toBe('2 / 3');
    expect(f.root.querySelector('[data-act]')!.textContent).toBe('Agent on');
  });
  it('a custom pill (a year) replaces the step count', () => {
    const f = make();
    f.act(1, 'founding member', '2022');
    expect(f.root.querySelector('[data-step]')!.textContent).toBe('2022');
  });
  it('side() updates a scoreboard side and its state', () => {
    const f = make();
    f.side('right', { v: '1.7s', s: '6 of 6', state: 'agent' });
    const r = f.root.querySelector('[data-score-right]')!;
    expect(r.querySelector('[data-v]')!.textContent).toBe('1.7s');
    expect(r.classList.contains('agent')).toBe(true);
    expect(r.classList.contains('empty')).toBe(false);
  });
  it('the ask box stays hidden until used, and end() dims the stage', () => {
    const f = make();
    expect((f.root.querySelector('[data-ask]') as HTMLElement).hidden).toBe(true);
    f.ask('<p>2 decisions need a human.</p>');
    expect((f.root.querySelector('[data-ask]') as HTMLElement).hidden).toBe(false);
    f.end();
    expect(f.root.classList.contains('end')).toBe(true);
  });
  it('the visible cue is not a live region; one polite region exists for the summary', () => {
    const f = make();
    expect(f.root.querySelector('[data-status]')!.hasAttribute('aria-live')).toBe(false);
    expect(f.root.querySelector('[data-live]')!.getAttribute('aria-live')).toBe('polite');
  });
});
