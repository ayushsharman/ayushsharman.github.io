import { safeStorage } from './motion';

export type SecretId = 'name-thrown' | 'chat-complete' | 'konami' | 'reconcile-done' | 'loop-watched' | 'p0-sorted' | 'mrr-watched';
export type Secret = { id: SecretId; title: string; hint: string };

// The live secrets. Each simulation adds one. Hints are plain instructions, not riddles: the owner
// wants a visitor stuck at 5/7 to be able to finish.
export const SECRETS: Secret[] = [
  { id: 'name-thrown', title: 'threw the founder', hint: 'click my name at the top, or the "click my name." button' },
  { id: 'chat-complete', title: 'asked everything', hint: 'ask every question in the chat, all of them' },
  { id: 'konami', title: 'up up down down', hint: 'type ↑ ↑ ↓ ↓ ← → ← → B A anywhere on the page' },
  { id: 'reconcile-done', title: 'watched the books close', hint: 'press [ watch ] on 01 and let it finish' },
  { id: 'loop-watched', title: 'watched the list shrink', hint: 'press [ watch ] on 02 and let it finish' },
  { id: 'p0-sorted', title: 'sorted the P0s', hint: 'press [ watch ] on 04 and let it finish' },
  { id: 'mrr-watched', title: 'watched it compound', hint: 'press [ watch ] on 03 and let it finish' },
];

const KEY = 'secrets-v1';
type Store = { get(k: string): string | null; set(k: string, v: string): void };

export function createSecrets(store: Store = safeStorage, list: Secret[] = SECRETS) {
  const live = new Set(list.map((s) => s.id));
  const found = new Set<SecretId>();
  try {
    const raw = store.get(KEY);
    if (raw) for (const id of JSON.parse(raw) as SecretId[]) if (live.has(id)) found.add(id);
  } catch { /* corrupt or blocked storage: start fresh for this visit */ }
  return {
    list,
    isFound: (id: SecretId) => found.has(id),
    count: () => found.size,
    total: () => list.length,
    unlock(id: SecretId): boolean {
      const secret = list.find((s) => s.id === id);
      if (!secret || found.has(id)) return false;
      found.add(id);
      try { store.set(KEY, JSON.stringify([...found])); } catch { /* keep it for this visit only */ }
      window.dispatchEvent(new CustomEvent('secret:unlocked', { detail: { id, title: secret.title, count: found.size, total: list.length } }));
      return true;
    },
  };
}

let instance: ReturnType<typeof createSecrets> | null = null;
export const secrets = () => (instance ??= createSecrets());
export const unlock = (id: SecretId) => secrets().unlock(id);
