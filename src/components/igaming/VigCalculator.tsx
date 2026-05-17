"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { formatPercent } from "@/lib/utils";

type Outcome = { id: string; label: string; odds: number };

const PRESETS: { id: string; name: string; outcomes: Omit<Outcome, "id">[] }[] = [
  {
    id: "tennis",
    name: "Теннис (2-way)",
    outcomes: [
      { label: "Игрок A", odds: 1.85 },
      { label: "Игрок B", odds: 1.95 },
    ],
  },
  {
    id: "football",
    name: "Футбол (3-way)",
    outcomes: [
      { label: "Дома", odds: 2.1 },
      { label: "Ничья", odds: 3.4 },
      { label: "Гости", odds: 3.6 },
    ],
  },
  {
    id: "horse",
    name: "Скачки (6-way)",
    outcomes: [
      { label: "Whirlwind", odds: 2.5 },
      { label: "Onyx Drift", odds: 4.0 },
      { label: "Ferro", odds: 5.5 },
      { label: "Vesper", odds: 8.0 },
      { label: "Aria", odds: 12.0 },
      { label: "Coda", odds: 25.0 },
    ],
  },
];

let uid = 0;

export function VigCalculator() {
  const [outcomes, setOutcomes] = useState<Outcome[]>(
    PRESETS[1].outcomes.map((o) => ({ ...o, id: String(uid++) })),
  );

  const stats = useMemo(() => {
    const impl = outcomes.map((o) => 1 / o.odds);
    const overround = impl.reduce((a, b) => a + b, 0);
    const fair = impl.map((p) => p / overround);
    const fairOdds = fair.map((p) => 1 / p);
    return { impl, overround, fair, fairOdds, vig: 1 - 1 / overround };
  }, [outcomes]);

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() =>
                setOutcomes(p.outcomes.map((o) => ({ ...o, id: String(uid++) })))
              }
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-ink-2 hover:text-ink"
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={() =>
              setOutcomes((o) => [
                ...o,
                { id: String(uid++), label: `Исход ${o.length + 1}`, odds: 2.0 },
              ])
            }
            className="ml-auto rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/[0.05] px-3 py-1.5 text-xs text-[var(--color-gold-soft)]"
          >
            + Добавить исход
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-3">
            <div className="grid grid-cols-[1fr_120px_120px_36px] items-center gap-3 px-2 text-[10px] uppercase tracking-[0.22em] text-ink-4">
              <span>Исход</span>
              <span className="text-right">Коэф.</span>
              <span className="text-right">Справ.</span>
              <span />
            </div>
            {outcomes.map((o, i) => (
              <motion.div
                key={o.id}
                layout
                className="grid grid-cols-[1fr_120px_120px_36px] items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3"
              >
                <input
                  value={o.label}
                  onChange={(e) => {
                    const v = e.target.value;
                    setOutcomes((p) =>
                      p.map((x) => (x.id === o.id ? { ...x, label: v } : x)),
                    );
                  }}
                  className="bg-transparent text-sm text-ink outline-none"
                />
                <input
                  type="number"
                  min="1.01"
                  step="0.05"
                  value={o.odds}
                  onChange={(e) => {
                    const v = Math.max(1.01, Number(e.target.value) || 1.01);
                    setOutcomes((p) =>
                      p.map((x) => (x.id === o.id ? { ...x, odds: v } : x)),
                    );
                  }}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-right font-mono text-sm text-ink"
                />
                <div className="text-right font-mono text-sm text-[var(--color-emerald)]">
                  {stats.fairOdds[i].toFixed(2)}
                </div>
                <button
                  onClick={() =>
                    setOutcomes((p) => p.filter((x) => x.id !== o.id))
                  }
                  disabled={outcomes.length <= 2}
                  className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-ink-3 hover:text-ink disabled:opacity-30"
                >
                  ×
                </button>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-rose-500/25 bg-rose-500/[0.05] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-rose-300/85">
                Overround Ω
              </div>
              <div className="mt-1 font-mono text-3xl tracking-tight text-rose-100">
                {(stats.overround * 100).toFixed(2)}%
              </div>
              <p className="mt-2 text-xs text-rose-100/70 leading-relaxed">
                Σ имплицитных вероятностей. Сверх 100% — это маржа букмекера.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/[0.05] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-soft)]/80">
                Vig (комиссия с пары ставок)
              </div>
              <div className="mt-1 font-mono text-3xl tracking-tight text-[var(--color-gold-soft)]">
                {formatPercent(stats.vig, 2)}
              </div>
              <p className="mt-2 text-xs text-ink-3 leading-relaxed">
                Доля, которую букмекер удерживает при идеально сбалансированной книге.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-2">
                Восстановленная справедливая линия
              </div>
              <ul className="space-y-1 font-mono text-xs">
                {outcomes.map((o, i) => (
                  <li
                    key={o.id}
                    className="flex items-center justify-between text-ink-2"
                  >
                    <span>{o.label}</span>
                    <span className="text-[var(--color-emerald)]">
                      {formatPercent(stats.fair[i], 2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-2">
                Снятие vig (метод Шина / пропорциональный)
              </div>
              <Formula
                expression="p_i^{fair} = \\frac{1/d_i}{\\sum_j 1/d_j}"
                block
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
