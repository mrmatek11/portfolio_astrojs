// Efekt "dekodowania" tekstu: litery losują się i kolejno układają w docelowy napis.
// Oparty o czas, nie o liczbę klatek — trwa tyle samo przy 30 i 144 Hz.
const CHARS = 'ABCDEFGHIJKLMNOPRSTUWXYZ0123456789/\\-_=+*#';
const running = new WeakMap<HTMLElement, number>();

export function scramble(el: HTMLElement, target = el.dataset.text || el.textContent || '', duration = 700) {
  cancelAnimationFrame(running.get(el) || 0);
  // Docelowy tekst zapamiętany na elemencie — kolejne wywołania nie złapią "szumu".
  el.dataset.text = target;
  const len = target.length;
  // Każda litera "zatrzaskuje się" w innym momencie — od lewej, z lekkim rozrzutem.
  const lockAt = Array.from({ length: len }, (_, k) => (k / len) * 0.75 + Math.random() * 0.25);
  const t0 = performance.now();
  el.setAttribute('aria-label', target);
  const step = (now: number) => {
    const p = (now - t0) / duration;
    if (p >= 1) {
      el.textContent = target;
      el.removeAttribute('aria-label');
      return;
    }
    let out = '';
    for (let k = 0; k < len; k++) {
      const ch = target[k];
      out += ch === ' ' || p >= lockAt[k] ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = out;
    running.set(el, requestAnimationFrame(step));
  };
  running.set(el, requestAnimationFrame(step));
}
