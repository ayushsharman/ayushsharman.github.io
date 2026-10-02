import { safeStorage } from './motion';

export type SecretId = 'name-thrown' | 'chat-complete' | 'konami' | 'reconcile-done' | 'loop-watched' | 'p0-sorted' | 'mrr-watched';
export type Secret = { id: SecretId; title: string; hint: string };

// The live secrets. Each simulation adds one.
export const SECRETS: Secret[] = [
  { id: 'name-thrown', title: 'threw the founder', hint: 'the name can take it' },
  { id: 'chat-complete', title: 'asked everything', hint: "ask until there's nothing left" },
  { id: 'konami', title: 'up up down down', hint: 'you know the code' },
  { id: 'reconcile-done', title: 'watched the books close', hint: 'let the agent close the books' },
  { id: 'loop-watched', title: 'watched the list shrink', hint: 'the agents never sleep' },
  { id: 'p0-sorted', title: 'sorted the P0s', hint: 'busy is not a metric' },
  { id: 'mrr-watched', title: 'watched it compound', hint: 'the first repo' },
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
