"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { seededRandom } from "@/lib/utils";

const GRID = 36;
const COUNT = GRID * GRID;

export function RNGVisualiser() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 6000);
    return () => clearInterval(id);
  }, []);

  const data = useMemo(() => {
    const rnd = seededRandom(Date.now() ^ (tick * 9301));
    return Array.from({ length: COUNT }, () => rnd());
  }, [tick]);

  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const variance = data.reduce((a, b) => a + (b - mean) ** 2, 0) / data.length;
  const sigma = Math.sqrt(variance);
  // χ² uniformity (bin into 10 bins)
  const bins = new Array(10).fill(0);
  data.forEach((v) => bins[Math.min(9, Math.floor(v * 10))]++);
  const expected = COUNT / 10;
  const chi2 = bins.reduce((a, b) => a + (b - expected) ** 2 / expected, 0);

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="aspect-square w-full rounded-2xl border border-white/8 bg-black/40 p-2 overflow-hidden">
              <div
                className="grid h-full w-full"
                style={{
                  gridTemplateColumns: `repeat(${GRID}, 1fr)`,
                  gridTemplateRows: `repeat(${GRID}, 1fr)`,
                  gap: "2px",
                }}
              >
                {data.map((v, i) => (
                  <div
                    key={`${tick}-${i}`}
                    className="rounded-[2px]"
                    style={{
                      background: `hsl(${42 + v * 18}deg, ${30 + v * 30}%, ${
                        18 + v * 64
                      }%)`,
                      animation: `cellPulse 600ms ease ${i * 0.3}ms 1 forwards`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-4">
              <span>живой PRNG · n = {COUNT.toLocaleString("ru-RU")}</span>
              <button
                onClick={() => setTick((t) => t + 1)}
                className="rounded-full border border-white/10 px-3 py-1.5 text-ink-2 hover:text-ink"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <Stat label="μ (ожидаемо ≈ 0.5)" value={mean.toFixed(5)} />
            <Stat label="σ (ожидаемо ≈ 0.289)" value={sigma.toFixed(5)} />
            <Stat
              label="χ² при k=9 (критическое 16.92)"
              value={chi2.toFixed(2)}
              tone={chi2 < 16.92 ? "emerald" : "rose"}
            />
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-2">
                Что проверяется
              </div>
              <ul className="space-y-2 text-sm text-ink-2 leading-relaxed">
                <li>· Равномерность распределения (χ²-тест).</li>
                <li>· Серийная корреляция битов (NIST monobit / runs).</li>
                <li>· Энтропия по Шеннону ≥ 7.9 бит/байт.</li>
                <li>· Период не меньше 2^128 для CSPRNG.</li>
                <li>· Прохождение TestU01 BigCrush.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-300/80 mb-1.5">
                Криптографическая безопасность
              </div>
              <p className="text-sm text-emerald-50/85 leading-relaxed">
                CSPRNG (например, AES-CTR-DRBG, ChaCha20) делает следующий бит непредсказуемым
                даже при известных предыдущих. Регуляторы требуют именно такие генераторы для
                live-игр.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes cellPulse {
          0% {
            opacity: 0.2;
            transform: scale(0.6);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </Card>
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
  const color =
    tone === "emerald"
      ? "text-emerald-300"
      : tone === "rose"
        ? "text-rose-300"
        : "text-ink";
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">{label}</div>
      <div className={`mt-1 font-mono text-2xl tracking-tight ${color}`}>{value}</div>
    </div>
  );
}
