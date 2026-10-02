---
title: The reconciliation agent
summary: An agent that reconciles vendor statements against the books, explains every difference, and leaves finance with only the decisions.
org: clear
year: '2026'
---

## Context

A large manufacturer buys from a long list of vendors. Every vendor sends a statement of account: what they think they are owed, line by line. The company keeps its own version of the same story in the vendor ledger inside its ERP. The two should agree. They rarely do.

Somebody has to find out why. At this company, that somebody was a finance team with a printout, a highlighter and a lot of patience.

## The problem

Statements arrive as PDFs and spreadsheets, by email and over chat, in whatever layout the vendor's accountant happened to like. No two look the same. Some list every invoice. Some list only the balance. Some restate the whole history every month.

The team reconciled them by hand. Open the statement, open the ledger, tick a row, tick another row, find the one that does not match, work out why, write it down. Repeat for the next vendor. The work was slow, but slow was not the real problem. The real problem was that skilled people spent their days ticking boxes that agreed, and had little time left for the few that did not.

## Constraints

- **Read-only.** The agent reads the vendor ledger from the ERP. It never writes to it, never posts an entry, never changes a balance. Fixing the books stays a human job.
- **Every format.** There is no standard statement. The agent has to cope with whatever arrives, including the scanned and the badly exported.
- **No black boxes.** A finance team will not sign off on a number because a machine said so. Every finding has to point at its evidence: this line on the statement, that entry in the ledger, this is the gap.
- **Their format, not mine.** The company already had a prescribed reconciliation template. The output had to land in it, so the team could use it without learning anything new.

## Approach

The agent works in a loop, one vendor at a time.

```
ingest    pick up statements from mail and chat, any format
parse     turn each one into clean dated entries
read      pull the vendor ledger from the ERP, read-only
match     pair entries, explain every difference
report    write the reconciliation in the company's template
ask       list the decisions a finance head must make
```

Matching is the easy part. Explaining is the useful part. Every difference lands in a plain category a finance person already uses: a timing difference, an invoice on one side but not the other, a payment the vendor has not recorded, a deduction, an opening balance that does not agree. Each one carries the lines it came from.

Two lessons shaped the design more than anything else.

**Statements are often cumulative.** A vendor sends a statement this month that repeats everything from last month, plus the new lines. Read both as separate truths and the agent finds the same invoice twice and reports a gap that does not exist. So a newer statement supersedes an older one for the period it covers. Without that rule the agent invents work, and invented work is the fastest way to lose a finance team.

**The books can be wrong too.** It is tempting to treat the ledger as the truth and the vendor as the suspect. Sometimes the copy of the ledger is the problem, for example one that starts without an opening balance. The agent has to say so plainly: this difference is on our side, not the vendor's. An agent that always blames the vendor is not reconciling. It is arguing.

The report ends with a short list. Not every difference, only the ones a person has to decide: write this off, chase that vendor, correct this entry. Everything else is explained and parked.

## What I owned

All of it, from the first conversation to the version in use.

I sat with the finance team and watched them reconcile. I wrote down the rules they applied without thinking, then argued about the edge cases until we agreed on them. Those rules became the matching logic.

I built the ingestion, the parsers, the matching and the report, and shipped it. Then I ran it on real statements with the team beside me, found where it was wrong, and fixed it. Most of the design above came from those sessions, not from a whiteboard.

## What changed

The team stopped ticking rows. They now read a reconciliation that has already been done, check the evidence where they want to, and spend their time on the short list of decisions at the end.

The question in the room moved from "does this line match" to "what do we do about this one". That is the question they were hired to answer.

## What I'd do differently

I would handle cumulative statements from the first day. I found the problem by watching the agent report gaps that were not there, and every false finding cost a little trust I had to earn back.

I would also challenge the books side earlier. I spent too long assuming the ledger was clean and the statements were messy. Both sides are data, and both sides can be wrong. Building that in from the start would have saved a round of explaining to the team why the agent had been blaming the wrong party.
