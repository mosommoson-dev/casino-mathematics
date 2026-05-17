"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "./Card";

type Props = {
  chapter: string;
  eyebrow: string;
  title: string;
  lead: string;
  accent?: "gold" | "emerald";
};

export function PageHeader({ chapter, eyebrow, title, lead, accent = "gold" }: Props) {
  return (
    <header className="relative isolate overflow-hidden border-b border-white/5">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(700px_400px_at_20%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute right-[-15%] top-[-20%] -z-10 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            accent === "gold"
              ? "radial-gradient(closest-side,rgba(212,175,55,0.18),transparent)"
              : "radial-gradient(closest-side,rgba(16,185,129,0.18),transparent)",
        }}
      />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-24 md:pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-4">
            chapter {chapter}
          </span>
          <span className="h-px w-12 bg-white/10" />
          <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-[26ch] font-display text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[0.98] tracking-[-0.025em] ink-gradient text-balance"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="mt-8 max-w-[64ch] text-lg leading-relaxed text-ink-2 text-pretty"
        >
          {lead}
        </motion.p>
      </div>
    </header>
  );
}
