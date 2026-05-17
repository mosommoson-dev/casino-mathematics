import { PageHeader } from "@/components/ui/PageHeader";
import { ToolsContent } from "@/components/tools/ToolsContent";

export const metadata = {
  title: "Симуляторы и инструменты",
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        chapter="VII"
        eyebrow="Глава VII · Math toolbelt"
        title="Хаб всех интерактивных моделей энциклопедии."
        lead="Здесь собраны калькуляторы EV/HE, симуляторы Монте-Карло, инструменты для снятия vig и анализа провабли-фейр игр. Все модели работают локально — никаких внешних запросов."
        accent="gold"
      />
      <ToolsContent />
    </>
  );
}
