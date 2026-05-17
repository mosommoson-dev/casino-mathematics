"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";

const STRIP_DATA = [
  { sym: "★", name: "Wild", weight: 2, pay: { 3: 25, 4: 100, 5: 500 }, color: "#efd57a" },
  { sym: "◇", name: "Scatter", weight: 3, pay: { 3: 5, 4: 25, 5: 200 }, color: "#34d399" },
  { sym: "◆", name: "Diamond", weight: 6, pay: { 3: 15, 4: 50, 5: 200 }, color: "#a5b4fc" },
  { sym: "❖", name: "Ruby", weight: 8, pay: { 3: 8, 4: 30, 5: 120 }, color: "#f43f5e" },
  { sym: "♠", name: "Spade", weight: 14, pay: { 3: 4, 4: 12, 5: 40 }, color: "#cbd5e1" },
  { sym: "♥", name: "Heart", weight: 14, pay: { 3: 4, 4: 12, 5: 40 }, color: "#fb7185" },
  { sym: "♣", name: "Club", weight: 18, pay: { 3: 2, 4: 8, 5: 25 }, color: "#94a3b8" },
  { sym: "♦", name: "Diamond Lo", weight: 18, pay: { 3: 2, 4: 8, 5: 25 }, color: "#67e8f9" },
];

export function ParListExplorer() {
  const total = STRIP_DATA.reduce((a, b) => a + b.weight, 0);
  const enriched = useMemo(
    () =>
      STRIP_DATA.map((s) => ({
        ...s,
        p: s.weight / total,
        p5: (s.weight / total) ** 5,
      })),
    [total],
  );

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-white/8 text-left text-[10px] uppercase tracking-[0.22em] text-ink-4">
                  <th className="py-3">Символ</th>
                  <th className="py-3">Вес</th>
                  <th className="py-3 text-right">p</th>
                  <th className="py-3 text-right">×3</th>
                  <th className="py-3 text-right">×4</th>
                  <th className="py-3 text-right">×5</th>
                  <th className="py-3 text-right">p(5oak)</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {enriched.map((s) => (
                  <tr key={s.name} className="border-b border-white/5">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex size-7 items-center justify-center rounded-md text-lg"
                          style={{ color: s.color, background: `${s.color}1a` }}
                        >
                          {s.sym}
                        </span>
                        <span className="text-ink">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-ink-2">{s.weight}</td>
                    <td className="py-3 text-right text-ink-2">{(s.p * 100).toFixed(2)}%</td>
                    <td className="py-3 text-right text-ink-2">{s.pay[3]}</td>
                    <td className="py-3 text-right text-ink-2">{s.pay[4]}</td>
                    <td className="py-3 text-right text-ink-2">{s.pay[5]}</td>
                    <td className="py-3 text-right text-[var(--color-gold-soft)]">
                      {(s.p5 * 1e6).toFixed(2)} ppm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-2">
                Расчёт вклада линии
              </div>
              <Formula
                expression="RTP_{line} = \\sum_{k=3}^{5} p_k \\cdot pay_k"
                block
              />
              <p className="mt-3 text-xs text-ink-3 leading-relaxed">
                Полный RTP — сумма вкладов всех линий и scatter-сценариев. Полоса {total}
                символов на катушку даёт пространство {total ** 5} комбинаций.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-300/80 mb-2">
                Заметка регулятора
              </div>
              <p className="text-sm text-emerald-50/80 leading-relaxed">
                Любое изменение веса символа или таблицы выплат требует пересертификации в
                независимой лаборатории (eCOGRA, iTech Labs, BMM, GLI).
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
