import { PageHeader } from "@/components/ui/PageHeader";
import { AdvancedContent } from "@/components/advanced/AdvancedContent";

export const metadata = {
  title: "Продвинутые темы",
};

export default function AdvancedPage() {
  return (
    <>
      <PageHeader
        chapter="VI"
        eyebrow="Глава VI · Decision under uncertainty"
        title="Kelly, банкролл-менеджмент и когнитивные искажения."
        lead="Эта глава — стык математики, психологии и теории принятия решений. Здесь живёт критерий Келли, симуляции банкролла и каталог систематических ошибок, которыми пользуется индустрия."
        accent="emerald"
      />
      <AdvancedContent />
    </>
  );
}
