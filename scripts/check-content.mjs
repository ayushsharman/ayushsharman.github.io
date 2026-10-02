import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

// Strings that must never ship: client names and private contact details.
const BANNED = ['trident', '7888559896', '141115', 'ashsharman123'];

const RULES = [
  { rule: 'em-dash', re: /—/ },
  { rule: 'en-dash', re: /–/ },
  { rule: 'emoji', re: /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u },
];

export function findViolations(file, text) {
  const out = [];
  text.split('\n').forEach((line, i) => {
    for (const { rule, re } of RULES) if (re.test(line)) out.push({ file, line: i + 1, rule });
    const lower = line.toLowerCase();
    for (const b of BANNED) if (lower.includes(b)) out.push({ file, line: i + 1, rule: 'banned', match: b });
  });
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const files = execSync('git ls-files --cached --others --exclude-standard src public scripts README.md astro.config.mjs', { encoding: 'utf8' })
    .split('\n')
    .filter((f) => /\.(astro|ts|mjs|md|css|json|svg)$/.test(f) && f !== 'scripts/check-content.mjs');
  const all = files.flatMap((f) => findViolations(f, readFileSync(f, 'utf8')));
  for (const v of all) console.error(`${v.file}:${v.line} ${v.rule}${v.match ? ` (${v.match})` : ''}`);
  if (all.length) { console.error(`content gate: ${all.length} violation(s)`); process.exit(1); }
  console.log('content gate: clean');
}
