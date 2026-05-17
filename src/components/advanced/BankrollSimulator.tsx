"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { seededRandom, formatCurrency, formatPercent } from "@/lib/utils";

type Path = number[];

function simulate(
  paths: number,
  spins: number,
  he: number,
  sigma: number,
  bankroll: number,
  bet: number,
  seed: number,
): Path[] {
  const rnd = seededRandom(seed);
  const all: Path[] = [];
  for (let i = 0; i < paths; i++) {
    const arr: number[] = [bankroll];
    let b = bankroll;
    for (let s = 0; s < spins; s++) {
      if (b <= 0) {
        arr.push(0);
        continue;
      }
      // Normal approx: per-spin PnL ~ N(-he*bet, sigma*bet)
      const u = Math.max(rnd(), 1e-6);
      const v = rnd();
      const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
      b += -he * bet + sigma * bet * z;
      arr.push(Math.max(0, b));
    }
    all.push(arr);
  }
  return all;
}

export function BankrollSimulator() {
  const [bankroll, setBankroll] = useState(1000);
  const [bet, setBet] = useState(10);
  const [he, setHe] = useState(0.027);
  const [sigma, setSigma] = useState(0.98);
  const [spins, setSpins] = useState(500);
  const [seed, setSeed] = useState(7);

  const paths = useMemo(
    () => simulate(64, spins, he, sigma, bankroll, bet, seed),
    [bankroll, bet, he, sigma, spins, seed],
  );

  const last = useMemo(() => paths.map((p) => p[p.length - 1]), [paths]);
  const ruined = last.filter((b) => b <= 0).length / last.length;
  const median = useMemo(() => {
    const sorted = [...last].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  }, [last]);
  const max = Math.max(...last);
  const min = Math.min(...last);
  const widthMax = Math.max(bankroll * 2.2, ...paths.flat());

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <svg viewBox={`0 0 ${spins} 100`} preserveAspectRatio="none" className="h-[360px] w-full">
              <defs>
                <linearGradient id="ruinG" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="rgba(244,63,94,0.0)" />
                  <stop offset="1" stopColor="rgba(244,63,94,0.25)" />
                </linearGradient>
              </defs>
              <rect
                x={0}
                y={50}
                width={spins}
                height={50}
                fill="url(#ruinG)"
                opacity={0.6}
              />
              <line
                x1={0}
                y1={50}
                x2={spins}
                y2={50}
                stroke="rgba(212,175,55,0.4)"
                strokeDasharray="2 2"
                strokeWidth={0.3}
              />
              {paths.map((p, i) => {
                const pts = p
                  .map((v, idx) => {
                    const x = (idx / (p.length - 1)) * spins;
                    const y = 100 - clamp01(v / widthMax) * 50 - 50;
                    return `${x},${100 - clamp01(v / widthMax) * 100}`;
                  })
                  .join(" ");
                const final = p[p.length - 1];
                const color =
                  final <= 0
                    ? "rgba(244,63,94,0.55)"
                    : final > bankroll
                      ? "rgba(16,185,129,0.55)"
                      : "rgba(255,255,255,0.18)";
                return (
                  <motion.polyline
                    key={`${seed}-${i}`}
                    points={pts}
                    fill="none"
                    stroke={color}
                    strokeWidth={0.4}
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: i * 0.005 }}
                  />
                );
              })}
            </svg>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="Медиана" value={formatCurrency(median)} />
              <Stat
                label="Доля разорений"
                value={formatPercent(ruined, 1)}
                tone={ruined > 0.2 ? "rose" : "emerald"}
              />
              <Stat label="Max" value={formatCurrency(max)} tone="emerald" />
              <Stat label="Min" value={formatCurrency(min)} tone="rose" />
            </div>
          </div>

          <div className="space-y-5">
            <Slider
              label="Bankroll"
              value={bankroll}
              min={100}
              max={100000}
              step={50}
              onChange={setBankroll}
              format={(v) => formatCurrency(v)}
            />
            <Slider
              label="Ставка"
              value={bet}
              min={1}
              max={500}
              step={1}
              onChange={setBet}
              format={(v) => formatCurrency(v)}
            />
            <Slider
              label="House edge"
              value={he}
              min={0}
              max={0.15}
              step={0.001}
              onChange={setHe}
              format={(v) => formatPercent(v, 2)}
            />
            <Slider
              label="Sigma (σ ставки)"
              value={sigma}
              min={0.1}
              max={5}
              step={0.05}
              onChange={setSigma}
              format={(v) => v.toFixed(2)}
            />
            <Slider
              label="Спинов"
              value={spins}
              min={50}
              max={5000}
              step={50}
              onChange={setSpins}
              format={(v) => v.toLocaleString("ru-RU")}
            />
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-xs text-ink-2 hover:text-ink"
            >
              Новый seed · {seed}
            </button>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-2">
                Модель
              </div>
              <Formula
                expression="W_{n+1} = W_n - HE \\cdot B + \\sigma B \\cdot Z, \\quad Z \\sim \\mathcal{N}(0,1)"
                block
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
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
        className={`mt-1 font-mono text-lg tracking-tight ${
          tone === "emerald" ? "text-emerald-200" : tone === "rose" ? "text-rose-200" : "text-ink"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
