"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, Eyebrow } from "@/components/ui/Card";
import { Section, FadeIn } from "@/components/ui/Section";
import { formatPercent } from "@/lib/utils";
import { ConceptLink } from "@/components/ui/ConceptLink";

const SAMPLE = 600;

function simulateRouletteCurve(houseEdge: number, sigma: number, n: number, seed: number) {
  const points: number[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  let pnl = 0;
  for (let i = 0; i < n; i++) {
    const z = Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
    const r = -houseEdge + sigma * z;
    pnl += r;
    points.push(pnl);
  }
  return points;
}

export function MathCanvas() {
  const [houseEdge, setHouseEdge] = useState(0.027);
  const [sigma, setSigma] = useState(1);
  const [seed, setSeed] = useState(42);

  const curves = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        simulateRouletteCurve(houseEdge, sigma, SAMPLE, seed + i * 37),
      ),
    [houseEdge, sigma, seed],
  );

  const meanCurve = useMemo(() => {
    return Array.from({ length: SAMPLE }, (_, i) => -houseEdge * (i + 1));
  }, [houseEdge]);

  const all = [...curves.flat(), ...meanCurve];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;

  const mapY = (v: number) => 100 - ((v - min) / range) * 100;

  return (
    <Section id="canvas" className="border-t border-white/5">
      <FadeIn>
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_auto] items-end">
          <div className="space-y-4">
            <Eyebrow>Лаборатория · Live</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-display tracking-tight leading-[1.02] ink-gradient">
              12 параллельных вселенных одного игрока
            </h2>
            <p className="max-w-[60ch] text-ink-3 leading-relaxed">
              Двенадцать независимых траекторий PnL после 600 ставок. Серая огибающая —
              теоретическое EV ({(houseEdge * 100).toFixed(2)}% house edge). Дисперсия
              превращает один и тот же long-run в радикально разные пути.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSeed(Date.now() & 0xffff)}
              className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-ink-2 hover:text-ink"
            >
              Новый посев
            </button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="p-2">
          <div className="rounded-2xl bg-black/30 p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              <div className="relative h-[420px] rounded-xl border border-white/8 bg-[radial-gradient(closest-side,rgba(255,255,255,0.04),transparent)] p-4">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]">
                  {/* grid */}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <line
                      key={i}
                      x1="0"
                      x2="100"
                      y1={(i + 1) * 20}
                      y2={(i + 1) * 20}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="0.1"
                    />
                  ))}
                  {/* zero line */}
                  <line
                    x1="0"
                    x2="100"
                    y1={mapY(0)}
                    y2={mapY(0)}
                    stroke="rgba(255,255,255,0.18)"
                    strokeDasharray="0.6 0.6"
                    strokeWidth="0.15"
                  />
                  {/* trajectories */}
                  {curves.map((c, idx) => (
                    <motion.polyline
                      key={idx}
                      points={c.map((v, i) => `${(i / (SAMPLE - 1)) * 100},${mapY(v)}`).join(" ")}
                      fill="none"
                      stroke={`hsl(${(idx * 30 + 40) % 360}deg 80% 60% / 0.55)`}
                      strokeWidth="0.25"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: idx * 0.05, ease: [0.32, 0.72, 0, 1] }}
                    />
                  ))}
                  {/* mean */}
                  <motion.polyline
                    points={meanCurve.map((v, i) => `${(i / (SAMPLE - 1)) * 100},${mapY(v)}`).join(" ")}
                    fill="none"
                    stroke="rgba(212,175,55,0.95)"
                    strokeWidth="0.45"
                    strokeDasharray="0.8 0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4 }}
                  />
                </svg>
                <div className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.22em] text-ink-4">
                  PnL · 12 траекторий · ставка 1
                </div>
                <div className="absolute bottom-4 right-6 text-[10px] font-mono tracking-tight text-ink-4">
                  n = {SAMPLE}
                </div>
              </div>

              <div className="space-y-6">
                <Knob
                  label="House Edge"
                  value={formatPercent(houseEdge)}
                  min={0}
                  max={0.1}
                  step={0.001}
                  current={houseEdge}
                  onChange={setHouseEdge}
                />
                <Knob
                  label="σ (дисперсия)"
                  value={sigma.toFixed(2)}
                  min={0.1}
                  max={4}
                  step={0.05}
                  current={sigma}
                  onChange={setSigma}
                />
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-2">
                    Что вы наблюдаете
                  </div>
                  <p className="text-sm text-ink-2 leading-relaxed">
                    Чем больше σ, тем шире веер исходов; чем больше HE — тем сильнее весь пакет
                    траекторий «отжимается» вниз. Это и есть{" "}
                    <ConceptLink id="law-of-large-numbers">закон больших чисел</ConceptLink>
                    {" "}в действии.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </FadeIn>
    </Section>
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
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="text-[10px] uppercase tracking-[0.22em] text-ink-3">{label}</div>
        <div className="font-mono text-sm text-ink">{value}</div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 w-full accent-[var(--color-gold)]"
      />
    </div>
  );
}
