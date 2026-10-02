const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Fed one key at a time. Uses the longest prefix of the code that still matches, so a repeated
// first key ("up up up down ...") keeps the run alive.
export function createKonami(onHit: () => void) {
  let typed: string[] = [];
  return (key: string): boolean => {
    typed.push(key.length === 1 ? key.toLowerCase() : key);
    while (typed.length && typed.some((k, i) => k !== CODE[i])) typed.shift();
    if (typed.length === CODE.length) { typed = []; onHit(); return true; }
    return false;
  };
}
