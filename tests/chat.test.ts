import { describe, it, expect, vi, afterEach } from 'vitest';
import { createChatState, mountChat, type ChatItem } from '../src/lib/chat';
import { chatScript } from '../src/content/chat';

const items: ChatItem[] = [
  { id: 'a', q: 'qa', a: 'aa' },
  { id: 'b', q: 'qb', a: 'ab', link: { label: 'full', href: '/experience', overlay: true } },
];

describe('createChatState', () => {
  it('answers once and removes the question', () => {
    const s = createChatState(items);
    expect(s.ask('a')?.a).toBe('aa');
    expect(s.remaining().map((i) => i.id)).toEqual(['b']);
  });
  it('a second ask of the same id returns null (double click)', () => {
    const s = createChatState(items);
    s.ask('a');
    expect(s.ask('a')).toBeNull();
  });
  it('unknown ids return null', () => expect(createChatState(items).ask('zz')).toBeNull());
});

describe('mountChat', () => {
  const mount = () => {
    document.body.innerHTML = '<section id="ask"><div data-chips></div><div data-thread></div></section>';
    window.matchMedia = (() => ({ matches: true })) as never; // reduced motion: answers arrive at once
    const root = document.getElementById('ask')!;
    mountChat(root, { greeting: 'hi', items });
    return root;
  };
  it('greets and renders one chip per question', () => {
    const root = mount();
    expect(root.querySelector('[data-thread]')!.textContent).toBe('hi');
    expect(root.querySelectorAll('.chip')).toHaveLength(2);
  });
  it('a chip click posts the question, then the answer with an overlay link', async () => {
    const root = mount();
    root.querySelectorAll<HTMLButtonElement>('.chip')[1].click();
    await new Promise((r) => setTimeout(r, 5));
    const bubbles = [...root.querySelectorAll('.b')].map((b) => b.className);
    expect(bubbles).toEqual(['b a', 'b u', 'b a']);
    expect(root.querySelector('.b.a:last-child a[data-open-experience]')).not.toBeNull();
    expect(root.querySelectorAll('.chip')).toHaveLength(1);
  });
});

describe('mountChat ordering', () => {
  it('two quick questions read as question, answer, question, answer', async () => {
    document.body.innerHTML = '<section id="ask"><div data-chips></div><div data-thread></div></section>';
    window.matchMedia = (() => ({ matches: true })) as never;
    const root = document.getElementById('ask')!;
    mountChat(root, { greeting: 'hi', items });
    const [first, second] = [...root.querySelectorAll<HTMLButtonElement>('.chip')];
    first.click();
    second.click();
    await new Promise((r) => setTimeout(r, 20));
    const order = [...root.querySelectorAll('.b')].slice(1).map((b) => b.className.split(' ')[1]);
    expect(order).toEqual(['u', 'a', 'u', 'a']);
  });
});

describe('mountChat attract mode', () => {
  afterEach(() => vi.useRealTimers());
  const mount = (reduced: boolean) => {
    vi.useFakeTimers();
    document.body.innerHTML = '<section id="ask"><div data-chips></div><div data-thread></div></section>';
    window.matchMedia = (() => ({ matches: reduced })) as never;
    const root = document.getElementById('ask')!;
    mountChat(root, { greeting: 'hi', items });
    return root;
  };
  const lit = (root: HTMLElement) => [...root.querySelectorAll('.chip.lit')].map((c) => c.textContent);
  it('lights the questions one after another until the visitor clicks', () => {
    const root = mount(false);
    vi.advanceTimersByTime(2600);
    expect(lit(root)).toEqual(['qa']);
    expect(root.querySelector('[data-ghost]')!.textContent).toContain('qa');
    vi.advanceTimersByTime(2600);
    expect(lit(root)).toEqual(['qb']);
  });
  it('stops for good at the first click and removes the ghost line', () => {
    const root = mount(false);
    vi.advanceTimersByTime(2600);
    root.querySelector<HTMLButtonElement>('.chip')!.click();
    vi.advanceTimersByTime(10000);
    expect(lit(root)).toEqual([]);
    expect(root.querySelector('[data-ghost]')).toBeNull();
  });
  it('does nothing when motion is turned off', () => {
    const root = mount(true);
    vi.advanceTimersByTime(10000);
    expect(lit(root)).toEqual([]);
    expect(root.querySelector('[data-ghost]')).toBeNull();
  });
});

describe('chatScript', () => {
  it('has unique ids and short answers', () => {
    const ids = chatScript.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const i of chatScript.items) expect(i.a.split(' ').length).toBeLessThanOrEqual(25);
  });
});
