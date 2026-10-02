import { createTimeline, LONG_SCENE_MS, announce } from './timeline';
import { createFrame } from './frame';
import { unlock } from '../secrets';

type Stage = { year: string; role: string; did: string; moved: string; mrr: string; team?: string };

// Medoc, 2022 to 2026. Every figure here is from the Notion page "Business Impact: From First Repo to
// ₹10L MRR"; tests/mrr-sim.test.ts rejects any other number. Titles follow the owner's own timeline.
export const MRR_DEMO = {
  stages: [
    { year: '2022', role: 'founding member', did: 'the first repo. nights and weekends, alongside a degree.', moved: '₹0 a month. a team of 5.', mrr: '₹0', team: '5' },
    { year: '2023', role: 'product head, DocAssist', did: 'user interviews on hospital floors. months of scattered asks turned into one MVP roadmap.', moved: '2 pilot clinics, then a 100-bed hospital.', mrr: '₹0' },
    { year: '2024', role: 'CTO', did: 'the platform, module by module, built for how staff actually work a shift.', moved: 'the first ₹1L a month.', mrr: '₹1L' },
    { year: '2025', role: 'director, technical operations', did: 'revenue structured like a business. 10+ specialty workflows open a new segment.', moved: '10+ clinics, and a second line worth ₹1L+ a month.', mrr: '₹1L+' },
    { year: '2026', role: 'the result', did: '12 live modules, run by an operating system instead of by heroics.', moved: '₹10L+ MRR. 20+ hospitals. 1,000+ daily users. 5 people to 50.', mrr: '₹10L+', team: '50' },
  ] as Stage[],
  end: '₹0 to ₹10L+ a month. it compounded.',
};

// Display only, never shown as numbers: how full the bar is and how many dots light, per stage.
// The dots are hospitals only: the 10+ specialty clinics of 2025 are a separate line, told in text.
const VISUAL = { bar: [0, 0, 10, 10, 100], dots: [0, 3, 3, 3, 22], totalDots: 24 };

// Simulation 03: four years of one company, a year at a time.
export function mountMrrSim(panel: HTMLElement): () => void {
  const tl = createTimeline(panel);
  panel.replaceChildren();
  const first = MRR_DEMO.stages[0], last = MRR_DEMO.stages.at(-1)!;
  const f = createFrame({
    cls: 'mrr', label: 'medoc, real figures', steps: MRR_DEMO.stages.length,
    left: { k: first.year, v: first.mrr, s: `a team of ${first.team}` },
    right: { k: last.year, v: '-', s: 'four years later' },
  });
  f.act(1, first.role, first.year);
  f.stage.innerHTML = `
    <div class="mrr-grid">
      <ol class="mrr-log" data-log></ol>
      <div class="mrr-side">
        <p class="g-label mono">// monthly revenue</p>
        <p class="mrr-big"><span data-mrr>${first.mrr}</span></p>
        <div class="mrr-bar"><i data-mrrbar></i></div>
        <p class="g-label mono" data-dots-label aria-hidden="true">// hospitals</p>
        <div class="mrr-dots" aria-hidden="true">${Array.from({ length: VISUAL.totalDots }, () => '<i data-dot></i>').join('')}</div>
        <p class="g-label mono">// team</p>
        <p class="mrr-big"><span data-team>${first.team}</span></p>
      </div>
    </div>`;
  panel.appendChild(f.root);
  const $ = f.$;
  const dots = [...f.root.querySelectorAll<HTMLElement>('[data-dot]')];

  MRR_DEMO.stages.forEach((st, i) => tl.step(900, () => {
    f.act(i + 1, st.role, st.year);
    // The spotlight: the year being told is bright, earlier years step back.
    f.root.querySelectorAll('[data-log] li').forEach((li) => li.classList.remove('on'));
    $('[data-log]').insertAdjacentHTML('beforeend',
      `<li class="on"><span class="yr mono">${st.year}</span><span class="rl mono">${st.role}</span><span class="did">${st.did}</span><span class="mv mono">${st.moved}</span></li>`);
    $('[data-mrr]').textContent = st.mrr;
    $('[data-mrrbar]').style.width = `${VISUAL.bar[i]}%`;
    dots.forEach((d, j) => d.classList.toggle('on', j < VISUAL.dots[i]));
    // Notion gives the team size only at the start (5) and the end (50), so the years between show none.
    $('[data-team]').textContent = st.team ?? '';
    f.cue(st.moved);
  }));
  tl.step(400, () => {
    f.end();
    f.side('left', { state: 'done' });
    f.side('right', { v: last.mrr, s: `a team of ${last.team}`, state: 'agent' });
    f.cue(MRR_DEMO.end);
    announce($('[data-live]'), `${last.moved} ${MRR_DEMO.end}`, tl.instant);
    $('[data-actions]').innerHTML = '<button type="button" class="g-btn ghost" data-replay-sim>replay</button>';
    $('[data-actions]').querySelector<HTMLButtonElement>('button')!.onclick = () => { mountMrrSim(panel); panel.querySelector<HTMLElement>('.game')?.focus(); };
    unlock('mrr-watched');
  });
  return tl.play(LONG_SCENE_MS);
}
