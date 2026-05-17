"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { seededRandom } from "@/lib/utils";

type Profile = {
  id: string;
  name: string;
  he: number;
  outcomes: { p: number; x: number }[];
  color: string;
};

const profiles: Profile[] = [
  {
    id: "low",
    name: "Низкая · 50/50 ±1",
    he: 0.02,
    outcomes: [
      { p: 0.49, x: 1 },
      { p: 0.51, x: -1 },
    ],
    color: "#34d399",
  },
  {
    id: "mid",
    name: "Средняя · рулетка",
    he: 0.027,
    outcomes: [
      { p: 18 / 37, x: 1 },
      { p: 19 / 37, x: -1 },
    ],
    color: "#d4af37",
  },
  {
    id: "high",
    name: "Высокая · слот",
    he: 0.035,
    outcomes: [
      { p: 0.0008, x: 250 },
      { p: 0.005, x: 50 },
      { p: 0.06, x: 5 },
      { p: 0.18, x: 1 },
      { p: 0.7542, x: -1 },
    ],
    color: "#f43f5e",
  },
];

function simulate(profile: Profile, n: number, seed: number) {
  const rnd = seededRandom(seed);
  const cdf: number[] = [];
  let acc = 0;
  for (const o of profile.outcomes) {
    acc += o.p;
    cdf.push(acc);
  }
  const results: number[] = [];
  for (let i = 0; i < n; i++) {
    const r = rnd();
    let idx = 0;
    while (idx < cdf.length - 1 && r > cdf[idx]) idx++;
    results.push(profile.outcomes[idx].x);
  }
  return results;
}

function histogram(values: number[], bins: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const buckets = new Array(bins).fill(0);
  values.forEach((v) => {
    const i = Math.min(bins - 1, Math.floor(((v - min) / range) * bins));
    buckets[i] += 1;
  });
  return { buckets, min, max };
}

export function VarianceCanvas() {
  const [n, setN] = useState(2000);
  const [seed, setSeed] = useState(7);

  const sims = useMemo(() => {
    return profiles.map((p) => {
      const values = simulate(p, n, seed + profiles.indexOf(p) * 991);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const variance =
        values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
      const hist = histogram(values, 28);
      return { profile: p, values, mean, sigma: Math.sqrt(variance), hist };
    });
  }, [n, seed]);

  const maxBucket = Math.max(...sims.flatMap((s) => s.hist.buckets));

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-end gap-6">
          <Knob label="Размер выборки" value={n.toLocaleString("ru-RU")} min={500} max={20000} step={100} current={n} onChange={setN} />
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-ink-2 hover:text-ink"
          >
            Перегенерировать
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {sims.map((s) => (
            <motion.div
              key={s.profile.id}
              layout
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
            >
              <div className="flex items-baseline justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">
                    Профиль
                  </div>
                  <div className="font-display text-lg tracking-tight">{s.profile.name}</div>
                </div>
                <div className="font-mono text-xs text-ink-3">σ = {s.sigma.toFixed(3)}</div>
              </div>
              <div className="mt-5 grid grid-cols-12 items-end gap-[2px] h-32">
                {s.hist.buckets.map((b, i) => (
                  <motion.div
                    key={i}
                    layout
                    className="col-span-1 rounded-sm"
                    style={{
                      height: `${(b / maxBucket) * 100}%`,
                      background: `linear-gradient(180deg, ${s.profile.color}aa, ${s.profile.color}33)`,
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.01 }}
                  />
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">Среднее</div>
                  <div className="font-mono text-base text-ink">{s.mean.toFixed(3)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">HE</div>
                  <div className="font-mono text-base text-ink">
                    {(s.profile.he * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function Knob({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="min-w-[260px]">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-ink-3">{label}</span>
        <span className="font-mono text-xs text-ink">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--color-gold)]"
      />
    </div>
  );
}
