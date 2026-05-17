"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeroOrbit } from "./HeroOrbit";
import { HeroParticles } from "./HeroParticles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight } from "@phosphor-icons/react";

const stats = [
  { value: "0.27%", label: "EU rouletter house edge" },
  { value: "96.5%", label: "Median slot RTP" },
  { value: "8σ", label: "High-variance threshold" },
  { value: "384k", label: "Spins to 1% RTP confidence" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(800px_400px_at_50%_30%,black,transparent)]" />
      <HeroParticles />
      <div className="absolute right-[-10%] top-[-20%] -z-10 h-[680px] w-[680px] rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.18),transparent)]" />
      <div className="absolute left-[-15%] bottom-[-30%] -z-10 h-[700px] w-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.10),transparent)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="grid items-center gap-16 md:grid-cols-[1.15fr_0.85fr]">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-ink-3"
            >
              <span className="size-1.5 rounded-full bg-[var(--color-gold)]" />
              Edition I · 2026 · Russian-first
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
              className="mt-6 max-w-[18ch] font-display text-[clamp(2.6rem,6.5vw,5.2rem)] leading-[0.96] tracking-[-0.03em]"
            >
              <span className="ink-gradient">Научная энциклопедия</span>
              <br />
              <span className="gold-text">математики</span>
              <span className="text-ink"> азартных </span>
              <span className="emerald-text">игр</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
              className="mt-8 max-w-[58ch] text-balance text-lg leading-relaxed text-ink-2"
            >
              House edge, RTP, дисперсия, RNG, Kelly criterion, sportsbook vig и provably fair —
              сведённые в один документ. Формулы, симуляции, графики и интерактивные модели,
              которые превращают казино из загадки в систему уравнений.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/fundamentals">
                <MagneticButton variant="gold">Начать с фундамента</MagneticButton>
              </Link>
              <Link
                href="/tools"
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-ink-2 transition hover:text-ink"
              >
                Открыть симуляторы
                <span className="inline-flex size-7 items-center justify-center rounded-full border border-white/10 transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={14} weight="light" />
                </span>
              </Link>
            </motion.div>

            <motion.dl
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
              }}
              className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={{
                    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
                    },
                  }}
                  className="border-t border-white/8 pt-3"
                >
                  <dd className="font-mono text-xl md:text-2xl tracking-tight text-ink">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink-4">
                    {s.label}
                  </dt>
                </motion.div>
              ))}
            </motion.dl>
          </div>

          <div className="relative">
            <HeroOrbit />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute -bottom-4 left-0 right-0 flex justify-center"
            >
              <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink-3 backdrop-blur-md">
                Roulette · 37 cells · Single zero
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
