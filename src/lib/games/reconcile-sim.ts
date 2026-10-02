import { DEMO, type Side } from './reconcile';
import { createTimeline, SCENE_MS, announce } from './timeline';
import { createFrame } from './frame';
import { unlock } from '../secrets';

const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// Simulation 01: the same month-end reconciliation, first by hand, then with the agent.
export function mountReconcileSim(panel: HTMLElement): () => void {
  const tl = createTimeline(panel);
  panel.replaceChildren();
  const n = DEMO.pairs.length;
  const f = createFrame({ cls: 'rc', label: DEMO.vendor, steps: 3, left: { k: 'by hand', v: '0h', s: `0 of ${n} matched` }, right: { k: 'agent', v: '-', s: 'waiting' } });
  f.act(1, 'By hand');
  f.stage.innerHTML = `
    <div class="cols">
      <div class="col"><p class="g-label mono">// their statement</p><div data-col="statement"></div></div>
      <div class="col"><p class="g-label mono">// our books</p><div data-col="books"></div></div>
    </div>`;
  panel.appendChild(f.root);

  const lines = new Map<string, HTMLElement>();
  for (const side of ['statement', 'books'] as Side[]) {
    const col = f.stage.querySelector<HTMLElement>(`[data-col="${side}"]`)!;
    for (const l of DEMO[side]) {
      const d = document.createElement('div');
      d.className = 'line mono';
      d.dataset.line = l.id;
      d.innerHTML = `<span>${l.ref}</span><span>${rupees(l.amount)}</span>`;
      col.appendChild(d);
      lines.set(l.id, d);
    }
  }
  const line = (id: string) => lines.get(id)!;
  // The spotlight: at most one line per column is "on" at a time.
  const spot = (side: Side, id: string | null) => {
    for (const l of DEMO[side]) line(l.id).classList.remove('on');
    if (id) line(id).classList.add('on');
  };
  const step = tl.step;
  let hours = 0, matched = 0, handHours = 0;
  const matchedBooks = new Set<string>();
  const tick = (h: number) => { hours += h; f.side('left', { v: `${Math.round(hours)}h`, s: `${matched} of ${n} matched` }); };

  // Act one: by hand. Three pairs, a scan down the books for each, one wrong guess.
  const byHand: { s: string; b: string; wrong?: string }[] = [{ s: 's1', b: 'b3' }, { s: 's2', b: 'b5' }, { s: 's4', b: 'b1', wrong: 'b2' }];
  step(400, () => f.cue('open the statement. find the line in the books. tick both. repeat.'));
  for (const { s, b, wrong } of byHand) {
    step(400, () => spot('statement', s));
    const order = DEMO.books.map((x) => x.id);
    for (const id of order.slice(0, order.indexOf(b))) {
      if (id === wrong) {
        step(260, () => { spot('books', id); line(id).classList.add('miss'); tick(1.5); f.cue('same amount. wrong line. it is a payment, not the invoice. start again.'); });
        step(500, () => line(id).classList.remove('miss'));
      } else if (!matchedBooks.has(id)) {
        step(260, () => { spot('books', id); tick(1.5); });
      }
    }
    matchedBooks.add(b); // decided from the data, so motion on and off scan the same lines
    step(400, () => {
      spot('statement', null); spot('books', null);
      line(s).classList.add('ok'); line(b).classList.add('ok');
      matched += 1; tick(2);
    });
  }
  step(500, () => {
    handHours = Math.round(hours);
    f.side('left', { state: 'done' });
    f.cue(`${matched} of ${n} after ${handHours}h. and this is one vendor of hundreds.`);
  });

  // Act two: the agent. The cue line carries one trace step at a time.
  step(1500, () => { f.act(2, 'Agent on'); f.side('right', { v: '0.0s', s: `${matched} of ${n} matched`, state: 'agent' }); f.cue(''); });
  const agentFrom = tl.mark();
  for (const t of ['ingest   the statement, from mail, any format', 'parse    clean, dated lines', 'read     the vendor ledger, read-only', 'match    pairing every entry']) {
    step(180, () => f.cue(t));
  }
  for (const [s, b] of DEMO.pairs) {
    if (byHand.some((p) => p.s === s)) continue;
    const at = tl.mark() + 150;
    step(150, () => {
      spot('statement', s); spot('books', b);
      line(s).classList.add('ok', 'agent'); line(b).classList.add('ok', 'agent');
      matched += 1;
      f.side('right', { v: `${(tl.real(at - agentFrom) / 1000).toFixed(1)}s`, s: `${matched} of ${n} matched` });
    });
  }
  let agentTo = 0;
  step(200, () => {
    spot('statement', null); spot('books', null);
    f.cue('explain  every difference');
    for (const l of DEMO.leftovers) {
      line(l.id).classList.add('left');
      line(l.id).insertAdjacentHTML('afterend', `<p class="why mono">${l.reason}</p>`);
    }
    const secs = (tl.real(agentTo - agentFrom) / 1000).toFixed(1);
    f.side('right', { v: `${secs}s`, s: `${n} of ${n}, and why 2 don't match` });
  });

  // Act three: what is left is judgment.
  step(500, () => {
    const secs = (tl.real(agentTo - agentFrom) / 1000).toFixed(1);
    f.act(3, "What's left is yours");
    f.end();
    f.side('left', { s: `${3} of ${n}, illustrative` });
    f.ask(`<p class="q">2 decisions need a human.</p><div class="chips">${DEMO.decisions.map((d) => `<span class="dec mono" data-decision="${d.id}">${d.label}</span>`).join('')}</div>`);
    const summary = `by hand: ${handHours}h for 3 of ${n} (illustrative). agent: ${secs}s for ${n} of ${n}, and why the 2 leftovers don't match. what's left is judgment.`;
    f.cue(summary);
    announce(f.$('[data-live]'), summary, tl.instant);
    f.$('[data-actions]').innerHTML = '<button type="button" class="g-btn ghost" data-replay-sim>replay</button>';
    f.$('[data-actions]').querySelector<HTMLButtonElement>('button')!.onclick = () => { mountReconcileSim(panel); panel.querySelector<HTMLElement>('.game')?.focus(); };
    unlock('reconcile-done');
  });
  agentTo = tl.mark() - 500; // the agent's time ends where act three begins
  return tl.play(SCENE_MS);
}
