"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { formatCurrency, formatPercent } from "@/lib/utils";

type Row = { id: string; probability: number; payout: number };

const initial: Row[] = [
  { id: "win", probability: 18 / 37, payout: 1 },
  { id: "lose", probability: 19 / 37, payout: -1 },
];

export function HouseEdgeCalculator() {
  const [rows, setRows] = useState<Row[]>(initial);
  const [bet, setBet] = useState(10);
  const [spins, setSpins] = useState(1000);

  const totalProb = rows.reduce((a, r) => a + r.probability, 0);
  const ev = rows.reduce((a, r) => a + r.probability * r.payout, 0);
  const houseEdge = -ev;
  const rtp = 1 + ev;
  const variance = rows.reduce(
    (a, r) => a + r.probability * (r.payout - ev) ** 2,
    0,
  );
  const sigma = Math.sqrt(variance);
  const expectedLoss = bet * houseEdge * spins;
  const stdAfter = bet * sigma * Math.sqrt(spins);

  const presets = useMemo(
    () => [
      {
        name: "EU рулетка · красное",
        rows: [
          { id: "win", probability: 18 / 37, payout: 1 },
          { id: "lose", probability: 19 / 37, payout: -1 },
        ],
      },
      {
        name: "US рулетка · красное",
        rows: [
          { id: "win", probability: 18 / 38, payout: 1 },
          { id: "lose", probability: 20 / 38, payout: -1 },
        ],
      },
      {
        name: "Прямой номер EU",
        rows: [
          { id: "win", probability: 1 / 37, payout: 35 },
          { id: "lose", probability: 36 / 37, payout: -1 },
        ],
      },
      {
        name: "Слот RTP 96%",
        rows: [
          { id: "big", probability: 0.001, payout: 200 },
          { id: "small", probability: 0.18, payout: 2 },
          { id: "mini", probability: 0.07, payout: 1 },
          { id: "lose", probability: 0.749, payout: -1 },
        ],
      },
    ],
    [],
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
      <Card className="p-8">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl tracking-tight">Распределение исходов</h3>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">
            Σp = {formatPercent(totalProb, 2)}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {rows.map((r, i) => (
            <div
              key={r.id}
              className="grid grid-cols-[1fr_1fr_auto] gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4"
            >
              <div>
                <label className="text-[10px] uppercase tracking-[0.22em] text-ink-4">
                  Вероятность
                </label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  value={r.probability}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setRows((prev) =>
                      prev.map((p, j) => (j === i ? { ...p, probability: v } : p)),
                    );
                  }}
                  className="mt-1 w-full bg-transparent font-mono text-ink outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.22em] text-ink-4">
                  Выплата (×ставка)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={r.payout}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setRows((prev) =>
                      prev.map((p, j) => (j === i ? { ...p, payout: v } : p)),
                    );
                  }}
                  className="mt-1 w-full bg-transparent font-mono text-ink outline-none"
                />
              </div>
              <button
                onClick={() => setRows((prev) => prev.filter((_, j) => j !== i))}
                className="self-end rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-3 hover:text-ink"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() =>
              setRows((prev) => [
                ...prev,
                { id: `row-${prev.length}`, probability: 0, payout: 0 },
              ])
            }
            className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-ink-2 hover:text-ink"
          >
            + Добавить исход
          </button>
        </div>

        <div className="mt-8 border-t border-white/8 pt-6">
          <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-ink-4">Пресеты</div>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.name}
                onClick={() => setRows(p.rows)}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-ink-2 transition hover:border-[var(--color-gold)]/40 hover:text-ink"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <h3 className="font-display text-xl tracking-tight">Результаты</h3>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Metric label="Expected value" value={ev.toFixed(4)} tone="emerald" />
          <Metric label="House edge" value={formatPercent(houseEdge, 2)} tone="gold" />
          <Metric label="RTP" value={formatPercent(rtp, 2)} tone="emerald" />
          <Metric label="σ" value={sigma.toFixed(3)} />
        </div>

        <div className="mt-8 rounded-2xl border border-white/8 bg-black/30 p-5">
          <Formula
            expression={`\\mathbb{E}[X] = ${rows
              .map((r) => `${r.probability.toFixed(3)} \\cdot ${r.payout}`)
              .join(" + ")} = ${ev.toFixed(4)}`}
            block
          />
        </div>

        <div className="mt-6 space-y-4 border-t border-white/8 pt-6">
          <KnobRow
            label="Ставка"
            unit="$"
            value={bet}
            onChange={setBet}
            min={1}
            max={1000}
            step={1}
          />
          <KnobRow
            label="Количество ставок"
            unit=""
            value={spins}
            onChange={setSpins}
            min={10}
            max={100000}
            step={10}
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Metric
            label="Ожидаемая потеря"
            value={formatCurrency(expectedLoss)}
            tone="rose"
          />
          <Metric label="±1σ диапазон" value={`±${formatCurrency(stdAfter)}`} />
        </div>

        <motion.div
          key={houseEdge}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 rounded-2xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/[0.05] p-5"
        >
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-soft)]/80 mb-1.5">
            Интерпретация
          </div>
          <p className="text-sm text-ink-2 leading-relaxed">
            С каждой ставки {formatCurrency(bet)} вы в среднем теряете{" "}
            <span className="font-mono text-ink">
              {formatCurrency(bet * houseEdge)}
            </span>
            . После {spins.toLocaleString("ru-RU")} ставок суммарная потеря приблизится к{" "}
            <span className="font-mono text-ink">{formatCurrency(expectedLoss)}</span>{" "}
            с типичным разбросом ±{formatCurrency(stdAfter)}.
          </p>
        </motion.div>
      </Card>
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "gold" | "emerald" | "rose";
}) {
  const dot =
    tone === "gold"
      ? "bg-[var(--color-gold)]"
      : tone === "emerald"
        ? "bg-[var(--color-emerald)]"
        : tone === "rose"
          ? "bg-[var(--color-rose)]"
          : "bg-white/40";
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ink-4">
        <span className={`size-1.5 rounded-full ${dot}`} />
        {label}
      </div>
      <div className="mt-2 font-mono text-2xl tracking-tight">{value}</div>
    </div>
  );
}

function KnobRow({
  label,
  unit,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  unit: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-ink-3">{label}</span>
        <span className="font-mono text-sm text-ink">
          {value.toLocaleString("ru-RU")} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--color-gold)]"
      />
    </div>
  );
}
