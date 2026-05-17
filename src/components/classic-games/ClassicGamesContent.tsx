import { Section, FadeIn } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Card";
import { ConceptLink } from "@/components/ui/ConceptLink";
import { Formula } from "@/components/ui/Formula";
import { RouletteSimulator } from "./RouletteSimulator";
import { BlackjackBoard } from "./BlackjackBoard";
import { BaccaratPanel } from "./BaccaratPanel";

export function ClassicGamesContent() {
  return (
    <>
      <Section id="roulette">
        <FadeIn>
          <div className="mb-10 grid gap-8 md:grid-cols-[1fr_auto] items-end">
            <div className="space-y-3">
              <Eyebrow>Roulette · Математика колеса</Eyebrow>
              <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
                Один шарик, 37 ячеек и идеально симметричная асимметрия.
              </h2>
              <p className="max-w-[65ch] text-ink-3 leading-relaxed">
                Европейская рулетка имеет 37 равновероятных исходов с зеркальной структурой выплат
                на простых ставках, кроме одного: зеро не оплачивает «красное», «чёрное», «чёт» и
                «нечёт». Эта единственная клетка и формирует <ConceptLink id="house-edge">house edge</ConceptLink>
                {" "}в 2.70%.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-2">
                EV простой ставки
              </div>
              <Formula expression="\\mathbb{E}[X] = \\tfrac{18}{37}\\cdot 1 + \\tfrac{19}{37}\\cdot(-1) = -\\tfrac{1}{37}" block />
            </div>
          </div>
        </FadeIn>
        <RouletteSimulator />
      </Section>

      <Section id="blackjack" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 grid gap-8 md:grid-cols-[1fr_auto] items-end">
            <div className="space-y-3">
              <Eyebrow accent="emerald">Blackjack · Базовая стратегия</Eyebrow>
              <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
                Игра с памятью, где математика снижает house edge до 0.5%.
              </h2>
              <p className="max-w-[65ch] text-ink-3 leading-relaxed">
                Блэкджек уникален: исходы не независимы (карты выходят без возврата), поэтому
                существует базовая стратегия, превращающая хаотичную раздачу в детерминированный
                алгоритм решений. Подсчёт карт — это всего лишь обновление условной вероятности
                по уже известной информации.
              </p>
            </div>
          </div>
        </FadeIn>
        <BlackjackBoard />
      </Section>

      <Section id="baccarat" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>Baccarat · Чистая теория вероятностей</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Banker, Player, Tie — три исхода и одна оптимальная ставка.
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Baccarat не оставляет места стратегии. Все правила «hit/stand» прописаны жёстко, а
              математически у Banker всегда меньшее house edge. Цена этого преимущества — 5%-я
              комиссия с выигрыша.
            </p>
          </div>
        </FadeIn>
        <BaccaratPanel />
      </Section>
    </>
  );
}
