import{n as e}from"./secrets.DC9Zv0ij.js";import{i as t,r as n,t as r}from"./timeline.Depu3PT4.js";var i={stages:[{year:`2022`,role:`founding member`,did:`the first repo. nights and weekends, alongside a degree.`,moved:`₹0 a month. a team of 5.`,mrr:`₹0`,team:`5`},{year:`2023`,role:`product head, DocAssist`,did:`user interviews on hospital floors. months of scattered asks turned into one MVP roadmap.`,moved:`2 pilot clinics, then a 100-bed hospital.`,mrr:`₹0`},{year:`2024`,role:`CTO`,did:`the platform, module by module, built for how staff actually work a shift.`,moved:`the first ₹1L a month.`,mrr:`₹1L`},{year:`2025`,role:`director, technical operations`,did:`revenue structured like a business. 10+ specialty workflows open a new segment.`,moved:`10+ clinics, and a second line worth ₹1L+ a month.`,mrr:`₹1L+`},{year:`2026`,role:`the result`,did:`12 live modules, run by an operating system instead of by heroics.`,moved:`₹10L+ MRR. 20+ hospitals. 1,000+ daily users. 5 people to 50.`,mrr:`₹10L+`,team:`50`}],end:`₹0 to ₹10L+ a month. it compounded.`},a={bar:[0,0,10,10,100],dots:[0,3,3,3,22],totalDots:24};function o(s){let c=t(s);s.replaceChildren();let l=i.stages[0],u=document.createElement(`div`);u.className=`game mrr sim`,u.innerHTML=`
    <div class="g-head">
      <p class="g-title" data-scene>four years, one company, a year at a time</p>
      <p class="g-meta mono"><span data-year>${l.year}</span> &middot; <span data-role>${l.role}</span> &middot; medoc, real figures</p>
    </div>
    <div class="mrr-strip" aria-hidden="true">${i.stages.map(e=>`<span data-seg>${e.year}</span>`).join(` `)}</div>
    <div class="mrr-grid">
      <ol class="mrr-log" data-log></ol>
      <div class="mrr-side">
        <p class="g-label mono">// monthly revenue</p>
        <p class="mrr-big"><span data-mrr>${l.mrr}</span></p>
        <div class="mrr-bar"><i data-mrrbar></i></div>
        <p class="g-label mono" data-dots-label aria-hidden="true">// hospitals</p>
        <div class="mrr-dots" aria-hidden="true">${Array.from({length:a.totalDots},()=>`<i data-dot></i>`).join(``)}</div>
        <p class="g-label mono">// team</p>
        <p class="mrr-big"><span data-team>${l.team}</span></p>
      </div>
    </div>
    <p class="g-status mono" data-status></p>
    <p class="sr-only" data-live aria-live="polite"></p>
    <div class="g-actions" data-actions></div>`,u.tabIndex=-1,s.appendChild(u);let d=e=>u.querySelector(e),f=(e,t)=>{d(e).textContent=t},p=[...u.querySelectorAll(`[data-dot]`)],m=[...u.querySelectorAll(`[data-seg]`)];return i.stages.forEach((e,t)=>c.step(900,()=>{f(`[data-year]`,e.year),f(`[data-role]`,e.role),m.forEach((e,n)=>e.classList.toggle(`on`,n<=t)),d(`[data-log]`).insertAdjacentHTML(`beforeend`,`<li><span class="yr mono">${e.year}</span><span class="rl mono">${e.role}</span><span class="did">${e.did}</span><span class="mv mono">${e.moved}</span></li>`),f(`[data-mrr]`,e.mrr),d(`[data-mrrbar]`).style.width=`${a.bar[t]}%`,p.forEach((e,n)=>e.classList.toggle(`on`,n<a.dots[t])),f(`[data-team]`,e.team??``)})),c.step(400,()=>{f(`[data-status]`,i.end),n(d(`[data-live]`),`${i.stages.at(-1).moved} ${i.end}`,c.instant),d(`[data-actions]`).innerHTML=`<button type="button" class="g-btn ghost" data-replay-sim>replay</button>`,d(`[data-actions]`).querySelector(`button`).onclick=()=>{o(s),s.querySelector(`.game`)?.focus()},e(`mrr-watched`)}),c.play(r)}export{o as mountMrrSim};