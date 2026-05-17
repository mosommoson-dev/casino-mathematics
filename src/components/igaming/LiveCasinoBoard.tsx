"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const COLUMNS = [
  {
    title: "Стол",
    items: [
      "Сертифицированный wheel / shoe",
      "Камеры 4K · 60 fps · multi-angle",
      "Лазерный сенсор позиции шарика",
    ],
  },
  {
    title: "Сигнал",
    items: [
      "OCR + sensors → событие в шину",
      "WebRTC SFU · <500 мс latency",
      "Failover на резервный поток",
    ],
  },
  {
    title: "Математика",
    items: [
      "Валидация исхода с детерминированной таблицей",
      "Pay-resolution engine: bonus + side bets",
      "Аномалия / fraud-detect ML-модель",
    ],
  },
  {
    title: "Платформа",
    items: [
      "Event-sourced ledger · append only",
      "Real-time payout pipeline",
      "Compliance · KYC · AML · GambleAware",
    ],
  },
];

export function LiveCasinoBoard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {COLUMNS.map((col, i) => (
        <Card key={col.title} className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-soft)]/80">
              Слой {i + 1}
            </div>
            <h3 className="mt-2 font-display text-xl tracking-tight text-ink">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.items.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-2 text-sm text-ink-2 leading-snug"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        </Card>
      ))}
    </div>
  );
}
