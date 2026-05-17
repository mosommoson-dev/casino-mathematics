export type NavItem = {
  href: string;
  label: string;
  chapter: string;
  summary: string;
};

export const navigation: NavItem[] = [
  {
    href: "/",
    label: "Введение",
    chapter: "I",
    summary: "Карта дисциплины: от вероятности к индустрии iGaming.",
  },
  {
    href: "/fundamentals",
    label: "Фундаментальные концепции",
    chapter: "II",
    summary: "EV, дисперсия, RTP, house edge, hold, hit frequency.",
  },
  {
    href: "/classic-games",
    label: "Классические игры",
    chapter: "III",
    summary: "Рулетка, блэкджек, баккара, крэпс.",
  },
  {
    href: "/slots",
    label: "Слоты и RNG",
    chapter: "IV",
    summary: "Reel maths, PAR-листы, генератор случайных чисел.",
  },
  {
    href: "/igaming",
    label: "iGaming · Live · Sportsbook",
    chapter: "V",
    summary: "Live-казино, букмекерская математика, vig, provably fair.",
  },
  {
    href: "/advanced",
    label: "Продвинутые темы",
    chapter: "VI",
    summary: "Kelly, банкролл, искажения, теория полезности.",
  },
  {
    href: "/tools",
    label: "Симуляторы и инструменты",
    chapter: "VII",
    summary: "Монте-Карло, калькуляторы, визуальные эксперименты.",
  },
  {
    href: "/glossary",
    label: "Глоссарий",
    chapter: "VIII",
    summary: "Терминология индустрии с быстрым поиском.",
  },
  {
    href: "/conclusion",
    label: "Заключение",
    chapter: "IX",
    summary: "Итоги, философия игры, источники и литература.",
  },
];
