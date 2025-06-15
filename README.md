# Life in Weeks - Next.js

Inspired by [Wait But Why](https://waitbutwhy.com/2014/05/life-weeks.html) and [Gina Trapani's implementation](https://github.com/ginatrapani/life-in-weeks). I adapted it to Next.js - feel free to fork the code.

For a more user-friendly app version, check out [lifeweeks.app](https://lifeweeks.app/) by Cory Zue.

## Features

- Responsive grid layout
- Personal timeline with events
- World events overlay (9/11, COVID, etc.)
- Automatic milestone colors  
- Rich tooltips with links
- Life expectancy markers

## Getting Started

```bash
git clone <your-repo-url>
cd life-in-weeks-nextjs
yarn install
yarn dev
```

## Configuration

Edit `src/app/config/app-config.ts`:

```typescript
export const APP_CONFIG = {
  birthDate: "1990-01-15",
  name: "John Doe",
  website: "https://johndoe.dev",
  maxAge: 85,
  showLifeExpectancy: true,
  defaultShowWorldEvents: true,
  defaultShowPresidents: false,
}
```

## Adding Life Events

Edit `src/app/data/life-events.ts`:

```typescript
export const lifeEvents = {
  "2024-12-25": [
    {
      headline: "🎄 Holiday Celebration",
      description: "Family time with links - https://example.com",
      milestone: true  // Triggers automatic color change
    }
  ]
}
```

## Codebase Organization

**Key principles**: Configuration-driven, data separation, automatic systems, modular components.

```
src/app/
├── config/app-config.ts      # Central settings
├── data/                     # Life events, world events, presidents
├── components/               # Grid, boxes, tooltips, navigation
├── utils/                    # Color generation, layout, dates
└── weeks.css                 # All styling
```

**Data flow**: Config → Data loading → Color generation → Grid rendering → Responsive layout

Built with Next.js 15, TypeScript, Custom CSS.