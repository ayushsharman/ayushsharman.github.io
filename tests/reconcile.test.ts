import { describe, it, expect } from 'vitest';
import { DEMO } from '../src/lib/games/reconcile';


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
