---
title: 'AI workbook: concepts and workflow designs'
summary: A running workbook on AI, from plain-language terminology and the tool landscape to RAG, agents, orchestration and MCP.
source: https://fossil-capybara-4ed.notion.site/AI-Product-Concepts-Workflow-Designs-3af895b11a428080aa4cd161ffde429c
date: '2026'
---

*A running workbook, not a polished essay. This is the actual shape of my AI rabbit hole, from LinkedIn commentary to RAG pipelines. I'll keep adding to it as I learn more.*

---

## Part 0: Where this started

I started posting about AI and LLMs on LinkedIn back when Google's chatbot was still called Bard, not Gemini, and GPT was still early enough in its lifecycle that most people outside tech hadn't touched it yet. I made a handful of predictions in that window about where this was heading. Some of them landed, some didn't, and the ones that landed taught me more than the ones I got right for the wrong reasons.

> You all have been using ChatGPT wrongly!: [LinkedIn post](https://www.linkedin.com/posts/ayush-sharman_ai-chatgpt-work-activity-7057971346760245248-1A2i)
>
> **[Google](https://www.linkedin.com/company/google/)** Bard is better than ChatGPT but I still use ChatGPT: [LinkedIn post](https://www.linkedin.com/posts/ayush-sharman_ai-chatgpt-bard-activity-7083043513822568448-rwCX)

What changed over time wasn't the interest, it was the depth. Early posts were commentary: reacting to a launch, a benchmark, a demo. Somewhere in that stretch, commentary turned into tinkering, actually building with the tools instead of just writing about them. That's the shift this document tries to capture: Part 1 stays close to where I started (concepts, terminology, which tool actually does what), and Part 2 goes into where I've ended up spending most of my time lately: RAG, agent orchestration, and the plumbing underneath the products I use every day.

One influence worth naming directly: a mentor from my time at Clear posts regularly about practical AI tooling. Not the hype layer, the "here's exactly how you wire this up" layer. One of his walkthroughs, on bridging WhatsApp into Claude, is the reason Part 2 has an actual worked example instead of just theory. Credited and linked in Part 2.4.

---

## Part 1: AI product concepts

### 1.1 Terminology, in plain language

Every field builds a wall of jargon that's mostly simple ideas wearing a costume. Here's the vocabulary I actually use, stripped down.

| Term | Plain meaning |
|---|---|
| **LLM (Large Language Model)** | A model trained on huge amounts of text to predict what comes next. Everything else in this table is either a way of controlling that prediction or a way of connecting it to the outside world. |
| **Token** | The chunk of text a model actually processes, roughly ¾ of a word in English. Cost, speed, and context limits are usually measured in tokens, not words. |
| **Context window** | How much text (in tokens) a model can "see" at once: the prompt, the conversation history, any documents attached. Once you exceed it, the oldest content falls out of view. |
| **Prompt vs. system prompt** | The system prompt sets standing behavior before the conversation starts (tone, role, rules). The user prompt is the specific ask in the moment. Confusing the two is why some instructions "don't stick." |
| **Temperature** | A dial for randomness in the model's output. Low temperature = more predictable, repeatable answers. High = more varied, more creative, less consistent. |
| **Fine-tuning** | Further training a model on a narrower dataset so it specializes in a task or tone. Increasingly less common for product work now that in-context methods (below) do a lot of the same job more cheaply. |
| **Embeddings** | Turning text into a list of numbers (a vector) that captures its meaning, so "semantically similar" text ends up numerically close. This is the math underneath search and RAG. |
| **RAG (Retrieval-Augmented Generation)** | Instead of relying only on what a model memorized during training, you retrieve relevant documents at query time and hand them to the model as context. Covered in depth in Part 2.1. |
| **Hallucination** | A model stating something false with the same confidence as something true. Not a bug you patch once, but a standing property of how these models generate text, which is why guardrails and retrieval exist. |
| **Agent** | A model that doesn't just answer: it takes actions (calling tools, running code, querying a database) and decides what to do next based on the result, in a loop. Covered in Part 2.2. |
| **Orchestration** | The layer that manages multiple steps, tools, or agents working together, deciding sequencing, retries, and handoffs, so the "thinking" and the "coordinating" aren't the same piece of code. |
| **MCP (Model Context Protocol)** | An open standard, introduced by Anthropic in late 2024, for connecting an AI model to external tools and data sources through one consistent interface instead of a custom integration per tool. Covered in Part 2.3. |
| **Multimodal** | A model that can take in or produce more than just text: images, audio, video. |
| **Chain-of-thought** | Prompting or training a model to reason through intermediate steps before answering, rather than jumping straight to a conclusion. Improves accuracy on anything that benefits from working shown. |
| **Few-shot prompting** | Giving the model a small number of worked examples in the prompt itself, instead of relying purely on instructions. Often more reliable than describing what you want in the abstract. |
| **RLHF (Reinforcement Learning from Human Feedback)** | A training step where human preferences (which of two answers is better) are used to steer the model toward more helpful, less harmful outputs. Part of why modern models feel less robotic than raw next-token predictors. |
| **Guardrails** | Explicit constraints, in the prompt, the system, or a separate checking layer, that stop a model from doing something it technically could do but shouldn't in this product context. |
| **Vector database** | A database built to store embeddings and search by semantic similarity instead of exact keyword match. The retrieval half of RAG runs on top of one. |

### 1.2 The tool landscape, by use case

Nobody needs all of these, but knowing what each category is actually good for stops you from using a hammer on a screw. This reflects the landscape as of mid-2026; this space moves fast enough that it's worth re-checking every few months rather than trusting a static list.

| Use case | What I reach for | Why |
|---|---|---|
| **General assistant / writing / analysis** | Claude, ChatGPT | Claude for long-form writing, document analysis, and anything where reasoning quality on a messy real-world input matters more than speed. ChatGPT for breadth and multimodal range (text, image, voice) in one place. |
| **Coding** | Claude Code, Cursor | Claude Code for repository-aware, multi-file, terminal-native work. Cursor for an AI-native IDE experience when I want the editor itself to be AI-first. |
| **Real-time research / fact-checking** | Perplexity | Built around live search with citations by default, which matters when the answer needs to be checked, not just plausible. |
| **Document Q&A over my own material** | NotebookLM | Answers strictly from a set of documents you feed it, rather than blending in outside training knowledge. Useful specifically when you want the answer grounded in *your* material, not the model's general memory. |
| **Automation / connecting tools without writing a backend** | n8n | A visual workflow builder that's picked up AI-agent nodes and native MCP support, so it sits well for automations that are one step inside a bigger business process rather than a standalone agent. |
| **Image generation** | Midjourney, GPT Image | Midjourney for stylized, art-directed output. GPT/DALL·E-family tools for fast iteration and text-in-image accuracy. |
| **Voice / TTS** | ElevenLabs | The default for realistic voice generation and voice agents at this point. |
| **Knowledge work agent (multi-step tasks across tools)** | Claude Cowork | For handing off heavier, multi-step tasks (research, drafting, coordinating across files) rather than a single back-and-forth chat. |

A pattern worth naming: **the winning setup for most people isn't one tool that does everything, it's one primary assistant plus one or two specialists**, with a clear point where you hand off from one to the other. Trying to force a single tool to cover writing, coding, image work, and automation usually means you're paying for capability you don't use in three of the four categories.

---

## Part 2: AI workflow designs

This is the part that used to be a black box to me and now is where I spend most of my actual tinkering time: how these tools are wired together underneath the chat window.

### 2.1 How RAG actually works

The core problem RAG solves: a model's training data has a cutoff, and even within that cutoff, it doesn't "know" your private documents, your company's internal wiki, or anything that happened after training. Fine-tuning is one way to fix that, but it's expensive, slow to update, and overkill if all you need is for the model to reference a specific set of documents accurately.

RAG does something simpler: at query time, it retrieves the most relevant chunks of your own documents and hands them to the model as context, alongside the question. The model then answers from what it was just given, instead of only from what it memorized during training.

The steps, in order:

1. **Ingestion (done once, upfront):** source documents get broken into chunks and converted into embeddings, stored in a vector database.
2. **Query:** a user question also gets converted into an embedding.
3. **Retrieval:** the vector database finds the stored chunks whose embeddings are closest in meaning to the query. Not keyword matching, semantic matching.
4. **Generation:** the retrieved chunks get handed to the LLM alongside the original question, and the model generates an answer grounded in that specific context.

The practical upside is real: answers can cite your actual source material, stay current without retraining the model, and are far less likely to hallucinate specifics that were never in the source documents in the first place. The practical failure mode is just as real: retrieval quality is the whole game. A great model with weak retrieval will confidently answer from the wrong three chunks of a document. The failure looks like a "hallucination," but the actual bug is usually upstream, in how the documents were chunked or how the query was embedded.

### 2.2 Orchestration and agents

A single model call answers a single question. An **agent** does something different: it reasons about what to do, takes an action (a tool call), observes the result, and decides what to do next, in a loop, until it either has enough to answer or hits a limit.

**Orchestration** is the layer that manages this when it's more than one agent, or one agent with many tools: sequencing steps, handling retries, deciding when a human needs to approve something before it goes further. As of 2026, the honest way to think about the orchestration framework landscape is by who's actually writing the logic:

| Framework | Best fit | Tradeoff |
|---|---|---|
| **LangChain / LangGraph** | Engineers who want broad tool integrations and fine-grained control over multi-agent state | Steeper learning curve; you're writing real code, not describing roles |
| **CrewAI** | Teams that want to describe agents in plain terms (a role, a goal, a set of tools) and get a working multi-agent "crew" fast | Gentle on-ramp, less low-level control than LangGraph once things get complex |
| **AutoGen (now folded into Microsoft's Agent Framework)** | Conversational, message-driven multi-agent patterns | AutoGen itself is in maintenance mode as of 2026; new work is migrating to Microsoft's successor framework |
| **n8n** | Ops teams already running business workflows, who want an agent as one node inside a bigger automation, not a standalone system | Fast to ship, but gets brittle once the agent logic itself gets deeply nested |
| **LlamaIndex** | RAG-heavy products where retrieval quality is the main engineering problem | More specialized than general-purpose; less suited to broad multi-tool agent work |

None of these frameworks are a magic fix for reliability. Every comparison worth trusting says the same thing in different words: pick based on who maintains it six months from now, and pair whatever you choose with real observability (logging what the agent actually did, not just what it was told to do), because agents fail silently far more often than they fail loudly.

### 2.3 MCP: the connective tissue

Before MCP, connecting a model to an external tool meant a custom integration for every model-tool pairing, what Anthropic described as the "M×N problem": M models times N tools equals a combinatorial mess of one-off connectors, each with its own quirks. The **Model Context Protocol**, which Anthropic introduced as an open standard in late 2024, solves this by giving models a single, consistent way to discover and call tools. One integration works across any MCP-compliant client, instead of one integration per model.

By 2026 this has become fairly standard infrastructure rather than a novelty: MCP was donated to a Linux Foundation-backed body co-founded by Anthropic, Block, and OpenAI, with Google, Microsoft, AWS, and Cloudflare also involved, and adoption has scaled well past the point of being an Anthropic-only concern. The protocol itself is still evolving quickly. A significant statelessness-focused revision was finalized in mid-2026 to handle enterprise-scale, multi-client usage better than the original design, which was built more for individual developer machines.

The plain-language version: MCP is what lets an agent say "check my calendar" or "look up this record in the CRM" without someone having written a bespoke connector for that exact combination of model and tool. It's plumbing, not a feature, which is exactly why it matters more than it sounds like it should.

### 2.4 Case study: bridging WhatsApp into Claude

This is the example I mentioned in Part 0: a practical, hands-on walkthrough from a mentor at Clear, on connecting WhatsApp to Claude so conversations there become something Claude can actually work with. I'm summarizing the concept here rather than reproducing the guide itself; the full step-by-step is linked below and is worth reading directly if you want to set it up.

**The core idea:** Claude has no direct access to WhatsApp; there's no official integration for that. The workaround is a small open-source bridge program that runs locally on your own machine. It logs into WhatsApp the same way WhatsApp Web does, keeps a local copy of your messages in a database that never leaves your computer, and exposes that data to Claude through a local connector. Claude never touches WhatsApp's servers directly. It only ever talks to the local bridge layer sitting on your machine.

At a high level, setting it up involves installing a small set of free command-line tools, cloning the open-source bridge project, running it once to scan a QR code with your phone (the same motion as logging into WhatsApp Web), and then pointing an MCP-compatible Claude client at the running bridge. From there, Claude can read and act on WhatsApp conversations as if it had been handed a structured mailbox rather than a chat app.

Two practical caveats worth knowing before setting this up:

- The bridge needs the host machine to stay awake. A sleep-prevention tool (like Amphetamine on Mac, or Caffeine / PowerToys Awake on Windows) is part of the real setup, not optional.
- WhatsApp logs the session out roughly every 20 days, which just means re-scanning the QR code, not a full reinstall.

This is a good small example of orchestration in practice: a local tool exposing a data source through a standard connector layer, rather than a purpose-built integration. It's the same shape as the RAG and agent patterns above, just running on a laptop instead of enterprise infrastructure.

**Full guide, with every command spelled out for both Mac and Windows:** [WhatsApp → Claude, the jugaad way](https://sagaofthakar.substack.com/p/whatsapp-claude-jugaad)

---

## Part 3: How this actually shows up in my product work

None of this stays theoretical for long. The RAG pattern in 2.1 is close to how Medoc's Monarcs tool grounds its answers in an actual lab report instead of guessing; the agent-and-tool pattern in 2.2 is the same shape I use daily just working with Claude across code, documents, and research. The workbook framing is deliberate: this isn't a finished essay because the stack underneath it isn't finished either. I'll keep updating this as the tools, and my understanding of them, change.
