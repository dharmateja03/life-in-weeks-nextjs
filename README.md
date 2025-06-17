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

### Privacy Protection for Sensitive Dates

This codebase protects sensitive personal information. For your own deployment:

1. **Create `.env.local`** (git-ignored):
```bash
# Required environment variables for sensitive dates
REAL_BIRTH_DATE=1990-01-15
REAL_MET_WIFE_DATE=2010-02-14
REAL_MARRIAGE_DATE=2015-06-01
REAL_CITIZENSHIP_DATE=2020-07-04
```

2. **Configure other settings** in `src/app/config/app-config.ts`:
```typescript
export const APP_CONFIG = {
  name: "Your Name",
  website: "https://yourwebsite.com",
  maxAge: 85,
  showLifeExpectancy: true,
  defaultShowWorldEvents: true,
  defaultShowPresidents: false,
  showPersonalEventDates: false, // true = show full dates, false = month/year only
}
```

### For Vercel/Production Deployment

Add the same environment variables in your Vercel dashboard under Project Settings → Environment Variables.

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