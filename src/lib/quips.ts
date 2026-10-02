// What a private project says when someone clicks it. Clicks one and two get random lines from the
// pool (never the same twice), click three always offers the way in, and click four takes it.
export const ASK_NICELY = 'ok fine. ask me nicely →';

export const PRIVATE_QUIPS = [
  "naa, can't show you that.",
  'still private. nice try.',
  'persistent. i respect it.',
  'this repo is in witness protection.',
  '403. but make it personal.',
  'the code is shy. buy it a coffee first.',
  'the nda says no. i say no. we agree.',
  "you'd need a badge for that.",
  'git clone? git outta here.',
];

export function quipFor(click: number, previous: string | null, random: () => number = Math.random): string {
  if (click >= 3) return ASK_NICELY;
  const pool = PRIVATE_QUIPS.filter((q) => q !== previous);
  return pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))];
}
