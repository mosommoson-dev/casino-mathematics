"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ScrollProgress } from "./ScrollProgress";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex min-h-[100dvh]">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="relative flex w-full flex-col md:pl-[280px]">
        <TopBar onMenu={() => setOpen(true)} />
        <ScrollProgress />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 grid gap-12 md:grid-cols-3">
        <div className="space-y-4">
          <div className="text-[10px] uppercase tracking-[0.24em] text-ink-3">Casino Mathematics</div>
          <p className="max-w-[40ch] text-ink-2 leading-relaxed">
            Научная энциклопедия математики казино, слотов, live-игр и sportsbook. Создано как
            справочник для аналитиков, разработчиков и исследователей iGaming.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="text-[10px] uppercase tracking-[0.24em] text-ink-3">Методология</div>
          <p className="text-ink-3 leading-relaxed max-w-[40ch]">
            Все формулы базируются на классической теории вероятностей, теории игр и эмпирических
            данных регуляторов (UKGC, MGA, NV GCB, GLI).
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="text-[10px] uppercase tracking-[0.24em] text-ink-3">Уведомление</div>
          <p className="text-ink-3 leading-relaxed max-w-[40ch]">
            Материалы представлены исключительно в образовательных целях. Все игры на реальные
            деньги имеют отрицательное матожидание для игрока.
          </p>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-[11px] tracking-[0.2em] uppercase text-ink-4">
        Built with Next.js · Framer Motion · KaTeX · Three.js
      </div>
    </footer>
  );
}
