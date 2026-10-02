---
title: Jobs to be done, the most underrated lens
summary: Most feature requests describe a solution the customer already imagined. Writing from the job underneath changes the spec you end up building.
source: https://fossil-capybara-4ed.notion.site/Jobs-to-Be-Done-The-Most-Underrated-Lens-in-Product-Work-3ac895b11a4280e78366cb86d581a646
date: '2026'
---

*Why the framework I didn't learn until my first month at Clear changed how I write every PRD since*

## The honest starting point

I didn't know what Jobs to Be Done was until I joined Clear. It was the first thing they taught, in the first week, before anything about their actual product. At the time it felt almost too simple to be a "framework": of course people don't want a drill, they want a hole in the wall. But once you actually try to apply it to a real feature decision, it stops being a slogan and starts being uncomfortable, because it forces you to admit that most feature requests are described in terms of the *solution* the customer already imagined, not the problem underneath it.

That discomfort is the whole value of JTBD. It's also exactly why it's underrated. It's easy to nod along to the milkshake story and then go right back to writing a PRD titled "Add Filter to Dashboard."

## What JTBD actually is

Jobs to Be Done reframes the basic product question. Instead of asking *who is this user and what do they want*, it asks: **what job is this person "hiring" the product to do, in a specific situation, and what would make them "fire" it for something else?**

A job isn't a feature request and it isn't a demographic. It's a situation-shaped need: *when [situation], I want to [motivation], so I can [outcome].* The situation matters as much as the outcome. The same person wants completely different things from the same product depending on what's happening around them at that moment.

## Why it's underrated

Most product teams skip straight from "user said X" to "we should build X." JTBD forces a stop in between: *why did they ask for X, and is X actually the best way to get that job done?* Skipping that stop is how products end up with a pile of shipped features that technically satisfy requests but don't move any outcome that matters, because nobody asked what the request was actually standing in for.

It's underrated specifically because it doesn't look like it's doing anything. There's no dashboard, no framework diagram people love pinning to a wall. It's a discipline applied at the moment a requirement is written down, which makes it invisible when done well, and very expensive when skipped.

## JTBD vs. user personas

These get treated as interchangeable and they're not. A persona describes a *type of person*: role, context, goals, frustrations, roughly stable over time. A job describes a *situation*, and the same persona can have wildly different jobs depending on what's happening when they open the product.

Take a hospital billing clerk. As a persona, she's consistent: daily user, low tolerance for friction, values speed. But her *job* on a normal Tuesday ("close this bill fast so the patient can leave") is a completely different job than the one she has when an insurance approval changes mid-treatment ("adjust the line-item breakdown without voiding and re-entering the whole bill"). Same persona, two different jobs, two different feature answers. Personas tell you who you're designing for. Jobs tell you what to actually build for them, in the moment it matters.

## The same feature, written two ways

**Generic PRD, no JTBD:**

> **Feature: Bill Editing**
>
> Allow staff to edit an existing bill after it's generated. Add an "Edit" button on the billing screen. Editable fields: amount.

This isn't wrong, exactly. It's just underspecified in a way that guarantees engineering will build the minimum version, a single editable "amount" field, because nothing in the spec tells them why editing is needed or what happens if the minimum version doesn't cover the real situation.

**The same feature, written from the job:**

> **Job:** When a patient's insurance approval changes mid-treatment, or a line item was miscoded at entry, I want to adjust the specific line items on an already-generated bill, not just the total, so I can correct the record without voiding the bill and re-entering everything from scratch under time pressure, with a patient waiting.

**Feature: Line-Item Bill Editing**

Editable fields: individual line items (service, quantity, rate), not just the total amount. Edits must preserve the original entry in an audit trail. Any edit must sync downstream to the Collection Report and pharmacy stock ledger, since a line-item change affects both. Out of scope: editing after a bill has been marked as paid and reconciled.

Same feature name. Completely different spec, because the second version was written from the situation the clerk is actually in, not from the shape of the button someone imagined. This is a close cousin of a real gap I ran into on Medoc's own billing module: the generic version is exactly what shipped first, and the line-item version is what field feedback eventually forced.

## How to actually inculcate this in a product journey

- **Rewrite the request before you scope it.** Whatever the stakeholder said they want, write one sentence in the *when / I want to / so I can* structure before touching a PRD. If you can't fill in the "when," you don't have a job yet. You have a feature idea.
- **Ask "fired from what?"** Every job has an incumbent: the workaround, spreadsheet, or competitor currently doing it. If you can't name what your feature is replacing, you don't understand the job well enough to build for it.
- **Separate the job from the persona in your docs.** Keep a persona doc and a jobs list as two different artifacts. It stops "who" and "why now" from getting collapsed into one paragraph that quietly favors whichever is easier to write.
- **Push every "add a field" request one level down.** The fastest way to catch an under-scoped feature before it ships is asking what situation makes that field necessary. Usually the honest answer reveals two or three related fields that were never mentioned because nobody was thinking in terms of the job.
- **Revisit jobs when the product scales into a new context.** A job that was true for a 3-clinic pilot doesn't automatically hold at a 100-bed hospital. New context, new pressures, often a new job hiding under the same feature request.

The framework doesn't need a workshop or a template to matter. It needs one habit: before writing down what to build, write down the situation that made someone ask for it.
