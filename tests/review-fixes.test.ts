import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mountChat, type ChatItem } from '../src/lib/chat';
import { createOverlay } from '../src/lib/overlay';
import { startBoot, type BootLine } from '../src/lib/boot';

const items: ChatItem[] = [{ id: 'a', q: 'qa', a: 'aa' }, { id: 'b', q: 'qb', a: 'ab' }, { id: 'c', q: 'qc', a: 'ac' }];
const reduced = (on: boolean) => { window.matchMedia = (() => ({ matches: on })) as never; };
const mount = () => {
  document.body.innerHTML = '<section id="ask"><div data-chips></div><a data-chat-all href="/experience">all</a><div data-thread></div></section>';
  const root = document.getElementById('ask')!;
  mountChat(root, { greeting: 'hi', items });
  return root;
};

describe('review fix 1: double-click does not ask the neighbouring question', () => {
  it('a second click within 300ms on the chip that slid into place is ignored', async () => {
    reduced(true);
    const root = mount();
    root.querySelectorAll<HTMLButtonElement>('.chip')[0].click();
    root.querySelectorAll<HTMLButtonElement>('.chip')[0].click(); // now "qb", under the same pointer
    await new Promise((r) => setTimeout(r, 5));
    expect([...root.querySelectorAll('.b.u')].map((b) => b.textContent)).toEqual(['qa']);
  });
});

describe('review fix 2: keyboard focus stays in the chips', () => {
  it('after a chip is used, focus moves to the chip now at the same place', () => {
    reduced(true);
    const root = mount();
    const first = root.querySelectorAll<HTMLButtonElement>('.chip')[1];
    first.focus();
    first.click();
    expect((document.activeElement as HTMLElement).textContent).toBe('qc');
  });
  it('when the last chip is used, focus moves to the "show me everything" link', async () => {
    reduced(true);
    const root = mount();
    for (let i = 0; i < 3; i++) {
      const c = root.querySelector<HTMLButtonElement>('.chip')!;
      c.focus(); c.click();
      await new Promise((r) => setTimeout(r, 320));
    }
    expect(document.activeElement).toBe(root.querySelector('[data-chat-all]'));
  });
});

describe('review fixes 3 and 4: the overlay is modal and leaves no dead Back entry', () => {
  let el: HTMLElement;
  beforeEach(() => {
    document.body.innerHTML = '<nav id="n"></nav><main id="m"><a data-open-experience href="/experience">o</a></main><div id="x" hidden><button data-close>x</button></div>';
    el = document.getElementById('x')!;
    history.replaceState(null, '', '/');
  });
  afterEach(() => vi.restoreAllMocks());
  it('makes the page behind it inert while open, and restores it on close', () => {
    const o = createOverlay(el, { path: '/experience' });
    o.open();
    expect((document.getElementById('m') as HTMLElement & { inert: boolean }).inert).toBe(true);
    expect((document.getElementById('n') as HTMLElement & { inert: boolean }).inert).toBe(true);
    expect((el as HTMLElement & { inert: boolean }).inert).toBe(false);
    o.close();
    expect((document.getElementById('m') as HTMLElement & { inert: boolean }).inert).toBe(false);
  });
  it('closing an overlay it opened goes back in history instead of adding a second home entry', () => {
    const o = createOverlay(el, { path: '/experience' });
    o.open();
    const back = vi.spyOn(history, 'back').mockImplementation(() => {});
    const replace = vi.spyOn(history, 'replaceState');
    o.close();
    expect(o.isOpen()).toBe(false);
    expect(back).toHaveBeenCalledTimes(1);
    expect(replace).not.toHaveBeenCalled();
  });
});

describe('review fixes 5 and 6: boot', () => {
  const lines: BootLine[] = [{ text: 'ab', tone: 'plain' }];
  const bootDom = () => {
    document.body.innerHTML = '<div id="boot" hidden><pre data-boot-screen aria-hidden="true"></pre><button data-boot-skip>skip</button></div><main id="main" tabindex="-1"></main>';
    return document.getElementById('boot')!;
  };
  it('a forced replay still never plays under reduced motion', () => {
    reduced(true);
    const root = bootDom();
    startBoot(root, lines, { force: true });
    expect(root.hidden).toBe(true);
  });
  it('when the boot ends, focus moves to the main content, not a hidden button', async () => {
    reduced(false);
    localStorage.clear();
    const root = bootDom();
    startBoot(root, lines);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await new Promise((r) => setTimeout(r, 700));
    expect(root.hidden).toBe(true);
    expect(document.activeElement).toBe(document.getElementById('main'));
  });
});
