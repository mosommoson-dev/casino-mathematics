import Link from "next/link";
import { Section, FadeIn } from "@/components/ui/Section";
import { Card, Eyebrow } from "@/components/ui/Card";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CoinFlipLab } from "./CoinFlipLab";
import { MonteCarloLab } from "./MonteCarloLab";

const TOOLS = [
  {
    title: "House Edge Calculator",
    desc: "Соберите произвольное распределение исходов — получите EV, HE, RTP, σ.",
    href: "/fundamentals#house-edge-calculator",
    tag: "Calc",
  },
  {
    title: "Variance Canvas",
    desc: "Сравнение трёх профилей дисперсии при равном RTP.",
    href: "/fundamentals#variance",
    tag: "Lab",
  },
  {
    title: "Roulette Simulator",
    desc: "Анимированное колесо, 7 типов ставок, статистика по 1000+ спинам.",
    href: "/classic-games#roulette",
    tag: "Sim",
  },
  {
    title: "Blackjack Basic Strategy",
    desc: "Цветная матрица оптимальных действий для 6-deck H17.",
    href: "/classic-games#blackjack",
    tag: "Chart",
  },
  {
    title: "Slot 5×3 Sandbox",
    desc: "5 катушек, 5 линий, scatter, конфигурируемая ставка и auto-spin.",
    href: "/slots#simulator",
    tag: "Sim",
  },
  {
    title: "PAR Sheet Explorer",
    desc: "Каждый символ, вероятность 5-of-a-kind, вклад линии в RTP.",
    href: "/slots#par",
    tag: "Data",
  },
  {
    title: "Vig / Overround Calculator",
    desc: "Снимите маржу с любого числа исходов и получите справедливую линию.",
    href: "/igaming#sportsbook",
    tag: "Calc",
  },
  {
    title: "Provably Fair Demo",
    desc: "Hash-commit, HMAC-SHA256, верификация раздач — вживую.",
    href: "/igaming#provably-fair",
    tag: "Crypto",
  },
  {
    title: "Kelly Criterion",
    desc: "Оптимальная доля банкролла, half/quarter-Kelly, гео. рост.",
    href: "/advanced#kelly",
    tag: "Calc",
  },
  {
    title: "Bankroll Monte Carlo",
    desc: "64 параллельные траектории, квантили, доля разорений.",
    href: "/advanced#bankroll",
    tag: "Sim",
  },
];

export function ToolsContent() {
  return (
    <>
      <Section id="hub">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group relative block focus:outline-none"
            >
              <Card className="p-6 transition-all duration-500 group-hover:shadow-[0_0_60px_-30px_rgba(212,175,55,0.45)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-soft)]/80">
                      {t.tag}
                    </span>
                    <h3 className="mt-2 font-display text-xl tracking-tight text-ink">
                      {t.title}
                    </h3>
                  </div>
                  <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight size={16} weight="light" />
                  </span>
                </div>
                <p className="mt-4 text-sm text-ink-3 leading-relaxed">{t.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="coin-flip" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>Coin-flip Lab</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Простейшая модель: как закон больших чисел стирает случайность.
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Подкиньте монету 1, 10, 1000 или 100 000 раз и наблюдайте сходимость доли «орлов»
              к 0.5 c характерной σ ≈ 1/(2√n).
            </p>
          </div>
        </FadeIn>
        <CoinFlipLab />
      </Section>

      <Section id="monte-carlo" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow accent="emerald">Универсальный Monte Carlo</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Найдите RTP, дисперсию и hit-frequency любой игры.
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Зададите распределение исходов и количество испытаний — получите эмпирические
              оценки с ошибкой порядка <span className="font-mono">σ/√N</span>.
            </p>
          </div>
        </FadeIn>
        <MonteCarloLab />
      </Section>
    </>
  );
}
