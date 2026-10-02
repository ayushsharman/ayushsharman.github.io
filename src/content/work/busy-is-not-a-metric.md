---
title: Busy is not a metric
summary: How one hospital escalation became an operating system for implementations, and why I stopped managing expectations and started managing uncertainty.
org: medoc
year: '2025'
---

## Context

Medoc builds a hospital information system for small and mid-sized hospitals: OPD, IPD, pharmacy, billing and clinical workflows. Implementation is the riskiest part: new software on top of live patient care and billing, run by non-technical staff, with no tolerance for downtime.

We were scaling, and it felt like momentum. Every hospital had its own list of changes, and because each one felt urgent to the client asking, we treated almost all of it as urgent to us. The team got pulled between hospitals' billing complaints, training issues and dashboard requests, all in the same week. Nobody was tracking whether any of it moved a number that mattered.

Then one rollout, at a multi-specialty orthopedic hospital moving from paper to a fully digital system across departments, escalated to our founder. As director of technical operations, I was the person he pointed to, and the one who sat across the table from the hospital's owner when it came to a head.

## The problem

On the surface: frustration going straight to me and our founder, repeated follow-ups with no resolution, falling confidence in our timelines, and negative word of mouth among staff, driven by how *trivial* many of the bugs were. A release had slipped, and the trainer had gone unreachable just when I needed status.

It was tempting to blame individuals. The real causes were systemic:

1. **No implementation visibility.** Without consistent visit logs, the client could not tell "nothing happened" from "work happened but was not written down," and reasonably assumed the first.
2. **Timelines without readiness.** Conversations were about *when* something would ship, not whether it was ready to ship.
3. **Engineering built without context.** A fix could be technically done and useless if it did not match how a nurse or pharmacist actually worked.
4. **We optimized for dates, not readiness.** Commitments went to the client before engineering had validated the fix. Timelines slipped, trust eroded, and the loop repeated.

The 26 field feedback items from pharmacy and billing staff told the same story: workflows built to a minimum spec ("edit amount only") when the real need was full line-item flexibility.

Together it described a system where issues were reported but not tracked to resolution, and "in progress" had no operational meaning.

## Approach

I treated the escalation as a product and process failure, not a fire to put out personally. Every escalation was information lost between customer, implementation, product and engineering. The goal was better information flow: visible, structured and owned at each handoff.

Instead of a sprint to fix every bug, I built seven durable systems:

| System | What it does | Owner |
|---|---|---|
| Visit logs | Daily, timestamped, tied to departments and issues | Implementation team |
| Escalation framework | One tracker per account; every open item has an owner, status and ETA | Implementation lead |
| Go-live checklist | Sign-off gates per department before any module goes live | Product team |
| Weekly at-risk review | Implementation, product and engineering in one room for flagged accounts | Me |
| User story validation | A written description of the real workflow before development starts | Product team |
| Readiness review | A gate between "code complete" and "client-facing done" | Engineering lead |
| Handover template | Account history, open issues and context, so nobody is a single point of failure | Implementation team |

Underneath sat a phased rollout: kickoff, a six-day training, go-live, then hypercare aimed at at least 80% adoption. Borrowed frameworks covered phases and adoption, but none treated *communication itself* as a deliverable with an owner. That was the gap this closed.

For prioritization, I stopped asking whether a request felt urgent and started asking two separate questions: how many people does this affect, and how often? And what happens if we do nothing for two weeks? A loud, narrow request that is survivable for two weeks is not a P0. If everything is P0, nothing is P0.

## What I owned

I was accountable for the outcome, but I was not responsible for fixing nursing, pharmacy, billing or deployment. Those belonged to engineering, product and implementation. Confusing the two meant absorbing pressure I could not resolve, and passing on promises engineering had not validated.

So I stopped being the messenger for commitments I did not control, and committed only to what I did: consolidated status, honest uncertainty and a fixed cadence of updates, even when the update was "still no resolution."

That was the shift from **managing expectations** to **managing uncertainty**. The client stopped hearing "it'll be done by Thursday" and started hearing "the issue is in engineering validation; I'll update you today by 6 PM even without a resolution." The first promises someone else's execution. The second promises something I control: communication.

## What changed

- Go-live time fell from 30 days to 15, and to 7 for smaller clinics.
- Systemic fixes with QA and engineering took monthly support tickets from 30+ down to 4.
- Conversation logging now runs across active implementations, and scheduled review calls replaced the old pattern of pushing a release and waiting for complaints.
- Day-to-day operations depend less on our founder.

The biggest change was how I judge work. Busy had felt like progress. Prioritization is not a skill you apply after you have metrics; it is what forces you to get metrics in the first place.

## What I'd do differently

Build the tracker, the go-live checklist and the weekly review *before* an account shows strain, not after an escalation forces it. Escalations are expensive teachers. The cheaper version is instrumenting visibility into every implementation from day one, so "no news" is never mistaken for "no progress," by the client or by leadership.

I would also instrument the 30-day closure report earlier, so adoption is measured the same way on every rollout.
