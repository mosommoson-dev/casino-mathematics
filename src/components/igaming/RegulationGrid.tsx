"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const REGS = [
  {
    code: "MGA",
    name: "Malta Gaming Authority",
    region: "EU · Мальта",
    note: "Один из старейших регуляторов iGaming. Требует ежегодный аудит RNG и финансовой отчётности.",
  },
  {
    code: "UKGC",
    name: "UK Gambling Commission",
    region: "Великобритания",
    note: "Один из самых строгих режимов: ответственная игра, AML, технические стандарты RTS.",
  },
  {
    code: "MGA·CH",
    name: "Curaçao eGaming (GCB)",
    region: "Кюрасао",
    note: "Бывшая «фабрика лицензий» — с 2024 переходит на структурированный режим LOK.",
  },
  {
    code: "ANJ",
    name: "Autorité Nationale des Jeux",
    region: "Франция",
    note: "Регулирует онлайн-беттинг и покер; жёсткие правила по бонусам и ставкам.",
  },
  {
    code: "AAMS",
    name: "ADM (Италия)",
    region: "Италия",
    note: "Налог с GGR ~25%, отдельная лицензия для каждой вертикали (slots / live / sports).",
  },
  {
    code: "NJDGE",
    name: "NJ Division of Gaming",
    region: "США · Нью-Джерси",
    note: "Эталон зрелого американского рынка: жёсткие geo-IP и player-protection нормы.",
  },
];

const STANDARDS = [
  {
    code: "ISO/IEC 17025",
    desc: "Общие требования к компетентности тестовых лабораторий.",
  },
  {
    code: "GLI-19",
    desc: "Стандарт для онлайн-систем мониторинга и контроля.",
  },
  {
    code: "GLI-11",
    desc: "Требования к казино-программному обеспечению и RNG.",
  },
  {
    code: "WLA SCS",
    desc: "Security Control Standard для государственных лотерей.",
  },
];

export function RegulationGrid() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {REGS.map((r, i) => (
          <Card key={r.code} className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.6 }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-lg tracking-tight text-[var(--color-gold-soft)]">
                  {r.code}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
                  {r.region}
                </span>
              </div>
              <div className="mt-2 text-sm text-ink">{r.name}</div>
              <p className="mt-3 text-sm text-ink-3 leading-relaxed">{r.note}</p>
            </motion.div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {STANDARDS.map((s) => (
            <div key={s.code} className="flex items-start gap-4">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-200">
                {s.code}
              </div>
              <p className="text-sm text-ink-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
