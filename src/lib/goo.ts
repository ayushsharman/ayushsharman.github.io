import { loop } from './motion';

// Seven blobs chase the pointer; when the pointer rests, they wander on their own.
export function createGoo(stage: HTMLElement, gooEl: HTMLElement) {
  const blobs = Array.from({ length: 7 }, (_, i) => {
    const b = document.createElement('div');
    const z = 110 + i * 26;
    b.className = 'blob';
    b.style.width = b.style.height = `${z}px`;
    gooEl.appendChild(b);
    return { b, x: stage.clientWidth * 0.62, y: stage.clientHeight * 0.48, z };
  });
  let mx = 0, my = 0, idle = true, idleTimer = 0, t = 0;
  const point = (x: number, y: number) => {
    const r = stage.getBoundingClientRect();
    mx = x - r.left; my = y - r.top; idle = false;
    clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => { idle = true; }, 2500);
  };
  stage.addEventListener('pointermove', (e) => point(e.clientX, e.clientY));
  stage.addEventListener('touchmove', (e) => point(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  const lp = loop(stage, (dt) => {
    t += dt * 0.0008;
    const W = stage.clientWidth, H = stage.clientHeight;
    const tx = idle ? W * 0.62 + Math.sin(t) * W * 0.18 : mx;
    const ty = idle ? H * 0.48 + Math.cos(t * 1.3) * H * 0.12 : my;
    blobs.forEach((p, i) => {
      const k = 0.04 + i * 0.02;
      p.x += (tx + Math.sin(t * 2 + i) * 50 - p.x) * k;
      p.y += (ty + Math.cos(t * 1.6 + i * 2) * 40 - p.y) * k;
      p.b.style.transform = `translate(${p.x - p.z / 2}px,${p.y - p.z / 2}px)`;
    });
  });
  return { start: () => lp.start(), stop: () => lp.stop() };
}
