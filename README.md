# Casino Mathematics — Scientific Encyclopedia of Gambling and iGaming

A premium, deeply researched web encyclopedia covering the mathematics behind every form of casino gambling — RNGs, slots, roulette, blackjack, baccarat, sportsbook pricing, provably fair cryptography, bankroll management and the cognitive biases that drive the industry.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS 4, Framer Motion, React Three Fiber, Recharts and KaTeX.

## Stack

- **Framework:** Next.js 15 (App Router) + React 19 RC
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (CSS-first config)
- **Motion:** Framer Motion (springs, stagger, layout, magnetic hover)
- **3D:** Three.js + @react-three/fiber + @react-three/drei
- **Charts:** Recharts
- **Math typesetting:** KaTeX
- **Icons:** @phosphor-icons/react (light strokes)

## Sections

1. Hero
2. Введение в математику казино
3. Фундаментальные концепции (House Edge, RTP, EV, Variance, Volatility)
4. Классические игры (рулетка, блэкджек, баккара)
5. Слоты и RNG
6. iGaming, Live Casino, Sportsbook, Provably Fair
7. Продвинутые темы (Kelly, банкролл, когнитивные искажения)
8. Интерактивные инструменты и симуляторы
9. Глоссарий
10. Заключение и источники

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Design system

- Premium dark theme: deep navy (`#06090F`) + gold (`#D4AF37`) + emerald (`#10B981`)
- Display font: Cabinet Grotesk / fallback to Geist via Next/Font
- Mono: JetBrains Mono
- Variance dials: `DESIGN_VARIANCE = 7`, `MOTION_INTENSITY = 8`, `VISUAL_DENSITY = 6`
- Concept tooltips rendered through a global side-panel powered by Framer Motion.

## License

MIT
