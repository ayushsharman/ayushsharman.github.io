import { createTimeline, LONG_SCENE_MS } from './timeline';
import { unlock } from '../secrets';

type Stage = { year: string; role: string; did: string; moved: string; mrr: string; team?: string };

// Medoc, 2022 to 2026. Every figure here is from the Notion page "Business Impact: From First Repo to
// ₹10L MRR"; tests/mrr-sim.test.ts rejects any other number. Titles follow the owner's own timeline.
export const MRR_DEMO = {
  stages: [
    { year: '2022', role: 'founding member', did: 'the first repo. nights and weekends, alongside a degree.', moved: '₹0 a month. a team of 5.', mrr: '₹0', team: '5' },
    { year: '2023', role: 'product head, DocAssist', did: 'user interviews on hospital floors. months of scattered asks turned into one MVP roadmap.', moved: '2 pilot clinics, then a 100-bed hospital.', mrr: '₹0' },
    { year: '2024', role: 'CTO', did: 'the platform, module by module, built for how staff actually work a shift.', moved: 'the first ₹1L a month.', mrr: '₹1L' },
    { year: '2025', role: 'director, technical operations', did: 'revenue structured like a business. 10+ specialty workflows open a new segment.', moved: '10+ clinics, and a second line worth ₹1L+ a month.', mrr: '₹1L' },
    { year: '2026', role: 'the result', did: '12 live modules, run by an operating system instead of by heroics.', moved: '₹10L+ MRR. 20+ hospitals. 1,000+ daily users. 5 people to 50.', mrr: '₹10L+', team: '50' },
  ] as Stage[],
  end: '₹0 to ₹10L+ a month. it compounded.',
};

// Display only, never shown as numbers: how full the bar is and how many dots light, per stage.
const VISUAL = { bar: [0, 0, 10, 10, 100], dots: [0, 3, 3, 13, 22], totalDots: 24 };

// Simulation 03: four years of one company, a year at a time.
export function mountMrrSim(panel: HTMLElement): () => void {
  const tl = createTimeline(panel);
  panel.replaceChildren();
  const first = MRR_DEMO.stages[0];
  const root = document.createElement('div');
  root.className = 'game mrr sim';
  root.innerHTML = `
    <div class="g-head">
      <p class="g-title" data-scene>four years, one company, a year at a time</p>
      <p class="g-meta mono"><span data-year>${first.year}</span> &middot; <span data-role>${first.role}</span> &middot; medoc, real figures</p>
    </div>
    <div class="mrr-strip" aria-hidden="true">${MRR_DEMO.stages.map((s) => `<span data-seg>${s.year}</span>`).join(' ')}</div>
    <div class="mrr-grid">
      <ol class="mrr-log" data-log></ol>
      <div class="mrr-side">
        <p class="g-label mono">// monthly revenue</p>
        <p class="mrr-big"><span data-mrr>${first.mrr}</span></p>
        <div class="mrr-bar"><i data-mrrbar></i></div>
        <p class="g-label mono">// hospitals and clinics</p>
        <div class="mrr-dots" aria-hidden="true">${Array.from({ length: VISUAL.totalDots }, () => '<i data-dot></i>').join('')}</div>
        <p class="g-label mono">// team</p>
        <p class="mrr-big"><span data-team>${first.team}</span></p>
      </div>
    </div>
    <p class="g-status mono" data-status aria-live="polite"></p>
    <div class="g-actions" data-actions></div>`;
  root.tabIndex = -1; // replay hands focus here, so keyboard users stay in the scene
  panel.appendChild(root);
  const $ = (sel: string) => root.querySelector<HTMLElement>(sel)!;
  const set = (sel: string, t: string) => { $(sel).textContent = t; };
  const dots = [...root.querySelectorAll<HTMLElement>('[data-dot]')];
  const segs = [...root.querySelectorAll<HTMLElement>('[data-seg]')];

  MRR_DEMO.stages.forEach((st, i) => tl.step(900, () => {
    set('[data-year]', st.year);
    set('[data-role]', st.role);
    segs.forEach((s, j) => s.classList.toggle('on', j <= i));
    $('[data-log]').insertAdjacentHTML('beforeend',
      `<li><span class="yr mono">${st.year}</span><span class="rl mono">${st.role}</span><span class="did">${st.did}</span><span class="mv mono">${st.moved}</span></li>`);
    set('[data-mrr]', st.mrr);
    $('[data-mrrbar]').style.width = `${VISUAL.bar[i]}%`;
    dots.forEach((d, j) => d.classList.toggle('on', j < VISUAL.dots[i]));
    if (st.team) set('[data-team]', st.team);
  }));
  tl.step(400, () => {
    set('[data-status]', MRR_DEMO.end);
    $('[data-actions]').innerHTML = '<button type="button" class="g-btn ghost" data-replay-sim>replay</button>';
    $('[data-actions]').querySelector<HTMLButtonElement>('button')!.onclick = () => { mountMrrSim(panel); panel.querySelector<HTMLElement>('.game')?.focus(); };
    unlock('mrr-watched');
  });
  return tl.play(LONG_SCENE_MS);
}
