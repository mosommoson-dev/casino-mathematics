"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { formatCurrency, formatPercent, clamp } from "@/lib/utils";

const presets = [
  { name: "Тонкая edge на спорт", p: 0.53, b: 0.95, bankroll: 10000 },
  { name: "Сильная edge на спорт", p: 0.58, b: 0.91, bankroll: 10000 },
  { name: "Покер MTT, in-the-money", p: 0.4, b: 2.5, bankroll: 10000 },
  { name: "BlackJack count, true count +3", p: 0.5, b: 1.0, bankroll: 10000 },
];

export function KellyCalculator() {
  const [p, setP] = useState(0.55);
  const [b, setB] = useState(1.0);
  const [bankroll, setBankroll] = useState(10000);
  const [fraction, setFraction] = useState(1.0);

  const stats = useMemo(() => {
    const q = 1 - p;
    const kelly = (b * p - q) / b;
    const positiveEv = kelly > 0;
    const used = clamp(kelly * fraction, 0, 1);
    const bet = bankroll * used;
    const evShare = b * p - q; // expected return per unit
    const growth = p * Math.log(1 + b * used) + q * Math.log(1 - used);
    return { kelly, used, bet, evShare, growth, positiveEv };
  }, [p, b, bankroll, fraction]);

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {presets.map((pr) => (
                <button
                  key={pr.name}
                  onClick={() => {
                    setP(pr.p);
                    setB(pr.b);
                    setBankroll(pr.bankroll);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-ink-2 hover:text-ink"
                >
                  {pr.name}
                </button>
              ))}
            </div>

            <Slider
              label="p · вероятность выигрыша"
              value={p}
              min={0.01}
              max={0.95}
              step={0.005}
              onChange={setP}
              format={(v) => formatPercent(v, 1)}
            />
            <Slider
              label="b · нетто-выплата (1:b)"
              value={b}
              min={0.1}
              max={10}
              step={0.05}
              onChange={setB}
              format={(v) => `1 : ${v.toFixed(2)}`}
            />
            <Slider
              label="Bankroll"
              value={bankroll}
              min={100}
              max={1_000_000}
              step={100}
              onChange={setBankroll}
              format={(v) => formatCurrency(v)}
            />
            <Slider
              label="Доля от полного Kelly"
              value={fraction}
              min={0}
              max={1}
              step={0.01}
              onChange={setFraction}
              format={(v) => `${(v * 100).toFixed(0)}%`}
            />
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <Formula
                expression="f^* = \\frac{bp - q}{b}, \\quad q = 1 - p"
                block
              />
              <p className="mt-3 text-xs text-ink-3 leading-relaxed">
                Полный Kelly максимизирует <Formula expression="\\E[\\log W]" />. Это создаёт
                наибольший долгосрочный рост, но и высокую дисперсию по пути.
              </p>
            </div>

            <motion.div
              key={`${stats.positiveEv}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border p-5 ${
                stats.positiveEv
                  ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                  : "border-rose-500/30 bg-rose-500/[0.04]"
              }`}
            >
              <div
                className={`text-[10px] uppercase tracking-[0.22em] ${
                  stats.positiveEv ? "text-emerald-300/85" : "text-rose-300/85"
                }`}
              >
                {stats.positiveEv ? "Edge есть — Kelly активен" : "−EV: Kelly = не играть"}
              </div>
              <div className="mt-1 font-mono text-3xl tracking-tight text-ink">
                f* = {formatPercent(stats.kelly, 2)}
              </div>
              <p className="mt-1.5 text-xs text-ink-3">
                Применяя <span className="text-ink">{(fraction * 100).toFixed(0)}%</span> от
                полного Kelly: {formatPercent(stats.used, 2)} = {formatCurrency(stats.bet)} на ставку.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              <Stat
                label="EV доля капитала"
                value={formatPercent(stats.evShare, 2)}
                tone={stats.evShare > 0 ? "emerald" : "rose"}
              />
              <Stat
                label="Геометр. рост · log W"
                value={stats.growth.toFixed(5)}
              />
            </div>

            <div className="rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/[0.05] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-soft)]/80">
                Half-Kelly · практическая рекомендация
              </div>
              <p className="mt-2 text-sm text-ink-2 leading-relaxed">
                На практике профессионалы редко играют полный Kelly: дисперсия слишком
                велика. Half-Kelly теряет 25% долгосрочного роста, но сокращает разброс
                почти вдвое — отличный trade-off.
              </p>
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

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "emerald" | "rose";
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">{label}</div>
      <div
        className={`mt-1 font-mono text-xl tracking-tight ${
          tone === "emerald"
            ? "text-emerald-200"
            : tone === "rose"
              ? "text-rose-200"
              : "text-ink"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
