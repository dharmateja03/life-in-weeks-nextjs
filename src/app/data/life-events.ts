// Life Events Data - Ran Ding's Life Timeline

import { APP_CONFIG, DERIVED_CONFIG } from '../config/app-config'

export interface LifeEvent {
  headline: string
  description?: string
  based?: string
  doing?: string
  association?: string
  milestone?: boolean  // Mark major life phase changes
  color?: string       // Optional: override auto-assigned color
}

export type EventsData = Record<string, LifeEvent[]>

export const lifeEvents: EventsData = {
  "PLACEHOLDER_BIRTH_DATE": [
    {
      headline: "🐣 Born",
      based: "China",
      doing: "I was tiny"
    }
  ],
  "1993-09-01": [
    {
      headline: "📓 Elementary school",
      milestone: true
    }
  ],
  "1998-09-01": [
    {
      headline: "🏫 Middle school",
      milestone: true
    }
  ],
  "2002-09-01": [
    {
      headline: "🏠 Boarding school",
      milestone: true
    }
  ],
  "2005-09-01": [
    {
      headline: "🎓 College",
      milestone: true
    }
  ],
  "PLACEHOLDER_MET_WIFE_DATE  ": [
    {
      headline: "💕 Met my wife",
      based: "China",
      doing: "College student",
      association: "University"
    }
  ],
  "2008-08-01": [
    {
      headline: "🇭🇰 Exchange Study in Hong Kong"
    }
  ],
  "PLACEHOLDER_MARRIAGE_DATE": [
    {
      headline: "💍 Married",
      based: "China",
      doing: "College student",
      association: "University"
    }
  ],
  "2009-06-20": [
    {
      headline: "✈️ US grad school",
      milestone: true
    }
  ],
  "2012-06-01": [
    {
      headline: "🏠 Moved to Delaware",
      based: "Delaware",
      doing: "Graduate student",
      association: ""
    }
  ],
  "2012-06-15": [
    {
      headline: "🚗 Roadtrip across US"
    }
  ],
  "2012-12-01": [
    {
      headline: "🚀 Hardware Startup",
      milestone: true
    }
  ],
  "2014-06-01": [
    {
      headline: "🏙️ Moved to NYC",
      based: "NYC",
      doing: "Entrepreneur",
      association: "Startup"
    }
  ],
  "2015-09-01": [
    {
      headline: "🏖️ Miami"
    }
  ],
  "2016-06-01": [
    {
      headline: "🇨🇳 China"
    }
  ],
  "2016-06-17": [
    {
      headline: "🐕 Got Mango",
      based: "NYC",
      doing: "Entrepreneur",
      association: "Startup"
    }
  ],
  "2016-12-01": [
    {
      headline: "🏝️ Hawaii"
    }
  ],
  "2017-06-01": [
    {
      headline: "💀 Quit Hardware"
    }
  ],
  "2018-01-01": [
    {
      headline: "💼 Works at AWS",
      milestone: true
    }
  ],
  "2018-05-01": [
    {
      headline: "👩 Mom visited US"
    }
  ],
  "2020-02-01": [
    {
      headline: "📸 Started Photography"
    }
  ],
  "2020-02-15": [
    {
      headline: "🇵🇷 Puerto Rico"
    }
  ],
  "2020-03-01": [
    {
      headline: "💼 Works at Instagram",
      milestone: true
    }
  ],
  "2021-06-01": [
    {
      headline: "🏞️ Zion, Arches, Bryce"
    }
  ],
  "2021-10-01": [
    {
      headline: "🇮🇹 Italy"
    }
  ],
  "2022-04-01": [
    {
      headline: "🇪🇸 Spain"
    }
  ],
  "2022-04-15": [
    {
      headline: "🏛️ Washington DC"
    }
  ],
  "2022-08-10": [
    {
      headline: "🇰🇪 Kenya"
    }
  ],
  "2022-09-01": [
    {
      headline: "🌲 Seattle"
    }
  ],
  "2022-11-01": [
    {
      headline: "🇯🇵 Japan"
    }
  ],
  "2023-05-01": [
    {
      headline: "🇫🇷 Paris"
    }
  ],
  "2023-11-01": [
    {
      headline: "🎷 New Orleans"
    }
  ],
  "2023-11-10": [
    {
      headline: "🎻 Started cello lessons"
    }
  ],
  "2024-01-01": [
    {
      headline: "🇬🇧 London"
    }
  ],
  "2024-02-15": [
    {
      headline: "🐧 Antarctica",
      based: "NYC",
      doing: "Working",
      association: "Instagram"
    }
  ],
  "2024-08-01": [
    {
      headline: "🇮🇸 Iceland"
    }
  ],
  "2024-09-01": [
    {
      headline: "⛰️ Dolomites"
    }
  ],
  "2024-11-22": [
    {
      headline: "🇹🇼 Taiwan"
    }
  ],
  "2025-01-05": [
    {
      headline: "🎤 London for Jay Chou"
    }
  ],
  "2025-06-14": [
    {
      headline: "🛠️ Built this",
      based: "NYC",
      doing: "Working",
      association: "Instagram"
    }
  ],
  ...(APP_CONFIG.showLifeExpectancy ? {
    [DERIVED_CONFIG.lifeExpectancyDate]: [
      {
        headline: DERIVED_CONFIG.lifeExpectancyLabel,
        description: `Based on US male life expectancy data from Worldometers`,
        milestone: true  // Mark as milestone to show it's a significant marker
      }
    ]
  } : {}),
  ...(APP_CONFIG.showJapanLifeExpectancy ? {
    [DERIVED_CONFIG.japanLifeExpectancyDate]: [
      {
        headline: DERIVED_CONFIG.japanLifeExpectancyLabel,
        description: `Japan has one of the highest life expectancies globally`,
        milestone: true  // Mark as milestone for comparison
      }
    ]
  } : {})
}

// Configuration constants - now derived from central config
export const WEEKS_CONFIG = {
  startDate: APP_CONFIG.birthDate,
  endYear: DERIVED_CONFIG.endYear,
  startYear: DERIVED_CONFIG.birthYear,
  startMonth: DERIVED_CONFIG.birthMonth,
  startDay: DERIVED_CONFIG.birthDay
}