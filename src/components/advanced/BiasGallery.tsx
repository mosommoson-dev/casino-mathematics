"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const BIASES = [
  {
    name: "Gambler's Fallacy",
    ru: "Заблуждение игрока",
    desc: "Вера, что после серии «красных» должно выпасть «чёрное». Шарик не помнит истории — каждое испытание независимо.",
    weight: "fundamental",
  },
  {
    name: "Hot-hand fallacy",
    ru: "Иллюзия «горячей руки»",
    desc: "Зеркальная ошибка: вера, что серия выигрышей повышает вероятность следующего. Работает только в умениях, не в i.i.d. процессах.",
    weight: "fundamental",
  },
  {
    name: "Near-miss effect",
    ru: "Эффект «почти выиграл»",
    desc: "Игровые автоматы намеренно показывают почти-комбинации. Мозг интерпретирует это как «близость к награде» и увеличивает вовлечённость.",
    weight: "operator",
  },
  {
    name: "Anchoring",
    ru: "Эффект якоря",
    desc: "Большая сумма выигрыша или джекпот фиксируется как ориентир, искажая восприятие текущих ставок.",
    weight: "cognitive",
  },
  {
    name: "Loss aversion",
    ru: "Избегание потерь",
    desc: "Потеря 100 ₽ ощущается в 2–2.5 раза болезненнее, чем радость от +100 ₽. Это объясняет погоню за отыгрышем.",
    weight: "kahneman",
  },
  {
    name: "Sunk cost",
    ru: "Эффект невозвратных затрат",
    desc: "Игрок продолжает играть только потому, что «уже вложился». Прошлые проигрыши не должны влиять на будущие решения.",
    weight: "cognitive",
  },
  {
    name: "Martingale illusion",
    ru: "Мартингейл-иллюзия",
    desc: "Удвоение ставки кажется математически верным. На практике геометрический рост ставки сталкивается с лимитом стола и ограниченным банкроллом.",
    weight: "operator",
  },
  {
    name: "Survivorship bias",
    ru: "Систематическая ошибка выжившего",
    desc: "Игрок видит только истории чемпионов, не слыша о тысячах проигравших — это смещает оценку базовой ставки.",
    weight: "cognitive",
  },
  {
    name: "Hindsight bias",
    ru: "Хайндсайт",
    desc: "После исхода рука кажется «очевидно выигрышной». Это разрушает обратную связь и мешает обучению.",
    weight: "cognitive",
  },
];

const TAG_COLORS: Record<string, string> = {
  fundamental: "rgba(212,175,55,0.18)",
  operator: "rgba(244,63,94,0.18)",
  cognitive: "rgba(99,102,241,0.18)",
  kahneman: "rgba(16,185,129,0.18)",
};

export function BiasGallery() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {BIASES.map((b, i) => (
        <Card key={b.name} className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-lg tracking-tight text-ink">{b.name}</h3>
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-2"
                style={{ background: TAG_COLORS[b.weight] }}
              >
                {b.weight}
              </span>
            </div>
            <div className="mt-1 text-xs text-ink-4">{b.ru}</div>
            <p className="mt-4 text-sm text-ink-2 leading-relaxed">{b.desc}</p>
          </motion.div>
        </Card>
      ))}
    </div>
  );
}
