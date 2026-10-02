import { loop, prefersReducedMotion } from './motion';

export type Letter = { x: number; y: number; vx: number; vy: number; r: number; vr: number; free: boolean };
export type Bounds = { minX: number; maxX: number; floor: number };

const G = 1.1, BOUNCE = 0.42, SPRING = 0.08, DAMP = 0.78;

// One physics step. x and y are offsets from the letter's home position.
export function stepLetter(l: Letter, b: Bounds): Letter {
  const n = { ...l };
  if (n.free) {
    n.vy += G; n.x += n.vx; n.y += n.vy; n.r += n.vr;
    n.vx *= 0.985; n.vr *= 0.97;
    if (n.y > b.floor) { n.y = b.floor; n.vy *= -BOUNCE; n.vx *= 0.7; n.vr *= 0.5; }
  } else {
    n.vx = (n.vx - n.x * SPRING) * DAMP;
    n.vy = (n.vy - n.y * SPRING) * DAMP;
    n.x += n.vx; n.y += n.vy; n.r *= 0.85;
    // Snap to rest near home, so the letter's transform can be cleared.
    if (Math.abs(n.x) + Math.abs(n.y) + Math.abs(n.vx) + Math.abs(n.vy) + Math.abs(n.r) < 0.01) {
      n.x = n.y = n.vx = n.vy = n.r = 0;
    }
  }
  if (n.x < b.minX) { n.x = b.minX; n.vx = Math.abs(n.vx); }
  if (n.x > b.maxX) { n.x = b.maxX; n.vx = -Math.abs(n.vx); }
  return n;
}

export function createGravity(nameEl: HTMLElement, stage: HTMLElement) {
  const spans = [...nameEl.querySelectorAll<HTMLElement>('[data-letter]')];
  let L: Letter[] = spans.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, r: 0, vr: 0, free: false }));
  let B: Bounds[] = [];
  let homeTimer = 0;
  // Each letter's bounds, relative to its home position, so it stays inside the stage.
  const measure = () => {
    const s = stage.getBoundingClientRect();
    B = spans.map((el, i) => {
      const r = el.getBoundingClientRect();
      const left = r.left - L[i].x, top = r.top - L[i].y;
      return { minX: s.left - left, maxX: s.right - left - r.width, floor: s.bottom - top - r.height };
    });
  };
  const draw = () => spans.forEach((el, i) => {
    const l = L[i];
    el.style.transform = l.x || l.y || l.r ? `translate(${l.x}px,${l.y}px) rotate(${l.r}deg)` : '';
  });
  const lp = loop(stage, () => { L = L.map((l, i) => stepLetter(l, B[i])); draw(); });
  addEventListener('resize', measure);
  return {
    blast() {
      if (prefersReducedMotion()) return;
      measure();
      L = L.map((l) => ({ ...l, free: true, vx: (Math.random() - 0.5) * 34, vy: -18 - Math.random() * 16, vr: (Math.random() - 0.5) * 40 }));
      clearTimeout(homeTimer);
      homeTimer = window.setTimeout(() => { L = L.map((l) => ({ ...l, free: false })); }, 3800);
    },
    start() { measure(); lp.start(); },
    stop() { lp.stop(); clearTimeout(homeTimer); removeEventListener('resize', measure); },
  };
}
