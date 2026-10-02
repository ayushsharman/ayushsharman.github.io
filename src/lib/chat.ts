import { prefersReducedMotion } from './motion';

export type ChatLink = { label: string; href: string; overlay?: boolean };
export type ChatItem = { id: string; q: string; a: string; link?: ChatLink };

export function createChatState(items: ChatItem[]) {
  const asked = new Set<string>();
  return {
    remaining: () => items.filter((i) => !asked.has(i.id)),
    ask(id: string): ChatItem | null {
      const item = items.find((i) => i.id === id);
      if (!item || asked.has(id)) return null;
      asked.add(id);
      return item;
    },
  };
}

const MAX_BUBBLES = 8;

export function mountChat(root: HTMLElement, script: { greeting: string; items: ChatItem[] }, opts: { onComplete?: () => void } = {}) {
  const thread = root.querySelector<HTMLElement>('[data-thread]')!;
  const chips = root.querySelector<HTMLElement>('[data-chips]')!;
  const state = createChatState(script.items);

  const bubble = (cls: string, text: string, link?: ChatLink) => {
    const d = document.createElement('div');
    d.className = `b ${cls}`;
    d.textContent = text;
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = `${link.label} →`;
      if (link.overlay) a.setAttribute('data-open-experience', '');
      if (link.href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
      d.append(' ', a);
    }
    thread.appendChild(d);
    while (thread.children.length > MAX_BUBBLES) thread.firstElementChild!.remove();
  };

  let queue: Promise<void> = Promise.resolve();
  let lastUse = -Infinity;
  let completed = false;
  const converse = (item: ChatItem) => new Promise<void>((resolve) => {
    bubble('u', item.q);
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.setAttribute('aria-label', 'typing');
    typing.innerHTML = '<i></i><i></i><i></i>';
    thread.appendChild(typing);
    const wait = prefersReducedMotion() ? 0 : 650 + Math.min(900, item.a.length * 8);
    setTimeout(() => {
      typing.remove();
      bubble('a', item.a, item.link);
      if (!state.remaining().length && !completed) { completed = true; opts.onComplete?.(); }
      resolve();
    }, wait);
  });

  const renderChips = () => {
    chips.replaceChildren(...state.remaining().map((i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = i.q;
      b.onclick = () => {
        // The used chip leaves and its neighbour slides under the pointer, so a double-click would
        // ask that one too. Ignore clicks for a moment after each use.
        const now = performance.now();
        if (now - lastUse < 300) return;
        lastUse = now;
        stopAttract();
        const item = state.ask(i.id);
        if (!item) return;
        const hadFocus = document.activeElement === b;
        const index = [...chips.children].indexOf(b);
        renderChips();
        if (hadFocus) {
          const next = chips.children[Math.min(index, chips.children.length - 1)] as HTMLElement | undefined;
          (next ?? root.querySelector<HTMLElement>('[data-chat-all]'))?.focus();
        }
        // Queue behind any answer still being typed, so the thread reads question, answer, question, answer.
        queue = queue.then(() => converse(item));
      };
      return b;
    }));
  };

  // Attract mode: until the first click, questions light up in turn and a ghost line types the lit
  // one, so the chips read as something to press. Stops for good at the first click.
  let attract: number[] = [];
  let ghost: HTMLElement | null = null;
  function stopAttract() {
    attract.forEach((t) => { clearTimeout(t); clearInterval(t); });
    attract = [];
    chips.querySelectorAll('.lit').forEach((c) => c.classList.remove('lit'));
    ghost?.remove();
    ghost = null;
  }
  const startAttract = () => {
    ghost = document.createElement('div');
    ghost.className = 'ghost';
    ghost.setAttribute('data-ghost', '');
    ghost.setAttribute('aria-hidden', 'true');
    thread.appendChild(ghost);
    let n = 0, typer = 0;
    const light = () => {
      const all = [...chips.querySelectorAll<HTMLButtonElement>('.chip')];
      if (!all.length || !ghost) return;
      all.forEach((c) => c.classList.remove('lit'));
      const chip = all[n++ % all.length];
      chip.classList.add('lit');
      const q = chip.textContent ?? '';
      let k = 0;
      clearInterval(typer);
      typer = window.setInterval(() => {
        if (ghost) ghost.textContent = `try: ${q.slice(0, ++k)}`;
        if (k >= q.length) clearInterval(typer);
      }, 35);
      attract.push(typer);
    };
    attract.push(window.setTimeout(() => { light(); attract.push(window.setInterval(light, 2600)); }, 1200));
  };

  bubble('a', script.greeting);
  renderChips();
  if (!prefersReducedMotion()) startAttract();
}
