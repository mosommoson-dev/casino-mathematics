"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { seededRandom, formatPercent } from "@/lib/utils";

type Row = { id: string; label: string; p: number; payout: number };

let uid = 0;
const make = (label: string, p: number, payout: number): Row => ({
  id: String(uid++),
  label,
  p,
  payout,
});

const presets: { name: string; rows: Omit<Row, "id">[] }[] = [
  {
    name: "Eur. рулетка · на красное",
    rows: [
      { label: "Win", p: 18 / 37, payout: 1 },
      { label: "Lose", p: 19 / 37, payout: -1 },
    ],
  },
  {
    name: "Слот (упрощённый)",
    rows: [
      { label: "Промах", p: 0.7, payout: -1 },
      { label: "Малый выигрыш", p: 0.2, payout: 2 },
      { label: "Средний", p: 0.08, payout: 8 },
      { label: "Большой", p: 0.018, payout: 40 },
      { label: "Джекпот", p: 0.002, payout: 500 },
    ],
  },
  {
    name: "Лотерея",
    rows: [
      { label: "Без выплат", p: 0.985, payout: -1 },
      { label: "Возврат", p: 0.01, payout: 0 },
      { label: "Малый приз", p: 0.005, payout: 100 },
    ],
  },
];

export function MonteCarloLab() {
  const [rows, setRows] = useState<Row[]>(() =>
    presets[1].rows.map((r) => make(r.label, r.p, r.payout)),
  );
  const [trials, setTrials] = useState(50000);
  const [seed, setSeed] = useState(31);

  const totalP = rows.reduce((a, b) => a + b.p, 0);
  const normalised = rows.map((r) => ({ ...r, p: r.p / Math.max(totalP, 1e-9) }));

  const analytic = useMemo(() => {
    const ev = normalised.reduce((s, r) => s + r.p * r.payout, 0);
    const ev2 = normalised.reduce((s, r) => s + r.p * r.payout * r.payout, 0);
    const variance = ev2 - ev * ev;
    return { ev, sigma: Math.sqrt(Math.max(0, variance)) };
  }, [normalised]);

  const empirical = useMemo(() => {
    const rnd = seededRandom(seed);
    let sum = 0;
    let sumSq = 0;
    let hits = 0;
    const buckets = new Array(rows.length).fill(0);
    for (let i = 0; i < trials; i++) {
      const u = rnd();
      let acc = 0;
      for (let j = 0; j < normalised.length; j++) {
        acc += normalised[j].p;
        if (u < acc) {
          sum += normalised[j].payout;
          sumSq += normalised[j].payout * normalised[j].payout;
          buckets[j] += 1;
          if (normalised[j].payout > 0) hits++;
          break;
        }
      }
    }
    const mean = sum / trials;
    const variance = sumSq / trials - mean * mean;
    return {
      mean,
      sigma: Math.sqrt(Math.max(0, variance)),
      hitFreq: hits / trials,
      buckets,
    };
  }, [normalised, rows.length, trials, seed]);

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => setRows(p.rows.map((r) => make(r.label, r.p, r.payout)))}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-ink-2 hover:text-ink"
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={() => setRows((r) => [...r, make(`Исход ${r.length + 1}`, 0.05, 5)])}
            className="ml-auto rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/[0.05] px-3 py-1.5 text-xs text-[var(--color-gold-soft)]"
          >
            + Исход
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_120px_100px_60px_36px] gap-2 px-2 text-[10px] uppercase tracking-[0.22em] text-ink-4">
              <span>Метка</span>
              <span className="text-right">p</span>
              <span className="text-right">Выплата</span>
              <span className="text-right">Эмп.</span>
              <span />
            </div>
            {rows.map((r, i) => (
              <motion.div
                key={r.id}
                layout
                className="grid grid-cols-[1fr_120px_100px_60px_36px] items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-2"
              >
                <input
                  value={r.label}
                  onChange={(e) =>
                    setRows((p) =>
                      p.map((x) => (x.id === r.id ? { ...x, label: e.target.value } : x)),
                    )
                  }
                  className="bg-transparent px-2 text-sm text-ink outline-none"
                />
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.001"
                  value={r.p}
                  onChange={(e) =>
                    setRows((p) =>
                      p.map((x) =>
                        x.id === r.id ? { ...x, p: Number(e.target.value) } : x,
                      ),
                    )
                  }
                  className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-right font-mono text-xs text-ink"
                />
                <input
                  type="number"
                  step="0.5"
                  value={r.payout}
                  onChange={(e) =>
                    setRows((p) =>
                      p.map((x) =>
                        x.id === r.id ? { ...x, payout: Number(e.target.value) } : x,
                      ),
                    )
                  }
                  className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-right font-mono text-xs text-ink"
                />
                <div className="text-right font-mono text-xs text-emerald-300">
                  {((empirical.buckets[i] / trials) * 100).toFixed(2)}%
                </div>
                <button
                  onClick={() => setRows((p) => p.filter((x) => x.id !== r.id))}
                  disabled={rows.length <= 2}
                  className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-ink-3 hover:text-ink disabled:opacity-30"
                >
                  ×
                </button>
              </motion.div>
            ))}
            <div className="mt-3 flex items-center justify-between text-[10px] text-ink-4">
              <span>Σ p = {totalP.toFixed(3)} {totalP.toFixed(3) !== "1.000" && "→ нормируется"}</span>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-3">
                Параметры симуляции
              </div>
              <Slider
                label="Испытаний"
                value={trials}
                min={1000}
                max={500000}
                step={1000}
                onChange={setTrials}
                format={(v) => v.toLocaleString("ru-RU")}
              />
              <button
                onClick={() => setSeed((s) => s + 1)}
                className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.02] py-2 text-xs text-ink-2 hover:text-ink"
              >
                Перезапустить · seed {seed}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Metric
                label="EV аналит."
                value={analytic.ev.toFixed(4)}
                tone={analytic.ev >= 0 ? "emerald" : "rose"}
              />
              <Metric
                label="EV эмпир."
                value={empirical.mean.toFixed(4)}
                tone={empirical.mean >= 0 ? "emerald" : "rose"}
              />
              <Metric label="σ аналит." value={analytic.sigma.toFixed(4)} />
              <Metric label="σ эмпир." value={empirical.sigma.toFixed(4)} />
              <Metric label="HE" value={formatPercent(-analytic.ev, 2)} tone="rose" />
              <Metric label="Hit freq" value={formatPercent(empirical.hitFreq, 2)} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between text-[10px] uppercase tracking-[0.22em] text-ink-4">
        <span>{label}</span>
        <span className="font-mono text-sm text-[var(--color-gold-soft)] normal-case tracking-normal">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--color-gold)]"
      />
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "emerald" | "rose";
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-3">
      <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">{label}</div>
      <div
        className={`mt-1 font-mono text-base tracking-tight ${
          tone === "emerald" ? "text-emerald-200" : tone === "rose" ? "text-rose-200" : "text-ink"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
