"use client";

import Link from "next/link";
import { List, MagnifyingGlass, BookOpen } from "@phosphor-icons/react";

export function TopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-[var(--color-background)]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenu}
            className="rounded-full border border-white/10 bg-white/[0.02] p-2.5 text-ink-2 transition hover:text-ink md:hidden"
            aria-label="Открыть навигацию"
          >
            <List size={18} weight="light" />
          </button>
          <div className="hidden md:flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-4">
            <span className="size-1.5 rounded-full bg-[var(--color-emerald)] animate-pulse" />
            Edition 2026 · Russian
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-ink-3">
          <MagnifyingGlass size={14} weight="light" />
          <span className="font-mono">/glossary</span>
          <span className="ml-3 inline-flex items-center gap-1 rounded-full border border-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.22em] text-ink-4">
            beta
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/glossary"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-ink-2 hover:text-ink"
          >
            <BookOpen size={14} weight="light" />
            Глоссарий
          </Link>
          <Link
            href="/tools"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#efd57a] via-[#d4af37] to-[#9d7e1b] px-4 py-2 text-xs font-medium text-[#0c0a06] shadow-[0_8px_30px_-12px_rgba(212,175,55,0.6)] transition active:scale-[0.98]"
          >
            Симуляторы
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-black/15 group-hover:translate-x-0.5 transition-transform">
              <span className="block size-1.5 rounded-full bg-current" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
