"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/data/navigation";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed left-0 top-0 z-30 hidden h-[100dvh] w-[280px] flex-col border-r border-white/5 bg-[var(--color-background-2)]/60 backdrop-blur-xl md:flex">
        <SidebarInner pathname={pathname} />
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              onClick={onClose}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Закрыть навигацию"
            />
            <motion.aside
              className="relative h-full w-[300px] border-r border-white/5 bg-[var(--color-background-2)]"
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-ink-2 hover:text-ink"
                aria-label="Закрыть навигацию"
              >
                <X size={18} weight="light" />
              </button>
              <SidebarInner pathname={pathname} onNavigate={onClose} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarInner({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        onClick={onNavigate}
        className="group block px-7 pt-9 pb-7 border-b border-white/5"
      >
        <div className="text-[10px] uppercase tracking-[0.24em] text-ink-3 mb-2">энциклопедия</div>
        <div className="font-display text-xl tracking-tight ink-gradient leading-none">
          Casino<br />Mathematics
        </div>
        <div className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold-soft)]/70">
          <span className="size-1 rounded-full bg-[var(--color-gold)] animate-pulse" />
          v1.0 · 2026
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-6">
        <ul className="space-y-1">
          {navigation.map((item, i) => {
            const active = item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group relative block rounded-xl px-4 py-3 transition-colors",
                    active
                      ? "bg-white/[0.04] border border-white/10"
                      : "border border-transparent hover:bg-white/[0.025]",
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tracking-widest text-ink-4 group-hover:text-[var(--color-gold-soft)]">
                      {item.chapter.padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-sm leading-tight",
                        active ? "text-ink" : "text-ink-2 group-hover:text-ink",
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-snug text-ink-4 line-clamp-2">{item.summary}</p>
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute -left-1 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[var(--color-gold)]"
                      transition={{ type: "spring", stiffness: 250, damping: 30 }}
                    />
                  )}
                  {/* progress index */}
                  <div className="absolute right-3 top-3 font-mono text-[9px] text-ink-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {String(i + 1).padStart(2, "0")} / {String(navigation.length).padStart(2, "0")}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/5 px-7 py-5 text-[10px] uppercase tracking-[0.22em] text-ink-4">
        DESIGN_VARIANCE · 7
        <br />
        MOTION_INTENSITY · 8
        <br />
        VISUAL_DENSITY · 6
      </div>
    </div>
  );
}
