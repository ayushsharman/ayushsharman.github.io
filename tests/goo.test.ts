import { describe, it, expect, vi } from 'vitest';
import { createGoo } from '../src/lib/goo';

describe('createGoo', () => {
  it('places every blob at its resting spot on creation, so reduced motion shows it still in place', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as never;
    document.body.innerHTML = '<section id="s"><div id="g"></div></section>';
    const stage = document.getElementById('s')!;
    Object.defineProperty(stage, 'clientWidth', { value: 1000 });
    Object.defineProperty(stage, 'clientHeight', { value: 800 });
    createGoo(stage, document.getElementById('g')!);
    const blobs = [...document.querySelectorAll<HTMLElement>('.blob')];
    expect(blobs).toHaveLength(7);
    for (const b of blobs) expect(b.style.transform).toMatch(/^translate\(/);
    // the first blob (110px) centres on 62% / 48% of the stage
    expect(blobs[0].style.transform).toBe('translate(565px,329px)');
  });
});
