export type Side = 'statement' | 'books';
export type Line = { id: string; ref: string; amount: number };
export type Phase = 'ready' | 'manual' | 'handoff' | 'decide' | 'done';
export type PickResult = 'select' | 'match' | 'miss' | 'ignored';

// Invented data for the simulations. Not a real vendor, not real amounts. The unrecorded payment
// shares an amount with INV-1044 on purpose: it is the line a person matches by mistake.
export const DEMO = {
  vendor: 'Northwind Traders (demo data)',
  statement: [
    { id: 's1', ref: 'INV-1041', amount: 42800 },
    { id: 's2', ref: 'INV-1042', amount: 9650 },
    { id: 's3', ref: 'INV-1043', amount: 18400 },
    { id: 's4', ref: 'INV-1044', amount: 27300 },
    { id: 's5', ref: 'INV-1045', amount: 5120 },
    { id: 's6', ref: 'INV-1046', amount: 61000 },
    { id: 's7', ref: 'INV-1047', amount: 13750 },
  ],
  books: [
    { id: 'b2', ref: 'PMT-2207', amount: 27300 },
    { id: 'b1', ref: 'INV-1044', amount: 27300 },
    { id: 'b3', ref: 'INV-1041', amount: 42800 },
    { id: 'b4', ref: 'INV-1047', amount: 13750 },
    { id: 'b5', ref: 'INV-1042', amount: 9650 },
    { id: 'b6', ref: 'INV-1046', amount: 61000 },
    { id: 'b7', ref: 'INV-1045', amount: 5120 },
  ],
  pairs: [['s1', 'b3'], ['s2', 'b5'], ['s4', 'b1'], ['s5', 'b7'], ['s6', 'b6'], ['s7', 'b4']] as [string, string][],
  leftovers: [
    { side: 'statement' as Side, id: 's3', reason: 'on their statement, missing in our books: invoice never booked' },
    { side: 'books' as Side, id: 'b2', reason: 'in our books, not on their statement: a payment they have not recorded' },
  ],
  decisions: [
    { id: 'chase', label: 'chase the invoice' },
    { id: 'proof', label: 'send them payment proof' },
  ],
};

export function createReconcile(data = DEMO, seconds = 30) {
  let phase: Phase = 'ready';
  let startedAt = 0;
  let selected: { side: Side; id: string } | null = null;
  const matched = new Set<string>();
  let you = 0;
  const decided = new Set<string>();

  const partner = (side: Side, id: string) =>
    data.pairs.find((p) => (side === 'statement' ? p[0] : p[1]) === id)?.[side === 'statement' ? 1 : 0];
  const expired = (now: number) => now - startedAt >= seconds * 1000;
  const handoff = () => { phase = 'handoff'; selected = null; };

  return {
    phase: () => phase,
    selected: () => selected,
    isMatched: (id: string) => matched.has(id),
    youMatched: () => you,
    totalPairs: () => data.pairs.length,
    timeLeft: (now: number) => (phase === 'ready' ? seconds : Math.max(0, Math.ceil(seconds - (now - startedAt) / 1000))),
    tick(now: number) { if (phase === 'manual' && expired(now)) handoff(); },
    stop() { if (phase === 'ready' || phase === 'manual') handoff(); },
    pick(side: Side, id: string, now: number): PickResult {
      if (phase === 'ready') { phase = 'manual'; startedAt = now; }
      if (phase !== 'manual') return 'ignored';
      if (expired(now)) { handoff(); return 'ignored'; }
      if (matched.has(id)) return 'ignored';
      if (!selected || selected.side === side) { selected = { side, id }; return 'select'; }
      const ok = partner(selected.side, selected.id) === id;
      if (ok) { matched.add(selected.id); matched.add(id); you += 1; }
      selected = null;
      if (ok && you === data.pairs.length) handoff();
      return ok ? 'match' : 'miss';
    },
    agentSteps: () => data.pairs.filter(([s]) => !matched.has(s)),
    runAgent() {
      if (phase !== 'handoff') return;
      for (const [s, b] of data.pairs) { matched.add(s); matched.add(b); }
      phase = 'decide';
    },
    decide(id: string) {
      if (phase !== 'decide') return;
      decided.add(id);
      if (data.decisions.every((d) => decided.has(d.id))) phase = 'done';
    },
    decided: (id: string) => decided.has(id),
  };
}
