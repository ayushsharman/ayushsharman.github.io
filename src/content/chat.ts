import type { ChatItem } from '../lib/chat';

export const chatScript: { greeting: string; items: ChatItem[] } = {
  greeting: 'hey. ask me anything below. answers are short, i promise.',
  items: [
    { id: 'do', q: 'what do you do?', a: 'I build agents. They do the rest.' },
    { id: 'building', q: 'what are you building?', a: "Agents that read a company's ERP every morning, reconcile its books, and bring a finance head only the decisions that need a human.", link: { label: 'open full: the work', href: '/#work' } },
    { id: 'before', q: 'before this?', a: 'Four years building a healthcare company from day one. Founding member, product head, CTO, director.', link: { label: 'open full: experience', href: '/experience', overlay: true } },
    { id: 'why', q: 'why agents?', a: 'A report is the same size every day. An agent that learns gets smaller.', link: { label: 'open full: why I build agents', href: '/writing/why-i-build-agents/' } },
    { id: 'care', q: 'why should i care?', a: 'I ship before the meeting ends.' },
    { id: 'yt', q: 'the youtube thing?', a: '11.1K people let me overthink Indian comedies. Side quest.', link: { label: 'youtube', href: 'https://www.youtube.com/@analyticalayush' } },
    { id: 'secrets', q: 'how do the secrets work?', a: '7 hidden: throw my name, ask everything, the Konami code, and watch all four work simulations. the count sits top right.', link: { label: 'open: the secrets', href: '#secrets', secrets: true } },
    { id: 'reach', q: 'how do i reach you?', a: 'Type less, mail more.', link: { label: 'open full: contact', href: '/#contact' } },
  ],
};
