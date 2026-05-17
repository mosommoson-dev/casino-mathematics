import { Section, FadeIn, Stagger, StaggerItem } from "@/components/ui/Section";
import { Card, Eyebrow } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { ConceptLink } from "@/components/ui/ConceptLink";
import { HouseEdgeCalculator } from "./HouseEdgeCalculator";
import { VarianceCanvas } from "./VarianceCanvas";

const cards = [
  {
    term: "Expected Value",
    short: "Среднее по бесконечной серии",
    formula: "\\mathbb{E}[X] = \\sum_i p_i x_i",
    body:
      "EV — единственный показатель, которым казино оценивает каждую ставку. Положительный для оператора, отрицательный для игрока.",
    concept: "ev" as const,
  },
  {
    term: "House Edge",
    short: "Системное смещение −EV/B",
    formula: "\\text{HE} = -\\mathbb{E}[X] / B",
    body:
      "Доля каждой ставки, которую заведение оставляет себе. На горизонте миллионов рук — главное число баланса.",
    concept: "house-edge" as const,
  },
  {
    term: "RTP",
    short: "Зеркало house edge",
    formula: "\\text{RTP} = 1 - \\text{HE}",
    body:
      "Маркетинговая запись house edge: 96.5% RTP = 3.5% HE. Указывается провайдером и проверяется аудитом.",
    concept: "rtp" as const,
  },
  {
    term: "Variance",
    short: "Энергия колебаний",
    formula: "\\sigma^2 = \\mathbb{E}[(X-\\mu)^2]",
    body:
      "Определяет, насколько кратковременный результат может отклоняться от EV. Высокая дисперсия → редкие крупные события.",
    concept: "variance" as const,
  },
  {
    term: "Volatility",
    short: "Темп изменения банкролла",
    formula: "v \\approx \\sigma / \\text{RTP}",
    body:
      "Индекс волатильности связан с дисперсией, но измеряется в индексной шкале для UX-сегментации слотов.",
    concept: "volatility" as const,
  },
  {
    term: "Hit Frequency",
    short: "Доля «попаданий»",
    formula: "\\text{HF} = \\sum_{x_i > 0} p_i",
    body:
      "Вероятность того, что отдельный спин принесёт ненулевую выплату. Не путать с долгосрочной прибыльностью.",
    concept: "hit-frequency" as const,
  },
];

export function FundamentalsContent() {
  return (
    <>
      <Section id="grid">
        <FadeIn>
          <div className="mb-10 grid gap-8 md:grid-cols-[1fr_auto] items-end">
            <div className="space-y-3">
              <Eyebrow>Шесть величин</Eyebrow>
              <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
                Сетка фундаментальных метрик
              </h2>
            </div>
            <p className="md:justify-self-end max-w-[42ch] text-ink-3 leading-relaxed">
              Любая казино-игра полностью описывается её распределением выплат — остальные
              величины выводятся из него.
            </p>
          </div>
        </FadeIn>

        <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem key={c.term}>
              <Card className="p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl tracking-tight">{c.term}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
                    fund · 01
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-gold-soft)]/80 tracking-tight">
                  {c.short}
                </p>
                <div className="mt-6 rounded-2xl border border-white/8 bg-black/30 p-5">
                  <Formula expression={c.formula} block />
                </div>
                <p className="mt-5 text-ink-3 leading-relaxed">{c.body}</p>
                <div className="mt-5">
                  <ConceptLink id={c.concept}>Подробнее о {c.term}</ConceptLink>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="house-edge" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>Калькулятор · House Edge</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Постройте собственную ставку и проверьте, сколько вы отдадите казино.
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Вводите вероятность и коэффициент выплаты. Калькулятор сразу пересчитывает EV,
              house edge, RTP и ожидаемую потерю на тысяче ставок.
            </p>
          </div>
        </FadeIn>
        <HouseEdgeCalculator />
      </Section>

      <Section id="variance" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 grid gap-8 md:grid-cols-[1fr_auto] items-end">
            <div className="space-y-3">
              <Eyebrow accent="emerald">Лаборатория · Variance</Eyebrow>
              <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
                Гистограмма результатов: один RTP, разные характеры.
              </h2>
            </div>
            <p className="md:justify-self-end max-w-[42ch] text-ink-3 leading-relaxed">
              Сравните распределения трёх симуляций по 10 000 ставок: низкая, средняя и высокая
              дисперсия при идентичном house edge.
            </p>
          </div>
        </FadeIn>
        <VarianceCanvas />
      </Section>
    </>
  );
}
