import { describe, it, expect } from 'vitest';
import { work, howIWork, writingList, links, timeline, alsoBuilt } from '../src/content/site';

describe('site content', () => {
  it('has two Clear and two Medoc work entries, Clear first', () => {
    expect(work.map((w) => w.org)).toEqual(['clear', 'clear', 'medoc', 'medoc']);
  });
  it('Clear entry lines carry no digits (no Clear numbers rule; "9am" in a title is a time, not a metric)', () => {
    for (const w of work.filter((x) => x.org === 'clear')) expect(/\d/.test(w.line)).toBe(false);
  });
  it('has four how-I-work claims and six writing pieces', () => {
    expect(howIWork).toHaveLength(4);
    expect(writingList).toHaveLength(6);
  });
  it('uses the agreed email', () => expect(links.email).toBe('ayush.sharma.ops@gmail.com'));
  it('keeps every contact option from the old site, calendar included', () => {
    expect(Object.keys(links)).toEqual(expect.arrayContaining(['email', 'calendar', 'linkedin', 'github', 'instagram', 'youtube']));
    expect(links.calendar).toBe('https://calendar.app.google/fFx5NHCXzN3q1yew8');
  });
  it('timeline is newest first and starts with Clear', () => {
    expect(timeline[0].org).toBe('Clear');
    expect(timeline.at(-1)!.role).toMatch(/B\.E\./);
  });
  it('also-built projects read as two different things, each with its own stack tags', () => {
    expect(alsoBuilt).toHaveLength(2);
    expect(new Set(alsoBuilt.map((a) => a.line)).size).toBe(2);
    for (const a of alsoBuilt) expect(a.tags.length).toBeGreaterThanOrEqual(3);
    expect(alsoBuilt[0].tags).not.toEqual(alsoBuilt[1].tags);
  });
  it('never links a private repository (both repos return 404 to visitors)', () => {
    for (const a of alsoBuilt) expect('href' in a).toBe(false);
  });
});
