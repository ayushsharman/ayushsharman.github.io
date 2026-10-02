import { prefersReducedMotion, safeStorage, tween } from './motion';

export type BootLine = { text: string; status?: string; tone?: 'ok' | 'run' | 'warn' | 'plain' };
export const BOOT_KEY = 'boot-seen-v1';

type Store = { get(k: string): string | null; set(k: string, v: string): void };

export function shouldPlayBoot(storage: Store, reduced: boolean): boolean {
  return !reduced && storage.get(BOOT_KEY) === null;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// HTML for the first `upTo` characters of the script. A line's status appears once the line is typed.
export function renderBoot(lines: BootLine[], upTo: number): string {
  let left = upTo, out = '';
  for (const l of lines) {
    if (left <= 0) break;
    out += esc(l.text.slice(0, left));
    left -= l.text.length;
    if (left >= 0 && l.status) out += ` <span class="s ${l.tone}">${esc(l.status)}</span>\n`;
  }
  return out;
}

// A fade still running from the previous run on the same root, so a replay can cancel it.
const fading = new WeakMap<HTMLElement, () => void>();
const FADE_MS = 450; // matches --dur-slow

const CPS = 130; // characters per second: about six seconds for the whole script

export function startBoot(root: HTMLElement, lines: BootLine[], opts: { force?: boolean } = {}): void {
  const done = () => window.dispatchEvent(new Event('boot:done'));
  fading.get(root)?.();
  fading.delete(root);
  // ?og=1 is used by scripts/make-assets.sh to screenshot the hero without the boot.
  // ?watch=<id> is a shared link straight into a simulation: do not play the intro over it.
  const params = new URLSearchParams(location.search);
  const skipForLink = params.has('og') || params.has('watch');
  if (prefersReducedMotion() || (!opts.force && (skipForLink || !shouldPlayBoot(safeStorage, false)))) { root.hidden = true; done(); return; }
  const screen = root.querySelector<HTMLElement>('[data-boot-screen]')!;
  const skip = root.querySelector<HTMLButtonElement>('[data-boot-skip]')!;
  root.hidden = false;
  root.style.opacity = '';
  document.documentElement.style.overflow = 'hidden';
  const total = lines.reduce((n, l) => n + l.text.length, 0);
  const t0 = performance.now();
  let id = 0, ended = false;
  const finish = () => {
    if (ended) return;
    ended = true;
    cancelAnimationFrame(id);
    safeStorage.set(BOOT_KEY, '1');
    removeEventListener('keydown', onKey);
    fading.set(root, tween(FADE_MS, (k) => { root.style.opacity = String(1 - k); }, () => {
      fading.delete(root);
      const focusWasInside = root.contains(document.activeElement);
      root.hidden = true;
      document.documentElement.style.overflow = '';
      // Do not leave focus on the now-hidden skip button.
      if (focusWasInside) document.getElementById('main')?.focus({ preventScroll: true });
      done();
    }));
  };
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') finish(); };
  addEventListener('keydown', onKey);
  skip.onclick = finish;
  skip.focus();
  const frame = (now: number) => {
    const n = Math.floor(((now - t0) / 1000) * CPS);
    screen.innerHTML = renderBoot(lines, n) + '<span class="cur"></span>';
    if (n >= total) { setTimeout(finish, 900); return; }
    id = requestAnimationFrame(frame);
  };
  id = requestAnimationFrame(frame);
}
