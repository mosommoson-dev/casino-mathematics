import Link from "next/link";
import { Section, FadeIn } from "@/components/ui/Section";
import { Card, Eyebrow } from "@/components/ui/Card";
import { ArrowRight, BookOpen, FileText } from "@phosphor-icons/react/dist/ssr";

const TENETS = [
  {
    num: "01",
    title: "House edge не обманывает — он работает.",
    body: "Положительный mathematical edge у игрока в обычных играх казино невозможен (исключения: блэкджек с counter, video poker, advantage play). Принять это — первый шаг к зрелому отношению.",
  },
  {
    num: "02",
    title: "Дисперсия — не справедливость, а шум.",
    body: "Краткосрочные выигрыши не отменяют долгосрочное матожидание. Закон больших чисел сглаживает удачу, оставляя только структуру.",
  },
  {
    num: "03",
    title: "Bankroll — это интерфейс между математикой и реальностью.",
    body: "Без размерности банкролла ставка теряет смысл. Все стратегии (Kelly, fixed unit, stop-loss) — это разные способы сжимать дисперсию в допустимые пределы.",
  },
  {
    num: "04",
    title: "Психология сильнее математики на короткой дистанции.",
    body: "Loss aversion, anchoring и gambler's fallacy управляют поведением даже у профессионалов. Дисциплина — единственное преимущество, которое игрок может построить сам.",
  },
  {
    num: "05",
    title: "iGaming — это software, регулируемый математикой и государством.",
    body: "RNG-сертификация, RTP-аудиты, KYC, лимиты юрисдикций — индустрия живёт в полузакрытой экосистеме комплаенса, и в этом её зрелость.",
  },
  {
    num: "06",
    title: "Игра — не средство финансовых решений.",
    body: "Положительный EV-игрок встречается реже, чем шахматный гроссмейстер. Для всех остальных игра — категория развлечения с известной ценой.",
  },
];

const SOURCES = [
  {
    cat: "Математика и теория вероятностей",
    items: [
      {
        title: "Feller, W. — An Introduction to Probability Theory and Its Applications (Vol. I, II)",
        meta: "Wiley, 1968",
      },
      {
        title: "Ross, S. — Introduction to Probability Models",
        meta: "Academic Press, 11th ed.",
      },
      {
        title: "Epstein, R. — The Theory of Gambling and Statistical Logic",
        meta: "Academic Press, 2nd ed., 2009",
      },
      {
        title: "Hannum, R. C., Cabot, A. N. — Practical Casino Math",
        meta: "Institute for the Study of Gambling and Commercial Gaming, 2005",
      },
    ],
  },
  {
    cat: "Слоты, дизайн и RNG",
    items: [
      {
        title: "Schüll, N. D. — Addiction by Design: Machine Gambling in Las Vegas",
        meta: "Princeton University Press, 2012",
      },
      {
        title: "Harrigan, K. A. — Slot Machine Structural Characteristics",
        meta: "Int. Journal of Mental Health and Addiction, 2009",
      },
      {
        title: "GLI Standard #11 — Sports Wagering",
        meta: "Gaming Laboratories International",
      },
      {
        title: "GLI Standard #19 — Interactive Gaming Systems",
        meta: "Gaming Laboratories International",
      },
      {
        title: "NIST SP 800-22 — Statistical Test Suite for RNGs",
        meta: "U.S. National Institute of Standards and Technology",
      },
    ],
  },
  {
    cat: "Sportsbook и беттинг",
    items: [
      {
        title: "Levitt, S. D. — Why are gambling markets organised so differently from financial markets?",
        meta: "The Economic Journal, 2004",
      },
      {
        title: "Constantinou, A. C., Fenton, N. E. — Solving the Football Pyramid",
        meta: "Risk Analysis, 2017",
      },
      {
        title: "Kuypers, T. — Information and Efficiency: An Empirical Study of a Fixed Odds Betting Market",
        meta: "Applied Economics, 2000",
      },
    ],
  },
  {
    cat: "Психология решений",
    items: [
      {
        title: "Kahneman, D. — Thinking, Fast and Slow",
        meta: "Farrar, Straus and Giroux, 2011",
      },
      {
        title: "Kahneman, D., Tversky, A. — Prospect Theory: An Analysis of Decision under Risk",
        meta: "Econometrica, 1979",
      },
      {
        title: "Thaler, R. — Misbehaving",
        meta: "W. W. Norton, 2015",
      },
      {
        title: "Griffiths, M. — The Psychology of Gambling",
        meta: "Routledge, 2nd ed.",
      },
    ],
  },
  {
    cat: "Bankroll и Kelly",
    items: [
      {
        title: "Kelly, J. L. — A New Interpretation of Information Rate",
        meta: "Bell System Tech. Journal, 1956",
      },
      {
        title: "Thorp, E. O. — A Man for All Markets",
        meta: "Random House, 2017",
      },
      {
        title: "Thorp, E. O. — Beat the Dealer",
        meta: "Vintage, 1966",
      },
      {
        title: "Sklansky, D. — The Theory of Poker",
        meta: "Two Plus Two, 1994",
      },
    ],
  },
  {
    cat: "Регуляторные документы",
    items: [
      { title: "Malta Gaming Authority — Gaming Act, 2018", meta: "MGA Lex" },
      { title: "UK Gambling Commission — Licence Conditions and Codes of Practice", meta: "UKGC" },
      { title: "ISO/IEC 17025 — Testing and Calibration Laboratories", meta: "ISO" },
      { title: "WLA SCS — World Lottery Association Security Control Standard", meta: "WLA" },
    ],
  },
];

export function ConclusionContent() {
  return (
    <>
      <Section id="tenets">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>Шесть постулатов энциклопедии</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Если запомнить только это, материала будет достаточно.
            </h2>
          </div>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {TENETS.map((t) => (
            <Card key={t.num} className="p-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-soft)]/80">
                Постулат {t.num}
              </div>
              <h3 className="mt-3 font-display text-xl tracking-tight ink-gradient leading-[1.2]">
                {t.title}
              </h3>
              <p className="mt-4 text-sm text-ink-2 leading-relaxed">{t.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="philosophy" className="border-t border-white/5">
        <div className="mx-auto max-w-[68ch] space-y-7 text-ink-2 leading-relaxed">
          <FadeIn>
            <Eyebrow accent="emerald">Философское резюме</Eyebrow>
            <h2 className="mt-4 font-display text-4xl tracking-tight leading-tight ink-gradient">
              Казино — это машина по конверсии вероятности в деньги.
            </h2>
          </FadeIn>
          <p>
            Каждая ставка, каждое колесо рулетки, каждый бросок костей — экземпляр случайной
            величины с известной структурой. Долгое время эта структура была собственностью
            институтов: математических факультетов, страховых компаний, лабораторий. В iGaming
            она открылась общественности — как код, который можно перепроверить.
          </p>
          <p>
            Эта энциклопедия — попытка сделать структуру очевидной. Любой, кто читал её до
            конца, видит: за вспышками выигрышей и тишиной проигрышей живёт одна и та же
            математика. Распределения, операторы матожидания, законы сходимости. Они не делают
            игру скучной; они делают её честной.
          </p>
          <p>
            Если математика возвращает уважение к случайности, она возвращает и уважение к
            себе. Знание того, что house edge ≈ 2.7% на европейской рулетке, заменяет тысячи
            суеверий и стратегий. Знание Kelly criterion заменяет искушение «угадать момент».
            Знание risk of ruin заменяет иллюзию вечного банкролла.
          </p>
          <p>
            Это и есть финальная пасхалка: <span className="text-ink">самая выгодная ставка
            — не сделать её</span>. А если делать — то с трезвостью, которая встречается реже
            самого крупного джекпота.
          </p>
        </div>
      </Section>

      <Section id="sources" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>Sources & further reading</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Карта научной литературы по математике казино.
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Список сформирован по ключевым областям — теории вероятностей, индустриальной
              математике слотов, sportsbook-исследованиям и поведенческой экономике.
            </p>
          </div>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2">
          {SOURCES.map((cat) => (
            <Card key={cat.cat} className="p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.02]">
                  <BookOpen size={16} weight="light" />
                </span>
                <h3 className="font-display text-lg tracking-tight text-ink">{cat.cat}</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {cat.items.map((it) => (
                  <li
                    key={it.title}
                    className="flex gap-3 border-t border-white/5 pt-3 text-sm leading-relaxed first:border-0 first:pt-0"
                  >
                    <FileText
                      size={14}
                      weight="light"
                      className="mt-0.5 shrink-0 text-[var(--color-gold-soft)]/70"
                    />
                    <div>
                      <div className="text-ink">{it.title}</div>
                      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
                        {it.meta}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="closing" className="border-t border-white/5">
        <div className="bezel-shell">
          <div className="bezel-core relative overflow-hidden p-10 md:p-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(212,175,55,0.16), transparent 60%), radial-gradient(ellipse at bottom left, rgba(16,185,129,0.12), transparent 50%)",
              }}
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-[40ch] space-y-3">
                <Eyebrow accent="emerald">Edition 2026 · Russian</Eyebrow>
                <h2 className="font-display text-4xl md:text-5xl tracking-tighter leading-[1.02] ink-gradient">
                  Спасибо, что дошли до конца.
                </h2>
                <p className="text-ink-3 leading-relaxed">
                  Энциклопедия живая — новые модели, симуляторы и главы будут появляться
                  итеративно. Если вы нашли неточность или хотите расширить раздел — оставьте
                  замечание на репозитории.
                </p>
              </div>
              <Link
                href="/"
                className="group inline-flex items-center gap-3 self-start rounded-full bg-[var(--color-gold)]/95 px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-black transition active:scale-[0.98] hover:bg-[var(--color-gold)]"
              >
                Вернуться в начало
                <span className="grid size-7 place-items-center rounded-full bg-black/15 transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
