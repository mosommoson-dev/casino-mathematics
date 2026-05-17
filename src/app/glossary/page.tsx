import { PageHeader } from "@/components/ui/PageHeader";
import { GlossaryContent } from "@/components/glossary/GlossaryContent";

export const metadata = {
  title: "Глоссарий",
};

export default function GlossaryPage() {
  return (
    <>
      <PageHeader
        chapter="VIII"
        eyebrow="Глава VIII · Lexicon"
        title="Полный словарь языка казино, sportsbook и iGaming."
        lead="120+ терминов от bankroll до zero-bias estimator. Поиск работает по названию, описанию, аналогии и тегам — Cmd-K активирует фокус на поле поиска."
        accent="gold"
      />
      <GlossaryContent />
    </>
  );
}
