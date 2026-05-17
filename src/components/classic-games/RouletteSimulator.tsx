"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatPercent } from "@/lib/utils";

const SEQUENCE = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14,
  31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
const RED = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

type Bet = "red" | "black" | "even" | "odd" | "low" | "high" | "straight";

const BET_OPTIONS: { id: Bet; label: string; payout: number; probability: number }[] = [
  { id: "red", label: "Красное", payout: 1, probability: 18 / 37 },
  { id: "black", label: "Чёрное", payout: 1, probability: 18 / 37 },
  { id: "even", label: "Чёт", payout: 1, probability: 18 / 37 },
  { id: "odd", label: "Нечёт", payout: 1, probability: 18 / 37 },
  { id: "low", label: "1–18", payout: 1, probability: 18 / 37 },
  { id: "high", label: "19–36", payout: 1, probability: 18 / 37 },
  { id: "straight", label: "Прямой номер", payout: 35, probability: 1 / 37 },
];

type Result = { spin: number; number: number; delta: number; total: number };

export function RouletteSimulator() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState<Bet>("red");
  const [stake, setStake] = useState(10);
  const [bankroll, setBankroll] = useState(1000);
  const [history, setHistory] = useState<Result[]>([]);
  const [auto, setAuto] = useState(false);

  const evaluate = useCallback(
    (number: number): number => {
      const isZero = number === 0;
      switch (bet) {
        case "red":
          return RED.has(number) ? stake : -stake;
        case "black":
          return !isZero && !RED.has(number) ? stake : -stake;
        case "even":
          return !isZero && number % 2 === 0 ? stake : -stake;
        case "odd":
          return number % 2 === 1 ? stake : -stake;
        case "low":
          return number >= 1 && number <= 18 ? stake : -stake;
        case "high":
          return number >= 19 && number <= 36 ? stake : -stake;
        case "straight":
          return number === 17 ? stake * 35 : -stake;
      }
    },
    [bet, stake],
  );

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    const number = Math.floor(Math.random() * 37);
    const idx = SEQUENCE.indexOf(number);
    const slice = 360 / SEQUENCE.length;
    const target = -(idx * slice + slice / 2) - 1080;
    setRotation((r) => r + target - (r % 360));
    setTimeout(() => {
      const delta = evaluate(number);
      setBankroll((b) => b + delta);
      setHistory((h) => [
        { spin: h.length + 1, number, delta, total: (h[0]?.total ?? 0) + delta },
        ...h,
      ].slice(0, 24));
      setSpinning(false);
    }, 2400);
  }, [evaluate, spinning]);

  const runMany = useCallback(
    (n: number) => {
      let runningTotal = history[0]?.total ?? 0;
      const newHistory: Result[] = [];
      let delta = 0;
      for (let i = 0; i < n; i++) {
        const number = Math.floor(Math.random() * 37);
        const d = evaluate(number);
        delta += d;
        runningTotal += d;
        newHistory.unshift({ spin: history.length + i + 1, number, delta: d, total: runningTotal });
      }
      setBankroll((b) => b + delta);
      setHistory((h) => [...newHistory.reverse(), ...h].slice(0, 24));
    },
    [evaluate, history],
  );

  const stats = useMemo(() => {
    const all = history;
    const wins = all.filter((r) => r.delta > 0).length;
    const winRate = all.length ? wins / all.length : 0;
    return { wins, total: all.length, winRate };
  }, [history]);

  const radius = 180;

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-[460px]">
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(212,175,55,0.2), rgba(212,175,55,0.02) 30%, rgba(16,185,129,0.18) 60%, rgba(212,175,55,0.2))",
                  filter: "blur(28px)",
                }}
                animate={{ rotate: rotation * 0.05 }}
                transition={{ duration: 2.4, ease: [0.32, 0.72, 0, 1] }}
              />
              <motion.svg
                viewBox="-220 -220 440 440"
                className="absolute inset-0"
                animate={{ rotate: rotation }}
                transition={{ duration: 2.4, ease: [0.32, 0.72, 0, 1] }}
              >
                <circle r={radius + 14} fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth={2} />
                <circle r={radius - 28} fill="rgba(10,15,30,0.6)" />
                {SEQUENCE.map((number, i) => {
                  const a = (i / SEQUENCE.length) * Math.PI * 2 - Math.PI / 2;
                  const x = Math.cos(a) * radius;
                  const y = Math.sin(a) * radius;
                  const fill =
                    number === 0
                      ? "rgba(16,185,129,0.9)"
                      : RED.has(number)
                        ? "rgba(244,63,94,0.9)"
                        : "rgba(15,18,24,1)";
                  return (
                    <g key={i} transform={`translate(${x} ${y})`}>
                      <circle r={16} fill={fill} stroke="rgba(212,175,55,0.4)" strokeWidth={0.5} />
                      <text
                        fontFamily="var(--font-mono)"
                        fontSize={12}
                        fill={number === 0 ? "#04130b" : "#fff"}
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${(a * 180) / Math.PI + 90})`}
                      >
                        {number}
                      </text>
                    </g>
                  );
                })}
              </motion.svg>
              <div
                className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#efd57a] via-[#d4af37] to-[#8b6e16]"
                style={{ boxShadow: "0 0 40px rgba(212,175,55,0.4), inset 0 2px 0 rgba(255,255,255,0.5)" }}
              />
              <div className="absolute left-1/2 top-1.5 -translate-x-1/2 size-3 rotate-180">
                <svg viewBox="0 0 10 10" className="h-3 w-3">
                  <polygon points="5,0 10,10 0,10" fill="#d4af37" />
                </svg>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={spin}
                disabled={spinning}
                className="rounded-full bg-gradient-to-b from-[#efd57a] via-[#d4af37] to-[#9d7e1b] px-6 py-3 text-sm font-medium text-[#0c0a06] shadow-[0_8px_30px_-12px_rgba(212,175,55,0.6)] disabled:opacity-40"
              >
                {spinning ? "Запуск шарика…" : "Сделать ставку"}
              </button>
              <button
                onClick={() => runMany(100)}
                className="rounded-full border border-white/10 px-4 py-3 text-xs text-ink-2 hover:text-ink"
              >
                +100 спинов
              </button>
              <button
                onClick={() => runMany(1000)}
                className="rounded-full border border-white/10 px-4 py-3 text-xs text-ink-2 hover:text-ink"
              >
                +1000 спинов
              </button>
              <button
                onClick={() => {
                  setHistory([]);
                  setBankroll(1000);
                }}
                className="rounded-full border border-white/10 px-4 py-3 text-xs text-ink-3 hover:text-ink"
              >
                Сброс
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-3">
                Тип ставки
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BET_OPTIONS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBet(b.id)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      bet === b.id
                        ? "border-[var(--color-gold)]/60 bg-[var(--color-gold)]/[0.08] text-ink"
                        : "border-white/10 bg-white/[0.02] text-ink-2 hover:border-white/20"
                    }`}
                  >
                    <div className="font-medium tracking-tight">{b.label}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-ink-4">
                      ×{b.payout} · p={formatPercent(b.probability, 2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-1">
                  Размер ставки
                </div>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={stake}
                  onChange={(e) => setStake(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-ink"
                />
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
                <div className="text-[10px] uppercase tracking-[0.22em] text-ink-3">Банкролл</div>
                <div className="font-mono text-lg text-ink">{formatCurrency(bankroll)}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/8 pt-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">Спинов</div>
                <div className="font-mono text-lg text-ink">{stats.total}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">Win-rate</div>
                <div className="font-mono text-lg text-ink">{formatPercent(stats.winRate, 1)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">Net</div>
                <div className="font-mono text-lg text-ink">
                  {formatCurrency(bankroll - 1000)}
                </div>
              </div>
            </div>

            <div className="max-h-[200px] overflow-y-auto scrollbar-thin rounded-xl border border-white/8 bg-white/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-2">
                История · последние {history.length || 0}
              </div>
              <div className="space-y-1 font-mono text-xs">
                {history.length === 0 && (
                  <div className="text-ink-4">Спинов пока нет.</div>
                )}
                {history.slice(0, 8).map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-white/5 py-1 last:border-0"
                  >
                    <span className="text-ink-3">#{r.spin}</span>
                    <span
                      className={`inline-flex size-6 items-center justify-center rounded-full text-[10px] ${
                        r.number === 0
                          ? "bg-emerald-500/20 text-emerald-200"
                          : RED.has(r.number)
                            ? "bg-rose-500/15 text-rose-200"
                            : "bg-white/5 text-ink"
                      }`}
                    >
                      {r.number}
                    </span>
                    <span className={r.delta >= 0 ? "text-emerald-300" : "text-rose-300"}>
                      {r.delta >= 0 ? "+" : ""}
                      {formatCurrency(r.delta)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
