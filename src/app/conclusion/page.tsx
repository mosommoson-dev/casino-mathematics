import { PageHeader } from "@/components/ui/PageHeader";
import { ConclusionContent } from "@/components/conclusion/ConclusionContent";

export const metadata = {
  title: "Заключение",
};

export default function ConclusionPage() {
  return (
    <>
      <PageHeader
        chapter="IX"
        eyebrow="Глава IX · Coda"
        title="Что остаётся, когда исчезает блеск зала."
        lead="Математика казино — это аксиоматика индустрии. Она объясняет цены, маркетинг, регуляцию и психологию. Понимание этой аксиоматики не делает игрока выигрышным, но защищает от мифов и манипуляций."
        accent="emerald"
      />
      <ConclusionContent />
    </>
  );
}
