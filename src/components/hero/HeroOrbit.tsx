"use client";

import { motion } from "framer-motion";

const SLOTS = Array.from({ length: 37 }, (_, i) => i);
const RED = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
const SEQUENCE = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14,
  31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

export function HeroOrbit() {
  const radius = 200;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(212,175,55,0.4), rgba(212,175,55,0.05) 30%, rgba(16,185,129,0.25) 60%, rgba(212,175,55,0.4))",
          filter: "blur(28px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-6 rounded-full border border-white/10" />
      <div className="absolute inset-14 rounded-full border border-white/10" />
      <div className="absolute inset-24 rounded-full border border-white/10" />

      <motion.svg
        viewBox="-260 -260 520 520"
        className="absolute inset-0 h-full w-full"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        {SEQUENCE.map((number, i) => {
          const angle = (i / SEQUENCE.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const color =
            number === 0
              ? "rgba(16,185,129,0.95)"
              : RED.has(number)
                ? "rgba(244,63,94,0.9)"
                : "rgba(15,18,24,1)";
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle
                r={18}
                fill={color}
                stroke="rgba(212,175,55,0.4)"
                strokeWidth={0.6}
              />
              <text
                fontFamily="var(--font-mono)"
                fontSize={number > 9 ? 13 : 14}
                fill={number === 0 ? "#04130b" : "#fff"}
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${(angle * 180) / Math.PI + 90})`}
              >
                {number}
              </text>
            </g>
          );
        })}
        <circle
          r={radius - 26}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeDasharray="2 4"
        />
      </motion.svg>

      <motion.div
        className="absolute inset-[42%] rounded-full bg-gradient-to-b from-[#efd57a] via-[#d4af37] to-[#8b6e16] shadow-[0_0_40px_rgba(212,175,55,0.5),inset_0_2px_0_rgba(255,255,255,0.4)]"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        animate={{
          x: [0, Math.cos(Math.PI * 0.3) * 240, Math.cos(Math.PI * 0.9) * 240, Math.cos(Math.PI * 1.6) * 240, 0],
          y: [0, Math.sin(Math.PI * 0.3) * 240, Math.sin(Math.PI * 0.9) * 240, Math.sin(Math.PI * 1.6) * 240, 0],
          scale: [0.5, 1, 1, 1, 0.5],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: "0 0 14px 4px rgba(255,255,255,0.7)" }}
      />

      <div className="absolute -right-2 top-6 hidden md:block">
        <Tag value="E[X]" label="−1/37" tone="gold" />
      </div>
      <div className="absolute -left-4 bottom-12 hidden md:block">
        <Tag value="RTP" label="97.30%" tone="emerald" />
      </div>
      <div className="absolute left-1/2 -bottom-2 hidden -translate-x-1/2 md:block">
        <Tag value="σ²" label="0.999" tone="ink" />
      </div>
    </div>
  );
}

function Tag({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: "gold" | "emerald" | "ink";
}) {
  const dot =
    tone === "gold"
      ? "bg-[var(--color-gold)]"
      : tone === "emerald"
        ? "bg-[var(--color-emerald)]"
        : "bg-white";
  return (
    <div className="rounded-2xl border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-md">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ink-3">
        <span className={`size-1.5 rounded-full ${dot}`} />
        {value}
      </div>
      <div className="mt-1 font-mono text-sm tracking-tight text-ink">{label}</div>
    </div>
  );
}
