import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { work, writingList } from '../src/content/site';

const front = (p: string) => readFileSync(p, 'utf8').split('---')[1] ?? '';

describe('collections match the home page lists', () => {
  it.each(work.map((w) => w.slug))('work/%s.md exists', (s) => expect(existsSync(`src/content/work/${s}.md`)).toBe(true));
  it.each(writingList.map((w) => w.slug))('writing/%s.md exists', (s) => expect(existsSync(`src/content/writing/${s}.md`)).toBe(true));
  it.each(work.filter((w) => w.org === 'clear').map((w) => w.slug))('Clear case study %s has no digits in its body (no Clear numbers)', (s) => {
    const body = readFileSync(`src/content/work/${s}.md`, 'utf8').split('---').slice(2).join('---');
    expect(body.replace(/9am|09:00/g, '').match(/\d/g)).toBeNull();
  });
  it.each(work.map((w) => w.slug))('work/%s.md frontmatter org matches the home list', (s) => {
    expect(front(`src/content/work/${s}.md`)).toContain(`org: ${work.find((w) => w.slug === s)!.org}`);
  });
});
