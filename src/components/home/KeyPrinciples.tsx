"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Section, Stagger, StaggerItem, FadeIn } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { Function as FunctionIcon, Infinity as InfinityIcon, Sparkle, ShieldCheck, ChartLine, Cpu } from "@phosphor-icons/react";

const principles = [
  {
    icon: FunctionIcon,
    title: "Линейность ожидания",
    formula: "\\mathbb{E}[aX + bY] = a\\mathbb{E}[X] + b\\mathbb{E}[Y]",
    body: "Складывайте EV отдельных раздач — получаете EV сессии. Эта простая истина важнее любой стратегии.",
  },
  {
    icon: InfinityIcon,
    title: "Закон больших чисел",
    formula: "\\bar{X}_n \\xrightarrow{n \\to \\infty} \\mathbb{E}[X]",
    body: "Длинная дистанция стирает удачу. Казино зарабатывает на этом каждое мгновение.",
  },
  {
    icon: ChartLine,
    title: "Центральная предельная",
    formula: "\\frac{\\bar X_n - \\mu}{\\sigma/\\sqrt n} \\sim \\mathcal{N}(0,1)",
    body: "Распределение суммарного PnL стремится к нормальному. Риск-менеджмент строится в σ-единицах.",
  },
  {
    icon: ShieldCheck,
    title: "Provably Fair",
    formula: "r = H(s_{srv} \\Vert s_{cli} \\Vert n)",
    body: "Криптографическая подпись seed-ов делает результат проверяемым после факта.",
  },
  {
    icon: Cpu,
    title: "Cryptographic RNG",
    formula: "x_{n+1} = AES_k(x_n)",
    body: "Сертифицированные PRNG неотличимы от случайного шума за полиномиальное время.",
  },
  {
    icon: Sparkle,
    title: "Kelly-оптимальность",
    formula: "f^\\ast = \\frac{bp - q}{b}",
    body: "Доля капитала, максимизирующая логарифмический рост при наличии преимущества.",
  },
];

export function KeyPrinciples() {
  return (
    <Section id="principles" className="border-t border-white/5">
      <FadeIn>
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] items-end mb-14">
          <div className="space-y-4">
            <Eyebrow>Шесть законов</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-display tracking-tight leading-[1.03] ink-gradient">
              Принципы, на которых стоит индустрия
            </h2>
          </div>
          <p className="text-ink-3 max-w-[55ch] leading-relaxed md:justify-self-end">
            Шесть фундаментальных утверждений, без которых нельзя разобрать ни одну игру.
            Каждый принцип сопровождается формулой и физической интуицией.
          </p>
        </div>
      </FadeIn>

      <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {principles.map((p) => (
          <StaggerItem key={p.title}>
            <PrincipleCard {...p} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

function PrincipleCard({
  icon: Icon,
  title,
  formula,
  body,
}: {
  icon: typeof FunctionIcon;
  title: string;
  formula: string;
  body: string;
}) {
  return (
    <Card className="relative overflow-hidden p-8">
      <motion.div
        aria-hidden
        className="absolute -top-12 -right-12 size-32 rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.18),transparent)]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
          <Icon size={20} weight="light" className="text-[var(--color-gold-soft)]" />
        </span>
        <h3 className="font-display text-xl tracking-tight">{title}</h3>
      </div>
      <div className="relative mt-6 rounded-2xl border border-white/8 bg-black/30 p-5">
        <Formula expression={formula} block />
      </div>
      <p className="relative mt-5 text-ink-3 leading-relaxed">{body}</p>
    </Card>
  );
}
