import { DEMO, type Side } from './reconcile';
import { createTimeline, SCENE_MS } from './timeline';
import { unlock } from '../secrets';

const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// Simulation 01: the same month-end reconciliation, first by hand, then with the agent.
// Nothing to play: it runs by itself, so the difference is seen, not described.
export function mountReconcileSim(panel: HTMLElement): () => void {
  const tl = createTimeline(panel);
  panel.replaceChildren();

  const root = document.createElement('div');
  root.className = 'game rc sim';
  root.innerHTML = `
    <div class="g-head">
      <p class="g-title" data-scene>by hand: someone in finance, one line at a time</p>
      <p class="g-meta mono">elapsed <span data-clock>0h</span> &middot; <span data-score>0 of ${DEMO.pairs.length}</span> &middot; ${DEMO.vendor}</p>
    </div>
    <div class="cols">
      <div class="col"><p class="g-label mono">// their statement</p><div data-col="statement"></div></div>
      <div class="col"><p class="g-label mono">// our books</p><div data-col="books"></div></div>
    </div>
    <pre class="g-term mono" data-term hidden></pre>
    <p class="g-status mono" data-status aria-live="polite"></p>
    <div class="g-actions" data-actions></div>`;
  panel.appendChild(root);

  const lines = new Map<string, HTMLElement>();
  for (const side of ['statement', 'books'] as Side[]) {
    const col = root.querySelector<HTMLElement>(`[data-col="${side}"]`)!;
    for (const l of DEMO[side]) {
      const d = document.createElement('div');
      d.className = 'line mono';
      d.dataset.line = l.id;
      d.innerHTML = `<span>${l.ref}</span><span>${rupees(l.amount)}</span>`;
      col.appendChild(d);
      lines.set(l.id, d);
    }
  }
  const $ = (sel: string) => root.querySelector<HTMLElement>(sel)!;
  const line = (id: string) => lines.get(id)!;
  const set = (sel: string, text: string) => { $(sel).textContent = text; };

  // Steps carry base delays; the timeline scales the whole scene to SCENE_MS, and with motion off it
  // runs every step at once so the end state shows.
  const step = tl.step;
  let agentFrom = 0, agentTo = 0;

  let hours = 0, matched = 0;
  const matchedBooks = new Set<string>();
  const tickClock = (h: number) => { hours += h; set('[data-clock]', `${Math.round(hours)}h`); };
  const score = () => set('[data-score]', `${matched} of ${DEMO.pairs.length}`);

  // Scene one: by hand. Three pairs, a scan down the books for each, one wrong guess.
  const byHand: { s: string; b: string; wrong?: string }[] = [
    { s: 's1', b: 'b3' },
    { s: 's2', b: 'b5' },
    { s: 's4', b: 'b1', wrong: 'b2' },
  ];
  step(400, () => set('[data-status]', 'open the statement. find the line in the books. tick both. repeat.'));
  for (const { s, b, wrong } of byHand) {
    step(400, () => line(s).classList.add('sel'));
    const order = DEMO.books.map((x) => x.id);
    for (const id of order.slice(0, order.indexOf(b))) {
      if (id === wrong) {
        step(260, () => { line(id).classList.add('miss'); tickClock(1.5); set('[data-status]', 'wrong line. same amount, but it is a payment, not the invoice. start again.'); });
        step(500, () => line(id).classList.remove('miss'));
      } else if (!matchedBooks.has(id)) {
        step(260, () => { line(id).classList.add('scan'); tickClock(1.5); });
        step(0, () => line(id).classList.remove('scan'));
      }
    }
    matchedBooks.add(b); // decided from the data, so motion on and off scan the same lines
    step(400, () => { line(s).classList.remove('sel'); line(s).classList.add('ok'); line(b).classList.add('ok'); matched += 1; tickClock(2); score(); });
  }
  let handHours = 0;
  step(500, () => { handHours = Math.round(hours); set('[data-status]', `${matched} of ${DEMO.pairs.length} after ${handHours}h. and this is one vendor of hundreds.`); });

  // Scene two: the agent.
  step(1500, () => {
    set('[data-scene]', 'agent on: the same books, the same month');
    $('[data-term]').hidden = false;
    set('[data-status]', '');
  });
  agentFrom = tl.mark();
  for (const t of ['ingest   statement from mail, any format', 'parse    7 lines, clean and dated', 'read     vendor ledger, read-only', 'match    pair every entry', 'explain  every difference']) {
    step(180, () => { $('[data-term]').textContent += `${t}\n`; });
  }
  for (const [s, b] of DEMO.pairs) {
    if (byHand.some((p) => p.s === s)) continue;
    step(150, () => { line(s).classList.add('ok', 'agent'); line(b).classList.add('ok', 'agent'); matched += 1; score(); });
  }
  step(200, () => {
    for (const l of DEMO.leftovers) {
      line(l.id).classList.add('left');
      line(l.id).insertAdjacentHTML('afterend', `<p class="why mono">${l.reason}</p>`);
    }
    // From the schedule, not the wall clock: a background tab or reduced motion would distort it.
    const secs = (tl.real(agentTo - agentFrom) / 1000).toFixed(1);
    set('[data-clock]', `${secs}s`);
    set('[data-status]', `by hand: ${handHours}h for 3 of ${DEMO.pairs.length} (illustrative). agent: ${secs}s for ${DEMO.pairs.length} of ${DEMO.pairs.length}, and why the 2 leftovers don't match. what's left is judgment:`);
    $('[data-actions]').innerHTML =
      DEMO.decisions.map((d) => `<span class="dec mono" data-decision="${d.id}">for a human: ${d.label}</span>`).join('') +
      '<button type="button" class="g-btn ghost" data-replay-sim>replay</button>';
    $('[data-actions]').querySelector<HTMLButtonElement>('[data-replay-sim]')!.onclick = () => mountReconcileSim(panel);
    unlock('reconcile-done');
  });
  agentTo = tl.mark();
  return tl.play(SCENE_MS);
}
