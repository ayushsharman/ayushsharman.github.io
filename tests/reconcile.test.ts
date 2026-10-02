import { describe, it, expect } from 'vitest';
import { createReconcile, DEMO } from '../src/lib/games/reconcile';

const [s0, b0] = DEMO.pairs[0];
const [s1, b1] = DEMO.pairs[1];

describe('demo data', () => {
  it('has six true pairs and one leftover on each side, clearly labelled demo', () => {
    expect(DEMO.pairs).toHaveLength(6);
    expect(DEMO.statement).toHaveLength(7);
    expect(DEMO.books).toHaveLength(7);
    expect(DEMO.leftovers.map((l) => l.side).sort()).toEqual(['books', 'statement']);
    expect(DEMO.vendor).toMatch(/demo data/);
  });
  it('true pairs share a reference and an amount', () => {
    for (const [s, b] of DEMO.pairs) {
      const a = DEMO.statement.find((l) => l.id === s)!, c = DEMO.books.find((l) => l.id === b)!;
      expect([a.ref, a.amount]).toEqual([c.ref, c.amount]);
    }
  });
  it('the books column is not in the same order as the statement', () => {
    expect(DEMO.books.map((l) => l.ref)).not.toEqual(DEMO.statement.map((l) => l.ref));
  });
});

describe('createReconcile', () => {
  it('the first pick starts the clock', () => {
    const g = createReconcile();
    expect(g.phase()).toBe('ready');
    expect(g.pick('statement', s0, 1000)).toBe('select');
    expect(g.phase()).toBe('manual');
    expect(g.timeLeft(11000)).toBe(20);
  });
  it('a true pair matches, a wrong pair misses and clears the selection', () => {
    const g = createReconcile();
    g.pick('statement', s0, 0);
    expect(g.pick('books', b0, 100)).toBe('match');
    expect(g.isMatched(s0) && g.isMatched(b0)).toBe(true);
    g.pick('statement', s1, 200);
    expect(g.pick('books', b0, 300)).toBe('ignored'); // already matched
    expect(g.pick('books', DEMO.leftovers.find((l) => l.side === 'books')!.id, 400)).toBe('miss');
    expect(g.selected()).toBeNull();
    expect(g.youMatched()).toBe(1);
  });
  it('picking on the same side moves the selection', () => {
    const g = createReconcile();
    g.pick('statement', s0, 0);
    g.pick('statement', s1, 10);
    expect(g.selected()).toEqual({ side: 'statement', id: s1 });
  });
  it('the order of sides does not matter', () => {
    const g = createReconcile();
    g.pick('books', b1, 0);
    expect(g.pick('statement', s1, 10)).toBe('match');
  });
  it('ignores picks after time is up, and hands over to the agent', () => {
    const g = createReconcile(DEMO, 30);
    g.pick('statement', s0, 0);
    expect(g.pick('books', b0, 30001)).toBe('ignored');
    expect(g.phase()).toBe('handoff');
    expect(g.youMatched()).toBe(0);
  });
  it('tick ends act one when the clock runs out with no click', () => {
    const g = createReconcile();
    g.pick('statement', s0, 0);
    g.tick(30000);
    expect(g.phase()).toBe('handoff');
  });
  it('stop() ends act one early from ready or manual, and does nothing later', () => {
    const g = createReconcile();
    g.stop();
    expect(g.phase()).toBe('handoff');
    g.runAgent();
    g.stop();
    expect(g.phase()).toBe('decide');
  });
  it('finding every pair early hands over at once', () => {
    const g = createReconcile();
    for (const [s, b] of DEMO.pairs) { g.pick('statement', s, 0); g.pick('books', b, 1); }
    expect(g.phase()).toBe('handoff');
    expect(g.youMatched()).toBe(6);
    expect(g.agentSteps()).toEqual([]);
  });
  it('the agent matches what is left, then waits for the decisions', () => {
    const g = createReconcile();
    g.pick('statement', s0, 0); g.pick('books', b0, 1); g.tick(31000);
    expect(g.agentSteps()).toHaveLength(5);
    g.runAgent();
    expect(DEMO.pairs.every(([s, b]) => g.isMatched(s) && g.isMatched(b))).toBe(true);
    expect(g.youMatched()).toBe(1);
    expect(g.phase()).toBe('decide');
  });
  it('both decisions finish the game', () => {
    const g = createReconcile();
    g.pick('statement', s0, 0); g.tick(31000); g.runAgent();
    g.decide(DEMO.decisions[0].id);
    expect(g.phase()).toBe('decide');
    g.decide(DEMO.decisions[1].id);
    expect(g.phase()).toBe('done');
  });
});
