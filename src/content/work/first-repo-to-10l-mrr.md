---
title: From first repo to ₹10L MRR
summary: Building Medoc from an unpaid repo to ₹10L+ MRR across 20+ hospitals, and learning product on a hospital floor along the way.
org: medoc
year: 2022 to 2026
---

## Context

Medoc builds a hospital information system for small and mid-sized hospitals in India: OPD, IPD, pharmacy, billing and clinical workflows, used by staff in the middle of live patient care.

I joined in 2022 as a founding member, part-time, alongside my engineering degree. There was no product to manage yet. There was a repo, a rough idea of what hospitals needed, and a lot of building to do before there was anything to measure.

By 2026: ₹0 to ₹10L+ MRR, a team of 5 grown to 50, and 2 pilot clinics grown to 20+ hospitals.

## The problem

The early problem was simple to state and hard to solve: we had software, but no proof that a hospital would pay for it and use it every day.

That first stretch built the technical base everything after it stood on, but a technical base is not a business. The question was whether the product would survive real hospital staff, under real time pressure, with patients waiting at the counter.

Later the problem changed shape. Once the product was selling, the risk was no longer "will anyone pay" but "can this grow without falling apart." More hospitals meant more departments, more staff and more modules, all resting on a small team.

## Approach

**Pilot small, then scale.** We started with a couple of clinics, small enough to fail cheaply, before scaling into a 100-bed hospital with 100+ staff. That hospital was where the product either worked or did not.

**Learn product on the floor, not from a framework.** I became product head of DocAssist in 2023 and moved from writing code to owning product. That meant running user interviews on hospital floors, and mapping workflows department by department. I applied MoSCoW prioritization to turn six-plus months of scattered stakeholder input into a shippable MVP roadmap. Nobody taught me product management in advance; I figured most of it out by watching where staff got stuck.

**Own the technology as the company grew.** In 2024 I became CTO, responsible for the platform the pilots had proven, as it grew department by department across OPD, IPD, pharmacy and billing.

**Open a new segment instead of only adding features.** As director of technical operations, from August 2025, I conceptualized and shipped 10+ specialty-specific prescription workflows. This was not a feature update for existing customers. It was a genuinely new client segment, and it brought in 10+ clinics and a second revenue stream of ₹1L+ a month.

**Grow the operating side with the revenue, not behind it.** Over the same period I worked on the operating backbone that made the revenue durable, and on hiring, which took the team from 5 to 50. That operating story is its own case study.

## What I owned

- **The build itself, at the start.** As a founding member, I was writing the code that the first pilots ran on.
- **The product roadmap.** As product head of DocAssist, I owned discovery, prioritization and the MVP roadmap that turned pilot feedback into something hospitals would pay for.
- **The platform.** As CTO, I owned the technical side of the product the hospitals were running on.
- **The new revenue line.** As director of technical operations, I owned the specialty prescription workflows, from concept to shipping them to the clinics that adopted them.
- **How revenue was structured, not just how the product was built.** The later growth depended on how the product's revenue was set up across hospitals, not only on what we shipped.

## What changed

The pilot work produced Medoc's first real revenue, roughly ₹1L a month: the first proof that the product could be sold and used beyond a pilot.

From there, platform revenue grew from about ₹1L a month to ₹10L+ MRR. The product now spans 12 modules across 20+ hospitals, with 1,000+ daily active users. The specialty prescription workflows added 10+ clinics and a second revenue line worth ₹1L+ a month. The team grew from 5 to 50.

Read end to end, this is one compounding loop. Unpaid building bought the right to run a real pilot. The pilot taught product thinking the hard way, which produced the first ₹1L of revenue. That revenue was the base for the scale-up, and the scale-up only held because the operating system grew in parallel with the revenue instead of trailing behind it.

The lesson I took from it: **revenue growth without a matching operating system does not compound, it just gets more fragile.**

## What I'd do differently

I would treat UX as part of "done" from the first pilot.

Medoc's early build culture, like a lot of engineering-led teams, treated functionality as the whole job. Whether a feature was easy or painful to use during a busy shift was not part of how anyone judged it finished.

That came back to bite us. A lot of what looked like bug reports from hospital staff, especially in billing and pharmacy, was really friction: too many steps to edit a bill line, three separate boxes for IPD, OPD and Pharmacy instead of one coherent flow, a dashboard that buried the three numbers a billing clerk needed. None of it threw an error. Staff just quietly started working around the system instead of through it.

What fixed it was making the cost visible: putting support ticket volume next to the screens generating it, having engineers sit beside a billing clerk during a real shift, and changing the definition of done so a feature also had to survive someone doing their actual job with it. I would build those habits in at the pilot stage, when changing them is cheap, instead of after the product had already spread across hospitals.

UX is not the opposite of functionality. It is the part of functionality that only shows up under real use.
