"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

type Action = "H" | "S" | "D" | "P";

const ACTIONS: Record<Action, { label: string; color: string }> = {
  H: { label: "Hit", color: "rgba(244,63,94,0.85)" },
  S: { label: "Stand", color: "rgba(16,185,129,0.85)" },
  D: { label: "Double", color: "rgba(212,175,55,0.85)" },
  P: { label: "Split", color: "rgba(99,102,241,0.85)" },
};

// 6-deck H17 simplified basic strategy chart.
// Rows: player hand total / pair, Columns: dealer upcard 2..A.
const HARD: { player: string; row: Action[] }[] = [
  { player: "8", row: ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"] },
  { player: "9", row: ["H", "D", "D", "D", "D", "H", "H", "H", "H", "H"] },
  { player: "10", row: ["D", "D", "D", "D", "D", "D", "D", "D", "H", "H"] },
  { player: "11", row: ["D", "D", "D", "D", "D", "D", "D", "D", "D", "H"] },
  { player: "12", row: ["H", "H", "S", "S", "S", "H", "H", "H", "H", "H"] },
  { player: "13", row: ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"] },
  { player: "14", row: ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"] },
  { player: "15", row: ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"] },
  { player: "16", row: ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"] },
  { player: "17+", row: ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"] },
];

const SOFT: { player: string; row: Action[] }[] = [
  { player: "A,2", row: ["H", "H", "H", "D", "D", "H", "H", "H", "H", "H"] },
  { player: "A,3", row: ["H", "H", "H", "D", "D", "H", "H", "H", "H", "H"] },
  { player: "A,4", row: ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"] },
  { player: "A,5", row: ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"] },
  { player: "A,6", row: ["H", "D", "D", "D", "D", "H", "H", "H", "H", "H"] },
  { player: "A,7", row: ["S", "D", "D", "D", "D", "S", "S", "H", "H", "H"] },
  { player: "A,8+", row: ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"] },
];

const PAIRS: { player: string; row: Action[] }[] = [
  { player: "2,2", row: ["P", "P", "P", "P", "P", "P", "H", "H", "H", "H"] },
  { player: "3,3", row: ["P", "P", "P", "P", "P", "P", "H", "H", "H", "H"] },
  { player: "4,4", row: ["H", "H", "H", "P", "P", "H", "H", "H", "H", "H"] },
  { player: "6,6", row: ["P", "P", "P", "P", "P", "H", "H", "H", "H", "H"] },
  { player: "7,7", row: ["P", "P", "P", "P", "P", "P", "H", "H", "H", "H"] },
  { player: "8,8", row: ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"] },
  { player: "9,9", row: ["P", "P", "P", "P", "P", "S", "P", "P", "S", "S"] },
  { player: "10,10", row: ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"] },
  { player: "A,A", row: ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"] },
];

const COLUMNS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];

export function BlackjackBoard() {
  const [view, setView] = useState<"hard" | "soft" | "pairs">("hard");

  const dataset = view === "hard" ? HARD : view === "soft" ? SOFT : PAIRS;

  const counts = useMemo(() => {
    const flat = dataset.flatMap((r) => r.row);
    const total = flat.length;
    return {
      H: flat.filter((a) => a === "H").length / total,
      S: flat.filter((a) => a === "S").length / total,
      D: flat.filter((a) => a === "D").length / total,
      P: flat.filter((a) => a === "P").length / total,
    };
  }, [dataset]);

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-[radial-gradient(closest-side,rgba(16,185,129,0.06),transparent)] bg-black/40 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-1">
              Шесть колод · S17 · DAS · No surrender
            </div>
            <h3 className="font-display text-2xl tracking-tight">Базовая стратегия</h3>
          </div>
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.02] p-1">
            {(["hard", "soft", "pairs"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.16em] transition ${
                  view === v ? "bg-white/[0.06] text-ink" : "text-ink-3 hover:text-ink"
                }`}
              >
                {v === "hard" ? "Hard" : v === "soft" ? "Soft" : "Pairs"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[680px] border-separate border-spacing-1 text-center text-sm">
            <thead>
              <tr>
                <th className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4 text-left">
                  Player ↓ / Dealer →
                </th>
                {COLUMNS.map((c) => (
                  <th key={c} className="font-mono text-xs text-ink-3">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataset.map((r) => (
                <tr key={r.player}>
                  <td className="rounded-lg bg-white/[0.02] px-3 py-1 text-left font-mono text-xs text-ink">
                    {r.player}
                  </td>
                  {r.row.map((a, i) => (
                    <motion.td
                      key={i}
                      whileHover={{ scale: 1.06 }}
                      style={{ background: ACTIONS[a].color }}
                      className="rounded-md py-1.5 text-[11px] font-bold text-black"
                    >
                      {a}
                    </motion.td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {Object.entries(ACTIONS).map(([key, val]) => (
            <div
              key={key}
              className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3"
            >
              <span
                className="inline-flex size-7 items-center justify-center rounded-md text-[11px] font-bold text-black"
                style={{ background: val.color }}
              >
                {key}
              </span>
              <div>
                <div className="text-sm text-ink">{val.label}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
                  {(counts[key as Action] * 100).toFixed(0)}% решений
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
