"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";

// Risk of ruin formula for asymmetric gambler's ruin
// For an unfair game with probability p of winning, q=1-p, starting bankroll N units,
// goal +∞: RoR = (q/p)^N if p>q else 1
function ror(p: number, units: number): number {
  const q = 1 - p;
  if (p <= q) return 1;
  return Math.pow(q / p, units);
}

const SCENARIOS = [
  { name: "Coin flip 50/50", p: 0.5 },
  { name: "Edge +1% (p=0.505)", p: 0.505 },
  { name: "Edge +2% (p=0.51)", p: 0.51 },
  { name: "Edge +5% (p=0.525)", p: 0.525 },
  { name: "Edge +10% (p=0.55)", p: 0.55 },
];

const UNITS = [10, 25, 50, 100, 250, 500];

export function RiskOfRuinTable() {
  const matrix = useMemo(
    () =>
      SCENARIOS.map((s) => ({
        ...s,
        cells: UNITS.map((u) => ror(s.p, u)),
      })),
    [],
  );

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[560px] text-center text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.22em] text-ink-4">
                  <th className="py-3 text-left">Сценарий ↓ / Юниты →</th>
                  {UNITS.map((u) => (
                    <th key={u} className="py-3">
                      {u}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {matrix.map((row) => (
                  <tr key={row.name} className="border-t border-white/5">
                    <td className="py-3 text-left text-ink-2">{row.name}</td>
                    {row.cells.map((c, i) => {
                      const danger = c > 0.5;
                      const safe = c < 0.01;
                      return (
                        <td
                          key={i}
                          className={`py-3 ${
                            safe
                              ? "text-emerald-300"
                              : danger
                                ? "text-rose-300"
                                : "text-ink-2"
                          }`}
                        >
                          {(c * 100).toFixed(c < 0.001 ? 4 : 2)}%
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-2">
                Risk of ruin (равные ставки)
              </div>
              <Formula expression="R = \\left(\\tfrac{q}{p}\\right)^N" block />
              <p className="mt-3 text-xs text-ink-3 leading-relaxed">
                N — банкролл в единицах ставки. При <Formula expression="p \\le q" /> разорение
                почти наверняка.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-5">
              <p className="text-sm text-emerald-50/85 leading-relaxed">
                Главный вывод: даже при выраженном математическом преимуществе банкролл должен
                быть в десятки–сотни раз больше ставки, чтобы риск разорения был приемлем.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
