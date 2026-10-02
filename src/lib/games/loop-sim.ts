import { createTimeline, LONG_SCENE_MS, announce } from './timeline';
import { createFrame } from './frame';
import { unlock } from '../secrets';

type Item = { id: string; ref: string; what: string; vendor: string; risk?: string; rule?: boolean; closes?: 2 | 3 };

// Invented data: twelve open purchase orders. Three are risky, three belong to a vendor that is
// always late at quarter end (the rule hides them), two close on day two and three on day three.
export const LOOP_DEMO = {
  label: 'open orders (demo data)',
  question: 'Westfield Supply is always late at quarter end. ignore their lines until the 5th?',
  rule: 'rule saved: ignore Westfield Supply until the 5th',
  items: [
    { id: 'i1', ref: 'PO-4468', what: 'safety gloves, 200 pairs', vendor: 'Kestrel Traders', closes: 2 },
    { id: 'i2', ref: 'PO-4470', what: 'cable trays', vendor: 'Westfield Supply', rule: true },
    { id: 'i3', ref: 'PO-4472', what: 'bearing 6205, line 3', vendor: 'Arden Parts', risk: 'used last week, no stock, no delivery date' },
    { id: 'i4', ref: 'PO-4475', what: 'lubricant drums', vendor: 'Kestrel Traders', closes: 3 },
    { id: 'i5', ref: 'PO-4479', what: 'printer toner', vendor: 'Oakline Office', closes: 2 },
    { id: 'i6', ref: 'PO-4481', what: 'fasteners, assorted', vendor: 'Westfield Supply', rule: true },
    { id: 'i7', ref: 'PO-4484', what: 'filter cartridges', vendor: 'Arden Parts', closes: 3 },
    { id: 'i8', ref: 'PO-4490', what: 'pump seal kit', vendor: 'Brook & Sons', risk: 'second missed promise from this vendor' },
    { id: 'i9', ref: 'PO-4493', what: 'paint, 40 litres', vendor: 'Westfield Supply', rule: true },
    { id: 'i10', ref: 'PO-4497', what: 'spare v-belts', vendor: 'Kestrel Traders', closes: 3 },
    { id: 'i11', ref: 'PO-4503', what: 'conveyor belt, 1200mm', vendor: 'Brook & Sons', risk: 'the line stops if this slips again' },
    { id: 'i12', ref: 'PO-4506', what: 'gauge calibration', vendor: 'Oakline Office' },
  ] as Item[],
};

const hhmm = (mins: number) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

// Simulation 02: the same morning list as a report (same size every day) and as a loop (smaller).
export function mountLoopSim(panel: HTMLElement): () => void {
  const tl = createTimeline(panel);
  panel.replaceChildren();
  // Every count on screen comes from the data, so the story cannot drift from it.
  const n = LOOP_DEMO.items.length;
  const risky = LOOP_DEMO.items.filter((x) => x.risk).length;
  const ruled = LOOP_DEMO.items.filter((x) => x.rule).length;
  const closed2 = LOOP_DEMO.items.filter((x) => x.closes === 2).length;
  const closed3 = LOOP_DEMO.items.filter((x) => x.closes === 3).length;
  const day2 = n - ruled - closed2, day3 = day2 - closed3;

  const f = createFrame({ cls: 'lp', label: LOOP_DEMO.label, steps: 3, left: { k: 'the report', v: String(n), s: 'rows, every morning' }, right: { k: 'the loop', v: '-', s: 'waiting' } });
  f.act(1, 'The report');
  f.stage.innerHTML = '<div class="lp-list" data-list></div><div class="lp-bars" data-bars hidden></div>';
  panel.appendChild(f.root);
  const list = f.$('[data-list]');
  const rows = new Map<string, HTMLElement>();
  for (const it of LOOP_DEMO.items) {
    const r = document.createElement('div');
    r.className = 'lp-row mono';
    r.dataset.item = it.id;
    r.innerHTML = `<span class="ref">${it.ref}</span><span class="what">${it.what}</span><span class="vendor">${it.vendor}</span><span class="why"></span>`;
    list.appendChild(r);
    rows.set(it.id, r);
  }
  const spot = (id: string | null) => { rows.forEach((r) => r.classList.remove('on')); if (id) rows.get(id)!.classList.add('on'); };
  const step = tl.step;

  // Act one: the report. Someone reads every row, and tomorrow the same rows come back.
  step(200, () => f.cue('day 1, 09:00. a flat list. nothing says which line can stop the plant.'));
  LOOP_DEMO.items.forEach((it, i) => step(110, () => {
    spot(it.id);
    f.cue(`day 1, ${hhmm(9 * 60 + Math.round((i + 1) * 80 / n))}. reading row ${i + 1} of ${n}.`);
  }));
  step(300, () => { spot(null); rows.forEach((r) => r.classList.add('again')); f.cue(`day 2, 09:00. the same ${n} rows.`); });
  step(700, () => { f.side('left', { state: 'done', s: 'rows, every single morning' }); f.cue('a report is the same size every day.'); });

  // Act two: the loop, before anyone logs in.
  step(600, () => {
    rows.forEach((r) => r.classList.remove('again'));
    f.act(2, 'Agent on, 06:00');
    f.side('right', { v: String(n), s: 'day 1', state: 'agent' });
    f.cue('before anyone logs in.');
  });
  step(300, () => {
    for (const it of [...LOOP_DEMO.items.filter((x) => x.risk)].reverse()) {
      const r = rows.get(it.id)!;
      r.classList.add('risk');
      r.querySelector('.why')!.textContent = it.risk!;
      list.prepend(r);
    }
    f.cue(`ranked. the ${risky} that can stop a line come first, with the reason.`);
  });
  step(400, () => f.ask(`<p class="q">${LOOP_DEMO.question}</p>`));
  step(400, () => f.ask(`<p class="q">${LOOP_DEMO.question}</p><p class="a mono">you: yes</p><p class="rule mono">${LOOP_DEMO.rule}</p>`));
  step(400, () => {
    for (const it of LOOP_DEMO.items) if (it.rule || it.closes === 2) rows.get(it.id)!.classList.add('gone');
    f.side('right', { v: `${n} \u2192 ${day2}`, s: 'day 2' });
    f.cue(`day 2, 06:00. the rule hides ${ruled}, ${closed2} arrived.`);
  });
  step(400, () => {
    for (const it of LOOP_DEMO.items) if (it.closes === 3) rows.get(it.id)!.classList.add('gone');
    f.side('right', { v: `${n} \u2192 ${day2} \u2192 ${day3}`, s: 'day 3' });
    f.cue(`day 3, 06:00. ${day3} left, the risky ones first.`);
  });

  // Act three: the comparison.
  step(300, () => {
    f.act(3, 'Smaller every day');
    f.end();
    const bars = f.$('[data-bars]');
    bars.hidden = false;
    bars.style.setProperty('--max', String(n));
    const row = (name: string, vals: number[]) =>
      `<div class="br"><span class="mono">${name}</span>${vals.map((v) => `<span class="bar" data-bar="${v}" style="--v:${v}"><b>${v}</b></span>`).join('')}</div>`;
    bars.innerHTML = '<div class="br head mono"><span></span><span>day 1</span><span>day 2</span><span>day 3</span></div>' +
      row('report', [n, n, n]) + row('loop', [n, day2, day3]);
    f.cue('a report stays the same size. a loop gets smaller.');
    announce(f.$('[data-live]'), `the agent asked: ${LOOP_DEMO.question} you said yes. ${LOOP_DEMO.rule}. the list went from ${n} to ${day2} to ${day3}. a report stays the same size. a loop gets smaller.`, tl.instant);
    f.$('[data-actions]').innerHTML = '<button type="button" class="g-btn ghost" data-replay-sim>replay</button>';
    f.$('[data-actions]').querySelector<HTMLButtonElement>('button')!.onclick = () => { mountLoopSim(panel); panel.querySelector<HTMLElement>('.game')?.focus(); };
    unlock('loop-watched');
  });
  return tl.play(LONG_SCENE_MS);
}
