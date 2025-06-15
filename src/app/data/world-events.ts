// World Events Data - Major historical events from 1986 onwards
// These appear as small overlay indicators when toggled on

export interface WorldEvent {
  headline: string
  description?: string
  category: 'politics' | 'technology' | 'disaster' | 'culture' | 'economy' | 'war'
}

export const worldEvents: Record<string, WorldEvent[]> = {
  "1989-03-12": [
    {
      headline: "🌐 World Wide Web Invented",
      description: "Tim Berners-Lee creates the web at CERN",
      category: "technology"
    }
  ],
  "1989-11-09": [
    {
      headline: "🧱 Berlin Wall Falls",
      description: "End of Cold War symbol",
      category: "politics"
    }
  ],
  "1991-12-25": [
    {
      headline: "🇷🇺 Soviet Union Dissolves",
      description: "End of USSR",
      category: "politics"
    }
  ],
  "1995-08-24": [
    {
      headline: "💻 Windows 95 Released",
      description: "Microsoft's breakthrough OS",
      category: "technology"
    }
  ],
  "1997-08-31": [
    {
      headline: "👑 Princess Diana Dies",
      description: "Car crash in Paris",
      category: "culture"
    }
  ],
  "1998-09-04": [
    {
      headline: "🔍 Google Founded",
      description: "Larry Page and Sergey Brin start Google",
      category: "technology"
    }
  ],
  "2001-09-11": [
    {
      headline: "🏢 9/11 Attacks",
      description: "Twin Towers destroyed",
      category: "war"
    }
  ],
  "2003-03-20": [
    {
      headline: "🇮🇶 Iraq War Begins",
      description: "US invasion of Iraq",
      category: "war"
    }
  ],
  "2004-02-04": [
    {
      headline: "👥 Facebook Founded",
      description: "Mark Zuckerberg launches TheFacebook",
      category: "technology"
    }
  ],
  "2005-08-29": [
    {
      headline: "🌀 Hurricane Katrina",
      description: "Devastating New Orleans",
      category: "disaster"
    }
  ],
  "2007-01-09": [
    {
      headline: "📱 iPhone Announced",
      description: "Apple revolutionizes smartphones",
      category: "technology"
    }
  ],
  "2008-09-15": [
    {
      headline: "📉 Lehman Brothers Collapses",
      description: "Global financial crisis",
      category: "economy"
    }
  ],
  "2009-01-03": [
    {
      headline: "₿ Bitcoin Genesis Block",
      description: "Satoshi Nakamoto mines first Bitcoin",
      category: "technology"
    }
  ],
  "2011-03-11": [
    {
      headline: "☢️ Fukushima Nuclear Disaster",
      description: "Japan earthquake and tsunami",
      category: "disaster"
    }
  ],
  "2011-05-02": [
    {
      headline: "💀 Bin Laden Killed",
      description: "US Navy SEALs operation",
      category: "war"
    }
  ],
  "2020-01-21": [
    {
      headline: "🦠 First US COVID Case",
      description: "Pandemic begins",
      category: "disaster"
    }
  ],
  "2022-11-30": [
    {
      headline: "🤖 ChatGPT Launches",
      description: "AI chatbot reaches 100M users in 2 months",
      category: "technology"
    }
  ]
}