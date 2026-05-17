"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { glossary, allTags, type GlossaryEntry } from "@/data/glossary";

const ALPHA = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export function GlossaryContent() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossary.filter((e) => {
      if (activeTag && !e.tags.includes(activeTag)) return false;
      if (activeLetter && e.letter !== activeLetter) return false;
      if (!q) return true;
      return (
        e.term.toLowerCase().includes(q) ||
        e.short.toLowerCase().includes(q) ||
        e.body.toLowerCase().includes(q) ||
        e.tags.some((t) => t.includes(q))
      );
    });
  }, [query, activeTag, activeLetter]);

  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryEntry[]>();
    for (const e of filtered) {
      const arr = map.get(e.letter) ?? [];
      arr.push(e);
      map.set(e.letter, arr);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const available = useMemo(
    () => new Set(glossary.map((g) => g.letter)),
    [],
  );

  return (
    <Section className="pt-0">
      <div className="sticky top-[68px] z-30 -mx-4 px-4 pb-6 md:-mx-6 md:px-6">
        <div className="bezel-shell">
          <div className="bezel-core p-4 md:p-6 backdrop-blur-md bg-black/40">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <label className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition focus-within:border-[var(--color-gold)]/50">
                <MagnifyingGlass size={18} weight="light" className="text-ink-3 group-focus-within:text-[var(--color-gold-soft)]" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск термина, описания, тега…"
                  className="w-full bg-transparent text-base text-ink placeholder:text-ink-4 outline-none"
                  spellCheck={false}
                />
                <kbd className="hidden md:inline-flex items-center gap-1 rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  ⌘K
                </kbd>
              </label>
              <div className="flex items-center justify-between gap-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">
                  Найдено: <span className="text-ink">{filtered.length}</span> / {glossary.length}
                </div>
                <button
                  onClick={() => {
                    setQuery("");
                    setActiveTag(null);
                    setActiveLetter(null);
                  }}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-ink-3 hover:text-ink"
                >
                  Сброс
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setActiveTag((cur) => (cur === tag ? null : tag))
                  }
                  className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
                    activeTag === tag
                      ? "border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 text-[var(--color-gold-soft)]"
                      : "border border-white/10 bg-white/[0.02] text-ink-3 hover:text-ink"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1">
              {ALPHA.map((l) => {
                const has = available.has(l);
                const active = activeLetter === l;
                return (
                  <button
                    key={l}
                    onClick={() => has && setActiveLetter((c) => (c === l ? null : l))}
                    disabled={!has}
                    className={`size-7 rounded-md font-mono text-xs transition ${
                      active
                        ? "bg-[var(--color-gold)]/90 text-black"
                        : has
                          ? "text-ink-2 hover:text-ink"
                          : "text-ink-4/40"
                    }`}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-12">
        <AnimatePresence mode="popLayout">
          {grouped.map(([letter, entries]) => (
            <motion.div
              key={letter}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="mb-5 flex items-baseline gap-4">
                <h2 className="font-display text-5xl tracking-tighter text-[var(--color-gold)]/85">
                  {letter}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                <span className="font-mono text-xs text-ink-4">{entries.length}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {entries.map((e) => (
                  <Card key={e.term} className="p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg tracking-tight text-ink">
                        {e.term}
                      </h3>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-ink-4">
                        {e.tags[0]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ink-2 leading-relaxed">{e.short}</p>
                    <p className="mt-3 text-xs text-ink-3 leading-relaxed">{e.body}</p>
                    {e.tags.length > 1 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {e.tags.slice(1).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/8 bg-white/[0.02] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-3"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-10 text-center">
            <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">
              Empty state
            </div>
            <p className="mt-3 text-ink-2">
              По запросу <span className="font-mono text-[var(--color-gold-soft)]">«{query}»</span>
              {activeTag && (
                <> с тегом <span className="font-mono">{activeTag}</span></>
              )}{" "}
              ничего не найдено.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
