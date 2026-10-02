---
title: Prompt engineering is an iceberg
summary: Persona and format are the visible tip. What decides whether an AI feature is safe to ship sits in four layers below the waterline.
source: https://fossil-capybara-4ed.notion.site/The-Art-of-Prompt-Engineering-as-an-Iceberg-3ad895b11a4280f19bf7c6cde0da0084
date: '2026'
---

*Most people stop at the part that's visible above the waterline. The part that actually determines whether an AI feature works is underneath.*

## The honest starting point

The first time most people "do" prompt engineering, it looks like this: give the model a persona, describe the task, maybe specify a format. That's a real skill, and it's necessary, but it's also the part everyone sees, tries, and assumes is the whole discipline. It's the tip of the iceberg. What actually decides whether an AI feature is reliable enough to ship sits well below the waterline, in places most people never think to look, because the visible part already "worked" on the first try.

This is how I've come to think about prompt engineering while building AI features into Medoc's product: not as one skill, but as five layers of increasing depth, where each layer down is less visible and more consequential than the one above it.

## Level 1 - The visible tip: context and persona

This is where almost everyone starts, and where a lot of people stop. Tell the model who it is ("You are a clinical documentation assistant"), what the task is, and roughly what the output should look like. It's necessary, since an unanchored prompt genuinely does worse, but it's also the least differentiated layer. Two people can both know to add a persona and still get wildly different results, because this layer only controls tone and framing, not correctness or reliability.

## Level 2 - Negative prompting: what the model shouldn't do

This is where prompting starts becoming an actual craft instead of a template fill. Telling a model what to do is necessary; telling it what *not* to do is where most of the real failure modes get closed off. For an AI tool interpreting hospital lab reports, "summarize the results" invites the model to also diagnose, recommend treatment, or speculate on causes, none of which it should do. The negative prompt (*"do not suggest a diagnosis, do not recommend treatment, do not speculate beyond what's in the report"*) is doing more real work than the positive instruction that came before it, because it's closing off the specific ways the feature could go wrong in a healthcare context, not just describing the happy path.

## Level 3 - Guardrails: what happens at the edges

Negative prompting handles the failure modes you can predict. Guardrails handle the ones you can't: ambiguous input, missing data, a report format the model hasn't seen, a user pushing the tool outside its intended use. This is the layer where you're not writing instructions anymore, you're designing behavior for uncertainty. What does the tool do when a lab value is missing entirely? What does it say when a user asks it a question it was never meant to answer? A prompt without this layer works in the demo and breaks the first time a real, messy input hits it, which, for a hospital tool, is the first week.

## Level 4 - Reasoning scaffolding: how the model thinks, not just what it outputs

By this point you're no longer just constraining the output, you're shaping the reasoning path that produces it. This is where structured thinking steps, self-checks, and explicit "verify before you answer" instructions live. For the lab-report tool, this looks like asking the model to first extract and list every flagged value before summarizing anything, so a value can't get silently missed in a single unstructured pass. This layer is invisible in the final output (a good scaffold produces a clean answer with no visible trace of the steps that got there), but it's the difference between a tool that's right most of the time and one that's right for a reason you can actually audit.

## Level 5 - The deep water: treating prompts as a product, not a text box

This is the layer that has nothing to do with writing better sentences. It's the discipline of treating a prompt the way you'd treat any other spec: versioned, tested against real failure logs instead of a handful of demo inputs, revisited when the product moves into a new context, and, critically, recognizing when the actual fix isn't a better prompt at all. Sometimes the honest answer is that no amount of prompt refinement will fix a reliability problem, and what's actually needed is a retrieval step, a structured tool call, or a narrower scope for what the AI feature is even allowed to attempt. Knowing the difference between "this needs a better prompt" and "this needs a different architecture" is the deepest and least glamorous layer of the iceberg, and it's the one that actually protects the product.

## The same prompt, at five depths

**Level 1 only:**

> *"You are a medical assistant. Summarize this lab report for the patient."*

**Levels 1 to 3:**

> *"You are a medical assistant. Summarize this lab report in plain language for the patient. Do not suggest a diagnosis, recommend treatment, or speculate on causes beyond what's stated in the report. If a value is missing or the report format is unclear, say so explicitly instead of guessing."*

**Levels 1 to 5:**

> *"You are a medical assistant. First, extract every flagged or out-of-range value from the report as a list, each with its stated normal range. Then summarize the report in plain language for the patient, referencing only the values you extracted. Do not suggest a diagnosis, recommend treatment, or speculate on causes. If a value is missing, ambiguous, or the report format doesn't match what you were trained to expect, state that explicitly and flag it for human review rather than summarizing around the gap."*

Same task, same three sentences of visible difference between the first and last version, but the last version is the only one of the three actually safe to put in front of a real patient's real report.

## Why this matters for product, not just prompting

The iceberg isn't really about AI. It's the same shape as every good product spec: the part everyone writes first (what the feature does) is the least important part of what makes it safe and reliable. The parts that actually protect the product (what it must never do, how it behaves at the edges, whether the reasoning can be audited, whether the whole approach is even the right tool for the job) are the parts most people skip because they're invisible until something breaks. Prompt engineering just makes that pattern impossible to ignore, because with AI, the cost of stopping at Level 1 shows up fast, and it shows up in front of a real user.
