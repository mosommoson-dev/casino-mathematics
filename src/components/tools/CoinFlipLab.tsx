"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { seededRandom } from "@/lib/utils";

function simulate(n: number, p: number, seed: number) {
  const rnd = seededRandom(seed);
  const trail: { idx: number; ratio: number }[] = [];
  let heads = 0;
  const stride = Math.max(1, Math.floor(n / 360));
  for (let i = 1; i <= n; i++) {
    if (rnd() < p) heads++;
    if (i % stride === 0 || i === n) trail.push({ idx: i, ratio: heads / i });
  }
  return { trail, heads };
}

export function CoinFlipLab() {
  const [n, setN] = useState(2000);
  const [p, setP] = useState(0.5);
  const [seed, setSeed] = useState(11);

  const { trail, heads } = useMemo(() => simulate(n, p, seed), [n, p, seed]);
  const ratio = heads / n;
  const sigma = Math.sqrt((p * (1 - p)) / n);
  const ci = [Math.max(0, p - 1.96 * sigma), Math.min(1, p + 1.96 * sigma)];

  // Build polyline
  const w = 600;
  const h = 200;
  const last = trail.length - 1;
  const points = trail
    .map((t, i) => {
      const x = (i / last) * w;
      const y = h - t.ratio * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
              <line
                x1={0}
                y1={h - p * h}
                x2={w}
                y2={h - p * h}
                stroke="rgba(212,175,55,0.45)"
                strokeWidth={0.8}
                strokeDasharray="2 4"
              />
              <motion.polyline
                key={`${seed}-${n}-${p}`}
                points={points}
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={1.4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.32, 0.72, 0, 1] }}
              />
            </svg>
            <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-4">
              <span>x: испытания 1 → {n.toLocaleString("ru-RU")}</span>
              <span>y: доля «орлов»</span>
            </div>
          </div>

          <div className="space-y-5">
            <Slider
              label="Испытаний"
              value={n}
              min={50}
              max={200000}
              step={50}
              onChange={setN}
              format={(v) => v.toLocaleString("ru-RU")}
            />
            <Slider
              label="p (теор. вероятность)"
              value={p}
              min={0.01}
              max={0.99}
              step={0.01}
              onChange={setP}
              format={(v) => v.toFixed(2)}
            />
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-xs text-ink-2 hover:text-ink"
            >
              Новый seed · {seed}
            </button>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Фактическая доля" value={`${(ratio * 100).toFixed(3)}%`} />
              <Stat label="Отклонение от p" value={`${((ratio - p) * 100).toFixed(3)}%`} />
              <Stat label="σ × 1.96" value={`±${(sigma * 196).toFixed(3)}%`} />
              <Stat
                label="CI 95%"
                value={`[${(ci[0] * 100).toFixed(2)}, ${(ci[1] * 100).toFixed(2)}]%`}
              />
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-1">
                Стандартная ошибка
              </div>
              <Formula expression="\\sigma = \\sqrt{\\tfrac{p(1-p)}{n}}" block />
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-3">
      <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">{label}</div>
      <div className="mt-1 font-mono text-base tracking-tight text-ink">{value}</div>
    </div>
  );
}
