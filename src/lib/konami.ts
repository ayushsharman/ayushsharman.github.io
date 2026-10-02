const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const MODIFIERS = new Set(['Shift', 'Control', 'Alt', 'AltGraph', 'Meta', 'OS', 'Fn', 'FnLock', 'Hyper', 'Super', 'Symbol', 'SymbolLock', 'CapsLock', 'NumLock', 'ScrollLock']);

// Fed one key at a time. Uses the longest prefix of the code that still matches, so a repeated
// first key ("up up up down ...") keeps the run alive.
export function createKonami(onHit: () => void) {
  let typed: string[] = [];
  return (key: string): boolean => {
    if (MODIFIERS.has(key)) return false; // holding Shift for a capital B must not break the run
    typed.push(key.length === 1 ? key.toLowerCase() : key);
    while (typed.length && typed.some((k, i) => k !== CODE[i])) typed.shift();
    if (typed.length === CODE.length) { typed = []; onHit(); return true; }
    return false;
  };
}
