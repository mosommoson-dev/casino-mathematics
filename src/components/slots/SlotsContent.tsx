import { Section, FadeIn } from "@/components/ui/Section";
import { Eyebrow, Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { ConceptLink } from "@/components/ui/ConceptLink";
import { SlotSimulator } from "./SlotSimulator";
import { RNGVisualiser } from "./RNGVisualiser";
import { ParListExplorer } from "./ParListExplorer";

export function SlotsContent() {
  return (
    <>
      <Section id="anatomy">
        <FadeIn>
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4">
              <Eyebrow>Анатомия слота</Eyebrow>
              <h2 className="font-display text-4xl tracking-tight leading-[1.05] ink-gradient">
                Семь компонентов современного слота
              </h2>
            </div>
            <div className="space-y-5 text-ink-3 leading-relaxed text-pretty">
              <p>
                Слот — это случайная функция <Formula expression="S: U \to \mathbb{R}" /> где
                <Formula expression="U" /> — пространство комбинаций катушек, а
                <Formula expression="S(u)" /> — суммарная выплата. Распределение получается из{" "}
                <ConceptLink id="par-sheet">PAR-листа</ConceptLink>, который содержит частоты
                символов и таблицы выплат.
              </p>
              <p>
                Аналитический <ConceptLink id="rtp">RTP</ConceptLink> вычисляется суммированием
                <Formula expression="\sum_{u\in U} p(u) \cdot S(u)" /> по всему пространству.
                Для современных слотов с тысячами линий выплат и каскадными механиками используется{" "}
                <ConceptLink id="monte-carlo">метод Монте-Карло</ConceptLink>.
              </p>
              <p>
                Скрытая от игрока часть — это <ConceptLink id="rng">сертифицированный RNG</ConceptLink>:
                криптографически стойкий генератор псевдослучайных чисел, отсемплированный в индексы
                полос символов методом rejection sampling.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "PAR", v: "лист", desc: "Математическая модель: вероятности и выплаты" },
            { k: "RNG", v: "ядро", desc: "Сертифицированный генератор случайных индексов" },
            { k: "RTP", v: "теор.", desc: "Целевая отдача по PAR-листу" },
            { k: "VAR", v: "индекс", desc: "Уровень дисперсии 1–10" },
            { k: "HF", v: "hit", desc: "Доля спинов с любой выплатой" },
            { k: "MAX", v: "win", desc: "Жёсткий потолок выплаты, обычно ×5000–×10000" },
            { k: "BC", v: "buy", desc: "Bonus Buy: прямая покупка бонус-раунда" },
            { k: "CASC", v: "ade", desc: "Каскадные механики и множители" },
          ].map((m) => (
            <Card key={m.k} className="p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
                  {m.k}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-soft)]/70">
                  {m.v}
                </span>
              </div>
              <p className="mt-4 text-sm text-ink-2 leading-snug">{m.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="simulator" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow accent="emerald">Симулятор · Live</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Виртуальный слот 5×3 с настраиваемым PAR-листом
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Каждый спин — независимая выборка из распределения, заданного полосами символов.
              Наблюдайте, как фактический RTP стремится к теоретическому по мере роста выборки.
            </p>
          </div>
        </FadeIn>
        <SlotSimulator />
      </Section>

      <Section id="par" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>PAR-лист</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Откройте «бухгалтерию» слота
            </h2>
            <p className="text-ink-3 leading-relaxed">
              PAR (Probability and Accounting Report) — таблица, по которой математик
              провайдера верифицирует игру для регулятора. Каждое значение в ней — основа
              сертификации.
            </p>
          </div>
        </FadeIn>
        <ParListExplorer />
      </Section>

      <Section id="rng" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>RNG · Криптографический генератор</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Что значит «случайно», когда речь идёт о деньгах.
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Сертифицированный CSPRNG проходит батарею тестов NIST SP 800-22, Diehard и
              Crush/Big Crush. Ниже — визуализация энтропии: чем более «шумным» выглядит
              распределение, тем лучше прошла проверка независимости и равномерности.
            </p>
          </div>
        </FadeIn>
        <RNGVisualiser />
      </Section>
    </>
  );
}
