import { PageHeader } from "@/components/ui/PageHeader";
import { SlotsContent } from "@/components/slots/SlotsContent";

export const metadata = {
  title: "Слоты и RNG",
};

export default function SlotsPage() {
  return (
    <>
      <PageHeader
        chapter="IV"
        eyebrow="Глава IV · Reel mathematics"
        title="Слот — это случайная функция, замаскированная под игрушку."
        lead="За катушками, символами и анимациями скрывается PAR-лист: таблица всех возможных комбинаций с их вероятностями. RNG генерирует индекс в полосе символов, а движок применяет математику линий выплат."
        accent="gold"
      />
      <SlotsContent />
    </>
  );
}
