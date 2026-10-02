import { describe, it, expect } from 'vitest';
import { shouldPlayBoot, renderBoot, BOOT_KEY, type BootLine } from '../src/lib/boot';
import { bootLines } from '../src/content/boot';

const mem = (v: string | null) => ({ get: () => v, set: () => {} });
const L: BootLine[] = [{ text: 'ab', status: 'ok', tone: 'ok' }, { text: 'cd', tone: 'plain' }];

describe('shouldPlayBoot', () => {
  it('plays on first visit', () => expect(shouldPlayBoot(mem(null), false)).toBe(true));
  it('skips once seen', () => expect(shouldPlayBoot(mem('1'), false)).toBe(false));
  it('never plays under reduced motion', () => expect(shouldPlayBoot(mem(null), true)).toBe(false));
  it('uses a versioned key', () => expect(BOOT_KEY).toBe('boot-seen-v1'));
});

describe('renderBoot', () => {
  it('types characters in order and adds the status after a line completes', () => {
    expect(renderBoot(L, 1)).toBe('a');
    expect(renderBoot(L, 2)).toBe('ab <span class="s ok">ok</span>\n');
    expect(renderBoot(L, 3)).toBe('ab <span class="s ok">ok</span>\nc');
  });
  it('escapes HTML in script text', () => {
    expect(renderBoot([{ text: '<b>', tone: 'plain' }], 3)).toBe('&lt;b&gt;');
  });
  it('stops at the end of the script', () => {
    expect(renderBoot(L, 999)).toBe(renderBoot(L, 4));
  });
});

describe('boot script', () => {
  it('aligns every year row to the same column', () => {
    const rows = bootLines.filter((l) => l.text.startsWith('['));
    const cols = rows.map((l) => l.text.indexOf('.. ') + 3);
    expect(new Set(cols).size).toBe(1);
    expect(rows[0].text).toContain('[2021] booting engineer ....');
  });
  it('ends on the greeting', () => expect(bootLines.at(-1)!.text).toBe("hi. i'm ayush."));
});

describe('deep links skip the boot', () => {
  it('a ?watch link does not play the intro over the simulation', async () => {
    const { startBoot } = await import('../src/lib/boot');
    window.matchMedia = (() => ({ matches: false })) as never;
    localStorage.clear();
    history.replaceState(null, '', '/?watch=reconcile');
    document.body.innerHTML = '<div id="boot" hidden><pre data-boot-screen></pre><button data-boot-skip>skip</button></div>';
    const root = document.getElementById('boot')!;
    startBoot(root, [{ text: 'ab', tone: 'plain' }]);
    expect(root.hidden).toBe(true);
    history.replaceState(null, '', '/');
  });
});
