export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export function formatPercent(n: number, digits = 2) {
  return `${(n * 100).toFixed(digits)}%`;
}

export function formatNumber(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1000) {
    return n.toLocaleString("ru-RU", { maximumFractionDigits: digits });
  }
  return n.toFixed(digits);
}

export function formatCurrency(n: number, currency = "$") {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${sign}${currency}${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}${currency}${(abs / 1_000).toFixed(2)}k`;
  return `${sign}${currency}${abs.toFixed(2)}`;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function randomNormal(mean = 0, stddev = 1) {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * stddev;
}

export function seededRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}
