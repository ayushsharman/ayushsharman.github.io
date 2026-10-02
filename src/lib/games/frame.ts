// The shared frame every simulation is staged in. It sets the reading order, one focal point at a
// time: the act (what is happening), the scoreboard (the payoff, filled as each act ends), the ask
// (the decision a human still owns), the stage (dimmed, with a spotlight), and one cue line.
export type SideState = 'live' | 'done' | 'agent' | 'empty';
export type SideInit = { k: string; v: string; s: string };

const side = (attr: string, x: SideInit, state: SideState) =>
  // Spaces between the parts, so their text never runs together for screen readers ("5" then "2026").
  `<div class="sc-side ${state}" ${attr}> <p class="k mono">${x.k}</p> <p class="v" data-v>${x.v}</p> <p class="s mono" data-s>${x.s}</p> </div>`;

export function createFrame(o: { cls: string; label: string; steps: number; left: SideInit; right: SideInit }) {
  const root = document.createElement('div');
  root.className = `game sim ${o.cls}`;
  root.tabIndex = -1; // replay hands focus here, so keyboard users stay in the scene
  root.innerHTML = `
    <div class="sc-top"><p class="sc-act"><span class="sc-step mono" data-step>1 / ${o.steps}</span><span class="sc-title" data-act></span></p><p class="sc-label mono">${o.label}</p></div>
    <div class="sc-score">${side('data-score-left', o.left, 'live')} ${side('data-score-right', o.right, 'empty')}</div>
    <div class="sc-ask" data-ask hidden></div>
    <div class="sc-stage" data-stage></div>
    <p class="sc-cue mono" data-status></p>
    <p class="sr-only" data-live aria-live="polite"></p>
    <div class="g-actions" data-actions></div>`;
  const $ = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  return {
    root,
    $,
    stage: $('[data-stage]'),
    act(i: number, title: string, pill?: string) {
      $('[data-step]').textContent = pill ?? `${i} / ${o.steps}`;
      $('[data-act]').textContent = title;
    },
    side(which: 'left' | 'right', u: { v?: string; s?: string; state?: SideState }) {
      const el = $(`[data-score-${which}]`);
      if (u.v !== undefined) el.querySelector('[data-v]')!.textContent = u.v;
      if (u.s !== undefined) el.querySelector('[data-s]')!.textContent = u.s;
      if (u.state) { el.classList.remove('live', 'done', 'agent', 'empty'); el.classList.add(u.state); }
    },
    cue(text: string) { $('[data-status]').textContent = text; },
    ask(html: string) { const a = $('[data-ask]'); a.hidden = false; a.innerHTML = html; },
    end() { root.classList.add('end'); },
  };
}
