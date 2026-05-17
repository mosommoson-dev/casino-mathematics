"use client";

import { Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { motion } from "framer-motion";

const BETS = [
  {
    name: "Banker",
    prob: 0.4586,
    edge: 0.0106,
    payout: "1:1 − 5% commission",
    color: "rgba(16,185,129,0.7)",
  },
  {
    name: "Player",
    prob: 0.4462,
    edge: 0.0124,
    payout: "1:1",
    color: "rgba(212,175,55,0.7)",
  },
  {
    name: "Tie",
    prob: 0.0952,
    edge: 0.1436,
    payout: "8:1",
    color: "rgba(244,63,94,0.7)",
  },
];

export function BaccaratPanel() {
  const maxProb = Math.max(...BETS.map((b) => b.prob));

  return (
    <Card className="p-8">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h3 className="font-display text-2xl tracking-tight">Распределение исходов раздачи</h3>
          <p className="mt-2 max-w-[55ch] text-ink-3 leading-relaxed">
            Baccarat использует 6–8 колод. Вероятности рассчитываются методом полного перебора по
            детерминированным правилам hit/stand. Tie кажется выгодным по выплате 8:1, но истинная
            вероятность ≈ 9.5%, что даёт house edge 14.4%.
          </p>

          <div className="mt-8 space-y-4">
            {BETS.map((b) => (
              <div key={b.name}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-display text-lg tracking-tight">{b.name}</span>
                  <span className="font-mono text-ink-2">
                    p = {(b.prob * 100).toFixed(2)}% · HE = {(b.edge * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/[0.04]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(b.prob / maxProb) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${b.color}, ${b.color}55)` }}
                  />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
                  Выплата · {b.payout}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/8 bg-black/30 p-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-3">
              Banker EV
            </div>
            <Formula
              expression="\\mathbb{E}[B] = 0.4586 \\cdot 0.95 + 0.4462 \\cdot (-1) + 0.0952 \\cdot 0 = -0.0106"
              block
            />
            <p className="mt-4 text-sm text-ink-3 leading-relaxed">
              5%-я комиссия снимает преимущество Banker почти до симметрии: 1.06% против 1.24%
              у Player. На длинной дистанции это разница в десятки тысяч долларов на миллион ставок.
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-rose-300/80 mb-2">
              Психологическая ловушка
            </div>
            <p className="text-sm text-rose-50/90 leading-relaxed">
              Tie выглядит как «крупный выигрыш с шансом» 1 к 9. Реальный house edge — 14.4%,
              почти в 14 раз выше Banker. Худшая ставка на стандартном столе.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
