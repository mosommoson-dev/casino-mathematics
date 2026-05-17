import { PageHeader } from "@/components/ui/PageHeader";
import { ClassicGamesContent } from "@/components/classic-games/ClassicGamesContent";

export const metadata = {
  title: "Классические игры",
};

export default function ClassicGamesPage() {
  return (
    <>
      <PageHeader
        chapter="III"
        eyebrow="Глава III · Stone-cold classics"
        title="Рулетка, блэкджек и баккара: эталонные модели house edge."
        lead="Игры, на которых отстраивалась вся индустрия. У каждой из них точный аналитический house edge, который можно вывести на одной странице — что мы и сделаем, попутно крутя анимированное колесо."
        accent="gold"
      />
      <ClassicGamesContent />
    </>
  );
}
