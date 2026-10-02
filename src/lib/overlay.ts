// The full experience opens over the home page with its own URL, so it can be shared and closed
// with Esc, the close button or the browser's Back button.
export function createOverlay(el: HTMLElement, opts: { path: string; home?: string }) {
  const home = opts.home ?? '/';
  let open = false;
  let lastFocus: HTMLElement | null = null;
  let inerted: HTMLElement[] = [];
  // aria-modal alone does not keep Tab inside; inert takes the page behind out of reach.
  const setBackgroundInert = (on: boolean) => {
    if (on) {
      inerted = [...document.body.children].filter((c): c is HTMLElement => c instanceof HTMLElement && !c.contains(el));
      inerted.forEach((c) => { c.inert = true; });
    } else {
      inerted.forEach((c) => { c.inert = false; });
      inerted = [];
    }
  };
  const show = (opener?: HTMLElement) => {
    // A mouse click does not focus a link in Chrome or Safari, so prefer the element that opened it.
    lastFocus = opener ?? (document.activeElement as HTMLElement | null);
    el.hidden = false;
    open = true;
    setBackgroundInert(true);
    document.documentElement.style.overflow = 'hidden';
    el.querySelector<HTMLElement>('[data-close]')?.focus();
  };
  const hide = () => {
    el.hidden = true;
    open = false;
    setBackgroundInert(false);
    document.documentElement.style.overflow = '';
    lastFocus?.focus?.();
  };
  const api = {
    open(opener?: HTMLElement) { if (open) return; show(opener); history.pushState({ overlay: 1 }, '', opts.path); },
    // If open() pushed the entry, step back over it, so closing leaves no dead Back press.
    // Otherwise (the overlay was reached some other way) replace it, so Back cannot reopen it.
    close() {
      if (!open) return;
      hide();
      if (history.state?.overlay) history.back();
      else if (location.pathname === opts.path) history.replaceState(null, '', home);
    },
    isOpen: () => open,
  };
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('[data-open-experience]');
    if (a) { e.preventDefault(); api.open(a as HTMLElement); }
  });
  el.querySelector('[data-close]')?.addEventListener('click', () => api.close());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) api.close(); });
  window.addEventListener('popstate', () => {
    if (location.pathname === opts.path) { if (!open) show(); } else if (open) hide();
  });
  return api;
}
