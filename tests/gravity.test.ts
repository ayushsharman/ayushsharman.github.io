import { describe, it, expect } from 'vitest';
import { stepLetter, type Letter } from '../src/lib/gravity';

const L = (o: Partial<Letter> = {}): Letter => ({ x: 0, y: 0, vx: 0, vy: 0, r: 0, vr: 0, free: false, ...o });
const B = { minX: -100, maxX: 100, floor: 200 };

describe('stepLetter', () => {
  it('falls when free', () => {
    expect(stepLetter(L({ free: true }), B).vy).toBeGreaterThan(0);
  });
  it('never goes below the floor and bounces', () => {
    const n = stepLetter(L({ free: true, y: 199, vy: 40 }), B);
    expect(n.y).toBe(200);
    expect(n.vy).toBeLessThan(0);
  });
  it('stays inside horizontal bounds after a resize shrinks them', () => {
    expect(stepLetter(L({ free: true, x: 500, vx: 10 }), B).x).toBeLessThanOrEqual(100);
  });
  it('springs home when not free', () => {
    let l = L({ x: 80, y: -60 });
    for (let i = 0; i < 200; i++) l = stepLetter(l, B);
    expect(Math.abs(l.x)).toBeLessThan(0.5);
    expect(Math.abs(l.y)).toBeLessThan(0.5);
  });
  it('settles to exactly zero so the page can stop writing transforms', () => {
    let l = L({ x: 80, y: -60 });
    for (let i = 0; i < 400; i++) l = stepLetter(l, B);
    expect([l.x, l.y, l.r, l.vx, l.vy]).toEqual([0, 0, 0, 0, 0]);
  });
  it('does not mutate its input', () => {
    const l = L({ free: true });
    stepLetter(l, B);
    expect(l.vy).toBe(0);
  });
});

describe('minors', () => {
  it('a thrown letter never rises above the stage ceiling', () => {
    const n = stepLetter(L({ free: true, y: -150, vy: -40 }), { ...B, ceil: -120 });
    expect(n.y).toBeGreaterThanOrEqual(-120);
    expect(n.vy).toBeGreaterThanOrEqual(0);
  });
  it('atRest is true only when every letter is home and not free', async () => {
    const { atRest } = await import('../src/lib/gravity');
    expect(atRest([L(), L()])).toBe(true);
    expect(atRest([L(), L({ free: true })])).toBe(false);
    expect(atRest([L({ x: 3 })])).toBe(false);
  });
});
