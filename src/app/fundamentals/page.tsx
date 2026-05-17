import { PageHeader } from "@/components/ui/PageHeader";
import { FundamentalsContent } from "@/components/fundamentals/FundamentalsContent";

export const metadata = {
  title: "Фундаментальные концепции",
};

export default function FundamentalsPage() {
  return (
    <>
      <PageHeader
        chapter="II"
        eyebrow="Фундамент"
        title="Шесть величин, описывающих любую азартную игру."
        lead="EV, дисперсия, RTP, house edge, hold и hit frequency — фундаментальная шестёрка, из которой выводятся все остальные показатели. Считаем их с нуля, проверяем интуицию и тренируем калькуляторами."
      />
      <FundamentalsContent />
    </>
  );
}
