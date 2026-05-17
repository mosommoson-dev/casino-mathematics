"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { navigation } from "@/data/navigation";
import { Section, FadeIn } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Card";

export function ChapterMap() {
  return (
    <Section id="chapters" className="border-t border-white/5">
      <FadeIn>
        <div className="mb-14 grid gap-8 md:grid-cols-2 items-end">
          <div className="space-y-4">
            <Eyebrow>Девять глав</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-display tracking-tight leading-[1.02] ink-gradient">
              Карта дисциплины
            </h2>
          </div>
          <p className="text-ink-3 md:justify-self-end max-w-[55ch] leading-relaxed">
            Тематический маршрут от основ теории вероятностей до устройства live-казино,
            sportsbook и регулирования.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] md:grid-cols-2 xl:grid-cols-3">
        {navigation.map((item, i) => (
          <Link key={item.href} href={item.href} className="group relative block">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="relative h-full bg-[var(--color-background-2)] p-7 transition-colors hover:bg-[var(--color-background-3)]"
            >
              <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
                <span>Chapter {item.chapter}</span>
                <span>0{i + 1}/0{navigation.length}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl tracking-tight ink-gradient leading-tight">
                {item.label}
              </h3>
              <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-ink-3">
                {item.summary}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-gold-soft)]/80">
                Перейти к главе
                <ArrowUpRight size={14} weight="light" className="transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
