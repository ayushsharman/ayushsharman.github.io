import { createTimeline, LONG_SCENE_MS, announce } from './timeline';
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
  const root = document.createElement('div');
  root.className = 'game lp sim';
  root.innerHTML = `
    <div class="g-head">
      <p class="g-title" data-scene>the report: someone reads the whole list, every morning</p>
      <p class="g-meta mono"><span data-clock>day 1 09:00</span> &middot; <span data-count>12</span> open &middot; ${LOOP_DEMO.label}</p>
    </div>
    <div class="lp-list" data-list></div>
    <div class="lp-ask" data-ask hidden></div>
    <div class="lp-bars" data-bars hidden></div>
    <p class="g-status mono" data-status></p>
    <p class="sr-only" data-live aria-live="polite"></p>
    <div class="g-actions" data-actions></div>`;
  root.tabIndex = -1; // replay hands focus here, so keyboard users stay in the scene
  panel.appendChild(root);
  const $ = (sel: string) => root.querySelector<HTMLElement>(sel)!;
  const set = (sel: string, t: string) => { $(sel).textContent = t; };
  const list = $('[data-list]');
  const rows = new Map<string, HTMLElement>();
  for (const it of LOOP_DEMO.items) {
    const r = document.createElement('div');
    r.className = 'lp-row mono';
    r.dataset.item = it.id;
    r.innerHTML = `<span class="ref">${it.ref}</span><span class="what">${it.what}</span><span class="vendor">${it.vendor}</span><span class="why"></span>`;
    list.appendChild(r);
    rows.set(it.id, r);
  }
  const live = () => LOOP_DEMO.items.filter((i) => !rows.get(i.id)!.classList.contains('gone')).length;
  const count = () => set('[data-count]', String(live()));
  const step = tl.step;
  // Every count on screen comes from the data, so the story cannot drift from it.
  const n = LOOP_DEMO.items.length;
  const risky = LOOP_DEMO.items.filter((x) => x.risk).length;
  const ruled = LOOP_DEMO.items.filter((x) => x.rule).length;
  const closed2 = LOOP_DEMO.items.filter((x) => x.closes === 2).length;
  const closed3 = LOOP_DEMO.items.filter((x) => x.closes === 3).length;
  const day2 = n - ruled - closed2, day3 = day2 - closed3;

  // The report.
  step(200, () => set('[data-status]', 'a flat list. nothing says which line can stop the plant.'));
  LOOP_DEMO.items.forEach((it, i) => step(110, () => {
    rows.forEach((r) => r.classList.remove('scan'));
    rows.get(it.id)!.classList.add('scan');
    set('[data-clock]', `day 1 ${hhmm(9 * 60 + Math.round((i + 1) * 80 / LOOP_DEMO.items.length))}`);
  }));
  step(300, () => {
    rows.forEach((r) => { r.classList.remove('scan'); r.classList.add('again'); });
    set('[data-clock]', 'day 2 09:00');
    set('[data-status]', `day 2. the same ${n} rows.`);
  });
  step(700, () => set('[data-status]', 'a report is the same size every day.'));

  // The loop.
  step(600, () => {
    rows.forEach((r) => r.classList.remove('again'));
    set('[data-scene]', 'agent on: it starts at 06:00, before anyone logs in');
    set('[data-clock]', 'day 1 06:00');
    set('[data-status]', '');
  });
  step(300, () => {
    for (const it of LOOP_DEMO.items.filter((x) => x.risk)) {
      const r = rows.get(it.id)!;
      r.classList.add('risk');
      r.querySelector('.why')!.textContent = it.risk!;
    }
    for (const it of [...LOOP_DEMO.items.filter((x) => x.risk)].reverse()) list.prepend(rows.get(it.id)!);
    set('[data-status]', `ranked. the ${risky} that can stop a line come first, with the reason.`);
  });
  step(400, () => {
    const ask = $('[data-ask]');
    ask.hidden = false;
    ask.innerHTML = `<p class="q mono">agent asks: ${LOOP_DEMO.question}</p>`;
  });
  step(400, () => {
    $('[data-ask]').insertAdjacentHTML('beforeend', `<p class="a mono">you: yes</p><p class="rule mono">${LOOP_DEMO.rule}</p>`);
  });
  step(400, () => {
    for (const it of LOOP_DEMO.items) if (it.rule || it.closes === 2) rows.get(it.id)!.classList.add('gone');
    set('[data-clock]', 'day 2 06:00'); count();
    set('[data-status]', `day 2. the rule hides ${ruled}, ${closed2} arrived.`);
  });
  step(400, () => {
    for (const it of LOOP_DEMO.items) if (it.closes === 3) rows.get(it.id)!.classList.add('gone');
    set('[data-clock]', 'day 3 06:00'); count();
  });
  step(300, () => {
    const bars = $('[data-bars]');
    bars.hidden = false;
    const row = (name: string, vals: number[]) =>
      `<div class="br"><span class="mono">${name}</span>${vals.map((v) => `<span class="bar" data-bar="${v}" style="--v:${v}"><b>${v}</b></span>`).join('')}</div>`;
    bars.style.setProperty('--max', String(n));
    bars.innerHTML = '<div class="br head mono"><span></span><span>day 1</span><span>day 2</span><span>day 3</span></div>' +
      row('report', [n, n, n]) + row('loop', [n, day2, day3]);
    set('[data-status]', 'a report stays the same size. a loop gets smaller.');
    announce($('[data-live]'), `the agent asked: ${LOOP_DEMO.question} you said yes. ${LOOP_DEMO.rule}. the list went from ${n} to ${day2} to ${day3}. a report stays the same size. a loop gets smaller.`, tl.instant);
    $('[data-actions]').innerHTML = '<button type="button" class="g-btn ghost" data-replay-sim>replay</button>';
    $('[data-actions]').querySelector<HTMLButtonElement>('button')!.onclick = () => { mountLoopSim(panel); panel.querySelector<HTMLElement>('.game')?.focus(); };
    unlock('loop-watched');
  });
  return tl.play(LONG_SCENE_MS);
}
