---
title: Agents that start at 9am
summary: Reviewer agents that read the ERP each morning, put the risky items first, ask only what the data cannot answer, and never ask twice.
org: clear
year: '2026'
---

## Context

A large manufacturer runs its operations on an ERP. Purchase orders, deliveries, stock, maintenance: it is all in there, and it is all correct. Every morning, people across several businesses open reports built on that data and decide what to do today.

The reports were fine. They were also the same reports every day.

## The problem

A report cannot learn. It shows the same rows in the same order whether you looked at them yesterday or not. The delivery that is late because the vendor already called you shows up next to the delivery that is late because nobody knows. The item you explained last week is back this week, asking to be explained again.

So people do what people always do with something that repeats itself. They stop reading it. The risky row sits at the bottom, below a page of rows that do not matter, and nobody gets there.

The data was never the problem. The context was. Why something is late, who already handled it, which exceptions are normal: none of that lives in the ERP. It lives in people's heads.

## Constraints

- **The data is right, the meaning is missing.** The agent cannot invent context. It has to get it from the people who have it.
- **Attention is the scarce resource.** Anything that repeats itself gets ignored. Every line in the mail has to earn its place.
- **Questions cost something.** Ask too many and people stop answering. Ask a question the agent should have worked out on its own and it looks lazy.
- **Trust comes slowly.** Nobody hands their morning to a machine on day one. The agent has to be useful before it is trusted, and trusted before it is relied on.

## Approach

The core idea is simple. A report is the same size every day, because it cannot learn. A loop gets smaller, because each answer changes a rule.

Every morning, before anyone logs in, a reviewer agent runs the same four steps for each business.

```
look      read today's data, compare with yesterday and history
name      turn the changes into work, risky items first
ask       at most three questions only a person can answer
learn     keep every answer, never ask it twice
```

**Look.** The agent reads the data and compares it with yesterday and with the usual range. It cares about what changed, not what exists.

**Name the work.** It turns those changes into a ranked list. Not a flat table: the items most likely to hurt come first, ranked by how far outside the usual range they sit, not by whether they crossed some fixed target.

**Ask.** Some items the data cannot explain. For those, the agent asks a person, and it asks at most three questions at a time. If it has more, it picks the ones that matter most and holds the rest.

**Learn.** Every answer is kept. If a person says "this vendor is always late at the end of the quarter, ignore it", that becomes a rule. Tomorrow the agent does not ask. It does not even show the row, unless it moves outside what the person described.

Each business gets its own short morning mail. Short is a design rule. A long mail is a report wearing a disguise.

## What I owned

The design of the loop, end to end.

I decided what the agent looks at, how it ranks, and which questions it is allowed to ask. That last part took the most work. A good question is one only a person can answer, that changes what the agent does next, and that never needs asking again. Most candidate questions failed at least one of those.

I designed the daily mail: what goes first, what gets cut, how an item points back at the data behind it.

And I worked with the people who answer. Their replies are the agent's real input. I read them, saw where questions confused them, and rewrote the questions until the answers became useful rules.

## What changed

The morning stopped being a reading exercise. People open a short mail that starts with what needs them, answer a few questions, and get on with the day.

The mail is meant to get smaller over time. Every answer removes a question that will not come back and a row that will not need explaining. The work that remains is the work that actually needs a person.

## What I'd do differently

I would start with fewer questions. Early on I let the agent ask about too much, and some answers turned out not to change anything. A question that does not change a rule is noise with a question mark.

I would also put the people who answer in the room sooner. The data told me what was changing. Only they could tell me what mattered, and I learned that faster by sitting with them than by reading their replies.
