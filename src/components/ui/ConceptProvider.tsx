"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { concepts, type Concept } from "@/data/concepts";
import { Formula } from "./Formula";

type Ctx = {
  open: (id: string) => void;
  close: () => void;
  current: Concept | null;
};

const ConceptCtx = createContext<Ctx | null>(null);

export function useConcept() {
  const ctx = useContext(ConceptCtx);
  if (!ctx) throw new Error("useConcept must be used inside ConceptProvider");
  return ctx;
}

export function ConceptProvider({ children }: { children: React.ReactNode }) {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const open = useCallback((id: string) => {
    if (!concepts[id]) {
      // eslint-disable-next-line no-console
      console.warn(`[concept] unknown id: ${id}`);
      return;
    }
    setCurrentId(id);
  }, []);
  const close = useCallback(() => setCurrentId(null), []);

  const current = currentId ? concepts[currentId] : null;

  const value = useMemo(() => ({ open, close, current }), [open, close, current]);

  return (
    <ConceptCtx.Provider value={value}>
      {children}
      <AnimatePresence>
        {current && <ConceptPanel concept={current} onClose={close} />}
      </AnimatePresence>
    </ConceptCtx.Provider>
  );
}

function ConceptPanel({ concept, onClose }: { concept: Concept; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={`concept-${concept.id}-title`}
        className="relative h-full w-full max-w-[640px] overflow-y-auto bezel-shell mr-0 md:mr-6 my-0 md:my-6 scrollbar-thin"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
      >
        <div className="bezel-core h-full p-8 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink-3">
                <span className="size-1.5 rounded-full bg-[var(--color-gold)]" />
                Концепция
              </div>
              <h2
                id={`concept-${concept.id}-title`}
                className="text-3xl md:text-4xl font-display tracking-tight leading-[1.05] ink-gradient"
              >
                {concept.term}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-ink-2 transition hover:border-white/20 hover:text-ink active:scale-95"
              aria-label="Закрыть"
            >
              <X size={18} weight="light" />
            </button>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-ink-2 max-w-[60ch] text-pretty">
            {concept.short}
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-2">Аналогия</div>
            <p className="text-ink-2 leading-relaxed">{concept.analogy}</p>
          </div>

          {concept.formula && (
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-2">Формула</div>
              <Formula expression={concept.formula} block />
            </div>
          )}

          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-2">Глубокое объяснение</div>
            <p className="text-ink-2 leading-relaxed text-pretty">{concept.body}</p>
          </div>

          {concept.example && (
            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-300/80 mb-2">Пример</div>
              <p className="text-emerald-50/90 leading-relaxed">{concept.example}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            {concept.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-3"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}
