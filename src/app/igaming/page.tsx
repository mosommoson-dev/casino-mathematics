import { PageHeader } from "@/components/ui/PageHeader";
import { IGamingContent } from "@/components/igaming/IGamingContent";

export const metadata = {
  title: "iGaming · Live · Sportsbook",
};

export default function IGamingPage() {
  return (
    <>
      <PageHeader
        chapter="V"
        eyebrow="Глава V · iGaming stack"
        title="Sportsbook, live-казино и provably fair: математика на проде."
        lead="Современная индустрия — это распределённая система с математикой в каждом слое: коэффициенты с overround, live-cтриминг с детерминированным RNG-крупье, криптографические proof-of-fairness и слой регуляции."
        accent="emerald"
      />
      <IGamingContent />
    </>
  );
}
