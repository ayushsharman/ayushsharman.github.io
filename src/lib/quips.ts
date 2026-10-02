// What a private project says when someone clicks it, escalating with each click.
export const PRIVATE_QUIPS = [
  "naa, can't show you that.",
  'still private. nice try.',
  'persistent. i respect it.',
  'ok fine. ask me nicely →',
];

export const privateQuip = (clicks: number): string =>
  PRIVATE_QUIPS[Math.min(Math.max(clicks, 1), PRIVATE_QUIPS.length) - 1];
