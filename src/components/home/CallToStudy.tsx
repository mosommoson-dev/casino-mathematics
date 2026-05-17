import Link from "next/link";
import { Section, FadeIn } from "@/components/ui/Section";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CallToStudy() {
  return (
    <Section id="cta" className="border-t border-white/5">
      <FadeIn>
        <div className="bezel-shell">
          <div className="bezel-core relative overflow-hidden p-10 md:p-16">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-50"
              style={{
                background:
                  "radial-gradient(600px 300px at 80% 30%, rgba(212,175,55,0.18), transparent), radial-gradient(500px 240px at 10% 80%, rgba(16,185,129,0.12), transparent)",
              }}
            />
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-ink-3">
                  <span className="size-1.5 rounded-full bg-[var(--color-emerald)]" />
                  Начало пути
                </div>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.02] tracking-tight ink-gradient text-balance">
                  Чтобы понять казино — нужно перестать в него играть и начать его моделировать.
                </h2>
                <p className="text-ink-3 max-w-[60ch] leading-relaxed">
                  Все формулы, симуляторы и графики сайта — это инструменты для построения
                  собственных моделей. Используйте их как лабораторию, а не как инструкцию.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <Link href="/fundamentals">
                  <MagneticButton variant="gold">Глава II — Фундамент</MagneticButton>
                </Link>
                <Link href="/glossary">
                  <MagneticButton variant="ghost">Открыть глоссарий</MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
