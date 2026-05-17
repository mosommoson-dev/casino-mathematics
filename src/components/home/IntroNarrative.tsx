import { Section, FadeIn } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Card";
import { ConceptLink } from "@/components/ui/ConceptLink";
import { Formula } from "@/components/ui/Formula";

export function IntroNarrative() {
  return (
    <Section id="intro" className="border-t border-white/5">
      <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
        <FadeIn>
          <div className="space-y-6 md:sticky md:top-32">
            <Eyebrow>Глава I · Введение</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-display tracking-tight leading-[1.02] ink-gradient text-balance">
              Казино — это не магия удачи, а инженерия ожидаемого значения.
            </h2>
            <p className="text-ink-3 leading-relaxed">
              За каждой рулеткой, каждой катушкой слота и каждой котировкой sportsbook стоит
              формальная математическая модель. Эта энциклопедия раскладывает её на кирпичи —
              от Бернулли до Колмогорова, от PAR-листа до Provably Fair.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="prose space-y-8 text-ink-2 leading-relaxed text-pretty">
            <p className="text-lg">
              Каждая ставка — это случайная величина <Formula expression="X" />. Её распределение
              задаёт правила игры. Долгосрочное поведение определяется математическим ожиданием
              <Formula expression="\mathbb{E}[X]" />, а краткосрочные колебания — дисперсией
              <Formula expression="\sigma^2 = \mathbb{E}[(X-\mu)^2]" />.
            </p>
            <p>
              Когда казино или букмекер устанавливают <ConceptLink id="house-edge">house edge</ConceptLink>,
              они фактически определяют долю ставки, которая в среднем остаётся им — независимо
              от того, кто конкретно сегодня выиграл. Этот сдвиг гарантирует
              положительный <ConceptLink id="ev">EV</ConceptLink> для оператора и отрицательный — для игрока.
            </p>
            <p>
              Однако игрок ощущает не центральную тенденцию, а <ConceptLink id="variance">дисперсию</ConceptLink>.
              Поэтому игры с одинаковой <ConceptLink id="rtp">RTP</ConceptLink> могут субъективно
              ощущаться совершенно по-разному: один слот «вибрирует» от частых выплат, другой —
              превращается в тишину перед редкими взрывами джекпотов.
            </p>
            <p>
              Закон больших чисел и центральная предельная теорема обещают сходимость, но эта
              сходимость работает в пользу казино, потому что у него миллионы рук в сутки,
              а у игрока — единицы. Эта асимметрия — главная истина индустрии.
            </p>
            <p>
              Цель этой энциклопедии — не отговорить от игры и не научить «обыгрывать систему»,
              а дать инструменты для строгого, количественного понимания математики, которая
              лежит в основе iGaming. Здесь нет советов, есть только формулы, графики и
              симуляции.
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
