export type Outcome = {
  probability: number;
  payout: number;
  label?: string;
};

export function expectedValue(outcomes: Outcome[]): number {
  return outcomes.reduce((acc, o) => acc + o.probability * o.payout, 0);
}

export function variance(outcomes: Outcome[]): number {
  const ev = expectedValue(outcomes);
  return outcomes.reduce(
    (acc, o) => acc + o.probability * (o.payout - ev) ** 2,
    0,
  );
}

export function stddev(outcomes: Outcome[]): number {
  return Math.sqrt(variance(outcomes));
}

export function houseEdge(outcomes: Outcome[], bet = 1): number {
  return -expectedValue(outcomes) / bet;
}

export function rtp(outcomes: Outcome[], bet = 1): number {
  return (expectedValue(outcomes) + bet) / bet;
}

export function hitFrequency(outcomes: Outcome[]): number {
  return outcomes
    .filter((o) => o.payout > 0)
    .reduce((acc, o) => acc + o.probability, 0);
}

export function expectedLossAfterSpins(
  bet: number,
  houseEdgeValue: number,
  spins: number,
): number {
  return bet * houseEdgeValue * spins;
}

export function kellyFraction(p: number, b: number): number {
  return (b * p - (1 - p)) / b;
}

export function fractionalKelly(p: number, b: number, fraction = 0.5): number {
  return Math.max(0, kellyFraction(p, b) * fraction);
}

export function vigToImpliedProbabilities(odds: number[]): number[] {
  const raw = odds.map((o) => 1 / o);
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((r) => r / sum);
}

export function overround(odds: number[]): number {
  return odds.map((o) => 1 / o).reduce((a, b) => a + b, 0) - 1;
}

export function combinations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k);
  let c = 1;
  for (let i = 0; i < k; i++) {
    c = (c * (n - i)) / (i + 1);
  }
  return c;
}

export function binomialPMF(n: number, k: number, p: number): number {
  return combinations(n, k) * p ** k * (1 - p) ** (n - k);
}

export function normalCDF(x: number, mean = 0, sd = 1): number {
  const z = (x - mean) / (sd * Math.SQRT2);
  return 0.5 * (1 + erf(z));
}

export function erf(x: number): number {
  const sign = Math.sign(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const ax = Math.abs(x);
  const t = 1.0 / (1.0 + p * ax);
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return sign * y;
}
