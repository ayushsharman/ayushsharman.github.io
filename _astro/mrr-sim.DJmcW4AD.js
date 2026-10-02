import{n as e}from"./secrets.DC9Zv0ij.js";import{r as t,t as n}from"./timeline.CNy6bFc8.js";var r={stages:[{year:`2022`,role:`founding member`,did:`the first repo. nights and weekends, alongside a degree.`,moved:`₹0 a month. a team of 5.`,mrr:`₹0`,team:`5`},{year:`2023`,role:`product head, DocAssist`,did:`user interviews on hospital floors. months of scattered asks turned into one MVP roadmap.`,moved:`2 pilot clinics, then a 100-bed hospital.`,mrr:`₹0`},{year:`2024`,role:`CTO`,did:`the platform, module by module, built for how staff actually work a shift.`,moved:`the first ₹1L a month.`,mrr:`₹1L`},{year:`2025`,role:`director, technical operations`,did:`revenue structured like a business. 10+ specialty workflows open a new segment.`,moved:`10+ clinics, and a second line worth ₹1L+ a month.`,mrr:`₹1L+`},{year:`2026`,role:`the result`,did:`12 live modules, run by an operating system instead of by heroics.`,moved:`₹10L+ MRR. 20+ hospitals. 1,000+ daily users. 5 people to 50.`,mrr:`₹10L+`,team:`50`}],end:`₹0 to ₹10L+ a month. it compounded.`},i={bar:[0,0,10,10,100],dots:[0,3,3,13,22],totalDots:24};function a(o){let s=t(o);o.replaceChildren();let c=r.stages[0],l=document.createElement(`div`);l.className=`game mrr sim`,l.innerHTML=`
    <div class="g-head">
      <p class="g-title" data-scene>four years, one company, a year at a time</p>
      <p class="g-meta mono"><span data-year>${c.year}</span> &middot; <span data-role>${c.role}</span> &middot; medoc, real figures</p>
    </div>
    <div class="mrr-strip" aria-hidden="true">${r.stages.map(e=>`<span data-seg>${e.year}</span>`).join(` `)}</div>
    <div class="mrr-grid">
      <ol class="mrr-log" data-log></ol>
      <div class="mrr-side">
        <p class="g-label mono">// monthly revenue</p>
        <p class="mrr-big"><span data-mrr>${c.mrr}</span></p>
        <div class="mrr-bar"><i data-mrrbar></i></div>
        <p class="g-label mono">// hospitals and clinics</p>
        <div class="mrr-dots" aria-hidden="true">${Array.from({length:i.totalDots},()=>`<i data-dot></i>`).join(``)}</div>
        <p class="g-label mono">// team</p>
        <p class="mrr-big"><span data-team>${c.team}</span></p>
      </div>
    </div>
    <p class="g-status mono" data-status aria-live="polite"></p>
    <div class="g-actions" data-actions></div>`,l.tabIndex=-1,o.appendChild(l);let u=e=>l.querySelector(e),d=(e,t)=>{u(e).textContent=t},f=[...l.querySelectorAll(`[data-dot]`)],p=[...l.querySelectorAll(`[data-seg]`)];return r.stages.forEach((e,t)=>s.step(900,()=>{d(`[data-year]`,e.year),d(`[data-role]`,e.role),p.forEach((e,n)=>e.classList.toggle(`on`,n<=t)),u(`[data-log]`).insertAdjacentHTML(`beforeend`,`<li><span class="yr mono">${e.year}</span><span class="rl mono">${e.role}</span><span class="did">${e.did}</span><span class="mv mono">${e.moved}</span></li>`),d(`[data-mrr]`,e.mrr),u(`[data-mrrbar]`).style.width=`${i.bar[t]}%`,f.forEach((e,n)=>e.classList.toggle(`on`,n<i.dots[t])),d(`[data-team]`,e.team??``)})),s.step(400,()=>{d(`[data-status]`,r.end),u(`[data-actions]`).innerHTML=`<button type="button" class="g-btn ghost" data-replay-sim>replay</button>`,u(`[data-actions]`).querySelector(`button`).onclick=()=>{a(o),o.querySelector(`.game`)?.focus()},e(`mrr-watched`)}),s.play(n)}export{a as mountMrrSim};