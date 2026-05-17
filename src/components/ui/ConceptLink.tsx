"use client";

import { motion } from "framer-motion";
import { useConcept } from "./ConceptProvider";

type Props = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export function ConceptLink({ id, children, className }: Props) {
  const { open } = useConcept();
  return (
    <motion.button
      type="button"
      onClick={() => open(id)}
      className={
        "group relative inline-flex items-baseline rounded-md px-1.5 text-[var(--color-gold-soft)] underline decoration-[var(--color-gold)]/30 decoration-dotted underline-offset-[5px] transition-colors hover:text-[var(--color-gold)] " +
        (className ?? "")
      }
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span>{children}</span>
      <span className="ml-1 size-1.5 translate-y-[-1px] rounded-full bg-[var(--color-gold)]/60 transition group-hover:bg-[var(--color-gold)]" />
    </motion.button>
  );
}
