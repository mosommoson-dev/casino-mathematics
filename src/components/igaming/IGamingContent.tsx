import { Section, FadeIn } from "@/components/ui/Section";
import { Eyebrow, Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { ConceptLink } from "@/components/ui/ConceptLink";
import { VigCalculator } from "./VigCalculator";
import { ProvablyFairDemo } from "./ProvablyFairDemo";
import { LiveCasinoBoard } from "./LiveCasinoBoard";
import { RegulationGrid } from "./RegulationGrid";

export function IGamingContent() {
  return (
    <>
      <Section id="sportsbook">
        <FadeIn>
          <div className="mb-10 grid gap-8 md:grid-cols-[1fr_auto] items-end">
            <div className="space-y-3">
              <Eyebrow accent="emerald">Sportsbook · Овэрраунд и vig</Eyebrow>
              <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
                Букмекерская маржа — это house edge на рынке коэффициентов.
              </h2>
              <p className="max-w-[65ch] text-ink-3 leading-relaxed">
                Букмекер выставляет коэффициенты так, чтобы сумма обратных значений (имплицитных
                вероятностей) превышала единицу. Эта разница и есть{" "}
                <ConceptLink id="vig">vig</ConceptLink>. На «справедливом» рынке сумма равна 1.0,
                на реальной линии — 1.05–1.10.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-2">
                Overround
              </div>
              <Formula expression="\\Omega = \\sum_i \\frac{1}{d_i} - 1" block />
            </div>
          </div>
        </FadeIn>
        <VigCalculator />
      </Section>

      <Section id="provably-fair" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>Provably Fair</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Криптография делает раздачу проверяемой каждым игроком.
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Сервер фиксирует серверный seed (хранит в секрете), публикует его хэш, клиент даёт
              свой seed и счётчик nonce. Раздача генерируется из HMAC-SHA256 по этим трём
              значениям. После раунда сервер раскрывает seed — любой игрок может пересчитать.
            </p>
          </div>
        </FadeIn>
        <ProvablyFairDemo />
      </Section>

      <Section id="live" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 grid gap-8 md:grid-cols-[1fr_auto] items-end">
            <div className="space-y-3">
              <Eyebrow accent="emerald">Live Casino · Стек инженерии</Eyebrow>
              <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
                Live — это телевидение с прокаченной математикой и QoS.
              </h2>
              <p className="max-w-[60ch] text-ink-3 leading-relaxed">
                Профессиональная live-студия — это сочетание сертифицированного оборудования,
                видеостриминга с задержкой 200–500 мс, OCR-распознавания, базы данных раздач и
                компьютерной валидации каждого исхода.
              </p>
            </div>
          </div>
        </FadeIn>
        <LiveCasinoBoard />
      </Section>

      <Section id="regulation" className="border-t border-white/5">
        <FadeIn>
          <div className="mb-10 max-w-[60ch] space-y-3">
            <Eyebrow>Регулирование</Eyebrow>
            <h2 className="font-display text-4xl tracking-tight leading-tight ink-gradient">
              Юрисдикции и стандарты математической верификации
            </h2>
            <p className="text-ink-3 leading-relaxed">
              Каждая зрелая юрисдикция требует независимой сертификации игр, отдельной
              сертификации RNG и регулярного аудита платформы. Ниже — обзор ключевых регуляторов
              и стандартов.
            </p>
          </div>
        </FadeIn>
        <RegulationGrid />
      </Section>

      <Section className="border-t border-white/5">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Latency",
              v: "<500 ms",
              d: "Live-стрим с задержкой ниже полусекунды — иначе арбитраж между потоками.",
            },
            {
              t: "Streaming",
              v: "WebRTC SFU",
              d: "Сегментированная доставка через SFU-сервера для масштабирования на 100k+.",
            },
            {
              t: "Persistence",
              v: "Event-sourced",
              d: "Каждая раздача — неизменное событие в append-only журнале для аудита.",
            },
            {
              t: "Anti-fraud",
              v: "ML + heuristics",
              d: "Multi-accounting, bot-play, рисковые ставки и AML — все детектится моделью.",
            },
            {
              t: "KYC",
              v: "AML/CFT",
              d: "Жёсткий клиентский due-diligence на каждом депозите и выводе средств.",
            },
            {
              t: "RTP audits",
              v: "Monthly",
              d: "Лаборатории сравнивают наблюдаемый RTP с теоретическим по контрольным выборкам.",
            },
          ].map((c) => (
            <Card key={c.t} className="p-6">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">{c.t}</div>
              <div className="mt-2 font-mono text-lg text-[var(--color-gold-soft)]">{c.v}</div>
              <p className="mt-3 text-sm text-ink-2 leading-relaxed">{c.d}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
