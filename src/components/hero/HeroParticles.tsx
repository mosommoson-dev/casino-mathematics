"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  drift: number;
};

const COLORS = [
  "rgba(212, 175, 55, 0.7)",
  "rgba(212, 175, 55, 0.4)",
  "rgba(16, 185, 129, 0.55)",
  "rgba(244, 244, 250, 0.4)",
  "rgba(244, 244, 250, 0.2)",
];

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function HeroParticles() {
  const particles: Particle[] = useMemo(() => {
    const rng = mulberry32(20260517);
    return Array.from({ length: 64 }, (_, i) => ({
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      size: 1 + rng() * 2.4,
      delay: rng() * 6,
      duration: 6 + rng() * 8,
      color: COLORS[Math.floor(rng() * COLORS.length)],
      drift: -10 + rng() * 20,
    }));
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          className="absolute rounded-full"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.9, 0], y: [0, -40, -80], x: [0, p.drift, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
