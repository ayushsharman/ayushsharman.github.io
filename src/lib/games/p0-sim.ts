import { createTimeline, SCENE_MS } from './timeline';
import { unlock } from '../secrets';

type Bucket = 'now' | 'sprint' | 'later';
type Req = { id: string; from: string; ask: string; reach: string; wait: string; bucket: Bucket };

// Invented hospitals and requests. The outcome numbers are Medoc's real ones (Notion portfolio).
export const P0_DEMO = {
  label: 'hospitals and requests are demo data',
  outcome: { ticketsBefore: '30+', ticketsAfter: '4', goLiveBefore: 30, goLiveAfter: 15 },
  requests: [
    { id: 'r1', from: 'hospital A', ask: 'editing a bill line takes eleven clicks', reach: 'every billing clerk, daily', wait: 'patients wait at the counter', bucket: 'now' },
    { id: 'r2', from: 'hospital B', ask: 'X-ray billed as an OPD service', reach: 'every hospital, every bill', wait: 'the accounts do not close', bucket: 'now' },
    { id: 'r3', from: 'hospital C', ask: 'one form for IPD, OPD and pharmacy', reach: 'nurses, every shift', wait: 'workarounds continue', bucket: 'sprint' },
    { id: 'r4', from: 'hospital A', ask: 'dashboard buries the three numbers', reach: 'billing heads, weekly', wait: 'survivable', bucket: 'sprint' },
    { id: 'r5', from: 'hospital D', ask: 'receipt numbering per entity', reach: 'accounts, monthly', wait: 'survivable, with a fix date', bucket: 'sprint' },
    { id: 'r6', from: 'hospital B', ask: 'a new logo on one report', reach: 'one admin, once', wait: 'nothing happens', bucket: 'later' },
    { id: 'r7', from: 'hospital E', ask: 'dark mode for the pharmacy screen', reach: 'one clerk asked', wait: 'nothing happens', bucket: 'later' },
    { id: 'r8', from: 'hospital C', ask: 'a custom export for one doctor', reach: 'one doctor', wait: 'nothing happens', bucket: 'later' },
  ] as Req[],
  checklist: ['visit logs, every day', 'one tracker per account, owner and ETA', 'go-live checklist, signed per department', 'user story checked before a line of code'],
};

// Simulation 04: everything is P0, then two questions sort it, then the operating system holds it.
export function mountP0Sim(panel: HTMLElement): () => void {
  const tl = createTimeline(panel);
  panel.replaceChildren();
  const o = P0_DEMO.outcome;
  const root = document.createElement('div');
  root.className = 'game p0 sim';
  root.innerHTML = `
    <div class="g-head">
      <p class="g-title" data-scene>busy: every request is urgent to whoever sent it</p>
      <p class="g-meta mono">tickets / month <b data-tickets>${o.ticketsBefore}</b> &middot; go-live <b data-golive>${o.goLiveBefore} days</b> &middot; ${P0_DEMO.label}</p>
    </div>
    <div class="p0-inbox" data-inbox></div>
    <div class="p0-buckets" data-buckets hidden>
      <div class="bk"><p class="g-label mono">// now</p><div data-bucket="now"></div></div>
      <div class="bk"><p class="g-label mono">// this sprint</p><div data-bucket="sprint"></div></div>
      <div class="bk"><p class="g-label mono">// later, or no</p><div data-bucket="later"></div></div>
    </div>
    <ul class="p0-check mono" data-check hidden></ul>
    <p class="g-status mono" data-status aria-live="polite"></p>
    <div class="g-actions" data-actions></div>`;
  root.tabIndex = -1; // replay hands focus here, so keyboard users stay in the scene
  panel.appendChild(root);
  const $ = (sel: string) => root.querySelector<HTMLElement>(sel)!;
  const set = (sel: string, t: string) => { $(sel).textContent = t; };
  const cards = new Map<string, HTMLElement>();
  const step = tl.step;

  // Busy.
  for (const r of P0_DEMO.requests) step(150, () => {
    const c = document.createElement('div');
    c.className = 'p0-card p0';
    c.dataset.req = r.id;
    c.innerHTML = `<span class="stamp mono">P0</span><span class="from mono">${r.from}</span><span class="ask">${r.ask}</span><span class="prog"><i></i></span><span class="qa mono"></span>`;
    $('[data-inbox]').appendChild(c);
    cards.set(r.id, c);
  });
  step(200, () => { cards.forEach((c) => c.classList.add('stalled')); set('[data-status]', 'everyone works on everything. every bar stops at 40%.'); });
  // The counter shows only Medoc's real figures: it pulses while busy, it never counts invented numbers.
  step(480, () => $('[data-tickets]').classList.add('hot'));
  step(300, () => set('[data-status]', 'everything is P0, so nothing is.'));

  // The system.
  step(600, () => {
    set('[data-scene]', 'the system: two questions for every request');
    set('[data-status]', 'how many people does it affect, how often? what happens if we wait two weeks?');
    $('[data-buckets]').hidden = false;
  });
  for (const r of P0_DEMO.requests) step(170, () => {
    const c = cards.get(r.id)!;
    c.classList.remove('p0', 'stalled');
    c.querySelector('.qa')!.textContent = `${r.reach} · wait: ${r.wait}`;
    root.querySelector(`[data-bucket="${r.bucket}"]`)!.appendChild(c);
  });
  step(200, () => { $('[data-check]').hidden = false; });
  for (const item of P0_DEMO.checklist) step(120, () => $('[data-check]').insertAdjacentHTML('beforeend', `<li>ok ${item}</li>`));
  step(300, () => {
    $('[data-tickets]').classList.remove('hot');
    set('[data-tickets]', o.ticketsAfter);
    set('[data-golive]', `${o.goLiveAfter} days`);
    set('[data-status]', `busy is not a metric. at Medoc: support tickets a month ${o.ticketsBefore} to ${o.ticketsAfter}, go-live ${o.goLiveBefore} days to ${o.goLiveAfter}.`);
    $('[data-actions]').innerHTML = '<button type="button" class="g-btn ghost" data-replay-sim>replay</button>';
    $('[data-actions]').querySelector<HTMLButtonElement>('button')!.onclick = () => { mountP0Sim(panel); panel.querySelector<HTMLElement>('.game')?.focus(); };
    unlock('p0-sorted');
  });
  return tl.play(SCENE_MS);
}
