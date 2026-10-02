import { prefersReducedMotion } from '../motion';

// The current run on each owner (a panel), so a new run, a replay or a close always stops the right one.
const current = new WeakMap<object, () => void>();

// A scene is a list of steps with base delays. play(total) scales the whole list to `total` ms, so a
// scene can be retimed without rewriting it. With motion off, every step runs at once, in order.
export function createTimeline(owner: object) {
  current.get(owner)?.();
  const steps: { at: number; fn: () => void }[] = [];
  let at = 0, scale = 1;
  let timers: number[] = [];
  const instant = prefersReducedMotion();
  const cancel = () => { timers.forEach(clearTimeout); timers = []; };
  current.set(owner, cancel);
  return {
    instant,
    step(ms: number, fn: () => void) { at += ms; steps.push({ at, fn }); },
    mark: () => at,
    real: (baseMs: number) => baseMs * scale,
    play(totalMs?: number): () => void {
      scale = totalMs && at ? totalMs / at : 1;
      if (instant) steps.forEach((s) => s.fn());
      else timers = steps.map((s) => window.setTimeout(s.fn, s.at * scale));
      return () => current.get(owner)?.();
    },
  };
}

// Per-scene running times. Reconcile reads best fast; the list and the P0 sort need a beat longer.
export const SCENE_MS = 3000;
export const LONG_SCENE_MS = 5000;
