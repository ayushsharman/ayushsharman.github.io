import { describe, it, expect, beforeEach } from 'vitest';
import { createOverlay } from '../src/lib/overlay';

let el: HTMLElement;
beforeEach(() => {
  document.body.innerHTML = '<div id="x" hidden><button data-close>x</button></div><a data-open-experience href="/experience">o</a>';
  el = document.getElementById('x')!;
  history.replaceState(null, '', '/');
});

describe('createOverlay', () => {
  it('open shows it and pushes the path', () => {
    const o = createOverlay(el, { path: '/experience' });
    o.open();
    expect(el.hidden).toBe(false);
    expect(location.pathname).toBe('/experience');
  });
  it('Escape closes it and returns to the home path', () => {
    const o = createOverlay(el, { path: '/experience' });
    o.open();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(o.isOpen()).toBe(false);
    expect(location.pathname).toBe('/');
  });
  it('browser Back (popstate) closes it without pushing again', () => {
    const o = createOverlay(el, { path: '/experience' });
    o.open();
    history.replaceState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    expect(o.isOpen()).toBe(false);
    expect(location.pathname).toBe('/');
  });
  it('clicking any data-open-experience link opens instead of navigating', () => {
    const o = createOverlay(el, { path: '/experience' });
    document.querySelector<HTMLAnchorElement>('[data-open-experience]')!.click();
    expect(o.isOpen()).toBe(true);
  });
  it('moves focus to close on open and back to the opener on close', () => {
    const o = createOverlay(el, { path: '/experience' });
    const opener = document.querySelector<HTMLAnchorElement>('[data-open-experience]')!;
    opener.focus();
    opener.click();
    expect(document.activeElement).toBe(el.querySelector('[data-close]'));
    o.close();
    expect(document.activeElement).toBe(opener);
  });
  it('returns focus to the link that opened it even when a mouse click did not focus it', () => {
    const o = createOverlay(el, { path: '/experience' });
    const opener = document.querySelector<HTMLAnchorElement>('[data-open-experience]')!;
    (document.activeElement as HTMLElement | null)?.blur?.();
    opener.click();
    o.close();
    expect(document.activeElement).toBe(opener);
  });
});
