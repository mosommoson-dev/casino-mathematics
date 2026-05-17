import { Section, FadeIn } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Card";
import { ConceptLink } from "@/components/ui/ConceptLink";
import { KellyCalculator } from "./KellyCalculator";
import { BankrollSimulator } from "./BankrollSimulator";
import { BiasGallery } from "./BiasGallery";
import { RiskOfRuinTable } from "./RiskOfRuinTable";

export function AdvancedContent() {
  return (
    <>
      <Section id="kelly">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow accent="emerald">Kelly Criterion</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Оптимальная доля банкролла для +EV ставки
            </h2>
            <p className="text-ink-3 leading-relaxed">
              <ConceptLink id="kelly">Критерий Келли</ConceptLink> максимизирует ожидаемый
              логарифм капитала, что эквивалентно максимизации долгосрочной геометрической
              доходности. На больших горизонтах никакая другая стратегия не приведёт к большему
              капиталу.
            </p>
          </div>
        </FadeIn>
        <KellyCalculator />
      </Section>

      <Section id="bankroll" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>Bankroll · Monte Carlo</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Эволюция тысячи параллельных траекторий
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Симулируем 1000 игроков, каждый делает фиксированную ставку при заданном
              house edge. Наблюдаем медиану, квантили и долю «обанкротившихся». Это та же
              математика, что и в актуарных расчётах банкротств.
            </p>
          </div>
        </FadeIn>
        <BankrollSimulator />
      </Section>

      <Section id="risk-of-ruin" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>Risk of ruin</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Аналитическая формула вероятности разорения
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Для модели «случайное блуждание с дрейфом» существует точная формула риска
              разорения через гиперболический синус и обратный синус. Используется для расчёта
              требований к капиталу профессиональных игроков и трейдеров.
            </p>
          </div>
        </FadeIn>
        <RiskOfRuinTable />
      </Section>

      <Section id="biases" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow accent="emerald">Когнитивные искажения</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Систематические ошибки, на которых стоит индустрия
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Эти искажения исследованы Канеманом, Тверски и десятками поведенческих
              экономистов. Их знание не делает вас неуязвимым — но позволяет видеть, когда вы
              действуете против собственных интересов.
            </p>
          </div>
        </FadeIn>
        <BiasGallery />
      </Section>
    </>
  );
}
