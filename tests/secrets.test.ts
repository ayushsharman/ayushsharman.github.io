import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSecrets, SECRETS } from '../src/lib/secrets';

const mem = () => { const m = new Map<string, string>(); return { get: (k: string) => m.get(k) ?? null, set: (k: string, v: string) => { m.set(k, v); } }; };

describe('createSecrets', () => {
  beforeEach(() => vi.restoreAllMocks());
  it('starts with nothing found, out of every live secret', () => {
    const s = createSecrets(mem());
    expect([s.count(), s.total()]).toEqual([0, SECRETS.length]);
  });
  it('unlocks once and is idempotent, so the count never passes the total', () => {
    const s = createSecrets(mem());
    expect(s.unlock('konami')).toBe(true);
    expect(s.unlock('konami')).toBe(false);
    expect(s.count()).toBe(1);
  });
  it('ignores unknown ids', () => expect(createSecrets(mem()).unlock('nope' as never)).toBe(false));
  it('persists and reloads found secrets', () => {
    const store = mem();
    createSecrets(store).unlock('name-thrown');
    expect(createSecrets(store).isFound('name-thrown')).toBe(true);
  });
  it('drops stored ids that are no longer live, and survives corrupt storage', () => {
    const store = mem();
    store.set('secrets-v1', '["name-thrown","retired-one"]');
    expect(createSecrets(store).count()).toBe(1);
    store.set('secrets-v1', '{not json');
    expect(createSecrets(store).count()).toBe(0);
  });
  it('blocked storage: still unlocks for the visit and never throws', () => {
    const store = { get: () => { throw new Error('blocked'); }, set: () => { throw new Error('blocked'); } };
    const s = createSecrets(store as never);
    expect(() => s.unlock('konami')).not.toThrow();
    expect(s.isFound('konami')).toBe(true);
  });
  it('announces each new unlock with the running count', () => {
    const seen: unknown[] = [];
    window.addEventListener('secret:unlocked', (e) => seen.push((e as CustomEvent).detail), { once: true });
    createSecrets(mem()).unlock('chat-complete');
    expect(seen[0]).toEqual({ id: 'chat-complete', title: 'asked everything', count: 1, total: SECRETS.length });
  });
  it('phase 2 brings the live total to six', () => {
    expect(SECRETS.map((x) => x.id)).toEqual(['name-thrown', 'chat-complete', 'konami', 'reconcile-done', 'loop-watched', 'p0-sorted']);
  });
});
