export type WorkEntry = { n: string; slug: string; title: string; line: string; trace: string[]; org: 'clear' | 'medoc'; year: string; game?: 'reconcile' };

export const work: WorkEntry[] = [
  {
    n: '01', slug: 'reconciliation-agent', title: 'The reconciliation agent', org: 'clear', year: '2026', game: 'reconcile',
    line: 'Statements and books in. The mismatches a finance head must decide on, out. Nobody ticks boxes anymore.',
    trace: ['ok ingest statements', 'ok read the books', 'ok match and explain', '! decisions for a human'],
  },
  {
    n: '02', slug: 'morning-agents', title: 'Agents that never sleep', org: 'clear', year: '2026',
    line: 'They read the ERP before anyone logs in, put the risky items first, ask a person only what the data cannot answer, and remember every answer.',
    trace: ['ok look', 'ok name the work', '? ask', 'ok learn'],
  },
  {
    n: '03', slug: 'first-repo-to-10l-mrr', title: 'From first repo to ₹10L MRR', org: 'medoc', year: '2022 to 2026',
    line: 'Four years building a healthcare company from day one: 2 pilot clinics to 20+ hospitals, 5 people to 50, ₹0 to ₹10L+ a month.',
    trace: ['founding member', 'product head', 'cto', 'director'],
  },
  {
    n: '04', slug: 'busy-is-not-a-metric', title: 'Busy is not a metric', org: 'medoc', year: '2025',
    line: 'The operating system behind the growth: go-live from 30 days to 15, support tickets from 30+ to 4, and why if everything is P0, nothing is P0.',
    trace: ['escalation', 'root cause', 'system', 'scale'],
  },
];

export const howIWork = [
  { claim: "I've owned the P&L, not just the roadmap.", proof: 'Took a company from ₹0 to ₹10L+ a month. I build for the number the business is judged on.' },
  { claim: 'I build agents that decide, not dashboards that wait.', proof: 'A dashboard shows you the problem. My agents hand you the decision, ready to sign off.' },
  { claim: 'I go where the work is.', proof: 'Hospital floors, finance inboxes, the 9am standup. I learn the workflow better than the software does.' },
  { claim: 'I ship in days and stay for the result.', proof: 'Prototype this week, live next week, still accountable six months later.' },
];

// Both repositories are private, so these are described, not linked.
export const alsoBuilt = [
  {
    name: 'Deal Diary',
    line: 'One CRM seat, a whole team. Ask in Slack, and an agent does the work in the CRM and replies in the thread.',
    tags: ['slack', 'claude code', 'mcp', 'crm'],
  },
  {
    name: 'Remote Work HQ',
    line: 'My own workspace: kanban, money, notes and a focus timer, with an AI that turns a brain-dump into tasks.',
    tags: ['react', 'node', 'mongodb', 'gemini'],
  },
];

export const writingList = [
  { n: '01', slug: 'why-i-build-agents', title: 'Why I build agents', angle: 'Software that does the work and asks only for judgment.' },
  { n: '02', slug: 'kill-the-interface', title: 'Kill the interface', angle: 'AI is a new interaction model, not a feature.' },
  { n: '03', slug: 'prompt-engineering-iceberg', title: 'Prompt engineering is an iceberg', angle: 'The five layers under the visible prompt.' },
  { n: '04', slug: 'ai-workbook', title: 'AI workbook: concepts and workflow designs', angle: 'A running log, from early takes to RAG pipelines.' },
  { n: '05', slug: 'everything-is-p0', title: 'If everything is P0, nothing is P0', angle: 'Prioritisation is a measurement problem.' },
  { n: '06', slug: 'jobs-to-be-done', title: 'Jobs to be done, the most underrated lens', angle: 'Think from the job, not the feature.' },
];

export const links = {
  email: 'ayush.sharma.ops@gmail.com',
  calendar: 'https://calendar.app.google/fFx5NHCXzN3q1yew8',
  linkedin: 'https://www.linkedin.com/in/ayush-sharman/',
  github: 'https://github.com/ayushsharman',
  youtube: 'https://www.youtube.com/@analyticalayush',
  instagram: 'https://www.instagram.com/analyticalayush/',
  notionArchive: 'https://fossil-capybara-4ed.notion.site/Product-Management-Portfolio-3a1895b11a428066807fc74ca7c68e80',
};

// One-line role descriptions are drafts for the owner to confirm.
export const timeline = [
  { role: 'Founding Forward Deployed Engineer', org: 'Clear', when: 'Aug 2026 to now', line: 'Building agents that read enterprise finance data and hand decisions to the people who make them.' },
  { role: 'Director, Technical Operations', org: 'Medoc Health', when: 'Aug 2025 to Aug 2026', line: 'Ran product, engineering and operations as the company grew to 20+ hospitals and 50 people.' },
  { role: 'CTO', org: 'Medoc Health', when: '2024 to 2025', line: 'Owned the platform and the team behind it, and cut go-live from 30 days to 15.' },
  { role: 'Product Head, DocAssist', org: 'Medoc Health', when: '2023 to 2024', line: 'Took the clinical product from pilot clinics to a 100-bed hospital floor.' },
  { role: 'Founding Member', org: 'Medoc Health', when: '2022 to 2023', line: 'Wrote the first repo, nights and weekends, before there was anything to sell.' },
  { role: 'B.E. Computer Science', org: 'Chandigarh University', when: '2021 to 2025', line: 'Engineering, alongside building a company.' },
];

export const achievements = [
  'Smart India Hackathon internal winner, 2022',
  'GirlScript Summer of Code mentor, 2024',
  'Author of three books',
  'Speaker at 12+ workshops',
  '750+ algorithm and data structure problems solved',
  'Lead coordinator: IICC 2022, Google DevFest 2022, Tekathon 2023, Hack-The-Fest 2022, Hackshield 2022',
];

export const skills = ['Agents and orchestration', 'Tool calling', 'Enterprise data and ERP', 'TypeScript', 'Python', 'SQL'];
