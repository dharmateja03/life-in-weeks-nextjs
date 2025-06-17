// Life Events Data - Ran Ding's Life Timeline

import { APP_CONFIG, DERIVED_CONFIG } from '../config/app-config'

/**
 * LifeEvent Interface - Defines the structure for life events
 * 
 * FIELD USAGE:
 * - headline: Main text displayed in cells and tooltips (REQUIRED)
 *   In compact mode: emoji extracted and shown in cell
 *   In standard mode: full text shown in cell
 * 
 * - description: Additional details shown in rich tooltips
 *   Displayed for events with URLs or detailed text
 *   Supports clickable links in tooltips
 * 
 * - milestone: Used for automatic milestone color generation
 *   Events marked as milestones get unique background colors
 *   Colors are auto-generated based on chronological order
 */
export interface LifeEvent {
  headline: string        // Main text in cells and tooltips
  description?: string    // Additional details in rich tooltips
  milestone?: boolean     // For automatic background colors
}

export type EventsData = Record<string, LifeEvent[]>

export const lifeEvents: EventsData = {
  "PLACEHOLDER_BIRTH_DATE": [
    {
      headline: "🐣 Born"
    }
  ],
  "1993-09-01": [
    {
      headline: "📓 Elementary School",
      milestone: true,
      description: "Started at a tiny elementary school attached to a factory. Only 14 students in my class, where my mom taught."
    }
  ],
  "1998-09-01": [
    {
      headline: "🏫 Middle School",
      milestone: true,
      description: "Dad switched jobs (a rare move back then), so I moved to a different city for middle school. Complete culture shock."
    }
  ],
  "2002-09-01": [
    {
      headline: "🏠 Boarding School",
      milestone: true,
      description: "Attended boarding school for high school. In retrospect, this was a major milestone of leaving home. After this, it was all about moving even further—college, then overseas for grad school and work."
    }
  ],
  "2005-09-01": [
    {
      headline: "🎓 College",
      milestone: true,
      description: "Did Physics Olympiad instead of SATs. Went to Nanjing University, but they enrolled me in the wrong major—I stuck with it anyway ¯\\_(ツ)_/¯"
    }
  ],
  "2006-11-01": [
    {
      headline: "💕 Met My Future Wife"
    }
  ],
  "2007-10-07": [
    {
      headline: "🎻 Performing in Leipzig",
      description: "Nanjing University Orchestra visited Leipzig and other cities. Fun trip with schoolmates and musicians."
    }
  ],
  "2008-05-18": [
    {
      headline: "✈️ First flight",
      description: "My first flight ever—to Paris! Got super motivated and hustled to secure a student grant for a conference. Survived on McDonald's for a week, but published my first paper: https://pubs.aip.org/asa/jasa/article/123/5_Supplement/3287/634811/Laser-generated-narrow-band-ultrasonic-wave-for"
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
      headline: "💍 Married"
    }
  ],
  "2009-06-20": [
    {
      headline: "✈️ US Grad School",
      milestone: true,
      description: "My PhD advisors are the coolest people, they send spam emails to all applicants with a problem set and whoever got the answers right get an offer. I liked it."
    }
  ],
  "2010-06-21": [
    {
      headline: "✍️ First Paper, Photonics",
      description: "Learning how to do applied physics research and how to write. https://opg.optica.org/abstract.cfm?uri=NP-2010-NTuB3"
    }
  ],
  "2012-06-15": [
    {
      headline: "🚗 Roadtrip Across US",
      description: "From LA to Delaware. 14 days, lots of adventures, and sleeping in odd places like Walmart parking lots—it's really not as bad as it sounds."
    }
  ],
  "2012-06-20": [
    {
      headline: "🏠 Moved to Delaware",
      description: "I think my professor pissed off everyone at the school, so we had to move. Delaware/Newark sucked, but it led to an interesting adventure."
    }
  ],
  "2013-06-20": [
    {
      headline: "🚴 Got into Cycling"
    }
  ],
  "2012-12-01": [
    {
      headline: "🚀 Hardware Startup",
      description: "We built a new type of chip that moves light around—Silicon Photonics. https://www.nokia.com/newsroom/nokia-completes-acquisition-of-elenion-technologies/",
      milestone: true
    }
  ],
  "2014-05-01": [
    {
      headline: "✍️ First Paper in Electronics",
      description: "Designed very fast circuits! https://ietresearch.onlinelibrary.wiley.com/doi/abs/10.1049/el.2014.0367"
    }
  ],
  "2014-06-01": [
    {
      headline: "🏙️ Moved to NYC",
      description: "The little hardware startup got bought by a PE firm, so we moved to the city. It got bought and sold several times since then, but we didn't make any real money."
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
      description: "Boston Terrier puppy - https://www.instagram.com/mango.bostonterrier/"
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
      description: "Difficult transition, went through lots of exploration (including trying out Aflac insurance sales). Eventually landed on AI/ML at AWS (thank god)."
    }
  ],
  "2018-01-01": [
    {
      headline: "💼 Works at AWS",
      milestone: true,
      description: "Contrary to common belief, I think Amazon/AWS has good culture and loved working there. I was very happy at this job (for the most part), had a supportive boss, learned a lot, got to publish several papers and properly broke into the AI field."
    }
  ],
  "2018-05-01": [
    {
      headline: "👩 Mom Visited US",
      description: "We went to Yellowstone National Park together. It was a fun trip—I wish we did more things like this. We should."
    }
  ],
  "2018-09-07": [
    {
      headline: "✍️ First Paper, ML",
      description: "Yay, https://arxiv.org/abs/1809.02687"
    }
  ],
  "2020-02-01": [
    {
      headline: "📸 Started Photography",
      description: "Borrowed a camera from my friend Yang, then the pandemic hit. I enjoyed this hobby—very meditative. Posting photos here, but I should really get a website going: https://www.instagram.com/magicfeature/"
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
      description: "Utah national parks hiking adventure: https://www.dingran.me/blog/utah-trip"
    }
  ],
  "PLACEHOLDER_CITIZENSHIP_DATE": [
    {
      headline: "🇺🇸 Became a US citizen",
      description: "Became a US citizen, mostly for the ability to travel abroad without needing visas."
    }
  ],
  "2021-10-01": [
    {
      headline: "🇮🇹 Italy",
      description: "Italy trip: https://www.dingran.me/blog/italy-trip"
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
      headline: "🤒 Right Elbow Pain",
      description: "A seemingly minor thing that changed my outlook on life."
    }
  ],
  "2022-11-01": [
    {
      headline: "🇯🇵 Japan",
      description: "Loved the trip and Japan might be the country we retire to, if we can get our act together and learn Japanese."
    }
  ],
  "2023-02-19": [
    {
      headline: "☯️ Started Reading Philosophy Books"
    }
  ],
  "2023-05-01": [
    {
      headline: "🇫🇷 Paris",
      description: "Similar to NYC, but I like NYC way more. Sorry."
    }
  ],
  "2023-10-28": [
    {
      headline: "🎻 First Cello Lessons"
    }
  ],
  "2024-01-09": [
    {
      headline: "🎤 London for Jay Chou",
      description: "Had to see this childhood idol, the trip didn't disappoint."
    }
  ],
  "2023-11-21": [
    {
      headline: "🎷 New Orleans"
    }
  ],
  "2024-02-15": [
    {
      headline: "🐧 Antarctica",
      description: "Antarctic expedition photobook: https://www.blurb.com/b/12032020-antarctica"
    }
  ],
  "2024-08-01": [
    {
      headline: "🇮🇸 Iceland",
      description: "Went to a photography workshop. Cool landscape, met some cool people too and kept in touch."
    }
  ],
  "2024-09-01": [
    {
      headline: "⛰️ Dolomites",
      description: "Best trip of the year—will definitely return."
    }
  ],
  "2024-11-22": [
    {
      headline: "🇹🇼 Taiwan",
      description: "Friendly people, but it's really not a pretty scene—the buildings are old and beat up. Not enough nature. Food wasn't great either. Maybe our expectations were too high."
    }
  ],
  "2025-06-14": [
    {
      headline: "🛠️ Built this!",
      description: "Built this little site, with the help of AI of course."
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