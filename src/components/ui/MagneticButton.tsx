"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "gold" | "ghost" | "emerald";
  className?: string;
  trailing?: boolean;
};

export function MagneticButton({
  children,
  onClick,
  href,
  variant = "gold",
  className,
  trailing = true,
}: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.6 });
  const x = useTransform(sx, (v) => v * 0.18);
  const y = useTransform(sy, (v) => v * 0.18);
  const iconX = useTransform(sx, (v) => v * 0.06);
  const iconY = useTransform(sy, (v) => v * 0.06);

  const Comp: any = href ? motion.a : motion.button;

  const palette =
    variant === "gold"
      ? "bg-gradient-to-b from-[#efd57a] via-[#d4af37] to-[#9d7e1b] text-[#0c0a06] shadow-[0_8px_30px_-12px_rgba(212,175,55,0.6)]"
      : variant === "emerald"
        ? "bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-700 text-[#04130b] shadow-[0_8px_30px_-12px_rgba(16,185,129,0.6)]"
        : "bg-white/[0.04] text-ink border border-white/10 hover:border-white/20";

  return (
    <Comp
      href={href}
      onClick={onClick}
      style={{ x, y }}
      onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors",
        palette,
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {trailing && (
        <motion.span
          style={{ x: iconX, y: iconY }}
          className={cn(
            "relative z-10 inline-flex size-8 items-center justify-center rounded-full transition-transform group-hover:scale-105",
            variant === "ghost" ? "bg-white/10" : "bg-black/15",
          )}
        >
          <ArrowUpRight size={16} weight="light" />
        </motion.span>
      )}
    </Comp>
  );
}
