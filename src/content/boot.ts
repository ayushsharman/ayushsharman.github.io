import type { BootLine } from '../lib/boot';

// "[2021] booting engineer ........ value" : label, a space, dots to a fixed column, the value.
const row = (year: string, label: string, value: string) =>
  `[${year}] ${`${label} `.padEnd(25, '.')} ${value.padEnd(48, ' ')}`;

export const bootLines: BootLine[] = [
  { text: '$ claude --mode=ayush --dangerously-skip-sleep\n\n', tone: 'plain' },
  { text: row('2021', 'booting engineer', 'b.e. computer science, chandigarh university'), status: 'ok', tone: 'ok' },
  { text: row('2022', 'side quests', 'hackathon win, 3 books published, 12+ workshops'), status: 'ok', tone: 'ok' },
  { text: row('2022', 'founded', 'medoc health, founding member'), status: 'ok', tone: 'ok' },
  { text: row('2023', 'promoted', 'product head, docassist'), status: 'ok', tone: 'ok' },
  { text: row('2024', 'promoted again', 'cto'), status: 'ok', tone: 'ok' },
  { text: row('2025', 'new hat', 'director, technical operations'), status: 'ok', tone: 'ok' },
  { text: row('2026', 'exit', 'left medoc after four years'), status: 'ok', tone: 'ok' },
  { text: row('2026', 'current build', 'founding fde @ clear'), status: 'running', tone: 'run' },
  { text: row(' -- ', 'side process', 'analytical ayush, 11.1K subscribers'), status: 'always on', tone: 'warn' },
  { text: '\nhumour ......................... dry, as expected\n', tone: 'plain' },
  { text: 'talking speed .................. low. output: high\n\n', tone: 'plain' },
  { text: "hi. i'm ayush.", tone: 'plain' },
];
