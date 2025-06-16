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
      headline: "📓 Elementary School",
      milestone: true
    }
  ],
  "1998-09-01": [
    {
      headline: "🏫 Middle School",
      milestone: true
    }
  ],
  "2002-09-01": [
    {
      headline: "🏠 Boarding School",
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
      headline: "💕 Met My Wife",
      based: "China",
      doing: "College student",
      association: "University"
    }
  ],
  "2007-10-07": [
    {
      headline: "🎻 Performing in Leipzig",
      description: "Nanjing University Orchestra visited Leipzig and other cities. Fun trip with schoolmates and musicians."
    }
  ],
  "2008-05-01": [
    {
      headline: "✍️ First Paper, Acoustics",
      description: "Laser-generated narrow-band ultrasonic wave for NDT applications - https://pubs.aip.org/asa/jasa/article/123/5_Supplement/3287/634811/Laser-generated-narrow-band-ultrasonic-wave-for"
    }
  ],
  "2008-08-01": [
    {
      headline: "🇭🇰 Exchange Study in Hong Kong",
      description: "CityU in Hong Kong, an eye-opening experience compared to my school (Nanjing University)."
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
      headline: "✈️ US Grad School",
      milestone: true
    }
  ],
  "2010-06-21": [
    {
      headline: "✍️ First Paper, Photonics",
      description: "Published at Nonlinear Photonics conference - https://opg.optica.org/abstract.cfm?uri=NP-2010-NTuB3"
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
      headline: "🚗 Roadtrip Across US",
      description: "From LA to Delaware. 14 days, lots of adventures, and sleeping in odd places."
    }
  ],
  "2012-12-01": [
    {
      headline: "🚀 Hardware Startup",
      description: "We built a new type of chip that moves light around - Silicon Photonics. https://www.nokia.com/newsroom/nokia-completes-acquisition-of-elenion-technologies/",
      milestone: true
    }
  ],
  "2014-05-01": [
    {
      headline: "✍️ First Paper, Electronics",
      description: "Electronics Letters - https://ietresearch.onlinelibrary.wiley.com/doi/abs/10.1049/el.2014.0367"
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
      description: "Boston Terrier puppy - https://www.instagram.com/mango.bostonterrier/",
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
      headline: "💀 Quit Hardware",
      description: "Difficult transition, went through lots of exploration, and landed on AI/ML."
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
      headline: "👩 Mom Visited US"
    }
  ],
  "2018-09-07": [
    {
      headline: "✍️ First Paper, ML",
      description: "Machine learning research - https://arxiv.org/abs/1809.02687"
    }
  ],
  "2020-02-01": [
    {
      headline: "📸 Started Photography",
      description: "Photography portfolio - https://www.instagram.com/magicfeature/"
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
      headline: "🏞️ Zion, Arches, Bryce",
      description: "Utah national parks hiking adventure - https://www.dingran.me/blog/utah-trip"
    }
  ],
  "2021-10-01": [
    {
      headline: "🇮🇹 Italy",
      description: "Italian adventure through multiple cities - https://www.dingran.me/blog/italy-trip"
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
  "2022-10-17": [
    {
      headline: "🤔 Right Elbow Pain",
      description: "Seemingly minor thing that changed my outlook on life"
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
      headline: "🎻 Started Cello Lessons"
    }
  ],
  "2024-01-05": [
    {
      headline: "🎤 London for Jay Chou"
    }
  ],
  "2024-02-15": [
    {
      headline: "🐧 Antarctica",
      description: "Antarctic expedition photobook - https://www.blurb.com/b/12032020-antarctica",
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