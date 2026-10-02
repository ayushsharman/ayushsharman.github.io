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

export function mountChat(root: HTMLElement, script: { greeting: string; items: ChatItem[] }) {
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
  const converse = (item: ChatItem) => new Promise<void>((resolve) => {
    bubble('u', item.q);
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.setAttribute('aria-label', 'typing');
    typing.innerHTML = '<i></i><i></i><i></i>';
    thread.appendChild(typing);
    const wait = prefersReducedMotion() ? 0 : 650 + Math.min(900, item.a.length * 8);
    setTimeout(() => { typing.remove(); bubble('a', item.a, item.link); resolve(); }, wait);
  });

  const renderChips = () => {
    chips.replaceChildren(...state.remaining().map((i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = i.q;
      b.onclick = () => {
        const item = state.ask(i.id);
        if (!item) return;
        renderChips();
        // Queue behind any answer still being typed, so the thread reads question, answer, question, answer.
        queue = queue.then(() => converse(item));
      };
      return b;
    }));
  };

  bubble('a', script.greeting);
  renderChips();
}
