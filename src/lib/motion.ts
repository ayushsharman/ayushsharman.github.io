export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export const safeStorage = {
  get(key: string): string | null {
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  set(key: string, value: string): void {
    try { window.localStorage.setItem(key, value); } catch { /* storage blocked: behave as a first visit */ }
  },
};

export const easeInOutCubic = (k: number): number =>
  k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;

export function tween(ms: number, onFrame: (k: number) => void, onDone?: () => void): () => void {
  let id = 0;
  const t0 = performance.now();
  const f = (now: number) => {
    const k = Math.min(1, (now - t0) / ms);
    onFrame(easeInOutCubic(k));
    if (k < 1) id = requestAnimationFrame(f); else onDone?.();
  };
  id = requestAnimationFrame(f);
  return () => cancelAnimationFrame(id);
}

// Runs `frame` on every animation frame, but only while `el` is on screen, the tab is visible and
// motion is allowed. Off screen it costs nothing.
export function loop(el: Element, frame: (dt: number, t: number) => void) {
  let id = 0, last = 0, running = false, visible = true, onScreen = true;
  const tick = (t: number) => {
    const dt = last ? Math.min(50, t - last) : 16;
    last = t;
    frame(dt, t);
    id = requestAnimationFrame(tick);
  };
  const sync = () => {
    const should = running && visible && onScreen && !prefersReducedMotion();
    if (should && !id) { last = 0; id = requestAnimationFrame(tick); }
    if (!should && id) { cancelAnimationFrame(id); id = 0; }
  };
  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
  const onVis = () => { visible = document.visibilityState === 'visible'; sync(); };
  return {
    start() { running = true; io.observe(el); document.addEventListener('visibilitychange', onVis); sync(); },
    stop() { running = false; io.disconnect(); document.removeEventListener('visibilitychange', onVis); sync(); },
  };
}
