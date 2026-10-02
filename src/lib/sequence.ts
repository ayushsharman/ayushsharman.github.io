const MODIFIERS = new Set(['Shift', 'Control', 'Alt', 'AltGraph', 'Meta', 'OS', 'Fn', 'FnLock', 'Hyper', 'Super', 'Symbol', 'SymbolLock', 'CapsLock', 'NumLock', 'ScrollLock']);

// Fires when `code` is typed, fed one KeyboardEvent.key at a time. Letters are compared ignoring case,
// modifier keys are skipped, and the longest prefix that still matches is kept, so a false start
// ("clclaude") does not lose the run.
export function createSequence(code: string[], onHit: () => void) {
  const want = code.map((k) => (k.length === 1 ? k.toLowerCase() : k));
  let typed: string[] = [];
  return (key: string): boolean => {
    if (MODIFIERS.has(key)) return false;
    typed.push(key.length === 1 ? key.toLowerCase() : key);
    while (typed.length && typed.some((k, i) => k !== want[i])) typed.shift();
    if (typed.length === want.length) { typed = []; onHit(); return true; }
    return false;
  };
}
