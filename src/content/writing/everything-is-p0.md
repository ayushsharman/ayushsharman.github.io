---
title: If everything is P0, nothing is P0
summary: Treating every request as urgent is a measurement failure wearing a prioritization costume, and the trade-off framework I use now.
source: https://fossil-capybara-4ed.notion.site/Mistakes-Learnings-and-the-Trade-off-Analysis-Underneath-Them-3af895b11a4280809cdbc264cbf76d00
date: '2026'
---

I wrote a short post about this a while back: [If everything is P0, nothing is P0](https://www.linkedin.com/posts/ayush-sharman_pm-founder-startup-activity-7473554689364500480-XxDl). It's a simple line, but it took a real stretch of pain at Medoc to actually believe it.

## What happened

Here's the honest version of what happened. We were scaling: more hospitals, more staff, more requests coming in every day. It felt like momentum. It wasn't. Every hospital that came on board had its own list of changes it wanted, and because each one felt urgent to the client asking for it, we treated almost all of it as urgent to us too. The team got pulled left and right between clients, patching one hospital's billing complaint, then a different hospital's training issue, then a third one's dashboard request, all in the same week. Nobody was tracking whether any of it moved a number that mattered. We simply didn't think about metrics at all during that period. Busy felt like the same thing as progress, and for a long stretch we didn't have anything that could tell us it wasn't.

The actual cost showed up later: support tickets stacked up, engineering was stretched across a dozen half finished threads instead of a few finished ones, and none of us could say with a straight face which of the last twenty requests had actually moved adoption, revenue, or client trust. We had shipped constantly and grown slowly, at the same time.

What I learned from it, stated plainly: **prioritization isn't a skill you apply after you have metrics, it's the thing that forces you to get metrics in the first place.** If you can't measure whether a request matters, you have no honest way to say no to it, so everything defaults to yes, and everything defaults to urgent. "Everything is P0" isn't really a prioritization failure. It's a measurement failure wearing a prioritization costume.

## A few underrated ideas worth learning early

- **Saying no is a deliverable, not an absence of one.** A clear, reasoned no protects the team's ability to finish the yeses. A vague no, or a maybe that never resolves, is worse than either answer.
- **Small friction compounds faster than big bugs.** A crash gets reported immediately. A workflow that's just slightly annoying gets silently worked around for months before anyone flags it, and by then it's load bearing in someone's daily routine.
- **Communication is something you can promise even when the fix isn't.** This one came out of a separate escalation, but it belongs here too: commit to when someone will hear from you, not to an outcome you don't control.
- **Feeling busy is not a metric.** It's the easiest thing to mistake for one, especially on a small team where everyone genuinely is working hard.

---

## The trade-off analysis underneath

The mistakes above share a root cause: we were making decisions without naming the trade-off we were actually making. "Say yes to this hospital's request" felt like a single decision. It was actually a trade-off between that hospital's short term satisfaction and every other hospital's place in the queue, and nobody was naming it as one.

Here's the trade-off framework I actually use now, mostly built out of that painful stretch.

### A simple test for "is this really a P0"

Instead of asking whether a request feels urgent, I ask two separate questions and refuse to let them collapse into one:

| Question | What it actually measures |
|---|---|
| How many people does this affect, and how often? | Reach and frequency, not how loud the one person asking is |
| What happens if we do nothing for two weeks? | Real urgency, separated from someone's anxiety about it |

A request that's loud but narrow (one hospital, one clerk, one edge case) and survivable for two weeks is not a P0, even if it arrived as an angry phone call. A request that's quiet but wide (a small friction point that every billing clerk across twenty hospitals hits daily) often deserves more priority than its tone suggests. Sorting by who shouted loudest is how everything becomes P0 in the first place.

### The trade-offs I weigh most often

| Trade-off | What tips it one way | What tips it the other way |
|---|---|---|
| Speed vs. quality | A pilot client, low stakes, easy to roll back | Live patient billing, financial data, anything hard to undo |
| Breadth vs. depth | Early stage, still finding product market fit across use cases | Post pilot, one segment is clearly the wedge worth going deep on |
| Functionality vs. UX | A brand new capability that didn't exist at all before | A capability that exists but causes daily friction for high frequency users |
| One client's request vs. the platform's roadmap | The request reveals a gap that will hit every future client too | The request is genuinely specific to that one client's edge case |
| Saying yes vs. saying no | The ask is cheap to build and clearly reduces friction for many users | The ask is expensive, narrow, and mostly solves for the person asking loudest |

None of these resolve themselves automatically. The point of writing them down isn't to remove judgment, it's to make sure the judgment call is actually about the trade-off in front of you, instead of about who happened to escalate the loudest that week. That's the difference between the Medoc that was busy and the Medoc that was actually scaling, and it's the same gap between a feature that technically works and one that survives a real shift.
